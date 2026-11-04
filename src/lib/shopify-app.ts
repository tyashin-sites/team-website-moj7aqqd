/**
 * The Thridify Shopify app: the one source for the canonical page at
 * /integrations/shopify, the "Available on Shopify" links across the site, and
 * the Shopify block in /llms.txt.
 *
 * Accuracy rules (the App Store listing only may describe what the installed
 * app does, and this page must agree with the listing):
 *   - Capabilities match the live listing at SHOPIFY_APP_URL (checked
 *     2026-11-03). Shop the Look, Shop the Room and multi-product room scenes
 *     are thridify.com features, NOT in the Shopify app. Do not add them here
 *     until they ship in the plugin.
 *   - No Thridify plan prices on thridify.com. Say "free plan available on the
 *     Shopify App Store" and link to the listing.
 */

export const SHOPIFY_APP_URL = 'https://apps.shopify.com/thridify-3d-ar-configurator';
export const SHOPIFY_APP_NAME = 'Thridify 3D-AR-Configurator';
export const SHOPIFY_PAGE_PATH = '/integrations/shopify';

/** Listing intro, verbatim from the App Store (entity consistency). */
export const SHOPIFY_APP_INTRO =
  '3D product viewer and configurator. Shoppers spin, customize and place items in their room with AR.';

/** One-sentence summary, reused by the page description, schema and llms.txt. */
export const SHOPIFY_APP_SUMMARY =
  'Thridify is a Shopify app that adds a 3D product viewer, a 3D product configurator and AR "view in your room" to product and collection pages. You add it with the app embed or theme blocks, so your theme code stays untouched.';

export type ShopifyFeature = { title: string; body: string };

/** What the app does on a Shopify store today, in the listing's order. */
export const SHOPIFY_FEATURES: ShopifyFeature[] = [
  {
    title: '3D viewer on the product page',
    body: 'Shoppers rotate, zoom and measure the product in 3D right where the photos are. Show it as a floating icon, a button under Add to cart, or inline next to the gallery.',
  },
  {
    title: 'AR on iPhone and Android',
    body: 'One tap opens the product at true size in the shopper’s room through the phone camera. Nobody installs an app. On a laptop, shoppers scan a QR code and carry on from their phone.',
  },
  {
    title: 'Live 3D product configurator',
    body: 'Shoppers switch finishes, materials and variants and watch the model change while they choose. Useful when a sofa comes in nine fabrics and you photographed two.',
  },
  {
    title: '3D badges on collection cards',
    body: 'A small 3D badge on each product card tells browsers which items open in 3D before they click through.',
  },
  {
    title: 'Catalog matching, no renaming',
    body: 'Products match by SKU, handle, Shopify product ID or title. When you add or edit a product, the match updates on its own, and there is a Sync now button if you want it right away.',
  },
  {
    title: 'App embed or theme blocks',
    body: 'Turn on the app embed in the theme editor, or drop the product and collection blocks exactly where you want them. Your theme code stays as it is.',
  },
  {
    title: 'Orders that followed a 3D or AR view',
    body: 'See which orders came after a shopper opened 3D or AR, side by side with the orders that didn’t.',
  },
];

export type ShopifyStep = { name: string; text: string };

/** Setup, as it actually runs (HowTo schema reads this list). */
export const SHOPIFY_SETUP: ShopifyStep[] = [
  {
    name: 'Install Thridify from the Shopify App Store',
    text: 'Open the Thridify 3D-AR-Configurator listing and click Install. There is a free plan, so you can try it on a live product first.',
  },
  {
    name: 'Connect a Thridify account',
    text: 'Inside Shopify admin, create a Thridify account or connect the one you have. Your store and its catalog link automatically.',
  },
  {
    name: 'Turn on the app embed',
    text: 'Click Turn on the app embed. The theme editor opens with Thridify 3D switched on; click Save. If you want exact placement, add the product or collection block instead.',
  },
  {
    name: 'Publish 3D products',
    text: 'Use your own GLB or USDZ files, or have Thridify’s team model the products for you. Each published product matches its Shopify listing by SKU, handle, product ID or title.',
  },
  {
    name: 'Check the storefront',
    text: 'Open a matched product page. The 3D viewer, AR button and configurator options appear, and collection cards show a 3D badge.',
  },
];

export type ShopifyIndustry = { name: string; body: string; href: string };

export const SHOPIFY_INDUSTRIES: ShopifyIndustry[] = [
  {
    name: 'Furniture',
    body: 'Sofas, beds and tables in every fabric and size, placed in the room at true scale before anyone books a delivery slot.',
    href: '/industries/furniture',
  },
  {
    name: 'Kitchens',
    body: 'Cabinet fronts, worktops and handles swapped live, so a buyer sees the finish they’re paying for.',
    href: '/industries/modular-kitchens',
  },
  {
    name: 'Doors and windows',
    body: 'Frames, glass and hardware configured in 3D, then checked against the real opening with AR.',
    href: '/industries/doors-and-windows',
  },
  {
    name: 'Bathroom fittings',
    body: 'Basins, taps and vanities in each finish, viewed in the shopper’s own bathroom.',
    href: '/industries/sanitaryware',
  },
  {
    name: 'Tiles and surfaces',
    body: 'Close-up texture and colour in 3D, which a flat swatch photo never shows properly.',
    href: '/industries/laminates-surfaces',
  },
  {
    name: 'Lighting',
    body: 'Pendants and lamps sized against the real ceiling height, in every finish you stock.',
    href: '/industries',
  },
];

export type ShopifyFaq = { q: string; a: string };

/** Direct answers to the questions merchants actually type. */
export const SHOPIFY_FAQS: ShopifyFaq[] = [
  {
    q: 'How do I add a 3D product configurator to Shopify?',
    a: 'Install Thridify 3D-AR-Configurator from the Shopify App Store, connect a Thridify account and turn on the app embed in your theme editor. Once a product is published in Thridify, the configurator appears on its Shopify product page and shoppers can switch finishes, materials and variants in 3D. You don’t edit any theme code.',
  },
  {
    q: 'Does the AR work on iPhone?',
    a: 'Yes. AR works on iPhone and iPad through Apple’s built-in AR viewer, and on Android phones that support Google’s Scene Viewer. Shoppers tap the AR button and the product appears at true size in their room. There is no app to download. On a desktop, they scan a QR code to open the same product on their phone.',
  },
  {
    q: 'Do I need 3D models already?',
    a: 'No. If you have GLB or USDZ files, you can use them. If you don’t, Thridify’s 3D modelling team builds the models from your product photos and dimensions.',
  },
  {
    q: 'Will it slow down my Shopify store?',
    a: 'Thridify loads a small script first and only loads the 3D viewer on products that actually have a 3D model. Pages without 3D carry almost nothing extra.',
  },
  {
    q: 'Does it work with my theme?',
    a: 'It works with Online Store 2.0 themes, including Dawn. You add it through the app embed or theme blocks in the theme editor, so your theme files are never edited. If your gallery is unusual, you can point the block at it with a CSS selector.',
  },
  {
    q: 'How does Thridify know which Shopify product to show?',
    a: 'It matches each published 3D product to your catalog by SKU, handle, Shopify product ID or title, so you don’t rename anything. Matches update when products change, and Sync now forces a refresh.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes, there is a free plan on the Shopify App Store. Paid plans add more products, the live configurator and branding options. Current plans are listed on the App Store page.',
  },
  {
    q: 'Can I see whether 3D and AR lead to sales?',
    a: 'Yes. The app reports which orders came after a shopper opened 3D or AR, compared with the orders that came without it.',
  },
];
