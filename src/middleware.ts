import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  PREVIEW NOINDEX GUARD — HOST-CONDITIONAL, DO NOT MAKE UNCONDITIONAL ⚠️
 *
 * While this site is previewed on *.workers.dev it MUST NOT be indexed, or it
 * becomes duplicate content against the live thridify.com (WordPress) site.
 *
 * This is deliberately keyed on the REQUEST HOST — only `*.workers.dev`
 * responses get `X-Robots-Tag: noindex, nofollow`. The future production
 * domain (thridify.com) is untouched by design.
 *
 * REMOVAL: this guard is removed in BUILD-PLAN.md Phase 7 (launch cutover),
 * with post-deploy verification on BOTH hosts. See the ROBOTS_NOINDEX incident
 * history — a leftover unconditional noindex once deindexed two customer
 * sites. Never "simplify" this into an unconditional header or meta tag.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get('host') ?? '';
  if (host.endsWith('.workers.dev')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export const config = {
  // Run on every page + API route (skip Next internals and static files).
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
