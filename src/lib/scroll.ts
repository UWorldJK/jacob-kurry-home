import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.12 });
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -24 });
  else el.scrollIntoView({ block: 'start' });
}
