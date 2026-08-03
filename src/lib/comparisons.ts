/**
 * Honest competitor comparison content (BUILD-PLAN Phase 3 — highest-intent
 * B2B SEO: "X alternative" / "Thridify vs X").
 *
 * NO-FAKING applies to competitors too: only widely-known, verifiable
 * positioning is stated. Where a specific capability is genuinely uncertain,
 * the cell reads "Varies / contact vendor" rather than guessing. Competitor
 * strengths are conceded honestly — honesty ranks and converts. No invented
 * competitor metrics, prices or quotes.
 *
 * The consistent Thridify wedge across all pages: no-code setup + app-free
 * web AR + a done-for-you 3D Modelling Service, aimed at custom-product
 * brands (furniture, kitchens, doors) rather than pure enterprise.
 */

export type CompareRow = {
  feature: string;
  /** Short cell text. A leading "Yes" renders as an affirmative chip. */
  thridify: string;
  competitor: string;
};

export type Competitor = {
  slug: string;
  name: string;
  /** One-line neutral category description of the competitor. */
  category: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** Honest, non-adversarial intro. */
  intro: string;
  /** Real strengths, conceded plainly. */
  competitorStrengths: string;
  /** Where Thridify fits — the wedge. */
  thridifyFit: string;
  rows: CompareRow[];
  faqs: { q: string; a: string }[];
  /** Other competitor slugs to cross-link. */
  related: string[];
};

