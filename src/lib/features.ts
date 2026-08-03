/**
 * CANONICAL FEATURE CATALOG — the single source of truth for Thridify's real,
 * live product capabilities, organised as the FIVE PILLARS (the story spine
 * reused sitewide so copy never diverges).
 *
 * Imported by:
 *   - /features            (the comprehensive capability reference)
 *   - /platform            (curated 3–5 top benefit-features per pillar)
 *   - /integrations/shopify (the DISTRIBUTE + MEASURE Shopify capabilities)
 *
 * RULES baked in here (DESIGN-SPEC):
 *   - No-Faking: every capability below is LIVE today (user-confirmed
 *     2026-08-03). Present accurately; do NOT embellish beyond the list.
 *   - Positioning stays 3D & AR commerce + a human-delivered 3D Modelling
 *     Service. NO automated content-generation claim (§8 correction).
 *   - Canonical metric set ONLY (§7.2) — this module carries capabilities,
 *     never new quantitative claims.
 *   - Text budgets (§3): pillar taglines ≤14 words; feature lines are short,
 *     scannable and benefit-worded, NEVER a wall of prose.
 *
 * `icon` is a lucide-react export NAME (string) so this module stays
 * server-safe; each consuming page resolves it through a small local map.
 */

export type PillarId =
  "studio" | "experience" | "distribute" | "measure" | "operate";

export type Pillar = {
  id: PillarId;
  /** Short label (nav chips, breadcrumb-style refs). */
  label: string;
  /** Benefit headline — the promise of the pillar. */
  title: string;
  /** ≤14 words — what the pillar does, in one line. */
  tagline: string;
  /** lucide-react export name (resolved per page). */
  icon: "LayoutPanelTop" | "Rotate3d" | "Plug" | "BarChart3" | "ShieldCheck";
  /** The real, live capabilities under this pillar — lightly benefit-worded. */
  features: string[];
};

export const PILLARS: Pillar[] = [
  {
    id: "studio",
    label: "Studio",
    title: "Publish 3D products yourself — no 3D team, no code",
    tagline:
      "A no-code workflow to create, configure and publish 3D products at catalog scale.",
    icon: "LayoutPanelTop",
    features: [
      "No-code 3D publishing workflow, from draft to live",
      "Create, edit, update and remove 3D products anytime",
      "Preview links to review a product before you launch it",
      "Variant management for colour, finish and texture",
      "Material library — wood, leather, metal and marble",
      "Texture library with bulk operations for large catalogs",
      "Modularization for configurable furniture parts",
      "Category organization built for catalog scale",
      "Brand asset controls — logo, colours, fonts, white-label",
      "Theme customization for the shopper-facing viewer",
    ],
  },
  {
    id: "experience",
    label: "Experience",
    title: "An interactive showroom on every product page",
    tagline:
      "Shoppers spin, configure and place your furniture in their own room before buying.",
    icon: "Rotate3d",
    features: [
      "Interactive 3D viewer for furniture PDPs — sofas, tables, chairs, beds",
      "App-free AR — place furniture in the real room before buying",
      "Full-screen immersive viewer for premium storytelling",
      "Node-level configurator controls for fine-grain part customization",
      "Hotspots for guided craftsmanship, joinery and material notes",
      "Hotspot theming to match your brand",
      "Lighting presets for premium presentation and mood",
    ],
  },
  {
    id: "distribute",
    label: "Distribute",
    title: "One-click on Shopify. Embeddable everywhere else",
    tagline:
      "A no-code Shopify App Block, a lightweight embed and an API for everything else.",
    icon: "Plug",
    features: [
      "Shopify Theme App Extension with no-code App Blocks",
      "Product-page and collection-page 3D on Shopify",
      "Auto-detection of major Shopify themes, plus custom CSS selectors",
      "Collection-wide 3D badges and triggers for many products at once",
      "Embedded Shopify onboarding — sign up and link inside Shopify Admin",
      "Auto-link your Shopify shop to your Thridify account",
      "3D readiness and stats visible inside the Shopify app",
      "Embeddable widget for non-Shopify storefronts",
      "CDN-based lightweight integration for fast storefront performance",
      "Anti-CLS preloading for better Core Web Vitals",
      "API token access for custom and enterprise integrations",
      "MCP / AI tooling to manage products, variants, materials, brand and analytics via AI assistants",
    ],
  },
  {
    id: "measure",
    label: "Measure",
    title: "See which finishes shoppers love — and which drive the sale",
    tagline:
      "Interaction and variant-level analytics show what shoppers explore and what converts.",
    icon: "BarChart3",
    features: [
      "3D interaction analytics — engagement, demographics and performance signals",
      "Variant-level view analytics — which finishes and colours win attention",
      "Shopify Web Pixel bridge for 3D opens, closes and variant interactions",
    ],
  },
  {
    id: "operate",
    label: "Operate",
    title: "Built for brand teams and enterprise workflows",
    tagline:
      "Multi-user teams, secure token handling, GDPR-ready endpoints and campaign vouchers.",
    icon: "ShieldCheck",
    features: [
      "Team and account management for multi-user brand ops",
      "Secure OAuth and webhook verification with encrypted token handling",
      "GDPR-ready Shopify endpoints for customer and shop data deletion",
      "Privacy and cookie controls at brand and team level",
      "Voucher and promo support for campaign-led luxury drops",
      "API token access for enterprise workflows",
    ],
  },
];

export function getPillar(id: PillarId): Pillar {
  const p = PILLARS.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown pillar: ${id}`);
  return p;
}

/** Curated top-N benefit-features for a pillar (used on /platform so it stays
 *  scannable — the full list lives on /features). */
export function topFeatures(id: PillarId, n: number): string[] {
  return getPillar(id).features.slice(0, n);
}
