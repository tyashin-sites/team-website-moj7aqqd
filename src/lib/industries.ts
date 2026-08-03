/**
 * Per-industry content — the single source for the 6 canonical Thridify
 * verticals (DESIGN-SPEC §8). Each entry drives:
 *   - the home Verticals grid card (name + pain + link)
 *   - the /industries index card
 *   - a statically-generated /industries/<slug> page with UNIQUE, SEO-rich
 *     content (title/description/canonical/OG, keyword H1+H2s, FAQ + Service
 *     + Breadcrumb JSON-LD).
 *
 * RULES baked in here:
 *   - Canonical metric set ONLY (DESIGN-SPEC §7.2) — no invented per-industry
 *     numbers. `outcomes` reference the six permitted stats verbatim.
 *   - No-Faking: the ONLY real client quote used is Guntier's (verbatim from
 *     production thridify.com), shown where it honestly maps (modular
 *     kitchens, doors & windows). Every other page is metric-only proof.
 *   - Education / pre-schools / publishing are NOT verticals (spun out to
 *     WonderlyAR, §6).
 *   - Text budgets (§3): H1 ≤12 words, subtitle ≤24, card/answer bodies short.
 */

import type { DemoMode } from '@/components/signature/CapabilityDemo';

export type IndustryMetricKey =
  | 'returns'
  | 'conversion'
  | 'engagement'
  | 'photography'
  | 'ctr'
  | 'inventory';

/** Canonical impact metrics (DESIGN-SPEC §7.2) — the ONLY permitted stats. */
export const CANONICAL_METRICS: Record<IndustryMetricKey, { value: string; label: string }> = {
  returns: { value: '75%', label: 'lower product returns' },
  conversion: { value: '3×', label: 'higher conversion rates' },
  engagement: { value: '100%', label: 'more engagement' },
  photography: { value: '70%', label: 'lower photography cost' },
  ctr: { value: '100%', label: 'higher click-through rate' },
  inventory: { value: '40%', label: 'lower inventory cost' },
};

export type CapabilityMap = {
  /** 'configurator' | 'ar' | 'viewer' — maps to a real product capability. */
  capability: DemoMode;
  heading: string;
  body: string;
};

export type IndustryOutcome = {
  metric: IndustryMetricKey;
  /** Industry context — adds NO new number (No-Faking / canonical-only). */
  context: string;
};

export type Faq = { q: string; a: string };

export type Industry = {
  slug: string;
  /** Full vertical name (grid, nav, breadcrumb). */
  name: string;
  /** Short label for the home grid card. */
  gridName: string;
  /** lucide icon key resolved in the page (keeps this module server-safe). */
  icon: 'sofa' | 'kitchen' | 'door' | 'prefab' | 'machinery' | 'laminate';
  /** The CapabilityDemo mode featured in the hero. */
  heroDemo: DemoMode;
  primaryKeyword: string;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; h1: string; subtitle: string };
  /** 1-line pain in the vertical's vocabulary (home + index card). */
  pain: string;
  helpsIntro: string;
  helps: CapabilityMap[];
  outcomes: IndustryOutcome[];
  /** Show the real Guntier proof quote on this page? (honest mapping only) */
  showGuntierQuote: boolean;
  faqs: Faq[];
  /** 2–3 related industry slugs for internal linking. */
  related: string[];
};

const GUNTIER_INDUSTRIES = new Set(['modular-kitchens', 'doors-and-windows']);

