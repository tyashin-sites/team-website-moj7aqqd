'use client';

/**
 * smoothScrollTo — the ONE way this site scrolls programmatically.
 *
 * Why not CSS `scroll-behavior: smooth` / `scrollIntoView({ behavior:
 * 'smooth' })`: GSAP's ScrollTrigger.refresh() (fired on load, resize and
 * whenever late layout — posters, fonts, 3D frames — settles) restores the
 * scroll position it recorded, which silently CANCELS any in-flight native
 * smooth scroll. Deep links like /platform#analytics and in-page anchor
 * chips were landing at the top of the page because of it.
 *
 * This tweens the scroll position on the 'brand' ease and writes it with
 * `behavior: 'instant'` every frame, so a stray reset costs one frame, not
 * the whole scroll. Reduced motion → an instant jump.
 */

import { gsap, reduced } from '@/components/motion/gsap';

let active: gsap.core.Tween | null = null;

/** Scroll the window to an absolute Y (px). */
export function smoothScrollTo(top: number): void {
  active?.kill();
  const target = Math.max(0, Math.round(top));
  if (reduced()) {
    window.scrollTo({ top: target, behavior: 'instant' });
    return;
  }
  const state = { y: window.scrollY };
  const distance = Math.abs(target - state.y);
  active = gsap.to(state, {
    y: target,
    duration: gsap.utils.clamp(0.45, 1.1, distance / 2400 + 0.35),
    ease: 'brand',
    onUpdate: () => window.scrollTo({ top: state.y, behavior: 'instant' }),
    onComplete: () => { active = null; },
  });
}

/** Scroll so `el` sits at the top of the viewport, honouring its CSS
 *  `scroll-margin-top` (the sections' `scroll-mt-*` header offset). */
export function smoothScrollToElement(el: Element): void {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - margin);
}

/** Scroll to the element named by the current location hash, if any. */
export function scrollToLocationHash(): boolean {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  smoothScrollToElement(el);
  return true;
}
