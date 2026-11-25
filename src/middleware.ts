import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BLACK_FRIDAY_COPY } from '@/content/black-friday';
import {
  BLACK_FRIDAY_CALENDLY_URL,
  BLACK_FRIDAY_EXPIRED_REDIRECT,
  blackFridayState,
  isBlackFridayCallPath,
  isBlackFridayPath,
} from '@/lib/black-friday';
import { CSP_POLICY, cspHeaderName } from '@/lib/csp';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  PREVIEW NOINDEX GUARD — HOST-CONDITIONAL, DO NOT MAKE UNCONDITIONAL ⚠️
 *
 * While this site is previewed on a NON-production host it MUST NOT be
 * indexed, or it becomes duplicate content against the live thridify.com
 * (WordPress) site.
 *
 * This is deliberately keyed on the REQUEST HOST — only the known preview
 * hosts get `X-Robots-Tag: noindex, nofollow`:
 *   - `*.workers.dev`        — the raw Cloudflare Worker preview URL
 *   - `*.sites.tyashin.com`  — the platform per-slug preview URL
 *     (e.g. team-website-moj7aqqd.sites.tyashin.com). Neither is ever the
 *     production host for THIS project (production = thridify.com), so
 *     hard-coding noindex on them is safe.
 * The production domain (thridify.com) is never stamped; www.thridify.com
 * 301s to the apex.
 *
 * REMOVAL: this guard is removed in BUILD-PLAN.md Phase 7 (launch cutover),
 * with post-deploy verification on ALL hosts. See the ROBOTS_NOINDEX incident
 * history — a leftover unconditional noindex once deindexed two customer
 * sites. Never "simplify" this into an unconditional header or meta tag.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const PREVIEW_HOST_SUFFIXES = ['.workers.dev', '.sites.tyashin.com'];
const PRODUCTION_HOST = 'thridify.com';

/**
 * The host the VISITOR used. Under Tyashin dispatch the Worker is fetched at
 * its workers.dev URL and the platform forwards the real hostname in
 * `X-Forwarded-Host` (custom domains + *.sites.tyashin.com). A direct hit on
 * workers.dev carries no forwarded host. Keying the guard on the raw `host`
 * alone stamped noindex on thridify.com itself at cutover (2026-09-10).
 */
function effectiveHost(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-host') ??
    request.headers.get('host') ??
    ''
  ).toLowerCase();
}

// WCR-011 CSP: policy, mode and history live in src/lib/csp.ts.

export function middleware(request: NextRequest) {
  const host = effectiveHost(request);

  // Canonical host: www → apex, permanent. The platform emits apex canonicals
  // for this project, so the www hostname must not serve a duplicate copy.
  if (host === `www.${PRODUCTION_HOST}`) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = PRODUCTION_HOST;
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  const isProduction = host === PRODUCTION_HOST;
  const isPreviewHost =
    !isProduction && PREVIEW_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));

  // The campaign's booking buttons go through this path so each click is a
  // request that can be counted (src/lib/black-friday.ts). Always the same
  // Calendly page and tags; never cached, or repeat clicks would go uncounted.
  if (isBlackFridayCallPath(request.nextUrl.pathname)) {
    const res = NextResponse.redirect(BLACK_FRIDAY_CALENDLY_URL, 302);
    res.headers.set('Cache-Control', 'no-store');
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  // Temporary campaign page: gate and expiry are decided HERE, per request,
  // so it goes live and takes itself down without a redeploy
  // (src/lib/black-friday.ts).
  if (isBlackFridayPath(request.nextUrl.pathname)) {
    const state = blackFridayState({
      now: Date.now(),
      isPreviewHost,
      hasCopy: BLACK_FRIDAY_COPY !== null,
    });
    if (state === 'expired') {
      // The visitor must stay on the host they used: under Tyashin dispatch
      // the request URL carries the workers.dev host, the real one is forwarded.
      const url = request.nextUrl.clone();
      url.pathname = BLACK_FRIDAY_EXPIRED_REDIRECT;
      url.search = '';
      const visitorHost =
        request.headers.get('x-forwarded-host') ?? request.headers.get('host');
      if (visitorHost) {
        url.port = '';
        url.host = visitorHost;
        url.protocol = /^(localhost|127\.0\.0\.1)(:|$)/.test(visitorHost) ? 'http:' : 'https:';
      }
      const res = NextResponse.redirect(url, 302);
      res.headers.set('Cache-Control', 'no-store');
      res.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return res;
    }
    if (state === 'hidden') {
      // No such route → the site's own 404 page and status.
      const res = NextResponse.rewrite(new URL('/__gated/black-friday', request.url));
      res.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return res;
    }
  }

  const response = NextResponse.next();
  response.headers.set(cspHeaderName(), CSP_POLICY);
  if (isBlackFridayPath(request.nextUrl.pathname)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
  }
  if (isPreviewHost) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export const config = {
  // Run on every page + API route (skip Next internals and static files).
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
