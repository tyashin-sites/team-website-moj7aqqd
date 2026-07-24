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
 * The future production domain (thridify.com / www.thridify.com) is
 * untouched by design and remains fully indexable.
 *
 * REMOVAL: this guard is removed in BUILD-PLAN.md Phase 7 (launch cutover),
 * with post-deploy verification on ALL hosts. See the ROBOTS_NOINDEX incident
 * history — a leftover unconditional noindex once deindexed two customer
 * sites. Never "simplify" this into an unconditional header or meta tag.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const PREVIEW_HOST_SUFFIXES = ['.workers.dev', '.sites.tyashin.com'];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get('host') ?? '';
  if (PREVIEW_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix))) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export const config = {
  // Run on every page + API route (skip Next internals and static files).
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
