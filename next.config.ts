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
  // Every rule here is `permanent: true` (301). Sources are written WITHOUT a
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
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/features', destination: '/platform', permanent: true },
      { source: '/demo', destination: '/contact', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/faq', destination: '/what-is-thridify', permanent: true },
      { source: '/pricing-plans', destination: '/services/3d-modelling', permanent: true },

      // --- Industries (clean 1:1) ---
      { source: '/furniture', destination: '/industries/furniture', permanent: true },
      { source: '/doors-and-windows', destination: '/industries/doors-and-windows', permanent: true },
      { source: '/modular-furniture-laminates', destination: '/industries/laminates-surfaces', permanent: true },
      { source: '/modular-furniture', destination: '/industries/modular-kitchens', permanent: true },

      // --- Product / capability pages ---
      // No dedicated /ar-viewer or /configurator page yet; /platform hosts both.
      // TODO(phase7): consider dedicated /ar-viewer + /3d-configurator pages
      // (/ar-viewer had 26 clicks p24; /3d-product-configurator 11 clicks).
      { source: '/3d-product-configurator', destination: '/platform', permanent: true },
      { source: '/ar-viewer', destination: '/platform', permanent: true },

      // --- Integrations (GAP: no per-integration pages exist yet) ---
      // TODO(phase7): BUILD real integration pages (/integrations/<platform>) and
      // repoint these; /woocommerce (4415i), /magento (3334i), /shopify (2041i)
      // carry real impressions. Interim target = /platform so nothing 404s.
      { source: '/woocommerce', destination: '/platform', permanent: true },
      { source: '/shopify', destination: '/platform', permanent: true },
      { source: '/wix-commerce', destination: '/platform', permanent: true },
      { source: '/bigcommerce', destination: '/platform', permanent: true },
      { source: '/big-commerce', destination: '/platform', permanent: true },
      { source: '/magento', destination: '/platform', permanent: true },
      { source: '/commercetools', destination: '/platform', permanent: true },
      { source: '/canva', destination: '/platform', permanent: true },
      { source: '/custom-integration', destination: '/platform', permanent: true },

      // --- Legal ---
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-condition-policy', destination: '/terms', permanent: true },
      { source: '/terms-of-service', destination: '/terms', permanent: true },

      // --- Blog INDEX only (posts handled separately, see doc) ---
      // TODO(phase7): migrate the 37 WP posts 1:1 via the Blog/CMS plugin; the
      // /post/* URLs are intentionally NOT bulk-redirected (many->one would be a
      // soft-404 and drop equity). /blog is currently a placeholder route.
      { source: '/blogs', destination: '/blog', permanent: true },

      // --- Help center (GAP: no help center on the marketing site) ---
      // TODO(phase7): most help content is custom-domain setup docs that belong
      // to the education/arbook product (WonderlyAR), not Thridify marketing.
      { source: '/thridify-help-center', destination: '/contact', permanent: true },

      // --- Education (WonderlyAR decouple — DESIGN-SPEC §6) ---
      // FLAG(user): /ar-in-education had 8 clicks / 938 impressions. AR-for-
      // education is being spun out to WonderlyAR and MUST NOT surface on the
      // Thridify site. Interim holding redirect -> / so equity is not silently
      // dropped; replace with a 301 to the WonderlyAR domain once it exists.
      { source: '/ar-in-education', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
