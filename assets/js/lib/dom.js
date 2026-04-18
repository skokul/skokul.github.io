export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function on(element, eventName, handler, options) {
  element.addEventListener(eventName, handler, options);
  return () => element.removeEventListener(eventName, handler, options);
}

