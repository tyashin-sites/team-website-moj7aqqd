/**
 * The Thridify plugin for WooCommerce: the one source for the canonical page at
 * /integrations/woocommerce, the "Available on WordPress.org" links across the
 * site, and the WooCommerce block in /llms.txt.
 *
 * Accuracy rules:
 *   - Capabilities match the plugin readme and source
 *     (thridify-adapters/packages/woocommerce, v1.0.3, checked 2026-11-04).
 *     Shop the Look, Shop the Room, the 3D room visualizer and multi-product
 *     room scenes are thridify.com features, NOT in the plugin. Do not add them
 *     here until they ship in the plugin.
 *   - No Thridify plan prices or plan names on thridify.com. Say "free plugin on
 *     WordPress.org; a Thridify account is required, you can create one while
 *     connecting". The only free offers named are the 15-day trial and the demo.
 */

export const WOO_PLUGIN_URL = 'https://wordpress.org/plugins/thridify/';
export const WOO_PLUGIN_SLUG = 'thridify';
export const WOO_PLUGIN_NAME = 'Thridify – 3D & AR Product Viewer for WooCommerce';
export const WOO_PLUGIN_VERSION = '1.0.3';
export const WOO_PAGE_PATH = '/integrations/woocommerce';
export const WOO_DEMO_STORE_URL = 'https://woo.thridify.com';

export const WOO_REQUIREMENTS = {
  wordpress: '6.5',
  php: '7.4',
  woocommerce: '8.5',
} as const;

/** Pricing line, reused everywhere so the wording never drifts. */
export const WOO_PRICING_NOTE =
  'Free plugin on WordPress.org. A Thridify account is required, and you can create one while connecting.';

/** Short intro, close to the WordPress.org short description (entity consistency). */
export const WOO_PLUGIN_INTRO =
  'Show Thridify 3D, AR and product-configurator experiences on WooCommerce product pages and shop grids.';

/** One-sentence answer, reused by the page, schema and llms.txt. */
export const WOO_PLUGIN_SUMMARY =
  'Thridify is a free WordPress plugin that adds a 3D product viewer, a 3D product configurator and AR "view in your room" to WooCommerce product pages and shop grids. You install it from WordPress.org, connect a Thridify account, and your catalog matches itself by SKU, slug, name or product ID.';

export type WooFeature = { title: string; body: string };

/** What the plugin does on a WooCommerce store today (readme "What you get"). */
export const WOO_FEATURES: WooFeature[] = [
  {
    title: '3D on the product page',
    body: 'Choose a 3D icon on the gallery, a "View in 3D" button, or Images and 3D tabs under the gallery. Shoppers rotate, zoom and measure the product, and you set the position and button text.',
  },
  {
    title: 'View in 3D block and shortcode',
    body: 'Put the button exactly where you want it with the "View in 3D button" Gutenberg block, or the [thridify_3d_button] shortcode in a classic template or page builder.',
  },
  {
    title: '3D icon on shop and category cards',
    body: 'Product cards on shop, category, tag and search pages carry a small 3D icon, so browsers know which items open in 3D before they click.',
  },
  {
    title: 'Variation sync, both ways',
    body: 'Pick a WooCommerce variation and the 3D model changes. Choose a finish inside the 3D configurator and the matching variation is selected on the page.',
  },
  {
    title: 'Add to cart from the configurator',
    body: 'Shoppers add to cart without leaving 3D. Their configuration is saved as a "Configuration" line on the cart item and stays on the order. WooCommerce still sets the price.',
  },
  {
    title: 'AR on iPhone and Android, no app',
    body: 'One tap places the product at true size in the room through the phone camera, using Apple Quick Look on iPhone and iPad and Scene Viewer or WebXR on Android. Shoppers install nothing.',
  },
  {
    title: 'Catalog sync and matching',
    body: 'After you connect, product IDs, SKUs, slugs and names sync in the background, and again when products change. Each product matches its 3D experience by SKU, slug, name or ID. Prices, stock and customer data are never sent.',
  },
  {
    title: '3D column and per-product control',
    body: 'The Products list gets a "3D" column showing which products have a published experience, and each product has a switch to hide the viewer.',
  },
  {
    title: 'Experience switcher and brand colour',
    body: 'Pick which experience style shoppers see and send your brand colour to Thridify, straight from the plugin settings.',
  },
  {
    title: 'Optional 3D-assisted sales measurement',
    body: 'Off by default. Turn it on to see how many orders followed a 3D or AR view, inside WooCommerce. Its cookie respects the WP Consent API, so it is only set with statistics consent.',
  },
  {
    title: 'Fits modern and classic stores',
    body: 'Works with block themes and classic themes, the block cart and checkout, and High-Performance Order Storage (HPOS). If a theme clashes, an isolated-frame rendering mode keeps the viewer separate.',
  },
];