export const INDUSTRIES: Industry[] = [
  {
    slug: 'furniture',
    name: 'Furniture & Home Decor',
    gridName: 'Furniture & Home Decor',
    icon: 'sofa',
    heroDemo: 'ar',
    primaryKeyword: '3D furniture configurator',
    keywords: [
      '3D furniture configurator',
      'AR furniture viewer',
      'view furniture in your room',
      'reduce furniture returns',
    ],
    seoTitle: '3D Furniture Configurator & AR Viewer',
    seoDescription:
      'Let shoppers configure fabrics and finishes and view furniture in their room with app-free AR. A 3D furniture configurator that cuts returns and lifts conversion.',
    hero: {
      eyebrow: 'Furniture & Home Decor',
      h1: 'A 3D furniture configurator that ends returns from guesswork.',
      subtitle:
        'Buyers judge scale, fabric and finish in interactive 3D, then place the piece in their room with app-free AR — before they order.',
    },
    pain: "Shoppers can't judge scale, fabric or finish from photos — so they hesitate, or return.",
    helpsIntro:
      'Furniture is bought on feel — scale, fabric, finish. Thridify replaces flat photos with an experience buyers can turn, configure and stand in their own room.',
    helps: [
      {
        capability: 'configurator',
        heading: 'Configure fabric & finish live',
        body: 'Shoppers swap upholstery, wood and legs in real time and watch the price update — no back-and-forth with your sales team.',
      },
      {
        capability: 'ar',
        heading: 'View it in the room, app-free',
        body: 'One tap places the sofa or table at true scale in the buyer’s space, so "will it fit?" is answered before checkout.',
      },
      {
        capability: 'viewer',
        heading: 'Inspect every angle in 3D',
        body: 'Drag-to-spin, zoom to the stitching, read the grain — the confidence a showroom gives, on your product page.',
      },
    ],
    outcomes: [
      { metric: 'returns', context: 'Buyers who see true fabric and scale stop sending back "not as pictured".' },
      { metric: 'conversion', context: 'Configure-and-place experiences turn browsers into confident buyers.' },
      { metric: 'photography', context: 'One 3D asset renders every fabric and angle — no reshoot per variant.' },
    ],
    showGuntierQuote: false,
    faqs: [
      {
        q: 'Can shoppers see furniture in their room without an app?',
        a: 'Yes. Thridify’s AR viewer runs in the browser on any modern smartphone — no app download. Buyers place the piece at true scale from your product page in one tap.',
      },
      {
        q: 'Will a 3D furniture configurator reduce returns?',
        a: 'It targets the biggest cause of furniture returns: buyers guessing at scale, fabric and finish. Seeing the real thing in 3D and AR sets accurate expectations before purchase.',
      },
      {
        q: 'Do I need 3D models for every fabric and finish?',
        a: 'No. One configurable 3D model carries every fabric, wood and leg option as swappable materials, so you build the model once and sell every variant from it.',
      },
      {
        q: 'Does it work on Shopify and WooCommerce?',
        a: 'Yes. Thridify embeds on Shopify, WooCommerce, WordPress and custom storefronts with a lightweight snippet — no re-platforming.',
      },
    ],
    related: ['modular-kitchens', 'doors-and-windows', 'laminates-surfaces'],
  },
  {
    slug: 'modular-kitchens',
    name: 'Modular Kitchens & Wardrobes',
    gridName: 'Modular Kitchens & Wardrobes',
    icon: 'kitchen',
    heroDemo: 'configurator',
    primaryKeyword: 'modular kitchen 3D design tool',
    keywords: [
      'modular kitchen 3D design tool',
      'kitchen configurator online',
      '3D kitchen visualizer',
      'wardrobe design configurator',
    ],
    seoTitle: 'Modular Kitchen 3D Design Tool & Configurator',
    seoDescription:
      'A modular kitchen 3D design tool that lets buyers configure layouts, finishes and hardware online and get an instant quote. 3D kitchen visualizer that shortens the sales cycle.',
    hero: {
      eyebrow: 'Modular Kitchens & Wardrobes',
      h1: 'A modular kitchen 3D design tool that quotes instantly.',
      subtitle:
        'Buyers configure layout, finishes and hardware in 3D and get a live price and BOM — instead of waiting days for a hand-built quote.',
    },
    pain: 'Hand-built quotes for layouts, finishes and hardware keep serious buyers waiting for days.',
    helpsIntro:
      'Kitchens and wardrobes sell on configuration and price. Thridify turns the quote itself into the experience — buyers build it, see it, and get a number in real time.',
    helps: [
      {
        capability: 'configurator',
        heading: 'Configure layout, finish & hardware',
        body: 'Buyers assemble modules, swap finishes and pick hardware in 3D; every change reprices live and exports a production-ready BOM.',
      },
      {
        capability: 'viewer',
        heading: 'Walk the design in 3D',
        body: 'Spin the whole run, open a cabinet, check the counter — buyers understand the design without a showroom visit.',
      },
      {
        capability: 'ar',
        heading: 'Place it in the real kitchen',
        body: 'App-free AR drops the configured layout into the buyer’s own space at true scale to confirm fit before they commit.',
      },
    ],
    outcomes: [
      { metric: 'conversion', context: 'Instant, configurable quotes convert serious buyers before they shop elsewhere.' },
      { metric: 'engagement', context: 'Building their own kitchen keeps buyers on the page far longer.' },
      { metric: 'inventory', context: 'Selling from one configurable 3D model reduces showroom and sample overhead.' },
    ],
    showGuntierQuote: true,
    faqs: [
      {
        q: 'Can buyers design a modular kitchen online in 3D?',
        a: 'Yes. Thridify’s configurator lets buyers assemble modules, choose finishes and hardware in real-time 3D, then receive an instant price and BOM from the same tool.',
      },
      {
        q: 'Does the kitchen configurator generate a quote and BOM?',
        a: 'Every configuration reprices live and exports a production-ready bill of materials straight to manufacturing, so quoting is instant instead of taking days.',
      },
      {
        q: 'Can I use the same tool for wardrobes and storage?',
        a: 'Yes. The same modular configurator handles wardrobes, storage and other made-to-configure joinery — anywhere buyers pick layout, finish and hardware.',
      },
      {
        q: 'Do buyers need special software or an app?',
        a: 'No. The 3D kitchen visualizer and AR run in the browser on desktop and mobile — no downloads for you or your customers.',
      },
    ],
    related: ['furniture', 'doors-and-windows', 'laminates-surfaces'],
  },
  {
    slug: 'doors-and-windows',
    name: 'Doors & Windows',
    gridName: 'Doors & Windows',
    icon: 'door',
    heroDemo: 'configurator',
    primaryKeyword: 'door & window configurator',
    keywords: [
      'door & window configurator',
      'custom door 3D visualizer',
      'window design tool 3D',
      'visualize doors on facade AR',
    ],
    seoTitle: 'Door & Window Configurator | Custom 3D Visualizer',
    seoDescription:
      'A door and window configurator that lets buyers customise profiles, finishes and glazing in 3D and picture them on a real facade with AR. Custom door 3D visualizer that reduces site visits.',
    hero: {
      eyebrow: 'Doors & Windows',
      h1: 'A door and window configurator buyers picture on their facade.',
      subtitle:
        'Customise profile, finish and glazing in 3D, then place it against a real facade with app-free AR — no site visit to imagine it.',
    },
    pain: 'Bespoke profiles and finishes are hard to picture against a real facade.',
    helpsIntro:
      'Doors and windows are bespoke and high-consideration. Thridify lets buyers configure the exact profile and finish and see it in place before anyone visits.',
    helps: [
      {
        capability: 'configurator',
        heading: 'Configure profile, finish & glazing',
        body: 'Buyers pick profile, colour, hardware and glazing in 3D with live pricing — every bespoke combination, no sample catalogue.',
      },
      {
        capability: 'ar',
        heading: 'See it on the real facade',
        body: 'App-free AR places the configured door or window against the buyer’s own wall at true scale to confirm proportion and colour.',
      },
      {
        capability: 'viewer',
        heading: 'Inspect the build in 3D',
        body: 'Spin the frame, check the hinge and section detail — buyers grasp construction quality without a showroom trip.',
      },
    ],
    outcomes: [
      { metric: 'conversion', context: 'Buyers who can picture the exact profile in place commit sooner.' },
      { metric: 'returns', context: 'Seeing finish and proportion up front prevents costly wrong-spec orders.' },
      { metric: 'ctr', context: 'Interactive listings pull more clicks than flat profile catalogues.' },
    ],
    showGuntierQuote: true,
    faqs: [
      {
        q: 'Can customers configure custom doors and windows online?',
        a: 'Yes. Thridify’s configurator lets buyers set profile, finish, hardware and glazing in real-time 3D with live pricing — covering bespoke combinations a flat catalogue can’t.',
      },
      {
        q: 'Can buyers see a door on their own facade before ordering?',
        a: 'App-free AR places the configured door or window against the buyer’s real wall at true scale, so proportion and colour are confirmed before a site visit.',
      },
      {
        q: 'Does this reduce dependency on site visits?',
        a: 'It front-loads the visualisation buyers usually need a visit for, qualifying orders earlier and cutting wasted trips for both sides.',
      },
      {
        q: 'Which storefronts does the configurator support?',
        a: 'Thridify embeds on Shopify, WooCommerce, WordPress and custom sites with a lightweight snippet, so it fits your existing catalogue.',
      },
    ],
    related: ['modular-kitchens', 'furniture', 'prefab-structures'],
  },
  {
    slug: 'prefab-structures',
    name: 'Prefab & Modular Structures',
    gridName: 'Prefab & Modular Structures',
    icon: 'prefab',
    heroDemo: 'viewer',
    primaryKeyword: 'prefab 3D configurator',
    keywords: [
      'prefab 3D configurator',
      'modular building visualizer',
      '3D configurator for prefab homes',
      'sell prefab buildings online 3D',
    ],
    seoTitle: 'Prefab 3D Configurator & Modular Building Visualizer',
    seoDescription:
      'A prefab 3D configurator and modular building visualizer that lets buyers explore layouts, cladding and space in interactive 3D — selling high-ticket structures before they are built.',
    hero: {
      eyebrow: 'Prefab & Modular Structures',
      h1: 'A prefab 3D configurator that sells before you build.',
      subtitle:
        'Buyers explore layout, cladding and true interior space in interactive 3D and AR — instead of guessing from a brochure render.',
    },
    pain: 'High-ticket builds sold from brochures leave buyers guessing at space and specification.',
    helpsIntro:
      'Prefab and modular structures are high-ticket and hard to imagine flat. Thridify lets buyers walk the space and configure the build long before ground breaks.',
    helps: [
      {
        capability: 'viewer',
        heading: 'Walk the structure in 3D',
        body: 'Buyers explore layout, ceiling height and interior space by dragging and zooming — the scale a brochure can never convey.',
      },
      {
        capability: 'configurator',
        heading: 'Configure layout & cladding',
        body: 'Swap modules, cladding and finishes in real time with live pricing, so buyers spec the exact build they want.',
      },
      {
        capability: 'ar',
        heading: 'Place it on the plot',
        body: 'App-free AR sets the structure on the buyer’s own land at true scale to confirm footprint and orientation.',
      },
    ],
    outcomes: [
      { metric: 'conversion', context: 'Buyers who can walk the space commit to high-ticket builds with confidence.' },
      { metric: 'engagement', context: 'Exploring layouts in 3D holds attention on a considered purchase.' },
      { metric: 'photography', context: 'One 3D build renders every configuration — no render commission per variant.' },
    ],
    showGuntierQuote: false,
    faqs: [
      {
        q: 'Can I sell prefab homes and modular buildings online in 3D?',
        a: 'Yes. A prefab 3D configurator lets buyers explore and configure the structure interactively, so you can sell and qualify high-ticket builds before construction.',
      },
      {
        q: 'Can buyers understand real interior space from the model?',
        a: 'Interactive 3D lets buyers walk through layout, ceiling height and room scale, and AR places the footprint on their own plot at true scale.',
      },
      {
        q: 'Can buyers configure layouts and cladding themselves?',
        a: 'Yes. The configurator lets buyers swap modules, cladding and finishes in real time with live pricing to spec the exact build.',
      },
      {
        q: 'Do buyers need any software to view it?',
        a: 'No. The modular building visualizer and AR run in any modern browser on desktop or phone — no installs.',
      },
    ],
    related: ['industrial-machinery', 'doors-and-windows', 'furniture'],
  },
  {
    slug: 'industrial-machinery',
    name: 'Industrial Machinery',
    gridName: 'Industrial Machinery',
    icon: 'machinery',
    heroDemo: 'viewer',
    primaryKeyword: '3D product viewer for machinery',
    keywords: [
      '3D product viewer for machinery',
      'interactive equipment models',
      '3D machinery visualization',
      'B2B 3D product configurator',
    ],
    seoTitle: '3D Product Viewer for Machinery & Equipment',
    seoDescription:
      'A 3D product viewer for machinery that shows motion, internals and true scale with interactive equipment models — built for B2B sales enablement and product portals.',
    hero: {
      eyebrow: 'Industrial Machinery',
      h1: 'A 3D product viewer for machinery — motion, internals, true scale.',
      subtitle:
        'Turn static spec PDFs into interactive equipment models buyers can spin, open and scale on their own floor — for B2B sales and portals.',
    },
    pain: "Static PDFs can't show internals, motion or true scale on a buyer's floor.",
    helpsIntro:
      'Machinery sells on specification and scale that PDFs flatten. Thridify turns equipment into interactive models that show what a datasheet cannot.',
    helps: [
      {
        capability: 'viewer',
        heading: 'Show internals, motion & scale',
        body: 'Buyers spin the machine, expose internal assemblies and read true dimensions — the understanding a spec sheet can’t deliver.',
      },
      {
        capability: 'ar',
        heading: 'Place it on the buyer’s floor',
        body: 'App-free AR sets the equipment at true scale in the buyer’s facility to confirm footprint and clearance before purchase.',
      },
      {
        capability: 'configurator',
        heading: 'Configure options & variants',
        body: 'Buyers select trims, attachments and configurations in 3D, so B2B portals present the exact build being quoted.',
      },
    ],
    outcomes: [
      { metric: 'engagement', context: 'Interactive equipment models hold technical buyers far longer than a PDF.' },
      { metric: 'ctr', context: 'Interactive listings earn more clicks across B2B portals and catalogues.' },
      { metric: 'conversion', context: 'Buyers who grasp scale and internals move through the sales cycle faster.' },
    ],
    showGuntierQuote: false,
    faqs: [
      {
        q: 'Can I show machinery internals and motion in 3D?',
        a: 'Yes. A 3D product viewer lets buyers spin equipment, expose internal assemblies and see motion — detail a static datasheet or PDF can’t convey.',
      },
      {
        q: 'Can buyers check machine footprint on their own floor?',
        a: 'App-free AR places the equipment at true scale in the buyer’s facility, so footprint and clearance are confirmed before they buy.',
      },
      {
        q: 'Does this work for B2B sales enablement and portals?',
        a: 'Yes. Interactive equipment models embed in B2B product portals and sales collateral, giving reps and buyers a shared, accurate view of every configuration.',
      },
      {
        q: 'Can each machine variant be configured?',
        a: 'The configurator lets buyers select trims, attachments and options in 3D so the portal presents exactly the build being quoted.',
      },
    ],
    related: ['prefab-structures', 'furniture', 'modular-kitchens'],
  },
  {
    slug: 'laminates-surfaces',
    name: 'Laminates & Surfaces',
    gridName: 'Laminates & Surfaces',
    icon: 'laminate',
    heroDemo: 'configurator',
    primaryKeyword: 'laminate visualizer',
    keywords: [
      'laminate visualizer',
      'surface finish configurator',
      '3D laminate catalogue',
      'visualize laminate finishes online',
    ],
    seoTitle: 'Laminate Visualizer & Surface Finish Configurator',
    seoDescription:
      'A laminate visualizer and surface finish configurator that lets buyers apply finishes to real products in 3D — replacing sample books and endless reshoots.',
    hero: {
      eyebrow: 'Laminates & Surfaces',
      h1: 'A laminate visualizer that shows every surface finish, instantly.',
      subtitle:
        'Buyers apply laminates and surface finishes to real products in interactive 3D — no sample book, no reshoot for every decor.',
    },
    pain: 'Sample books and flat swatches can’t show a finish on the actual product.',
    helpsIntro:
      'Surfaces sell on how a finish looks applied, not as a swatch. Thridify lets buyers see every laminate on the real product in seconds.',
    helps: [
      {
        capability: 'configurator',
        heading: 'Apply any finish in real time',
        body: 'Buyers swap laminates and surface finishes on the actual product in 3D and compare decors instantly — no physical sample book.',
      },
      {
        capability: 'viewer',
        heading: 'Inspect texture & sheen in 3D',
        body: 'Zoom into grain, gloss and texture from every angle, so buyers judge a finish the way they would in hand.',
      },
      {
        capability: 'ar',
        heading: 'Preview surfaces in the space',
        body: 'App-free AR shows the finished surface at true scale in the buyer’s own room before they order.',
      },
    ],
    outcomes: [
      { metric: 'photography', context: 'One 3D product renders every decor — no photoshoot per laminate.' },
      { metric: 'inventory', context: 'A digital finish library replaces printed sample books and stocked swatches.' },
      { metric: 'engagement', context: 'Trying finishes on the real product keeps buyers exploring the range.' },
    ],
    showGuntierQuote: false,
    faqs: [
      {
        q: 'Can buyers see a laminate applied to the real product?',
        a: 'Yes. The laminate visualizer applies finishes to the actual 3D product, so buyers see each decor in context instead of on a flat swatch.',
      },
      {
        q: 'Does a surface finish configurator replace sample books?',
        a: 'It gives buyers a digital finish library they can apply and compare instantly, reducing dependence on printed sample books and stocked swatches.',
      },
      {
        q: 'How does this cut photography cost?',
        a: 'One 3D product renders every finish and angle, so you add a new decor without commissioning a fresh photoshoot for each one.',
      },
      {
        q: 'Can buyers preview finishes in their own space?',
        a: 'App-free AR shows the finished surface at true scale in the buyer’s room, all from the browser with no app.',
      },
    ],
    related: ['furniture', 'modular-kitchens', 'doors-and-windows'],
  },
];

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug);

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export function usesGuntierQuote(slug: string): boolean {
  return GUNTIER_INDUSTRIES.has(slug);
}
