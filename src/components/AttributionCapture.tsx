'use client';

/**
 * AttributionCapture — mounted once in the root layout. Renders nothing.
 *
 *  1. Records a touch on every client navigation (src/lib/attribution.ts).
 *  2. Persists it as soon as the visitor's consent allows (src/lib/consent.ts).
 *  3. Tags every Calendly link at the moment it is used — pointerdown, focus
 *     (keyboard), click, middle-click and right-click "copy link" — so links
 *     from content JSON and the chatbot carry the visitor's UTMs too
 *     (src/lib/calendly.ts). The campaign's counted booking link
 *     (/go/black-friday-call) gets the visitor's `utm_source` the same way,
 *     so its clicks can be split by source.
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureTouch, carriedUtm, persistAttribution } from '@/lib/attribution';
import { blackFridayCallHref, isBlackFridayCallPath } from '@/lib/black-friday';
import { onConsentChange } from '@/lib/consent';
import { isCalendlyHref, withStoredUtm } from '@/lib/calendly';

function tagCalendly(e: Event) {
  const target = e.target as Element | null;
  const a = target?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!a) return;
  if (a.origin === window.location.origin && isBlackFridayCallPath(a.pathname)) {
    if (!a.search) {
      const tagged = blackFridayCallHref(carriedUtm().utm_source);
      if (tagged !== a.pathname) a.href = tagged;
    }
    return;
  }
  if (!isCalendlyHref(a.href)) return;
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