export const COMPETITORS: Competitor[] = [
  {
    slug: 'threekit',
    name: 'Threekit',
    category: 'enterprise 3D configuration and virtual-photography platform',
    seoTitle: 'Thridify vs Threekit / Threekit Alternative',
    seoDescription:
      'Thridify vs Threekit: an honest comparison of 3D configurator, app-free AR and done-for-you 3D modelling. A no-code Threekit alternative for custom-product brands.',
    keywords: [
      'Threekit alternative',
      'Thridify vs Threekit',
      'Threekit competitor',
      '3D configurator platform',
      'no-code 3D commerce',
    ],
    intro:
      'Threekit and Thridify both bring products to life in 3D and AR, but they aim at different buyers. Threekit is a mature, enterprise-grade 3D configuration and virtual-photography platform. Thridify is a no-code 3D and AR commerce platform paired with a done-for-you 3D modelling service, built for custom-product brands that want results without a large integration project.',
    competitorStrengths:
      'Threekit is a strong, established platform for enterprise 3D configuration and virtual photography, with deep CRM and CPQ integrations (including Salesforce) for large catalogs and sales-operations teams. For a big enterprise that already lives in that stack, it is a serious option.',
    thridifyFit:
      'Thridify is the faster, lower-lift path for furniture, kitchen, door and other custom-product brands: no-code setup, app-free browser AR, and a modelling team that builds your catalog into AR-ready 3D for you. Start by modelling one SKU to prove ROI, then expand into the configurator and AR.',
    rows: [
      { feature: '3D 360° product viewer', thridify: 'Yes', competitor: 'Yes' },
      { feature: '3D configurator with live pricing', thridify: 'Yes', competitor: 'Yes' },
      { feature: 'App-free web AR', thridify: 'Yes, from the browser', competitor: 'Varies / contact vendor' },
      { feature: 'Done-for-you 3D modelling service', thridify: 'Yes — core offering', competitor: 'Yes — content & virtual-photography services' },
      { feature: 'No-code setup', thridify: 'Yes', competitor: 'Enterprise, integration-led' },
      { feature: 'Ecommerce plugins (Shopify / WooCommerce / WordPress)', thridify: 'Yes', competitor: 'Shopify + enterprise / CRM integrations' },
      { feature: 'Typical customer', thridify: 'SMB to mid-market custom-product brands', competitor: 'Enterprise' },
      { feature: 'Published pricing', thridify: 'Demo / contact', competitor: 'Contact sales' },
    ],
    faqs: [
      {
        q: 'Is Thridify a good Threekit alternative?',
        a: 'Yes, for custom-product brands that want no-code setup and a done-for-you 3D modelling service rather than an enterprise integration project. Threekit remains a strong choice for large enterprises already invested in CRM/CPQ tooling.',
      },
      {
        q: 'What is the main difference between Thridify and Threekit?',
        a: 'Thridify pairs a no-code 3D and AR platform with a human-delivered 3D modelling service aimed at SMB-to-mid-market custom-product brands. Threekit is an enterprise-grade 3D configuration and virtual-photography platform.',
      },
      {
        q: 'Does Thridify build the 3D models for me?',
        a: 'Yes. Thridify’s 3D Modelling Service builds photoreal, AR-ready models (glTF/GLB/USDZ) from your catalog, so you do not need an in-house 3D team.',
      },
    ],
    related: ['zakeke', 'marxent'],
  },
  {
    slug: 'zakeke',
    name: 'Zakeke',
    category: 'ecommerce product customization and configurator platform',
    seoTitle: 'Thridify vs Zakeke / Zakeke Alternative',
    seoDescription:
      'Thridify vs Zakeke: an honest comparison for 3D configurators, app-free AR and done-for-you 3D modelling. A Zakeke alternative for big-ticket custom products.',
    keywords: [
      'Zakeke alternative',
      'Thridify vs Zakeke',
      'Zakeke competitor',
      '3D product configurator',
      'product customization software',
    ],
    intro:
      'Zakeke and Thridify both let shoppers configure products in 2D/3D and view them in AR, but they specialise differently. Zakeke is a self-serve product-customization platform with a broad ecommerce plugin ecosystem. Thridify focuses on big-ticket, made-to-order products and adds a done-for-you 3D modelling service on top of its no-code platform.',
    competitorStrengths:
      'Zakeke is excellent at self-serve product personalization across many ecommerce platforms, with published pricing and a large plugin ecosystem. For print-on-demand and made-to-order customization at scale, it is a well-proven, accessible choice.',
    thridifyFit:
      'Thridify is built for high-consideration custom products — furniture, modular kitchens, doors and windows — where an accurate, photoreal 3D model and app-free AR do the selling. Its modelling team builds those assets for you, so the 3D looks like the real product, not a rough approximation.',
    rows: [
      { feature: '3D 360° product viewer', thridify: 'Yes', competitor: 'Yes' },
      { feature: '3D configurator with live pricing', thridify: 'Yes', competitor: 'Yes' },
      { feature: 'App-free web AR', thridify: 'Yes, from the browser', competitor: 'Yes' },
      { feature: 'Done-for-you 3D modelling service', thridify: 'Yes — core offering', competitor: 'Varies / self-serve model upload' },
      { feature: 'No-code setup', thridify: 'Yes', competitor: 'Yes' },
      { feature: 'Ecommerce plugins (Shopify / WooCommerce / WordPress)', thridify: 'Yes', competitor: 'Yes — broad ecosystem' },
      { feature: 'Primary focus', thridify: 'Big-ticket custom products (furniture, kitchens, doors)', competitor: 'Product personalization & print-on-demand' },
      { feature: 'Published pricing', thridify: 'Demo / contact', competitor: 'Published tiers' },
    ],
    faqs: [
      {
        q: 'Is Thridify a good Zakeke alternative?',
        a: 'Yes, especially for big-ticket, made-to-order products where a photoreal 3D model and app-free AR drive the sale. Zakeke is a strong choice for self-serve product personalization and print-on-demand.',
      },
      {
        q: 'What is the main difference between Thridify and Zakeke?',
        a: 'Thridify adds a done-for-you 3D modelling service and focuses on high-consideration custom products. Zakeke is a self-serve customization platform with a broad, published-pricing plugin ecosystem.',
      },
      {
        q: 'Do I have to make my own 3D models with Thridify?',
        a: 'No. Thridify’s modelling team builds photoreal, AR-ready models from your catalog for you, then you run them in the viewer, configurator and AR.',
      },
    ],
    related: ['threekit', 'marxent'],
  },
  {
    slug: 'marxent',
    name: 'Marxent',
    category: 'enterprise 3D room-planning and product-visualization platform',
    seoTitle: 'Thridify vs Marxent / Marxent Alternative',
    seoDescription:
      'Thridify vs Marxent (3D Cloud): an honest comparison of 3D product configurators, app-free AR and done-for-you 3D modelling. A no-code Marxent alternative.',
    keywords: [
      'Marxent alternative',
      'Thridify vs Marxent',
      '3D Cloud alternative',
      'Marxent competitor',
      '3D room planner alternative',
    ],
    intro:
      'Marxent (3D Cloud by Marxent) and Thridify both deliver 3D product visualization and AR, but at different scales. Marxent is an enterprise platform known for 3D room planners in big-box furniture and home-improvement retail. Thridify is a no-code platform plus a done-for-you 3D modelling service for custom-product brands that want immersive commerce without an enterprise rollout.',
    competitorStrengths:
      'Marxent is a strong enterprise choice for 3D room planners and large-scale product visualization in big-box furniture and home-improvement retail, with extensive catalog tooling and in-store experiences. For a national retailer building a room planner, it is purpose-built.',
    thridifyFit:
      'Thridify is the right fit when you want product-level 3D and app-free AR live on your storefront quickly, without an enterprise implementation. No-code setup, a modelling team that builds your assets, and a wedge strategy: model one SKU, prove ROI, then scale the configurator and AR.',
    rows: [
      { feature: '3D 360° product viewer', thridify: 'Yes', competitor: 'Yes' },
      { feature: '3D configurator with live pricing', thridify: 'Yes', competitor: 'Yes (space/room-planning focus)' },
      { feature: 'App-free web AR', thridify: 'Yes, from the browser', competitor: 'Yes (AR room planning)' },
      { feature: 'Done-for-you 3D modelling service', thridify: 'Yes — core offering', competitor: 'Yes — enterprise content services' },
      { feature: 'No-code setup', thridify: 'Yes', competitor: 'Enterprise, implementation-led' },
      { feature: 'Ecommerce plugins (Shopify / WooCommerce / WordPress)', thridify: 'Yes', competitor: 'Varies / enterprise integrations' },
      { feature: 'Typical customer', thridify: 'SMB to mid-market custom-product brands', competitor: 'Enterprise furniture & home-improvement retail' },
      { feature: 'Published pricing', thridify: 'Demo / contact', competitor: 'Contact sales' },
    ],
    faqs: [
      {
        q: 'Is Thridify a good Marxent alternative?',
        a: 'Yes, for custom-product brands that want product-level 3D and app-free AR live quickly without an enterprise implementation. Marxent is purpose-built for large retailers building 3D room planners.',
      },
      {
        q: 'What is the main difference between Thridify and Marxent?',
        a: 'Thridify is a no-code platform plus a done-for-you 3D modelling service for SMB-to-mid-market custom-product brands. Marxent (3D Cloud) is an enterprise 3D room-planning and visualization platform for big-box retail.',
      },
      {
        q: 'Can I start small with Thridify?',
        a: 'Yes. Most teams model a single SKU first to prove ROI, then expand modelling across the catalog and add the configurator and AR — no enterprise rollout required.',
      },
    ],
    related: ['threekit', 'zakeke'],
  },
];

export const COMPETITOR_SLUGS = COMPETITORS.map((c) => c.slug);

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
