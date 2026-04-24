import { initScrollReveal } from "./modules/scrollReveal.js";
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
initTimelines();
initToggleTargets();
initToggleGroups();
initNavigation();
