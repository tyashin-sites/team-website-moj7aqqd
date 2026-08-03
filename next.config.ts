import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: '**' },
    ],
  },
  // Type errors FAIL the build on purpose — the typed content contract in
  // src/lib/content.ts only protects against site.json drift if drift can
  // break CI (Phase 2, QA carry-forward on the `(siteData as any)` casts).
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },

  // ---------------------------------------------------------------------------
  // WordPress -> Next.js SEO-preservation 301 map (Phase-7 cutover prep).
  //
  // Source of truth + full disposition table: docs/seo-migration-map.md.
  // Every rule uses `statusCode: 301` (a plain 301 — NOT Next's `permanent:
  // true`, which emits a 308). Sources are written WITHOUT a
  // trailing slash: the production WordPress URLs carry trailing slashes, but
  // Next (trailingSlash:false, default) FIRST 308-normalizes `/x/` -> `/x`, then
  // this table 301s `/x` -> target. Net for an inbound WP link `/about-us/`:
  // 308 -> `/about-us` -> 301 -> `/about` (non-lossy chain; both hops preserve
  // equity). Verified live on the worker host.
  //
  // Subdomains (admin./dashboard./arbook./vto./learnabc./devadmin./
  // aapastech-dev.thridify.com) are SEPARATE apps on other hosts and are NOT
  // touched here — next.config redirects are path-scoped to this Worker's host.
  //
  // GAP rules (integrations, help-center, blog, education) are INTERIM: they
  // point at an existing route so no inbound link 404s at cutover, each tagged
  // with a TODO to replace once the real destination page exists. Blog POSTS
  // (/post/*) are deliberately NOT bulk-redirected here — see the doc.
  // ---------------------------------------------------------------------------
  async redirects() {
    return [
      // --- Core pages (clean 1:1 to existing routes) ---
      { source: '/about-us', destination: '/about', statusCode: 301 },
      { source: '/home', destination: '/', statusCode: 301 },
      { source: '/features', destination: '/platform', statusCode: 301 },
      { source: '/demo', destination: '/contact', statusCode: 301 },
      { source: '/contact-us', destination: '/contact', statusCode: 301 },
      { source: '/faq', destination: '/what-is-thridify', statusCode: 301 },
      { source: '/pricing-plans', destination: '/services/3d-modelling', statusCode: 301 },

      // --- Industries (clean 1:1) ---
      { source: '/furniture', destination: '/industries/furniture', statusCode: 301 },
      { source: '/doors-and-windows', destination: '/industries/doors-and-windows', statusCode: 301 },
      { source: '/modular-furniture-laminates', destination: '/industries/laminates-surfaces', statusCode: 301 },
      { source: '/modular-furniture', destination: '/industries/modular-kitchens', statusCode: 301 },

      // --- Product / capability pages ---
      // No dedicated /ar-viewer or /configurator page yet; /platform hosts both.
      // TODO(phase7): consider dedicated /ar-viewer + /3d-configurator pages
      // (/ar-viewer had 26 clicks p24; /3d-product-configurator 11 clicks).
      { source: '/3d-product-configurator', destination: '/platform', statusCode: 301 },
      { source: '/ar-viewer', destination: '/platform', statusCode: 301 },

      // --- Integrations (REAL per-platform pages now exist: /integrations/*) ---
      // Each old WordPress integration URL 301s to its dedicated landing page
      // (src/lib/integrations.ts) to preserve its specific ranking intent;
      // /woocommerce (4415i), /magento (3334i), /shopify (2041i) carry real
      // impressions. Spelling variants (/big-commerce, /wix-commerce) map to the
      // canonical slug. See docs/seo-migration-map.md §D.
      { source: '/woocommerce', destination: '/integrations/woocommerce', statusCode: 301 },
      { source: '/shopify', destination: '/integrations/shopify', statusCode: 301 },
      { source: '/wix-commerce', destination: '/integrations/wix', statusCode: 301 },
      { source: '/bigcommerce', destination: '/integrations/bigcommerce', statusCode: 301 },
      { source: '/big-commerce', destination: '/integrations/bigcommerce', statusCode: 301 },
      { source: '/magento', destination: '/integrations/magento', statusCode: 301 },
      { source: '/commercetools', destination: '/integrations/commercetools', statusCode: 301 },
      { source: '/canva', destination: '/integrations/canva', statusCode: 301 },
      { source: '/custom-integration', destination: '/integrations/custom-integration', statusCode: 301 },

      // --- Legal ---
      { source: '/privacy-policy', destination: '/privacy', statusCode: 301 },
      { source: '/terms-condition-policy', destination: '/terms', statusCode: 301 },
      { source: '/terms-of-service', destination: '/terms', statusCode: 301 },

      // --- Blog INDEX only (posts handled separately, see doc) ---
      // TODO(phase7): migrate the 37 WP posts 1:1 via the Blog/CMS plugin; the
      // /post/* URLs are intentionally NOT bulk-redirected (many->one would be a
      // soft-404 and drop equity). /blog is currently a placeholder route.
      { source: '/blogs', destination: '/blog', statusCode: 301 },

      // --- Help center (GAP: no help center on the marketing site) ---
      // TODO(phase7): most help content is custom-domain setup docs that belong
      // to the education/arbook product (WonderlyAR), not Thridify marketing.
      { source: '/thridify-help-center', destination: '/contact', statusCode: 301 },

      // --- Education (WonderlyAR decouple — DESIGN-SPEC §6) ---
      // FLAG(user): /ar-in-education had 8 clicks / 938 impressions. AR-for-
      // education is being spun out to WonderlyAR and MUST NOT surface on the
      // Thridify site. Interim holding redirect -> / so equity is not silently
      // dropped; replace with a 301 to the WonderlyAR domain once it exists.
      { source: '/ar-in-education', destination: '/', statusCode: 301 },
    ];
  },
};

export default nextConfig;
