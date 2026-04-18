import { qsa, on } from "../lib/dom.js";

function closePanel(trigger, panel) {
  trigger.setAttribute("aria-expanded", "false");
  panel.dataset.open = "false";

  const currentHeight = panel.scrollHeight;
  panel.style.maxHeight = `${currentHeight}px`;
  requestAnimationFrame(() => {
    panel.style.maxHeight = "0px";
  });

  const onDone = () => {
    if (panel.dataset.open === "false") panel.hidden = true;
    panel.removeEventListener("transitionend", onDone);
  };

  panel.addEventListener("transitionend", onDone);
}

function openPanel(trigger, panel) {
  trigger.setAttribute("aria-expanded", "true");
  panel.dataset.open = "true";
  panel.hidden = false;

  panel.style.maxHeight = "0px";
  requestAnimationFrame(() => {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  });

  const onDone = () => {
    if (panel.dataset.open === "true") panel.style.maxHeight = "none";
    panel.removeEventListener("transitionend", onDone);
  };

  panel.addEventListener("transitionend", onDone);
}

export function initAccordions() {
  const accordions = qsa("[data-accordion]");
  if (accordions.length === 0) return;

  for (const accordion of accordions) {
    const triggers = qsa("[data-accordion-trigger]", accordion);
    const panels = qsa("[data-accordion-panel]", accordion);

    for (const panel of panels) {
      panel.hidden = true;
      panel.dataset.open = "false";
      panel.style.maxHeight = "0px";
    }

    for (const trigger of triggers) {
      const panelId = trigger.getAttribute("aria-controls");
      if (!panelId) continue;
      const panel = document.getElementById(panelId);
      if (!panel) continue;

      on(trigger, "click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        for (const otherTrigger of triggers) {
          if (otherTrigger === trigger) continue;
          const otherId = otherTrigger.getAttribute("aria-controls");
          if (!otherId) continue;
          const otherPanel = document.getElementById(otherId);
          if (!otherPanel) continue;
          if (otherTrigger.getAttribute("aria-expanded") === "true") closePanel(otherTrigger, otherPanel);
        }

        if (isOpen) {
          closePanel(trigger, panel);
          return;
        }

        openPanel(trigger, panel);
      });
    }
  }
}
