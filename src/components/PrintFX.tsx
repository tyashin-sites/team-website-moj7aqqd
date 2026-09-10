'use client';

/**
 * PrintFX — opens every <details> (FAQ accordions) before printing so the
 * printed page carries the full answers, and restores their state after.
 * CSS alone cannot expand a closed <details>. Pairs with the @media print
 * block in globals.css.
 */

import { useEffect } from 'react';

export function PrintFX() {
  useEffect(() => {
    let opened: HTMLDetailsElement[] = [];
    const before = () => {
      opened = Array.from(document.querySelectorAll<HTMLDetailsElement>('details:not([open])'));
      opened.forEach((d) => (d.open = true));
    };
    const after = () => {
      opened.forEach((d) => (d.open = false));
      opened = [];
    };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);
  return null;
}
