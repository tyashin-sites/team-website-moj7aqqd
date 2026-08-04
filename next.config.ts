import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https" as const, hostname: "**" }],
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
  // GAP rules (help-center) are INTERIM: they point at an existing route so no
  // inbound link 404s at cutover, tagged with a TODO to replace once the real
  // destination page exists. Blog POSTS (/post/*) are deliberately NOT
  // bulk-redirected here — see the doc.
  //
  // Education URLs (WonderlyAR decouple, DESIGN-SPEC §6) 301 OFF-SITE to
  // wonderlyar.com (LIVE 2026-08-03) so education SEO equity goes to the real
  // WonderlyAR brand, not the Thridify site. Off-site absolute destinations
  // require `basePath: false` and the SPECIFIC education rules are ordered
  // BEFORE the generic /post/:slug and /post/tag/:tag wildcards (first match wins).
  // ---------------------------------------------------------------------------
  async redirects() {
    return [
      // --- Core pages (clean 1:1 to existing routes) ---
      { source: "/about-us", destination: "/about", statusCode: 301 },
      { source: "/home", destination: "/", statusCode: 301 },
      // NOTE: the legacy WordPress /features → /platform 301 was REMOVED
      // 2026-08-03 — /features is now a real page (the 5-pillar capability
      // reference). Keep it un-redirected so the SSG page serves.
      { source: "/demo", destination: "/contact", statusCode: 301 },
      { source: "/contact-us", destination: "/contact", statusCode: 301 },
      { source: "/faq", destination: "/what-is-thridify", statusCode: 301 },
      {
        source: "/pricing-plans",
        destination: "/services/3d-modelling",
        statusCode: 301,
      },

      // --- Industries (clean 1:1) ---
      {
        source: "/furniture",
        destination: "/industries/furniture",
        statusCode: 301,
      },
      {
        source: "/doors-and-windows",
        destination: "/industries/doors-and-windows",
        statusCode: 301,
      },
      {
        source: "/modular-furniture-laminates",
        destination: "/industries/laminates-surfaces",
        statusCode: 301,
      },
      {
        source: "/modular-furniture",
        destination: "/industries/modular-kitchens",
        statusCode: 301,
      },

      // --- Product / capability pages ---
      // No dedicated /ar-viewer or /configurator page yet; /platform hosts both.
      // TODO(phase7): consider dedicated /ar-viewer + /3d-configurator pages
      // (/ar-viewer had 26 clicks p24; /3d-product-configurator 11 clicks).
      {
        source: "/3d-product-configurator",
        destination: "/platform",
        statusCode: 301,
      },
      { source: "/ar-viewer", destination: "/platform", statusCode: 301 },

      // --- Integrations (REAL per-platform pages now exist: /integrations/*) ---
      // Each old WordPress integration URL 301s to its dedicated landing page
      // (src/lib/integrations.ts) to preserve its specific ranking intent;
      // /woocommerce (4415i), /magento (3334i), /shopify (2041i) carry real
      // impressions. Spelling variants (/big-commerce, /wix-commerce) map to the
      // canonical slug. See docs/seo-migration-map.md §D.
      {
        source: "/woocommerce",
        destination: "/integrations/woocommerce",
        statusCode: 301,
      },
      {
        source: "/shopify",
        destination: "/integrations/shopify",
        statusCode: 301,
      },
      {
        source: "/wix-commerce",
        destination: "/integrations/wix",
        statusCode: 301,
      },
      {
        source: "/bigcommerce",
        destination: "/integrations/bigcommerce",
        statusCode: 301,
      },
      {
        source: "/big-commerce",
        destination: "/integrations/bigcommerce",
        statusCode: 301,
      },
      {
        source: "/magento",
        destination: "/integrations/magento",
        statusCode: 301,
      },
      // Adobe Commerce is Magento's current name; keep the high-intent /magento
      // slug canonical and point the brand-name variant at it (no separate page).
      {
        source: "/adobe-commerce",
        destination: "/integrations/magento",
        statusCode: 301,
      },
      {
        source: "/commercetools",
        destination: "/integrations/commercetools",
        statusCode: 301,
      },
      { source: "/canva", destination: "/integrations/canva", statusCode: 301 },
      {
        source: "/custom-integration",
        destination: "/integrations/custom-integration",
        statusCode: 301,
      },

      // --- Legal ---
      { source: "/privacy-policy", destination: "/privacy", statusCode: 301 },
      {
        source: "/terms-condition-policy",
        destination: "/terms",
        statusCode: 301,
      },
      { source: "/terms-of-service", destination: "/terms", statusCode: 301 },

      // --- Blog (RESOLVED 2026-08-03: 37 WP posts migrated 1:1 into the Blog/CMS
      //     plugin at MATCHING slugs; served live at /blog/<slug> by the platform
      //     edge). See docs/seo-migration-map.md §G.
      //
      // ORDERING IS LOAD-BEARING: Next evaluates redirects() top-to-bottom, first
      // match wins. The MULTI-segment archive rules (/post/tag/*, /post/author/*,
      // /post/category/*) MUST come BEFORE the single-segment /post/:slug catch,
      // otherwise :slug would swallow e.g. /post/tag/roi (`:slug` = "tag") and
      // 301 it to /blog/tag. Archive URLs are low-value; consolidate to /blog.
      // --- Education tag archives -> WonderlyAR (WonderlyAR decouple, DESIGN-SPEC §6) ---
      // WonderlyAR is now LIVE at wonderlyar.com. The 3 education tag archives
      // (ar-education-*) 301 OFF-SITE to WonderlyAR so their earned equity flows
      // to the real education brand instead of the Thridify /blog index. These
      // SPECIFIC rules MUST precede the generic /post/tag/:tag wildcard below
      // (first match wins). External absolute destinations require basePath:false.
      {
        source: "/post/tag/ar-education-custom-domain",
        destination: "https://wonderlyar.com",
        basePath: false,
        statusCode: 301,
      },
      {
        source: "/post/tag/ar-education-domain-connection",
        destination: "https://wonderlyar.com",
        basePath: false,
        statusCode: 301,
      },
      {
        source: "/post/tag/ar-education-domain-setup",
        destination: "https://wonderlyar.com",
        basePath: false,
        statusCode: 301,
      },
      { source: "/post/tag/:tag", destination: "/blog", statusCode: 301 },
      { source: "/post/author/:author", destination: "/blog", statusCode: 301 },
      { source: "/post/category/:cat", destination: "/blog", statusCode: 301 },
      {
        source: "/category/blog/page/:n",
        destination: "/blog",
        statusCode: 301,
      },
      { source: "/category/blog", destination: "/blog", statusCode: 301 },
      { source: "/blogs", destination: "/blog", statusCode: 301 },
      // The ONE education post among the 37 -> WonderlyAR (LIVE at wonderlyar.com).
      // slug `connect-your-custom-domain-to-ar-education` is AR-for-education help
      // content that belongs to WonderlyAR, not the Thridify blog. This SPECIFIC
      // rule MUST precede the /post/:slug wildcard below (first match wins) so it
      // 301s OFF-SITE instead of to /blog/<slug>. External absolute destination
      // requires basePath:false. (The other 6 custom-domain posts are Thridify
      // platform how-tos and correctly fall through to /blog/:slug.)
      // NOTE(orchestrator): this post is still PUBLISHED at
      // /blog/connect-your-custom-domain-to-ar-education on the Thridify blog and
      // should be UNPUBLISHED via the blog API so no education content lives on
      // Thridify (needs a JWT — flagged to the orchestrator).
      {
        source: "/post/connect-your-custom-domain-to-ar-education",
        destination: "https://wonderlyar.com",
        basePath: false,
        statusCode: 301,
      },
      // The 37 posts — slug PRESERVED from WordPress. LAST so it only catches a
      // single-segment /post/<slug> (multi-segment archives already handled).
      // 6 of the remaining are custom-domain help docs (Thridify platform how-tos)
      // — they remain in the blog.
      { source: "/post/:slug", destination: "/blog/:slug", statusCode: 301 },

      // --- Help center (GAP: no help center on the marketing site) ---
      // TODO(phase7): most help content is custom-domain setup docs that belong
      // to the education/arbook product (WonderlyAR), not Thridify marketing.
      {
        source: "/thridify-help-center",
        destination: "/contact",
        statusCode: 301,
      },

      // --- Education (WonderlyAR decouple — DESIGN-SPEC §6) ---
      // /ar-in-education had 8 clicks / 938 impressions. AR-for-education is spun
      // out to WonderlyAR and MUST NOT surface on the Thridify site. WonderlyAR is
      // now LIVE at wonderlyar.com (verified 200, 2026-08-03), so this 301s OFF-SITE
      // to the real education brand — the education SEO equity flows to WonderlyAR
      // instead of the interim holding redirect to the Thridify home. External
      // absolute destination requires basePath:false.
      {
        source: "/ar-in-education",
        destination: "https://wonderlyar.com",
        basePath: false,
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
