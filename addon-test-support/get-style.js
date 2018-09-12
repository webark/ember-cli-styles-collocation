export default function getStyles(selector) {
  return window.getComputedStyle(document.querySelector(selector));
}
