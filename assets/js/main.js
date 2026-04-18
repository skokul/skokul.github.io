import { initScrollReveal } from "./modules/scrollReveal.js";
import { initAccordions } from "./modules/accordion.js";
import { initTimelines } from "./modules/timeline.js";
import { initToggleTargets, initToggleGroups } from "./modules/toggles.js";
import { initNavigation } from "./modules/nav.js";
import { qs } from "./lib/dom.js";

function setFooterYear() {
  const year = qs("#year");
  if (!year) return;
  year.textContent = new Date().getFullYear().toString();
}

setFooterYear();
initScrollReveal();
initAccordions();
initTimelines();
initToggleTargets();
initToggleGroups();
initNavigation();