export type WooStep = { name: string; text: string };

/** Setup, as it actually runs (HowTo schema reads this list). */
export const WOO_SETUP: WooStep[] = [
  {
    name: 'Install the plugin from WordPress.org',
    text: 'In WordPress admin, go to Plugins, then Add New, and search for "Thridify". Install it and activate it. WooCommerce must be active.',
  },
  {
    name: 'Connect with Thridify',
    text: 'Open WooCommerce, then Thridify 3D & AR, and click "Connect with Thridify". Sign in to your Thridify account, or create one, approve the connection and you land back in WordPress.',
  },
  {
    name: 'Let the catalog sync',
    text: 'The plugin sends product IDs, SKUs, slugs and names to Thridify in the background. Each product is matched to its 3D experience by SKU by default, or by slug, name or ID.',
  },
  {
    name: 'Choose how 3D appears',
    text: 'In the Display tab, choose the gallery icon, the "View in 3D" button or Images and 3D tabs, or turn product pages off and place the block or shortcode yourself.',
  },
  {
    name: 'Publish 3D products and check the store',
    text: 'Publish experiences in Thridify from your own GLB or USDZ files, or have Thridify’s team model the products. Open a matched product: the 3D viewer, AR button and configurator options appear, and shop cards show a 3D icon.',
  },
];

export type WooIndustry = { name: string; body: string; href?: string };

/** Every vertical Thridify serves. Links go only to industry pages that exist. */
export const WOO_INDUSTRIES: WooIndustry[] = [
  { name: 'Furniture', body: 'Beds, tables and storage at true scale in the room, in every finish you sell.', href: '/industries/furniture' },
  { name: 'Sofas and upholstery', body: 'Every fabric and leg finish on one model, so you stop photographing each combination.', href: '/industries/furniture' },
  { name: 'Office furniture', body: 'Desks, chairs and workstations configured for B2B buyers who need to see the exact spec.', href: '/industries/furniture' },
  { name: 'Kitchens and cabinetry', body: 'Cabinet fronts, worktops and handles swapped live, so the buyer sees the finish they pay for.', href: '/industries/modular-kitchens' },
  { name: 'Wardrobes and closets', body: 'Door styles, interiors and sizes changed in 3D before a single panel is cut.' },
  { name: 'Doors and windows', body: 'Frames, glass and hardware configured in 3D, then checked against the real opening with AR.', href: '/industries/doors-and-windows' },
  { name: 'Bathroom fittings and sanitaryware', body: 'Basins, taps and vanities in each finish, seen in the shopper’s own bathroom.', href: '/industries/sanitaryware' },
  { name: 'Tiles and flooring', body: 'Texture and colour up close in 3D, which a flat swatch photo never shows properly.', href: '/industries/laminates-surfaces' },
  { name: 'Lighting', body: 'Pendants and lamps sized against the real ceiling, in every finish you stock.' },
  { name: 'Home decor, rugs and curtains', body: 'Rugs, curtains and decor placed in the room so size and colour stop being a guess.' },
  { name: 'Mattresses', body: 'Depth, layers and bed sizes shown in 3D and placed at true size on the bedroom floor.' },
  { name: 'Outdoor and garden furniture', body: 'Loungers, dining sets and parasols placed on the actual patio or lawn with AR.' },
  { name: 'Jewelry', body: 'Metals and stones switched in 3D, with close zoom on settings that photos flatten.' },
  { name: 'Eyewear', body: 'Frame colours and lens tints viewed from every angle in a 3D product viewer.' },
  { name: 'Footwear', body: 'A 360 product view of every colourway, sole and stitch, from one 3D model.' },
  { name: 'Fashion accessories', body: 'Bags, belts and watches in each material and colour, rotated and zoomed in 3D.' },
  { name: 'Electronics', body: 'Ports, buttons and finishes inspected in 3D, then sized on the desk with AR.', href: '/industries/electronics-audio' },
  { name: 'Home appliances', body: 'Fridges, ovens and washers checked for fit in the actual kitchen or utility space.' },
  { name: 'Industrial and B2B equipment', body: 'Machines configured option by option for quoting, and shown at true size on site.', href: '/industries/industrial-machinery' },
  { name: 'Automotive parts', body: 'Parts and accessories rotated in 3D so buyers confirm the fit before ordering.' },
  { name: 'Toys', body: 'Play sets and ride-ons seen at real size in the living room before they arrive.' },
  { name: 'Sports equipment', body: 'Bikes, gym kit and gear configured by size and colour, then placed in the room.' },
];

