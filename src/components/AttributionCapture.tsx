'use client';

/**
 * AttributionCapture — mounted once in the root layout. Renders nothing.
 *
 *  1. Records a touch on every client navigation (src/lib/attribution.ts).
 *  2. Persists it as soon as the visitor's consent allows (src/lib/consent.ts).
 *  3. Tags every Calendly link at the moment it is used — pointerdown, focus
 *     (keyboard), click, middle-click and right-click "copy link" — so links
 *     from content JSON and the chatbot carry the visitor's UTMs too
 *     (src/lib/calendly.ts).
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureTouch, persistAttribution } from '@/lib/attribution';
import { onConsentChange } from '@/lib/consent';
import { isCalendlyHref, withStoredUtm } from '@/lib/calendly';

function tagCalendly(e: Event) {
  const target = e.target as Element | null;
  const a = target?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!a || !isCalendlyHref(a.href)) return;
  const next = withStoredUtm(a.href);
  if (next !== a.href) a.href = next;
}

const EVENTS = ['pointerdown', 'focusin', 'click', 'auxclick', 'contextmenu'] as const;

export function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureTouch();
  }, [pathname]);

  useEffect(() => {
    const off = onConsentChange(persistAttribution);
    for (const ev of EVENTS) document.addEventListener(ev, tagCalendly, true);
    return () => {
      off();
      for (const ev of EVENTS) document.removeEventListener(ev, tagCalendly, true);
    };
  }, []);

  return null;
}
