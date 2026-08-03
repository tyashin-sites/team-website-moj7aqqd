import type { Metadata } from 'next';
import { bodyFont, headingFont, monoFont } from '@/lib/fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileCtaBar } from '@/components/MobileCtaBar';
import { EntitySchema } from '@/components/SiteSchema';
import './globals.css';

// Absolute base for OG/Twitter URLs. While previewed on workers.dev this
// must point at the preview host so OG images actually resolve; on the
// Phase 7 cutover set SITE_URL=https://thridify.com (or www per the
// canonical-host decision) in the deploy environment.
const SITE_URL =
  process.env.SITE_URL ?? 'https://site-thridify.snowy-cherry-cd2c.workers.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Thridify — Reimagine how the world experiences your products',
    template: '%s | Thridify',
  },
  description:
    'Thridify is a no-code 3D and Augmented Reality commerce platform that helps e-commerce brands boost conversions, reduce returns, and cut photography costs.',
  keywords: ['3D commerce', 'AR commerce', 'product configurator', '3D viewer', 'augmented reality e-commerce', 'Thridify', 'Aapastech'],
  openGraph: {
    title: 'Thridify — 3D & AR Commerce Platform',
    description: 'No-code 3D and AR product experiences that boost e-commerce conversions.',
    type: 'website',
    siteName: 'Thridify',
    // Brand-colored generated static (scripts/generate-og.mjs) — real
    // product-render OG images are tracked in docs/ASSET-DEBT.md.
    images: ['/og/default.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/brand/logo-favicon.png',
  },
};

/**
 * Canonical brand tokens per DESIGN-SPEC §1/§2 — non-negotiable, and the
 * ONLY brand-token source this app loads.
 *
 * Why there is deliberately NO <link> to the platform's
 * website-api.tyashin.com/.../brand-kit.css here:
 *  1. It was render-blocking and cost 3.0–3.5s TTFB on a cold platform edge
 *     (Atlas cold-connect) — it single-handedly pushed FCP/LCP past 5s and
 *     Lighthouse-mobile perf to ~64 on every page.
 *  2. This inline block re-declares every --brand-* variable the app uses,
 *     so the external sheet contributed nothing (it currently serves a STALE
 *     pre-canonical palette anyway — ASSET-DEBT #13).
 *  3. Loading it async instead would flip the cascade order (appended last →
 *     stale values would beat these canonical ones). Not worth the hazard.
 * On custom domains (Phase 7) the platform edge can inject brand-kit.css
 * itself; once the kit is PATCHed to these exact values the two sources
 * agree by construction.
 */
const CANONICAL_BRAND_CSS = `
:root {
  --brand-primary: #007050;
  --brand-primary-deep: #004D37;
  --brand-primary-contrast: #FFFFFF;
  --brand-accent: #FEBFCC;
  --brand-ink: #021F17;
  --brand-bg: #FFFFFF;
  --brand-surface: #F0F5FA;
  --brand-text: #021F17;
  --brand-text-muted: #5B7A6E;
  --brand-muted-dark: #A3BFB5;
  --brand-primary-soft: #6FCFAB;
  --brand-border: rgba(2, 31, 23, 0.08);
  --brand-radius-sm: 0.5rem;
  --brand-radius-md: 0.75rem;
  --brand-radius-lg: 1rem;
  --brand-radius-full: 999px;
  --brand-heading-font: var(--font-heading), 'Space Grotesk', sans-serif;
  --brand-body-font: var(--font-body), 'Inter', sans-serif;
  --brand-mono-font: var(--font-mono), 'IBM Plex Mono', monospace;
}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable}`}>
      <head>
        {/* Canonical palette — single token source (see CANONICAL_BRAND_CSS note). */}
        <style dangerouslySetInnerHTML={{ __html: CANONICAL_BRAND_CSS }} />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        {/* Skip-to-content link (WCAG 2.4.1) — visually hidden until focused,
            then a visible pink-ringed pill at the top-left. */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {/* Sitewide entity graph: Organization + SoftwareApplication on every
            page (per-page Service/FAQ/Breadcrumb blocks live in their pages). */}
        <EntitySchema />
        {/* ─────────────────────────────────────────────────────────────
            COOKIE / CONSENT INTEGRATION POINT (Phase 4, CHUNK 3).
            This site is consent-READY but deliberately ships NO bespoke
            cookie banner. Rationale:
              1. Today the site sets only strictly-necessary cookies
                 (Cloudflare security) and wires NO analytics/ad trackers, so
                 nothing non-essential runs pre-consent — nothing to gate yet.
              2. The consent banner + non-essential-cookie gating is owned by
                 the platform **consent-manager PLUGIN** (not yet installed;
                 needs a JWT, orchestrator-tracked — see docs/ASSET-DEBT.md
                 #23). A hand-rolled banner here would COLLIDE with the plugin
                 at install. When analytics is enabled it must be mounted
                 THROUGH the plugin's consent gate, not directly.
            Mount the plugin's consent script here at install time; do not add
            a custom banner. ───────────────────────────────────────────── */}
        <Header />
        <main id="main-content" tabIndex={-1} className="min-h-screen">
          {children}
        </main>
        <Footer />
        {/* §9 law: sticky mobile Book-a-Demo bar after 50% scroll. */}
        <MobileCtaBar />
      </body>
    </html>
  );
}
