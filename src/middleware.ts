import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

  const response = NextResponse.next();
  const isProduction = host === PRODUCTION_HOST;
  if (!isProduction && PREVIEW_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix))) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  // Temporary cutover diagnostic (remove after verification): which host the
  // guard actually evaluated, so the live check is unambiguous.
  response.headers.set('X-Site-Effective-Host', host);
  return response;
}

export const config = {
  // Run on every page + API route (skip Next internals and static files).
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
