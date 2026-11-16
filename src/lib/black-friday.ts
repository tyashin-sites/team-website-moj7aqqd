/**
 * Black Friday 2026 campaign page (/black-friday) — gate + expiry rules.
 *
 * ONE place decides what the route does, evaluated at REQUEST time by
 * src/middleware.ts (so the page takes itself down without a redeploy):
 *
 *   expired  → 302 to /contact. From 2026-11-26 00:00 America/Toronto
 *              (05:00 UTC). Posts and emails keep the link, so the redirect
 *              stays at least 60 days (until 2027-01-25) even after the page
 *              code is removed — delete the page, keep this rule.
 *   hidden   → 404. The page is unreachable on thridify.com until
 *              BLACK_FRIDAY_LIVE is true; preview hosts (*.workers.dev,
 *              *.sites.tyashin.com) may render it for review once the copy is
 *              in place.
 *   live     → the page renders.
 *
 * No imports on purpose: tests/black-friday.test.mjs runs this file directly
 * under `node --test`.
 */

export const BLACK_FRIDAY_PATH = '/black-friday';

/** 2026-11-26 00:00 America/Toronto (EST, UTC-5). */
export const BLACK_FRIDAY_EXPIRES_AT = Date.parse('2026-11-26T05:00:00Z');

export const BLACK_FRIDAY_EXPIRED_REDIRECT = '/contact';

/**
 * Production switch. On since 16 Nov 2026: the requester confirmed the offer
 * terms on aapastech/tyashin-platform issue 53 ("terms confirmed").
 */
export const BLACK_FRIDAY_LIVE = true;

/**
 * The Shopify App Store link is shown only once the campaign pricing is
 * confirmed live on the App Store (aapastech/thridify-be issue 496).
 */
export const BLACK_FRIDAY_SHOW_SHOPIFY_LINK = false;

export const BLACK_FRIDAY_CALENDLY_URL =
  'https://calendly.com/hello-thridify/30min?utm_source=thridify&utm_medium=campaign-page&utm_campaign=black-friday-2026';

export type BlackFridayState = 'expired' | 'hidden' | 'live';

export function isBlackFridayPath(pathname: string): boolean {
  return pathname === BLACK_FRIDAY_PATH || pathname === `${BLACK_FRIDAY_PATH}/`;
}

export function blackFridayState(opts: {
  /** Epoch milliseconds of the request. */
  now: number;
  /** True on *.workers.dev / *.sites.tyashin.com. */
  isPreviewHost: boolean;
  /** False while the page copy has not been supplied. */
  hasCopy: boolean;
  live?: boolean;
}): BlackFridayState {
  const live = opts.live ?? BLACK_FRIDAY_LIVE;
  // Expiry wins over everything, so the link never 404s after the campaign.
  if (opts.now >= BLACK_FRIDAY_EXPIRES_AT) return 'expired';
  if (!opts.hasCopy) return 'hidden';
  if (live || opts.isPreviewHost) return 'live';
  return 'hidden';
}
