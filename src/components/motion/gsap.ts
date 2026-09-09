'use client';

/**
 * Shared GSAP core — the ONE place plugins are registered and the brand
 * motion language is encoded (DESIGN-SPEC §5, luxury pass).
 *
 * Every animated client component imports { gsap, ScrollTrigger, useGSAP }
 * from here — never from 'gsap' directly — so registration happens exactly
 * once and the 'brand' ease (the CSS --ease-brand curve, 0.22/1/0.36/1) is
 * always available to tweens by name.
 *
 * Motion rules encoded here:
 *  - ease 'brand' everywhere; 'none' only for scroll-scrubbed tweens.
 *  - reveals animate transform/opacity/filter only, and clear their inline
 *    props on complete so CSS hover transforms keep working afterwards.
 *  - reduced() gates EVERY entrance/scrub — reduced-motion visitors get the
 *    final, fully-visible state with no scroll coupling.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  if (!CustomEase.get('brand')) {
    // Mirrors --ease-brand: cubic-bezier(0.22, 1, 0.36, 1)
    CustomEase.create('brand', 'M0,0 C0.22,1 0.36,1 1,1');
  }
}

/** True when the visitor asked for reduced motion — check inside effects. */
export function reduced(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
