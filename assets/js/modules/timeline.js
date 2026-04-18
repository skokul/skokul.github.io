import { qsa, on } from "../lib/dom.js";

function setActive(timelineRoot, index) {
  const tabs = qsa("[data-timeline-tab]", timelineRoot);
  const panels = qsa("[data-timeline-panel]", timelineRoot);

  for (const tab of tabs) {
    const tabIndex = Number(tab.dataset.timelineTab);
    const active = tabIndex === index;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  }

  for (const panel of panels) {
    const panelIndex = Number(panel.dataset.timelinePanel);
    const active = panelIndex === index;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  }
}

export function initTimelines() {
  const timelines = qsa("[data-timeline]");
  if (timelines.length === 0) return;

  for (const timeline of timelines) {
    setActive(timeline, 0);

    const tabs = qsa("[data-timeline-tab]", timeline);
    for (const tab of tabs) {
      on(tab, "click", () => {
        const nextIndex = Number(tab.dataset.timelineTab);
        if (Number.isNaN(nextIndex)) return;
        setActive(timeline, nextIndex);
      });
    }
  }
}

