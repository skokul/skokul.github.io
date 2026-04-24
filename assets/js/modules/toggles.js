import { qsa, qs, on } from "../lib/dom.js";

export function initToggleTargets() {
  const triggers = qsa("[data-toggle-target]");
  for (const trigger of triggers) {
    const closedLabel = trigger.dataset.toggleLabelClosed || "Show";
    const openLabel = trigger.dataset.toggleLabelOpen || "Hide";

    on(trigger, "click", () => {
      const selector = trigger.dataset.toggleTarget;
      if (!selector) return;
      const panel = qs(selector);
      if (!panel) return;

      const isOpen = !panel.hidden;
      panel.hidden = isOpen;
      trigger.setAttribute("aria-expanded", (!isOpen).toString());
      trigger.textContent = isOpen ? closedLabel : openLabel;
    });
  }
}

export function initToggleGroups() {
  const groups = qsa("[data-toggle-group]");
  for (const group of groups) {
    const buttons = qsa("[data-toggle-value]", group);
    if (buttons.length === 0) continue;

    const scope = group.closest("article") || document;
    const panels = qsa("[data-toggle-panel]", scope);
    if (panels.length === 0) continue;

    const activate = (value) => {
      for (const btn of buttons) {
        const active = btn.dataset.toggleValue === value;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      }

      for (const panel of panels) {
        panel.hidden = panel.dataset.togglePanel !== value;
      }
    };

    const defaultValue = buttons.find((b) => b.classList.contains("is-active"))?.dataset.toggleValue ?? buttons[0].dataset.toggleValue;
    activate(defaultValue);

    for (const button of buttons) {
      on(button, "click", () => {
        const value = button.dataset.toggleValue;
        if (!value) return;
        activate(value);
      });
    }
  }
}
