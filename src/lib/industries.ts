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
  icon: 'sofa' | 'kitchen' | 'door' | 'prefab' | 'machinery' | 'laminate' | 'bath' | 'speaker' | 'luggage';
  /** The CapabilityDemo mode featured in the hero. */
  heroDemo: DemoMode;
  /** Per-industry CC0 placeholder model + its seamless poster (DESIGN-SPEC
      §6/§6a). Distinct, industry-relevant asset instead of the generic hero
      chair. When absent, CapabilityDemo falls back to the chair (logged in
      docs/ASSET-DEBT.md). Real client models replace these later (#16). */
  demoModel?: string;
  demoPoster?: string;
  /** Hub-card + OG artwork: a transparent render of a REAL Thridify product
      chosen per industry (admin preview ids in the comments below), rendered
      from the product's own GLB with <model-viewer> — `still` is one frame,
      `turn` a slow animated WebP: a turntable, a limited sway, or a
      variant / finish switch cross-fading through the product's real
      options. Served with a reduced-motion <picture> fallback to the still.
      Pipeline + product list: docs/ASSET-DEBT.md #19. */
  hubArt?: { still: string; turn: string; alt: string };
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
    demoModel: '/models/furniture-vase.glb',
    demoPoster: '/models/furniture-vase-poster.webp',
    // admin.thridify.com/p/1fxaka — Store Living Room Sofa: slow pan cycling its velvet finishes
    hubArt: {
      still: '/models/hub-furniture-still.webp',
      turn: '/models/hub-furniture-turn.webp',
      alt: 'Store Living Room Sofa — a Thridify 3D product panning slowly while its velvet finish changes',
    },
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
    demoModel: '/models/kitchen-teacup.glb',
    demoPoster: '/models/kitchen-teacup-poster.webp',
    // admin.thridify.com/p/dcnt2x — Modern Wardrobe: slow pan cycling its laminate finishes
    hubArt: {
      still: '/models/hub-wardrobe-still.webp',
      turn: '/models/hub-wardrobe-turn.webp',
      alt: 'Modern Wardrobe — a Thridify 3D product panning slowly while its laminate finish changes',
    },
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
    demoModel: '/models/doors-lantern.glb',
    demoPoster: '/models/doors-lantern-poster.webp',
    // admin.thridify.com/p/gmqb_q — Door, cycling its eight real variants
    hubArt: {
      still: '/models/hub-door-still.webp',
      turn: '/models/hub-door-turn.webp',
      alt: 'A Thridify 3D door product switching between its eight variants',
    },
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
    // admin.thridify.com/p/cmbneh — Studio Apartment, roofless dollhouse view (slow pan)
    hubArt: {
      still: '/models/hub-studio-still.webp',
      turn: '/models/hub-studio-turn.webp',
      alt: 'Studio apartment — a Thridify 3D space seen from above, panning slowly',
    },
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
    demoModel: '/models/machinery-camera.glb',
    demoPoster: '/models/machinery-camera-poster.webp',
    // admin.thridify.com/p/34zvplz0gw8 — industrial water cooler: slow pan cycling its colour variants
    hubArt: {
      still: '/models/hub-cooler-still.webp',
      turn: '/models/hub-cooler-turn.webp',
      alt: 'Industrial water cooler — a Thridify 3D product panning slowly while its colour changes',
    },
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
    demoModel: '/models/surfaces-material.glb',
    demoPoster: '/models/surfaces-material-poster.webp',
    // admin.thridify.com/p/zmg1cx — single-wall kitchen cycling Woodlark veneers
    hubArt: {
      still: '/models/hub-veneer-still.webp',
      turn: '/models/hub-veneer-turn.webp',
      alt: 'A Thridify 3D kitchen switching between Woodlark veneer finishes',
    },
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

  {
    slug: 'sanitaryware',
    name: 'Luxury Sanitaryware & Bath',
    gridName: 'Sanitaryware & Bath',
    icon: 'bath',
    heroDemo: 'configurator',
    // No sanitaryware experience is published in the hello@ account yet —
    // the hero uses the shared placeholder until one lands (ASSET-DEBT #31).
    primaryKeyword: 'sanitaryware 3D configurator',
    keywords: [
      'sanitaryware 3D configurator',
      'bathroom fittings AR viewer',
      'faucet finish configurator',
      'view sanitaryware in your bathroom',
    ],
    seoTitle: 'Sanitaryware 3D Configurator & Bathroom AR Viewer',
    seoDescription:
      'A sanitaryware 3D configurator and app-free AR viewer: buyers switch faucet and fitting finishes in real time and place basins, WCs and taps in their own bathroom before ordering.',
    hero: {
      eyebrow: 'Luxury Sanitaryware & Bath',
      h1: 'A sanitaryware configurator that shows every finish in the buyer’s bathroom.',
      subtitle:
        'Buyers switch chrome, brushed and matte finishes on the real fitting in 3D, then place it in their bathroom with app-free AR — before the plumber is booked.',
    },
    pain: 'Finish and proportion are judged from a catalogue swatch — until the fitting arrives and looks wrong.',
    helpsIntro:
      'Bath fittings are chosen on finish, form and fit. Thridify lets buyers see the exact finish on the exact product, at true scale, in the room it is going into.',
    helps: [
      {
        capability: 'configurator',
        heading: 'Switch finishes on the real fitting',
        body: 'Chrome, brushed nickel, matte black, brass — buyers swap finishes on the actual faucet or accessory in real time and see the price update.',
      },
      {
        capability: 'viewer',
        heading: 'Inspect form, edge and sheen',
        body: 'Drag-to-spin and zoom show the profile, spout reach and surface sheen from every angle — the detail a flat photo flattens.',
      },
      {
        capability: 'ar',
        heading: 'Place it in the bathroom',
        body: 'App-free AR sets a basin, WC or shower fitting at true scale against the buyer’s own wall and vanity, so proportion is confirmed before ordering.',
      },
    ],
    outcomes: [
      { metric: 'returns', context: 'Seeing the true finish and scale in the room cuts “not what I expected” returns on heavy, costly-to-ship fittings.' },
      { metric: 'photography', context: 'One 3D fitting renders every finish and angle — no reshoot per finish variant.' },
      { metric: 'conversion', context: 'Buyers who configure and place a fitting commit with confidence instead of ordering samples.' },
    ],
    showGuntierQuote: false,
    faqs: [
      {
        q: 'Can buyers see a faucet or basin in their own bathroom before ordering?',
        a: 'Yes. Thridify’s AR viewer runs in the browser on any modern smartphone — no app. Buyers place the fitting at true scale against their own wall, vanity or floor from the product page.',
      },
      {
        q: 'Can shoppers switch sanitaryware finishes online?',
        a: 'Yes. The 3D configurator applies chrome, brushed, matte, brass and other finishes to the actual product in real time, with live pricing for each option.',
      },
      {
        q: 'Do I need a 3D model for every finish?',
        a: 'No. One model carries every finish as a swappable material, so you publish one product and sell every variant from it.',
      },
      {
        q: 'Does this work with my existing catalogue site?',
        a: 'Yes. Thridify installs as a plugin on Shopify, WooCommerce, WordPress and the other supported platforms, or as a lightweight embed on any custom site — no re-platforming.',
      },
    ],
    related: ['laminates-surfaces', 'modular-kitchens', 'doors-and-windows'],
  },
  {
    slug: 'electronics-audio',
    name: 'Electronics & Audio',
    gridName: 'Electronics & Audio',
    icon: 'speaker',
    heroDemo: 'viewer',
    // No audio/electronics experience is published in the hello@ account yet
    // — the hero uses the shared placeholder until one lands (ASSET-DEBT #31).
    primaryKeyword: '3D product viewer for electronics',
    keywords: [
      '3D product viewer for electronics',
      'AR speaker viewer',
      'view speakers in your room',
      'electronics product configurator',
    ],
    seoTitle: '3D Product Viewer & AR for Electronics and Audio',
    seoDescription:
      'A 3D product viewer, colourway configurator and app-free AR for electronics and audio brands: buyers inspect every port and finish, then place speakers and screens at true scale in their room.',
    hero: {
      eyebrow: 'Electronics & Audio',
      h1: 'A 3D product viewer that lets buyers inspect every port and finish.',
      subtitle:
        'Shoppers spin the product, read the back panel, switch colourways and set a speaker or screen at true scale on their own shelf — all from the product page.',
    },
    pain: 'Spec sheets and studio photos hide the details buyers actually check — ports, controls, size on the shelf.',
    helpsIntro:
      'Electronics are bought on detail and fit: the ports on the back, the grille texture, whether it clears the shelf. Thridify puts all of that in the buyer’s hands before checkout.',
    helps: [
      {
        capability: 'viewer',
        heading: 'Inspect ports, controls and grille',
        body: 'Drag-to-spin and zoom show the back panel, dials and material texture in photoreal 3D, with hotspots that explain each connection.',
      },
      {
        capability: 'configurator',
        heading: 'Switch colourways and accessories',
        body: 'Buyers change finishes, grille colours and bundled accessories in real time, with the price updating as they configure.',
      },
      {
        capability: 'ar',
        heading: 'Check size on the shelf or wall',
        body: 'App-free AR places a speaker, soundbar or screen at true scale in the buyer’s room, so “will it fit?” is answered before the order.',
      },
    ],
    outcomes: [
      { metric: 'engagement', context: 'Spinning, zooming and configuring keeps shoppers on the page far longer than a gallery.' },
      { metric: 'ctr', context: 'Interactive listings pull more clicks than flat product photos.' },
      { metric: 'returns', context: 'Seeing ports, size and finish accurately cuts returns from mismatched expectations.' },
    ],
    showGuntierQuote: false,
    faqs: [
      {
        q: 'Can shoppers see the back panel and ports in 3D?',
        a: 'Yes. The 3D viewer lets buyers spin the product and zoom into ports, controls and textures, with hotspots and annotations that explain each connection.',
      },
      {
        q: 'Can buyers preview a speaker or TV in their room?',
        a: 'Yes. App-free AR places the product at true scale on the buyer’s shelf, desk or wall from any modern smartphone — no app to install.',
      },
      {
        q: 'Can I offer colourways and bundles as a configurator?',
        a: 'Yes. One 3D model carries every finish and accessory option as swappable parts, mapped to your store’s variants by ID, with live pricing.',
      },
      {
        q: 'Which platforms does this run on?',
        a: 'Shopify, WooCommerce, WordPress, Wix, BigCommerce, Adobe Commerce, commercetools and custom storefronts via the JS SDK — as a plugin or lightweight embed.',
      },
    ],
    related: ['furniture', 'luggage', 'industrial-machinery'],
  },
  {
    slug: 'luggage',
    name: 'Luggage & Bags',
    gridName: 'Luggage & Bags',
    icon: 'luggage',
    heroDemo: 'configurator',
    // Hero: the Nasher Miles “Alexandria” experience (54 colourways) — real
    // client work, embedded via INDUSTRY_EXPERIENCE in src/lib/thridify.ts.
    primaryKeyword: 'luggage 3D configurator',
    keywords: [
      'luggage 3D configurator',
      'suitcase colour configurator',
      'AR luggage viewer',
      '3D bags product viewer',
    ],
    seoTitle: 'Luggage 3D Configurator & AR Viewer for Bags',
    seoDescription:
      'A luggage 3D configurator and app-free AR viewer: sell every colourway, trim and size from one 3D model, and let buyers check a suitcase at true scale before they order.',
    hero: {
      eyebrow: 'Luggage & Bags',
      h1: 'A luggage configurator that sells every colourway from one 3D model.',
      subtitle:
        'Buyers spin the case, switch colours and trims, and place a cabin or check-in size at true scale in their hallway — no photoshoot per colour, no app.',
    },
    pain: 'Dozens of colourways and sizes mean endless photoshoots — and buyers still can’t judge true size.',
    helpsIntro:
      'Luggage sells on colour, hardware and size. Thridify turns one 3D case into every colourway and size the range offers, at true scale, on the product page.',
    helps: [
      {
        capability: 'configurator',
        heading: 'Every colourway from one model',
        body: 'Buyers switch shell colours, trims and hardware in real time and see the price update — one configurable model replaces a photoshoot per variant.',
      },
      {
        capability: 'viewer',
        heading: 'Inspect wheels, handles and hardware',
        body: 'Drag-to-spin and zoom show wheel housings, telescopic handles, zips and locks in photoreal 3D — the details that decide a purchase.',
      },
      {
        capability: 'ar',
        heading: 'Check cabin vs check-in size at home',
        body: 'App-free AR places the case at true scale in the buyer’s hallway or next to an existing bag, so the size question is settled before checkout.',
      },
    ],
    outcomes: [
      { metric: 'photography', context: 'One 3D case renders every colourway and angle — no reshoot for each new shade.' },
      { metric: 'conversion', context: 'Configuring a colour and seeing the true size turns browsers into confident buyers.' },
      { metric: 'inventory', context: 'Sell colourways from the model before committing stock to every shade.' },
    ],
    showGuntierQuote: false,
    faqs: [
      {
        q: 'Can I sell many luggage colourways without photographing each one?',
        a: 'Yes. One configurable 3D model carries every shell colour, trim and hardware option as swappable materials, so you add a colourway without a new photoshoot.',
      },
      {
        q: 'Can buyers check a suitcase’s real size at home?',
        a: 'Yes. App-free AR places the cabin or check-in case at true scale in the buyer’s space from any modern smartphone, straight from the product page.',
      },
      {
        q: 'Does the configurator map to my store’s variants?',
        a: 'Yes. Each colour and size option maps to your store’s variants by ID, so the cart receives exactly what the buyer configured.',
      },
      {
        q: 'Does Thridify work for bags and backpacks too?',
        a: 'Yes. The same viewer, configurator and AR apply to backpacks, totes, briefcases and travel accessories — any product sold on colour, finish and size.',
      },
    ],
    related: ['electronics-audio', 'furniture', 'laminates-surfaces'],
  },
];

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug);

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export function usesGuntierQuote(slug: string): boolean {
  return GUNTIER_INDUSTRIES.has(slug);
}
