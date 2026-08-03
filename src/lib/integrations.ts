/**
 * Per-platform INTEGRATION content — the single source for the 9 Thridify
 * integration landing pages (SEO gap-fill for the old WordPress integration
 * URLs that carry real search demand: /woocommerce 4415i, /magento 3334i,
 * /shopify 2041i, /custom-integration 366i, etc.).
 *
 * Each entry drives:
 *   - the /integrations index hub card
 *   - a statically-generated /integrations/<slug> page with UNIQUE, SEO-rich
 *     content (title/description/canonical/OG, keyword H1+H2s, FAQ + Service
 *     + BreadcrumbList JSON-LD), mirroring the proven /industries/[slug]
 *     pattern (typed data + generateStaticParams + dynamicParams=false).
 *
 * RULES baked in here:
 *   - Canonical metric set ONLY (DESIGN-SPEC §7.2) — no invented numbers.
 *   - No-Faking: the integration mechanism is the honest, widely-true story
 *     (publish once → add to the platform's product page via a lightweight
 *     embed snippet, or the Thridify plugin on WordPress/WooCommerce → the JS
 *     SDK renders the published experience by product/variant ID → app-free web
 *     AR). NO fabricated platform-specific capabilities, prices or quotes. The
 *     one real client quote (Guntier) has no known platform mapping, so every
 *     integration page is metric-only proof.
 *   - Text budgets (§3): H1 ≤12 words with the primary keyword, subtitle ≤24,
 *     card/answer bodies short and scannable.
 */

import type { DemoMode } from '@/components/signature/CapabilityDemo';
import { CANONICAL_METRICS, type IndustryMetricKey } from '@/lib/industries';

export { CANONICAL_METRICS };
export type IntegrationMetricKey = IndustryMetricKey;

export type IntegrationHelp = {
  capability: DemoMode;
  heading: string;
  body: string;
};

export type IntegrationOutcome = {
  metric: IntegrationMetricKey;
  /** Platform context — adds NO new number (No-Faking / canonical-only). */
  context: string;
};

export type IntegrationStep = { heading: string; body: string };

export type Faq = { q: string; a: string };

export type Integration = {
  slug: string;
  /** Platform display name (cards, breadcrumb, headings). */
  name: string;
  /** lucide icon key resolved in the page (keeps this module server-safe). */
  icon: 'plugin' | 'shopify' | 'wix' | 'bigcommerce' | 'magento' | 'headless' | 'canva' | 'wordpress' | 'code';
  /** The CapabilityDemo mode featured in the hero. */
  heroDemo: DemoMode;
  primaryKeyword: string;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; h1: string; subtitle: string };
  /** 1-line value/pain for the index hub card. */
  tagline: string;
  /** How Thridify integrates with THIS platform — the honest mechanism. */
  integrationIntro: string;
  /** The install label shown on the "How it works" band. */
  installLabel: string;
  /** 3 concrete steps (publish → add to product page → shoppers interact). */
  steps: IntegrationStep[];
  helpsIntro: string;
  /** 3 capability cards framed for this platform's merchants. */
  helps: IntegrationHelp[];
  outcomes: IntegrationOutcome[];
  faqs: Faq[];
  /** 2–3 related integration slugs for internal linking. */
  related: string[];
  /** 2–3 relevant industry slugs for cross-linking. */
  relatedIndustries: string[];
};

