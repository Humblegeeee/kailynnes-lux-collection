// The storefront's entrance animations wait until the intro has lifted.
// index.html sets `site-ready` straight away when there is no intro to play.
const root = () => document.documentElement;

export const isSiteReady = () => root().classList.contains('site-ready');

export const introPending = () => root().classList.contains('intro-pending');

export function markSiteReady() {
  if (isSiteReady()) return;
  root().classList.remove('intro-pending');
  root().classList.add('site-ready');
  window.dispatchEvent(new Event('klc:ready'));
}

export function onSiteReady(fn) {
  if (isSiteReady()) {
    fn();
    return () => {};
  }
  window.addEventListener('klc:ready', fn, { once: true });
  return () => window.removeEventListener('klc:ready', fn);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