export type WooUseCase = { title: string; body: string };

export const WOO_USE_CASES: WooUseCase[] = [
  { title: 'WooCommerce product configurator', body: 'Shoppers change materials, colours and sizes in 3D, the matching variation is selected, and the configuration travels to the order.' },
  { title: 'AR "view in your room"', body: 'Augmented reality on WooCommerce product pages: the item appears at true size in the shopper’s space, on iPhone and Android, with no app.' },
  { title: '3D on the product page', body: 'A 3D product viewer next to, or instead of, the photo gallery, with rotate, zoom and measure.' },
  { title: '3D in the shop grid', body: 'A 3D icon on shop and category cards flags which products open in 3D before the click.' },
  { title: 'B2B quoting', body: 'Buyers configure the exact spec, add it to cart, and the "Configuration" line on the order tells your team what to quote and build.' },
  { title: 'Fewer returns, more confident buyers', body: 'When shoppers see the real finish and the real size before checkout, "not as pictured" returns drop and more browsers commit. Turn on 3D-assisted sales to see the effect in your own orders.' },
];

export type WooFaq = { q: string; a: string };

/** Direct answers to the questions merchants actually type. */
export const WOO_FAQS: WooFaq[] = [
  {
    q: 'How do I add a 3D product viewer to WooCommerce?',
    a: 'Install the free Thridify plugin from WordPress.org (Plugins, Add New, search "Thridify"), activate it, then go to WooCommerce, Thridify 3D & AR and click "Connect with Thridify". Your catalog syncs on its own, and every product with a published 3D experience shows the viewer on its product page.',
  },
  {
    q: 'Is there a WooCommerce 3D configurator plugin that syncs variations?',
    a: 'Yes. With the Thridify plugin, picking a WooCommerce variation updates the 3D model, and choosing a finish in the 3D configurator selects the matching variation. Shoppers can add to cart from the configurator, and their configuration is saved on the order line.',
  },
  {
    q: 'Does AR work on WooCommerce without an app?',
    a: 'Yes. AR opens in the browser through Apple Quick Look on iPhone and iPad and through Scene Viewer or WebXR on Android. The shopper taps the AR button and the product appears at true size in their room. Nobody downloads an app.',
  },
  {
    q: 'Is the Thridify WooCommerce plugin free?',
    a: 'The plugin is free on WordPress.org. A Thridify account is required because the 3D models, experiences and AR are hosted by Thridify, and you can create the account while connecting the plugin.',
  },
  {
    q: 'How does Thridify know which WooCommerce product to show?',
    a: 'The plugin syncs each published product’s ID, SKU, slug and name to Thridify, then matches products to 3D experiences by SKU by default, or by slug, name or ID. Products without a match look exactly as they did before.',
  },
  {
    q: 'Do I need 3D models already?',
    a: 'No. If you have GLB or USDZ files, you can use them. If you don’t, Thridify’s 3D modelling team builds the models from your product photos and dimensions.',
  },
  {
    q: 'Will it slow down my WooCommerce store?',
    a: 'The plugin adds one small script and checks a file of about 1 KB per product. The 3D viewer only loads on products that have an experience, and the heavy 3D files load when the shopper opens it.',
  },
  {
    q: 'Does it work with block themes, the block checkout and HPOS?',
    a: 'Yes. It works with block themes and classic themes, the block cart and checkout, and High-Performance Order Storage. It targets WooCommerce’s own templates and product blocks, so most themes need no changes.',
  },
  {
    q: 'Can I place the View in 3D button myself?',
    a: 'Yes. Add the "View in 3D button" block to your single-product template, or use the [thridify_3d_button] shortcode in a classic template or page builder. Set product pages to Off if you only want the button where you placed it.',
  },
  {
    q: 'Which WordPress, PHP and WooCommerce versions does it need?',
    a: 'WordPress 6.5 or later, PHP 7.4 or later and WooCommerce 8.5 or later.',
  },
];