// Reusable capability framings (kept per-page distinct where it matters).
export const INTEGRATIONS: Integration[] = [
  {
    slug: 'woocommerce',
    name: 'WooCommerce',
    icon: 'plugin',
    heroDemo: 'configurator',
    primaryKeyword: '3D product configurator for WooCommerce',
    keywords: [
      '3D product configurator for WooCommerce',
      'WooCommerce 3D viewer',
      'WooCommerce AR product viewer',
      'add 3D to WooCommerce',
      'WooCommerce product customizer 3D',
    ],
    seoTitle: '3D Product Configurator for WooCommerce',
    seoDescription:
      'Add a 3D product configurator, 360° viewer and app-free AR to your WooCommerce store. Thridify installs via a WordPress plugin or a lightweight embed — no re-platforming.',
    hero: {
      eyebrow: 'WooCommerce Integration',
      h1: '3D Product Configurator for WooCommerce',
      subtitle:
        'Add an interactive 3D configurator, 360° viewer and app-free AR to your WooCommerce product pages — installed with a plugin or a lightweight embed.',
    },
    tagline: 'A 3D configurator, 360° viewer and web AR for your WooCommerce product pages.',
    integrationIntro:
      'Build your configurator, 360° viewer and AR experience once in Thridify and publish it. Add it to any WooCommerce product page with the Thridify WordPress plugin or a lightweight embed snippet; the Thridify JS SDK renders the published experience and matches each product and variant by ID. AR runs in the browser — your shoppers never install an app.',
    installLabel: 'Install: WordPress/WooCommerce plugin or embed snippet',
    steps: [
      {
        heading: 'Publish an experience in Thridify',
        body: 'Set up the 3D configurator, 360° viewer or AR experience for your product and publish it — each gets a stable ID.',
      },
      {
        heading: 'Add it to your WooCommerce product',
        body: 'Install the Thridify plugin or paste the embed on the product template, then map it to the product or variant by ID.',
      },
      {
        heading: 'Shoppers configure, spin and place in AR',
        body: 'The JS SDK renders the live experience on the product page — customers configure options and view the item in their room, app-free.',
      },
    ],
    helpsIntro:
      'WooCommerce sells on the product page. Thridify replaces flat gallery images with an experience your buyers can configure, spin and stand in their own room.',
    helps: [
      {
        capability: 'configurator',
        heading: 'A 3D configurator on the product page',
        body: 'Shoppers swap finishes, materials and options in real time with live pricing — mapped to your WooCommerce variants.',
      },
      {
        capability: 'ar',
        heading: 'App-free AR from WooCommerce',
        body: 'One tap places the product at true scale in the buyer’s space, straight from the WooCommerce product page — no app.',
      },
      {
        capability: 'viewer',
        heading: '360° viewer beside your gallery',
        body: 'Drag-to-spin and zoom sit alongside your existing WooCommerce images — the showroom confidence photos can’t give.',
      },
    ],
    outcomes: [
      { metric: 'returns', context: 'Buyers who see true finish and scale before checkout stop returning “not as pictured”.' },
      { metric: 'conversion', context: 'Interactive product pages turn WooCommerce browsers into confident buyers.' },
      { metric: 'photography', context: 'One 3D asset renders every variant — no reshoot per finish or angle.' },
    ],
    faqs: [
      {
        q: 'Does Thridify work with WooCommerce?',
        a: 'Yes. Thridify adds a 3D configurator, 360° viewer and app-free AR to WooCommerce product pages via a WordPress plugin or a lightweight embed snippet — no re-platforming.',
      },
      {
        q: 'How do I add a 3D product configurator to WooCommerce?',
        a: 'Publish the experience in Thridify, then install the plugin or paste the embed on your product template and map it to the product or variant by ID. The JS SDK renders it live.',
      },
      {
        q: 'Do my customers need an app for AR?',
        a: 'No. Thridify’s AR runs in the browser on any modern smartphone, so WooCommerce shoppers place the product in their room in one tap — no app download.',
      },
      {
        q: 'Do I need a separate 3D model for every variant?',
        a: 'No. One configurable 3D model carries every finish and option as swappable materials, mapped to your WooCommerce variants — build once, sell every version.',
      },
      {
        q: 'Will it slow down my WooCommerce store?',
        a: 'The experience is poster-first and loads on interaction, so the product page stays fast; the heavy 3D only mounts when a shopper chooses to interact.',
      },
    ],
    related: ['wordpress', 'shopify', 'custom-integration'],
    relatedIndustries: ['furniture', 'modular-kitchens', 'laminates-surfaces'],
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    icon: 'shopify',
    heroDemo: 'ar',
    primaryKeyword: 'Shopify 3D and AR viewer',
    keywords: [
      'Shopify 3D and AR viewer',
      'add 3D to Shopify',
      'Shopify AR product viewer',
      'Shopify 3D configurator',
      'Shopify product AR no app',
    ],
    seoTitle: 'Shopify 3D & AR Viewer',
    seoDescription:
      'Add a 3D product viewer, configurator and app-free AR to your Shopify store. Thridify embeds on your product template with a lightweight snippet — no re-platforming.',
    hero: {
      eyebrow: 'Shopify Integration',
      h1: 'Shopify 3D & AR Viewer',
      subtitle:
        'Let Shopify shoppers spin products in 3D, configure options and view them in their room with app-free AR — added with a lightweight embed.',
    },
    tagline: 'Web AR, a 3D viewer and a live configurator on your Shopify product pages.',
    integrationIntro:
      'Build your 360° viewer, configurator and AR experience once in Thridify and publish it. Add it to a Shopify product page with a lightweight embed on your product template; the Thridify JS SDK renders the published experience and matches each product and variant by ID. AR runs in the browser — no app for your shoppers.',
    installLabel: 'Install: lightweight embed on your Shopify product template',
    steps: [
      {
        heading: 'Publish an experience in Thridify',
        body: 'Create the 3D viewer, configurator or AR experience for your product and publish it — each gets a stable ID.',
      },
      {
        heading: 'Embed it on your Shopify product page',
        body: 'Paste the Thridify embed into your product template and map it to the Shopify product or variant by ID.',
      },
      {
        heading: 'Shoppers spin, configure and place in AR',
        body: 'The JS SDK renders the live experience — customers explore the product in 3D and place it in their room, app-free.',
      },
    ],
    helpsIntro:
      'Shopify buyers decide on the product page. Thridify turns static Shopify media into an experience they can spin, configure and see in their own space.',
    helps: [
      {
        capability: 'ar',
        heading: 'App-free AR on Shopify',
        body: 'One tap places the product at true scale in the buyer’s room, straight from the Shopify product page — no app to install.',
      },
      {
        capability: 'viewer',
        heading: '360° viewer for your listings',
        body: 'Drag-to-spin and zoom let Shopify shoppers inspect every angle — the confidence a flat gallery can’t deliver.',
      },
      {
        capability: 'configurator',
        heading: 'Configure options live',
        body: 'Shoppers swap finishes and options in real time with live pricing, mapped to your Shopify variants.',
      },
    ],
    outcomes: [
      { metric: 'conversion', context: 'Spin-and-place experiences turn Shopify browsers into confident buyers.' },
      { metric: 'returns', context: 'Seeing true scale and finish before checkout cuts “not as pictured” returns.' },
      { metric: 'ctr', context: 'Interactive listings pull more clicks than flat product photos.' },
    ],
    faqs: [
      {
        q: 'How do I add a 3D configurator to Shopify?',
        a: 'Publish the experience in Thridify, then paste the lightweight embed into your Shopify product template and map it to the product or variant by ID. The JS SDK renders it live.',
      },
      {
        q: 'Does Thridify add AR to Shopify without an app?',
        a: 'Yes. Thridify’s AR runs in the browser on any modern smartphone, so Shopify shoppers place products in their room in one tap — no app download.',
      },
      {
        q: 'Does it work with my existing Shopify theme?',
        a: 'Yes. The embed drops into your product template alongside your current gallery, so it fits your existing Shopify theme without re-platforming.',
      },
      {
        q: 'Can each Shopify variant map to the 3D experience?',
        a: 'Yes. One configurable model carries every option as swappable materials and maps to your Shopify variants by ID, so each variant shows the right configuration.',
      },
    ],
    related: ['woocommerce', 'wix', 'custom-integration'],
    relatedIndustries: ['furniture', 'laminates-surfaces', 'doors-and-windows'],
  },
  {
    slug: 'wix',
    name: 'Wix',
    icon: 'wix',
    heroDemo: 'viewer',
    primaryKeyword: '3D product viewer for Wix',
    keywords: [
      '3D product viewer for Wix',
      'add 3D to Wix store',
      'Wix AR product viewer',
      'Wix 3D configurator',
      'Wix product 3D embed',
    ],
    seoTitle: '3D Product Viewer & AR for Wix',
    seoDescription:
      'Add a 3D product viewer, configurator and app-free AR to your Wix store. Thridify embeds on your Wix product page with a lightweight snippet — no re-platforming.',
    hero: {
      eyebrow: 'Wix Integration',
      h1: '3D Product Viewer & AR for Wix',
      subtitle:
        'Let Wix shoppers spin products in 3D, configure options and view them in their room with app-free AR — added with a lightweight embed.',
    },
    tagline: 'A 3D viewer, configurator and web AR embedded on your Wix product pages.',
    integrationIntro:
      'Build your 360° viewer, configurator and AR experience once in Thridify and publish it. Add it to a Wix product page with a lightweight embed (an HTML/custom-element block); the Thridify JS SDK renders the published experience and matches each product by ID. AR runs in the browser — no app for your shoppers.',
    installLabel: 'Install: lightweight embed / HTML block on your Wix page',
    steps: [
      {
        heading: 'Publish an experience in Thridify',
        body: 'Create the 3D viewer, configurator or AR experience for your product and publish it — each gets a stable ID.',
      },
      {
        heading: 'Embed it on your Wix page',
        body: 'Drop the Thridify embed into a Wix HTML/custom-element block on the product page and map it to the product by ID.',
      },
      {
        heading: 'Shoppers spin, configure and place in AR',
        body: 'The JS SDK renders the live experience — customers explore in 3D and view the item in their room, app-free.',
      },
    ],
    helpsIntro:
      'Wix stores win on presentation. Thridify upgrades static Wix media into an experience shoppers can spin, configure and place in their own room.',
    helps: [
      {
        capability: 'viewer',
        heading: '360° viewer on your Wix page',
        body: 'Drag-to-spin and zoom let Wix shoppers inspect every angle — showroom confidence right on the product page.',
      },
      {
        capability: 'ar',
        heading: 'App-free AR from Wix',
        body: 'One tap places the product at true scale in the buyer’s space, straight from your Wix page — no app to install.',
      },
      {
        capability: 'configurator',
        heading: 'Configure options live',
        body: 'Shoppers swap finishes and options in real time with live pricing, embedded right on the Wix product page.',
      },
    ],
    outcomes: [
      { metric: 'engagement', context: 'Interactive 3D keeps Wix shoppers exploring the product far longer.' },
      { metric: 'conversion', context: 'Seeing the real thing in 3D and AR turns Wix browsers into buyers.' },
      { metric: 'photography', context: 'One 3D asset renders every angle and variant — no reshoot per option.' },
    ],
    faqs: [
      {
        q: 'Can I add a 3D product viewer to a Wix store?',
        a: 'Yes. Thridify embeds a 3D viewer, configurator and app-free AR on Wix product pages via a lightweight HTML/custom-element block — no re-platforming.',
      },
      {
        q: 'Does Thridify AR work on Wix without an app?',
        a: 'Yes. AR runs in the browser on any modern smartphone, so Wix shoppers place products in their room in one tap — no app download.',
      },
      {
        q: 'How do I embed Thridify on a Wix page?',
        a: 'Publish the experience in Thridify, then paste the embed into a Wix HTML/custom-element block on the product page and map it to the product by ID.',
      },
      {
        q: 'Will it fit my existing Wix design?',
        a: 'Yes. The embed sits inside your existing Wix layout beside your current media, so it matches your store’s design.',
      },
    ],
    related: ['shopify', 'bigcommerce', 'custom-integration'],
    relatedIndustries: ['furniture', 'laminates-surfaces', 'modular-kitchens'],
  },
  {
    slug: 'bigcommerce',
    name: 'BigCommerce',
    icon: 'bigcommerce',
    heroDemo: 'configurator',
    primaryKeyword: '3D product configurator for BigCommerce',
    keywords: [
      '3D product configurator for BigCommerce',
      'BigCommerce 3D viewer',
      'BigCommerce AR product viewer',
      'add 3D to BigCommerce',
      'BigCommerce product customizer',
    ],
    seoTitle: '3D Product Configurator for BigCommerce',
    seoDescription:
      'Add a 3D product configurator, 360° viewer and app-free AR to your BigCommerce store. Thridify embeds on your product template with a lightweight snippet — no re-platforming.',
    hero: {
      eyebrow: 'BigCommerce Integration',
      h1: '3D Product Configurator for BigCommerce',
      subtitle:
        'Let BigCommerce shoppers configure options in 3D, spin products and view them in their room with app-free AR — added with a lightweight embed.',
    },
    tagline: 'A 3D configurator, 360° viewer and web AR on your BigCommerce product pages.',
    integrationIntro:
      'Build your configurator, 360° viewer and AR experience once in Thridify and publish it. Add it to a BigCommerce product page with a lightweight embed on your product template; the Thridify JS SDK renders the published experience and matches each product and variant by ID. AR runs in the browser — no app for your shoppers.',
    installLabel: 'Install: lightweight embed on your BigCommerce product template',
    steps: [
      {
        heading: 'Publish an experience in Thridify',
        body: 'Create the 3D configurator, 360° viewer or AR experience for your product and publish it — each gets a stable ID.',
      },
      {
        heading: 'Embed it on your BigCommerce product',
        body: 'Paste the Thridify embed into your product template and map it to the BigCommerce product or variant by ID.',
      },
      {
        heading: 'Shoppers configure, spin and place in AR',
        body: 'The JS SDK renders the live experience — customers configure options and view the item in their room, app-free.',
      },
    ],
    helpsIntro:
      'BigCommerce merchants compete on the product page. Thridify replaces static media with an experience buyers can configure, spin and place in their own room.',
    helps: [
      {
        capability: 'configurator',
        heading: 'A 3D configurator for BigCommerce',
        body: 'Shoppers swap finishes and options in real time with live pricing, mapped to your BigCommerce variants.',
      },
      {
        capability: 'ar',
        heading: 'App-free AR from BigCommerce',
        body: 'One tap places the product at true scale in the buyer’s space, straight from the product page — no app.',
      },
      {
        capability: 'viewer',
        heading: '360° viewer for your catalogue',
        body: 'Drag-to-spin and zoom let BigCommerce shoppers inspect every angle — the confidence photos can’t give.',
      },
    ],
    outcomes: [
      { metric: 'conversion', context: 'Configure-and-place experiences turn BigCommerce browsers into confident buyers.' },
      { metric: 'returns', context: 'Seeing true finish and scale before checkout cuts “not as pictured” returns.' },
      { metric: 'inventory', context: 'Selling from one configurable 3D model reduces sample and stock overhead.' },
    ],
    faqs: [
      {
        q: 'Does Thridify work with BigCommerce?',
        a: 'Yes. Thridify adds a 3D configurator, 360° viewer and app-free AR to BigCommerce product pages via a lightweight embed — no re-platforming.',
      },
      {
        q: 'How do I add a 3D configurator to BigCommerce?',
        a: 'Publish the experience in Thridify, then paste the embed on your product template and map it to the product or variant by ID. The JS SDK renders it live.',
      },
      {
        q: 'Do my customers need an app for AR?',
        a: 'No. AR runs in the browser on any modern smartphone, so BigCommerce shoppers place products in their room in one tap — no app download.',
      },
      {
        q: 'Can each BigCommerce variant map to a configuration?',
        a: 'Yes. One configurable model carries every option as swappable materials and maps to your BigCommerce variants by ID.',
      },
    ],
    related: ['shopify', 'wix', 'custom-integration'],
    relatedIndustries: ['furniture', 'industrial-machinery', 'laminates-surfaces'],
  },
  {
    slug: 'magento',
    name: 'Magento',
    icon: 'magento',
    heroDemo: 'configurator',
    primaryKeyword: 'Magento 3D product configurator',
    keywords: [
      'Magento 3D product configurator',
      'Magento 3D viewer',
      'Magento AR product viewer',
      'add 3D to Magento',
      'Adobe Commerce 3D configurator',
    ],
    seoTitle: 'Magento 3D Product Configurator & AR',
    seoDescription:
      'Add a 3D product configurator, 360° viewer and app-free AR to your Magento (Adobe Commerce) store. Thridify embeds on your product template with a lightweight snippet.',
    hero: {
      eyebrow: 'Magento Integration',
      h1: 'Magento 3D Product Configurator & AR',
      subtitle:
        'Let Magento shoppers configure options in 3D, spin products and view them in their room with app-free AR — added with a lightweight embed.',
    },
    tagline: 'A 3D configurator, 360° viewer and web AR for your Magento product pages.',
    integrationIntro:
      'Build your configurator, 360° viewer and AR experience once in Thridify and publish it. Add it to a Magento (Adobe Commerce) product page with a lightweight embed on your product template; the Thridify JS SDK renders the published experience and matches each product and variant by ID. AR runs in the browser — no app for your shoppers.',
    installLabel: 'Install: lightweight embed on your Magento product template',
    steps: [
      {
        heading: 'Publish an experience in Thridify',
        body: 'Create the 3D configurator, 360° viewer or AR experience for your product and publish it — each gets a stable ID.',
      },
      {
        heading: 'Embed it on your Magento product',
        body: 'Paste the Thridify embed into your product template and map it to the Magento product or variant by ID.',
      },
      {
        heading: 'Shoppers configure, spin and place in AR',
        body: 'The JS SDK renders the live experience — customers configure options and view the item in their room, app-free.',
      },
    ],
    helpsIntro:
      'Magento catalogues are deep and high-consideration. Thridify turns dense listings into experiences buyers can configure, spin and place in their own space.',
    helps: [
      {
        capability: 'configurator',
        heading: 'A 3D configurator for Magento',
        body: 'Shoppers swap finishes and options in real time with live pricing, mapped to your Magento configurable products.',
      },
      {
        capability: 'viewer',
        heading: '360° viewer for complex catalogues',
        body: 'Drag-to-spin and zoom let Magento shoppers inspect intricate products from every angle before they buy.',
      },
      {
        capability: 'ar',
        heading: 'App-free AR from Magento',
        body: 'One tap places the product at true scale in the buyer’s space, straight from the Magento product page — no app.',
      },
    ],
    outcomes: [
      { metric: 'conversion', context: 'Interactive configuration turns Magento browsers into confident buyers.' },
      { metric: 'returns', context: 'Seeing true finish and scale before checkout cuts “not as pictured” returns.' },
      { metric: 'photography', context: 'One 3D asset renders every variant — no reshoot across a large Magento catalogue.' },
    ],
    faqs: [
      {
        q: 'Does Thridify work with Magento and Adobe Commerce?',
        a: 'Yes. Thridify adds a 3D configurator, 360° viewer and app-free AR to Magento (Adobe Commerce) product pages via a lightweight embed — no re-platforming.',
      },
      {
        q: 'How do I add a 3D product configurator to Magento?',
        a: 'Publish the experience in Thridify, then paste the embed on your product template and map it to the product or variant by ID. The JS SDK renders it live.',
      },
      {
        q: 'Do my customers need an app for AR?',
        a: 'No. AR runs in the browser on any modern smartphone, so Magento shoppers place products in their room in one tap — no app download.',
      },
      {
        q: 'Can it map to Magento configurable products?',
        a: 'Yes. One configurable 3D model carries every option as swappable materials and maps to your Magento configurable products and variants by ID.',
      },
    ],
    related: ['commercetools', 'bigcommerce', 'custom-integration'],
    relatedIndustries: ['industrial-machinery', 'furniture', 'laminates-surfaces'],
  },
  {
    slug: 'commercetools',
    name: 'commercetools',
    icon: 'headless',
    heroDemo: 'viewer',
    primaryKeyword: '3D and AR for commercetools',
    keywords: [
      '3D and AR for commercetools',
      'headless commerce 3D viewer',
      'commercetools AR product viewer',
      'composable commerce 3D configurator',
      'add 3D to commercetools',
    ],
    seoTitle: '3D & AR Product Viewer for commercetools',
    seoDescription:
      'Add a 3D viewer, configurator and app-free AR to your commercetools storefront. Thridify’s JS SDK renders published experiences in your headless frontend by product ID.',
    hero: {
      eyebrow: 'commercetools Integration',
      h1: '3D & AR Product Viewer for commercetools',
      subtitle:
        'Bring 3D configuration, 360° viewing and app-free AR to your composable commercetools storefront — rendered by the Thridify JS SDK in your own frontend.',
    },
    tagline: 'A 3D viewer, configurator and web AR for your composable commercetools storefront.',
    integrationIntro:
      'commercetools is headless, so your frontend owns the product page. Build your 360° viewer, configurator and AR experience once in Thridify and publish it, then mount it in your commercetools storefront with the Thridify JS SDK — passing the product ID your frontend already resolves. AR runs in the browser — no app for your shoppers.',
    installLabel: 'Install: Thridify JS SDK in your headless frontend',
    steps: [
      {
        heading: 'Publish an experience in Thridify',
        body: 'Create the 3D viewer, configurator or AR experience for your product and publish it — each gets a stable ID.',
      },
      {
        heading: 'Mount it via the JS SDK',
        body: 'In your commercetools frontend, call the Thridify SDK with the product ID your storefront already resolves.',
      },
      {
        heading: 'Shoppers spin, configure and place in AR',
        body: 'The SDK renders the live experience in your own UI — customers explore in 3D and view the item in their room, app-free.',
      },
    ],
    helpsIntro:
      'Composable stacks demand a clean embed, not a plugin. Thridify’s SDK drops a 3D experience into your commercetools frontend without owning your product page.',
    helps: [
      {
        capability: 'viewer',
        heading: '360° viewer in your frontend',
        body: 'The SDK mounts a drag-to-spin 3D viewer inside your commercetools storefront — you keep full control of the layout.',
      },
      {
        capability: 'configurator',
        heading: 'Configure options live',
        body: 'Shoppers swap finishes and options in real time with live pricing, driven by the product data your frontend already holds.',
      },
      {
        capability: 'ar',
        heading: 'App-free AR, SDK-driven',
        body: 'One tap places the product at true scale in the buyer’s space from your composable storefront — no app to install.',
      },
    ],
    outcomes: [
      { metric: 'conversion', context: 'Interactive product views turn composable-storefront browsers into buyers.' },
      { metric: 'engagement', context: 'Shoppers exploring products in 3D stay on your storefront far longer.' },
      { metric: 'returns', context: 'Seeing true scale and finish before checkout cuts “not as pictured” returns.' },
    ],
    faqs: [
      {
        q: 'Can I add 3D and AR to a commercetools storefront?',
        a: 'Yes. Because commercetools is headless, Thridify mounts a published 3D viewer, configurator or AR experience in your own frontend using the JS SDK and the product ID your storefront resolves.',
      },
      {
        q: 'How does Thridify integrate with a headless stack?',
        a: 'Publish the experience in Thridify, then call the Thridify SDK in your frontend with the product ID. The SDK renders the live experience inside your UI — you keep control of the page.',
      },
      {
        q: 'Do my customers need an app for AR?',
        a: 'No. AR runs in the browser on any modern smartphone, so shoppers place products in their room in one tap — no app download.',
      },
      {
        q: 'Does it work with any frontend framework?',
        a: 'The SDK is framework-agnostic JavaScript, so it mounts in React, Vue, Angular or plain JS storefronts built on commercetools.',
      },
    ],
    related: ['custom-integration', 'magento', 'bigcommerce'],
    relatedIndustries: ['industrial-machinery', 'furniture', 'prefab-structures'],
  },
  {
    slug: 'canva',
    name: 'Canva',
    icon: 'canva',
    heroDemo: 'viewer',
    primaryKeyword: '3D and AR beyond Canva mockups',
    keywords: [
      '3D product visualization vs Canva',
      'interactive 3D product from design',
      'AR product viewer for Canva sites',
      'beyond flat product mockups',
      'add 3D to a Canva website',
    ],
    seoTitle: '3D & AR Product Experiences Beyond Canva',
    seoDescription:
      'Canva makes beautiful flat mockups; Thridify makes interactive 3D and app-free AR. Embed a live 3D product experience on your Canva website or any storefront.',
    hero: {
      eyebrow: 'Canva & Thridify',
      h1: 'From Canva Mockups to Interactive 3D & AR',
      subtitle:
        'Canva is great for flat product mockups. Thridify goes further — a live 3D viewer, configurator and app-free AR you can embed wherever you publish.',
    },
    tagline: 'Go beyond flat Canva mockups — embed a live 3D and AR product experience.',
    integrationIntro:
      'Canva is where many brands design their product visuals; Thridify is where those products come alive in interactive 3D and AR. Build a 360° viewer, configurator or AR experience once in Thridify and publish it, then embed it on your Canva website (or any storefront) with a lightweight snippet. The JS SDK renders the published experience by ID, and AR runs in the browser — no app for your shoppers.',
    installLabel: 'Install: lightweight embed on your Canva website or storefront',
    steps: [
      {
        heading: 'Design the look in Canva',
        body: 'Keep using Canva for your brand visuals and flat product mockups — Thridify picks up where flat design ends.',
      },
      {
        heading: 'Build the 3D experience in Thridify',
        body: 'Create the interactive 3D viewer, configurator or AR experience for the product and publish it — it gets a stable ID.',
      },
      {
        heading: 'Embed it where you publish',
        body: 'Paste the Thridify embed on your Canva website or storefront; the SDK renders the live experience, app-free AR included.',
      },
    ],
    helpsIntro:
      'A flat mockup shows one angle; a Thridify experience shows all of them — and lets buyers place the product in their own room.',
    helps: [
      {
        capability: 'viewer',
        heading: 'Interactive 3D, not a flat mockup',
        body: 'Buyers drag-to-spin and zoom the real product from every angle — the detail a static Canva image can’t show.',
      },
      {
        capability: 'ar',
        heading: 'App-free AR from a design-first site',
        body: 'One tap places the product at true scale in the buyer’s room, embedded on your Canva website — no app to install.',
      },
      {
        capability: 'configurator',
        heading: 'Configure finishes live',
        body: 'Shoppers swap finishes and options in real time with live pricing — a step no flat design tool can offer.',
      },
    ],
    outcomes: [
      { metric: 'engagement', context: 'Interactive 3D holds attention far longer than a flat product mockup.' },
      { metric: 'ctr', context: 'Live 3D and AR listings earn more clicks than static design images.' },
      { metric: 'photography', context: 'One 3D asset renders every angle and variant — fewer mockups to design per product.' },
    ],
    faqs: [
      {
        q: 'Does Thridify replace Canva?',
        a: 'No. Canva is for flat design and mockups; Thridify adds interactive 3D and app-free AR. Many brands design visuals in Canva and use Thridify for the live 3D product experience.',
      },
      {
        q: 'Can I add a 3D product viewer to a Canva website?',
        a: 'Yes. Publish the experience in Thridify, then embed it on your Canva website with a lightweight snippet. The JS SDK renders the live 3D and AR experience.',
      },
      {
        q: 'Do my customers need an app for AR?',
        a: 'No. AR runs in the browser on any modern smartphone, so shoppers place products in their room in one tap — no app download.',
      },
      {
        q: 'Why move from mockups to 3D?',
        a: 'Flat mockups show one fixed angle; interactive 3D and AR let buyers explore every angle and see the product in their own space, which builds confidence and cuts returns.',
      },
    ],
    related: ['wix', 'shopify', 'custom-integration'],
    relatedIndustries: ['furniture', 'laminates-surfaces', 'modular-kitchens'],
  },
  {
    slug: 'wordpress',
    name: 'WordPress',
    icon: 'wordpress',
    heroDemo: 'configurator',
    primaryKeyword: '3D product configurator for WordPress',
    keywords: [
      '3D product configurator for WordPress',
      'WordPress 3D viewer',
      'WordPress AR product viewer',
      'add 3D to WordPress',
      'WordPress 3D plugin',
    ],
    seoTitle: '3D Product Configurator & AR for WordPress',
    seoDescription:
      'Add a 3D product configurator, 360° viewer and app-free AR to any WordPress site. Thridify installs via a plugin or a lightweight embed — WooCommerce or not.',
    hero: {
      eyebrow: 'WordPress Integration',
      h1: '3D Product Configurator & AR for WordPress',
      subtitle:
        'Add an interactive 3D configurator, 360° viewer and app-free AR to any WordPress page — installed with a plugin or a lightweight embed.',
    },
    tagline: 'A 3D configurator, 360° viewer and web AR for any WordPress site.',
    integrationIntro:
      'Build your configurator, 360° viewer and AR experience once in Thridify and publish it. Add it to any WordPress page with the Thridify plugin (a shortcode or block) or a lightweight embed snippet; the JS SDK renders the published experience by ID — WooCommerce or a plain WordPress site. AR runs in the browser — no app for your shoppers.',
    installLabel: 'Install: WordPress plugin (shortcode/block) or embed snippet',
    steps: [
      {
        heading: 'Publish an experience in Thridify',
        body: 'Create the 3D configurator, 360° viewer or AR experience for your product and publish it — each gets a stable ID.',
      },
      {
        heading: 'Add it to a WordPress page',
        body: 'Install the Thridify plugin and drop in the shortcode/block, or paste the embed, then map it to the product by ID.',
      },
      {
        heading: 'Visitors configure, spin and place in AR',
        body: 'The JS SDK renders the live experience on the page — visitors configure options and view the item in their room, app-free.',
      },
    ],
    helpsIntro:
      'WordPress runs every kind of site, not just shops. Thridify adds an interactive 3D experience to product pages, landing pages and catalogues alike.',
    helps: [
      {
        capability: 'configurator',
        heading: 'A 3D configurator via plugin or embed',
        body: 'Add the configurator with a shortcode/block or a snippet — shoppers swap finishes and options with live pricing.',
      },
      {
        capability: 'ar',
        heading: 'App-free AR on any WordPress page',
        body: 'One tap places the product at true scale in the visitor’s space, straight from the WordPress page — no app.',
      },
      {
        capability: 'viewer',
        heading: '360° viewer anywhere on the site',
        body: 'Drop a drag-to-spin 3D viewer into product pages, landing pages or catalogues — wherever it helps buyers.',
      },
    ],
    outcomes: [
      { metric: 'conversion', context: 'Interactive product experiences turn WordPress visitors into confident buyers.' },
      { metric: 'engagement', context: 'Exploring products in 3D keeps visitors on the page far longer.' },
      { metric: 'returns', context: 'Seeing true finish and scale before checkout cuts “not as pictured” returns.' },
    ],
    faqs: [
      {
        q: 'Does Thridify work with WordPress?',
        a: 'Yes. Thridify adds a 3D configurator, 360° viewer and app-free AR to any WordPress site via a plugin (shortcode/block) or a lightweight embed — with or without WooCommerce.',
      },
      {
        q: 'How do I add a 3D configurator to WordPress?',
        a: 'Publish the experience in Thridify, then install the plugin and add the shortcode/block, or paste the embed, and map it to the product by ID. The JS SDK renders it live.',
      },
      {
        q: 'Do I need WooCommerce to use Thridify on WordPress?',
        a: 'No. Thridify works on any WordPress page. If you run WooCommerce, it maps to your products and variants; on a plain WordPress site it embeds anywhere.',
      },
      {
        q: 'Do my visitors need an app for AR?',
        a: 'No. AR runs in the browser on any modern smartphone, so WordPress visitors place products in their room in one tap — no app download.',
      },
    ],
    related: ['woocommerce', 'wix', 'custom-integration'],
    relatedIndustries: ['furniture', 'modular-kitchens', 'doors-and-windows'],
  },
  {
    slug: 'custom-integration',
    name: 'Custom Integration',
    icon: 'code',
    heroDemo: 'viewer',
    primaryKeyword: 'custom 3D and AR integration via API and SDK',
    keywords: [
      'custom 3D and AR integration',
      '3D product viewer SDK',
      'AR product viewer API',
      'embed 3D product experience',
      '3D configurator SDK for custom sites',
    ],
    seoTitle: 'Custom 3D & AR Integration via API & SDK',
    seoDescription:
      'Add a 3D viewer, configurator and app-free AR to any custom site or app with the Thridify JS SDK, embed code and API — pass a product, variant or account ID and render.',
    hero: {
      eyebrow: 'Custom Integration',
      h1: 'Custom 3D & AR Integration via API & SDK',
      subtitle:
        'Add a 3D viewer, configurator and app-free AR to any custom storefront or app with the Thridify JS SDK, embed code and API.',
    },
    tagline: 'The JS SDK, embed code and API to add 3D and AR to any custom site or app.',
    integrationIntro:
      'For a bespoke storefront or app, Thridify gives you the raw building blocks. Build a 360° viewer, configurator or AR experience once in Thridify and publish it, then render it anywhere with the JS SDK or embed code — passing the product, variant or account ID your app resolves. The API and events let your app react to what shoppers do. AR runs in the browser — no app for your users.',
    installLabel: 'Install: Thridify JS SDK, embed code + API',
    steps: [
      {
        heading: 'Publish an experience in Thridify',
        body: 'Create the 3D viewer, configurator or AR experience and publish it — each gets a stable ID you reference in code.',
      },
      {
        heading: 'Render with the SDK or embed',
        body: 'Mount the experience anywhere with the JS SDK or embed code, passing the product, variant or account ID your app resolves.',
      },
      {
        heading: 'React with the API and events',
        body: 'Use the events API to sync configuration, price and add-to-cart with your own backend and analytics.',
      },
    ],
    helpsIntro:
      'A custom stack needs primitives, not a plugin. Thridify exposes the SDK, embed and API so your team controls exactly how 3D and AR appear.',
    helps: [
      {
        capability: 'viewer',
        heading: '360° viewer, SDK-mounted',
        body: 'Drop a drag-to-spin 3D viewer anywhere in your app with a single SDK call — full control of layout and lifecycle.',
      },
      {
        capability: 'configurator',
        heading: 'Configurator wired to your backend',
        body: 'Shoppers configure options live; the events API syncs the selection, price and BOM with your own systems.',
      },
      {
        capability: 'ar',
        heading: 'App-free AR, no native build',
        body: 'One tap launches browser AR at true scale — no native app or store submission for your users.',
      },
    ],
    outcomes: [
      { metric: 'conversion', context: 'Interactive product views turn custom-storefront browsers into confident buyers.' },
      { metric: 'engagement', context: 'Shoppers exploring products in 3D stay in your app far longer.' },
      { metric: 'returns', context: 'Seeing true scale and finish before checkout cuts “not as pictured” returns.' },
    ],
    faqs: [
      {
        q: 'How do I add Thridify to a custom-built site?',
        a: 'Publish the experience in Thridify, then render it with the JS SDK or embed code, passing the product, variant or account ID your app resolves. The API and events wire it to your backend.',
      },
      {
        q: 'Is there an API and SDK for 3D and AR?',
        a: 'Yes. Thridify provides a JS SDK, embed code and an API with an events layer, so your team controls exactly how the 3D viewer, configurator and AR appear and behave.',
      },
      {
        q: 'Does the AR need a native app?',
        a: 'No. AR runs in the browser on any modern smartphone, so your users place products in their room in one tap — no native app or app-store submission.',
      },
      {
        q: 'Which frameworks does the SDK support?',
        a: 'The SDK is framework-agnostic JavaScript, so it mounts in React, Vue, Angular or plain-JS apps and any custom storefront.',
      },
      {
        q: 'Can I sync configuration and price with my backend?',
        a: 'Yes. The events API emits configuration, price and add-to-cart events so you can sync with your own cart, pricing and analytics.',
      },
    ],
    related: ['commercetools', 'wordpress', 'shopify'],
    relatedIndustries: ['industrial-machinery', 'furniture', 'prefab-structures'],
  },
];

export const INTEGRATION_SLUGS = INTEGRATIONS.map((i) => i.slug);

export function getIntegration(slug: string): Integration | undefined {
  return INTEGRATIONS.find((i) => i.slug === slug);
}
