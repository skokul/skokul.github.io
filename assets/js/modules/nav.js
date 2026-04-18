import { qsa, qs, on } from "../lib/dom.js";
import { prefersReducedMotion } from "../lib/motion.js";

function getHeaderOffset() {
  const header = qs("header");
  return header ? header.getBoundingClientRect().height + 8 : 72;
}

function initMobileMenu() {
  const trigger = qs("[data-mobile-menu-trigger]");
  const menu = qs("#mobile-menu");
  if (!trigger || !menu) return;

  const closeButtons = qsa("[data-mobile-menu-close]", menu);
  const firstLink = () => menu.querySelector("a[href^=\"#\"]");

  const setOpen = (open) => {
    menu.classList.toggle("hidden", !open);
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("overflow-hidden", open);
    if (open) {
      requestAnimationFrame(() => firstLink()?.focus());
    } else {
      trigger.focus();
    }
  };

  on(trigger, "click", () => setOpen(menu.classList.contains("hidden")));
  for (const btn of closeButtons) on(btn, "click", () => setOpen(false));

  on(menu, "click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (link) setOpen(false);
  });

  on(window, "keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

export function initSmoothAnchors() {
  const links = qsa('a[href^="#"]:not([data-no-smooth])');
  for (const link of links) {
    const href = link.getAttribute("href");
    if (!href || href === "#") continue;

    on(link, "click", (event) => {
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();

      const behavior = prefersReducedMotion() ? "auto" : "smooth";
      const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      window.scrollTo({ top, behavior });

      history.pushState(null, "", href);
    });
  }
}

export function initActiveNav() {
  const navLinks = qsa(".nav-link[data-nav-link]");
  if (navLinks.length === 0) return;

  const sections = navLinks
    .map((link) => link.getAttribute("href"))
    .filter(Boolean)
    .map((href) => href.slice(1))
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActive = (id) => {
    for (const link of navLinks) {
      const href = link.getAttribute("href");
      const active = href === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      setActive(visible.target.id);
    },
    { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: `-${getHeaderOffset()}px 0px -55% 0px` }
  );

  for (const section of sections) observer.observe(section);
  setActive(sections[0]?.id ?? "");
}

export function initNavigation() {
  initMobileMenu();
  initSmoothAnchors();
  initActiveNav();
}
