/**
 * WCR-011: the site's Content-Security-Policy, in one place.
 *
 * History: Report-Only from 10 Nov 2026 (PR 30, VP decision 9 Nov: 7-day
 * soak, then enforce if the 3D viewer reports no violations). The soak did
 * NOT come back clean. Checked 25 Nov 2026 (tyashin-platform issue 107) in a
 * WebGL browser on /, /platform, /3d-product-configurator, /ar-viewer,
 * /room-visualizer plus `wrangler tail` of /api/csp-report, the first policy
 * would have broken, once enforced:
 *   - 3D textures: the KTX2 / Basis transcoder (viewer.thridify.com/basis/
 *     basis_transcoder.js, Emscripten embind) builds functions from strings
 *     → needs 'unsafe-eval'; three.js loaders fetch blob: URLs → connect-src
 *     blob:; mviewer.js imports the meshopt decoder from a data: URL →
 *     script-src data:.
 *   - Cloudflare Web Analytics (static.cloudflareinsights.com/beacon.min.js).
 * Those sources are allowed below, and the policy goes back to Report-Only
 * for a fresh soak before CSP_MODE flips to 'enforce'.
 *
 * Not ours: a second `content-security-policy-report-only` header with
 * `connect-src 'none'` and a report-uri on csp-reporting.cloudflare.com is
 * Cloudflare's script monitor (zone setting). Ignore its console noise.
 *
 * Platform-served paths (/blog, /robots.txt, /sitemap.xml, checkout…) don't
 * pass through this middleware and carry no CSP from here.
 */

export type CspMode = 'report-only' | 'enforce';

/** Flip to 'enforce' only after a clean Report-Only soak of THIS policy. */
export const CSP_MODE: CspMode = 'report-only';

export const CSP_DIRECTIVES: Record<string, string[]> = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    // Basis/KTX2 + Draco transcoders (Emscripten embind) run in blob: workers
    // that inherit this policy and build functions from strings.
    "'unsafe-eval'",
    "'wasm-unsafe-eval'",
    'blob:',
    // mviewer.js imports its meshopt decoder from a data: URL.
    'data:',
    'https://thridify.com',
    'https://*.thridify.com',
    'https://website-api.tyashin.com',
    'https://www.googletagmanager.com',
    'https://www.gstatic.com',
    'https://ajax.googleapis.com',
    'https://static.cloudflareinsights.com',
  ],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com'],
  'img-src': ["'self'", 'data:', 'blob:', 'https:'],
  'media-src': ["'self'", 'blob:', 'https:'],
  // three.js loaders fetch blob:/data: URLs for embedded GLB textures.
  'connect-src': ["'self'", 'https:', 'wss:', 'blob:', 'data:'],
  'worker-src': ["'self'", 'blob:'],
  'frame-src': ["'self'", 'https:'],
  'frame-ancestors': ["'self'"],
  'form-action': ["'self'", 'https://website-api.tyashin.com'],
  'base-uri': ["'self'"],
  'object-src': ["'none'"],
  'report-uri': ['/api/csp-report'],
};

export const CSP_POLICY = Object.entries(CSP_DIRECTIVES)
  .map(([name, sources]) => `${name} ${sources.join(' ')}`)
  .join('; ');

export function cspHeaderName(mode: CspMode = CSP_MODE): string {
  return mode === 'enforce' ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only';
}
