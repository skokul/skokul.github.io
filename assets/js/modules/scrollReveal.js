import { qsa } from "../lib/dom.js";
import { prefersReducedMotion } from "../lib/motion.js";

export function initScrollReveal() {
  const elements = qsa(".reveal");
  if (elements.length === 0) return;

  if (prefersReducedMotion()) {
    for (const element of elements) element.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { root: null, threshold: 0.12 }
  );

  for (const element of elements) observer.observe(element);
}

