/**
 * Platform-specific install guides for the EMBED integration pages.
 *
 * Why this exists: the embed pages (Drupal, Squarespace, PrestaShop,
 * commercetools, plain WordPress) were one template with the platform name
 * swapped in, and Google declined to index them (GSC, Nov 2026). What makes
 * them genuinely different is the installation itself: where the snippet
 * goes on each platform, what that platform strips or caches, and where the
 * product ID comes from.
 *
 * No-Faking: the snippet is the real Thridify runtime contract —
 * `window.thridifyData` ({ accountId, custom_product_id, custom_variant_id })
 * read by https://viewer.thridify.com/floating-icon.js, the
 * `data-thridify-page-product-id` attribute, and the optional
 * `window.thridifyCommerce` adapter (getVariantContext / onConfigurationChange
 * / addToCart). See thridify-fe src/plugin/floating-icon.js and
 * packages/core/src/context.ts. Platform facts are the platforms' own
 * documented behaviour. Nothing here claims a native module that does not exist.
 */

export type InstallStep = { heading: string; body: string; code?: string; codeLang?: string };
export type InstallGuide = {
  heading: string;
  intro: string;
  steps: InstallStep[];
  gotchasHeading: string;
  gotchas: string[];
};

const ACCOUNT_SNIPPET = `<script>
  window.thridifyData = Object.assign(
    { accountId: "YOUR_THRIDIFY_ACCOUNT_ID" },
    window.thridifyData || {}
  );
</script>
<script src="https://viewer.thridify.com/floating-icon.js" async></script>`;

export const INSTALL_GUIDES: Record<string, InstallGuide> = {
  drupal: {
    heading: 'Installing Thridify on Drupal Commerce',
    intro:
      'There is no Drupal module to install. Thridify runs from one script on the page plus the ID of the product being viewed, and Drupal gives you two clean places to put them: a theme library or a block. Both survive core and Commerce updates.',
    steps: [
      {
        heading: 'Load the Thridify script from your theme',
        body: 'Add the script as an external library in your theme’s *.libraries.yml and attach it in the product template, so it loads only on product pages. If you would rather not touch the theme, place a custom block in the content region and limit it to product URLs (Drupal Commerce uses /product/* by default) under the block’s visibility settings.',
        code: `# mytheme.libraries.yml
thridify:
  js:
    https://viewer.thridify.com/floating-icon.js: { type: external, attributes: { async: true } }

{# templates/commerce/commerce-product.html.twig #}
{{ attach_library('mytheme/thridify') }}`,
        codeLang: 'twig',
      },
      {
        heading: 'Tell Thridify which product is on screen',
        body: 'Output your account ID and the product reference you set for that product in Thridify. In the commerce-product Twig template the product entity is available, so its ID can be printed straight into a data attribute.',
        code: `<script>
  window.thridifyData = Object.assign(
    { accountId: "YOUR_THRIDIFY_ACCOUNT_ID" },
    window.thridifyData || {}
  );
</script>
<div data-thridify-page-product-id="{{ product_entity.id }}"></div>`,
        codeLang: 'twig',
      },
      {
        heading: 'Clear the cache and check a product page',
        body: 'Drupal caches rendered pages and blocks, so rebuild caches (drush cr, or Clear all caches under Performance) before testing. On a product with a published experience you should see the 3D trigger next to the gallery.',
      },
    ],
    gotchasHeading: 'Drupal-specific things to watch',
    gotchas: [
      'The Basic HTML and Restricted HTML text formats strip <script> tags. If you paste the snippet into a block body, use a text format without the "Limit allowed HTML" filter (normally Full HTML, which only trusted roles should have), or load it from the theme instead.',
      'If you use BigPipe or other lazy rendering, keep the script in the page template or a library rather than a placeholder that renders late.',
      'Product variations have their own IDs. If your experience has finishes that match variations, set custom_variant_id from the selected variation, or connect the variant picker with the window.thridifyCommerce adapter described on the Custom Integration page.',
    ],
  },

  squarespace: {
    heading: 'Installing Thridify on Squarespace',
    intro:
      'Squarespace has no app store for this kind of extension, so Thridify goes in through Squarespace’s own code features: one script for the whole site, and one small block on each product that has a 3D experience.',
    steps: [
      {
        heading: 'Add the script in Code Injection',
        body: 'Open Code Injection in your site settings (Squarespace has moved the menu between versions, so searching the settings for "code injection" is quickest) and paste the account snippet into the Footer field. It then loads on every page, and does nothing on pages without a Thridify product.',
        code: ACCOUNT_SNIPPET,
        codeLang: 'html',
      },
      {
        heading: 'Mark each product with its Thridify ID',
        body: 'Edit the product, add a Code Block to its Additional info area, and paste one line with the product reference you set in Thridify. Products without the block are left alone.',
        code: `<div data-thridify-page-product-id="sofa-ravello"></div>`,
        codeLang: 'html',
      },
      {
        heading: 'Preview logged out',
        body: 'Squarespace’s editor preview does not always run injected scripts. Check the live product page in a private window to see what shoppers see.',
      },
    ],
    gotchasHeading: 'Squarespace-specific things to watch',
    gotchas: [
      'Code Injection and Code Blocks that run JavaScript are only available on Squarespace’s higher plans. On the entry plan they are disabled, so check your plan before you start.',
      'Code Blocks set to Markdown or plain text display the snippet as text. Leave the block in HTML mode.',
      'If you use an older 7.0 template with Ajax page loading, scripts in the footer may not re-run when shoppers move between products. Turning Ajax loading off in the template settings is the simple fix.',
    ],
  },

  prestashop: {
    heading: 'Installing Thridify on PrestaShop',
    intro:
      'Thridify does not ship a PrestaShop module today. It goes into your theme’s product template, which in PrestaShop 1.7, 8 and 9 already knows the product and combination being viewed, so no extra lookups are needed.',
    steps: [
      {
        heading: 'Work in a child theme',
        body: 'Create a child theme of your current theme (or use the one you already have) so a theme update does not overwrite your change.',
      },
      {
        heading: 'Add the snippet to the product template',
        body: 'Override templates/catalog/product.tpl in the child theme and add the snippet near the product images. Smarty gives you the product ID and the selected combination directly.',
        code: `{* themes/your-child-theme/templates/catalog/product.tpl *}
<script>
  window.thridifyData = Object.assign({
    accountId: "YOUR_THRIDIFY_ACCOUNT_ID",
    custom_product_id: "{$product.id_product|escape:'javascript'}",
    custom_variant_id: "{$product.id_product_attribute|escape:'javascript'}"
  }, window.thridifyData || {});
</script>
<script src="https://viewer.thridify.com/floating-icon.js" async></script>`,
        codeLang: 'smarty',
      },
      {
        heading: 'Clear the cache',
        body: 'Go to Advanced Parameters, then Performance, and click Clear cache so PrestaShop recompiles the template. Then open a product that has a published experience.',
      },
    ],
    gotchasHeading: 'PrestaShop-specific things to watch',
    gotchas: [
      'If you prefer a module to a theme override, a small custom module hooked to displayProductAdditionalInfo or displayFooterProduct can output the same snippet. It survives theme switches but needs a developer to write.',
      'Combinations change by Ajax without a page reload. To keep the 3D finish in step with the selected combination, dispatch a thridify:variant-context event from your theme’s updatedProduct handler, or wire the window.thridifyCommerce adapter.',
      'With "Force compilation" off and the Smarty cache on, a stale template is the usual reason nothing appears. Clear the cache before debugging anything else.',
    ],
  },

  commercetools: {
    heading: 'Installing Thridify on a commercetools storefront',
    intro:
      'commercetools is headless: it has no storefront templates for a snippet to go into. Thridify is added to your own frontend, whatever it is built with, and talks to commercetools only through your code.',
    steps: [
      {
        heading: 'Load the script on the client',
        body: 'The Thridify viewer is a browser component, so load it after hydration. In Next.js, for example, use next/script with the afterInteractive strategy on the product page.',
        code: `import Script from "next/script";

<Script id="thridify-data" strategy="afterInteractive">
  {\`window.thridifyData = Object.assign({ accountId: "YOUR_THRIDIFY_ACCOUNT_ID" }, window.thridifyData || {});\`}
</Script>
<Script src="https://viewer.thridify.com/floating-icon.js" strategy="afterInteractive" />`,
        codeLang: 'tsx',
      },
      {
        heading: 'Pass the product key and the selected SKU',
        body: 'Use a stable identifier as the Thridify product reference. The product key works well because it does not change between environments. Expose the current variant’s SKU through window.thridifyCommerce, and Thridify uses the binding published for that SKU.',
        code: `<div data-thridify-page-product-id={product.key} />

window.thridifyCommerce = {
  getVariantContext: () => ({ sku: selectedVariant.sku }),
  onConfigurationChange: (change) => syncVariantPicker(change),
  addToCart: async (req) => addLineItem(selectedVariant.sku, req),
};`,
        codeLang: 'tsx',
      },
      {
        heading: 'Add configured items to the cart',
        body: 'When addToCart is defined, the viewer offers its own Add to cart button. Your handler adds the line item with your own price and can keep the shopper’s configuration on it.',
      },
    ],
    gotchasHeading: 'commercetools-specific things to watch',
    gotchas: [
      'Storing the configuration summary on a line item needs a custom field, and custom fields on line items need a custom Type defined in your project first.',
      'Product IDs are UUIDs that differ between projects. Keys and SKUs are easier to keep consistent between staging and production.',
      'If your frontend navigates client-side between products, listen for the thridifyReady event and call the plugin’s loadAndStartApp with the new product, rather than adding the script again.',
    ],
  },

  wordpress: {
    heading: 'Adding Thridify to a WordPress site without WooCommerce',
    intro:
      'The Thridify plugin is built for WooCommerce stores. If your WordPress site has no shop (a brand site, a dealer catalogue, a landing page) Thridify goes in as a small snippet instead, and still shows the 3D viewer, configurator and AR.',
    steps: [
      {
        heading: 'Load the script once for the whole site',
        body: 'Add the account snippet to the site footer. A theme’s footer-scripts setting or a header-and-footer plugin works; a developer can also enqueue it from the child theme’s functions.php.',
        code: ACCOUNT_SNIPPET,
        codeLang: 'html',
      },
      {
        heading: 'Place the product on a page',
        body: 'In the block editor, add a Custom HTML block where the product should appear and paste one line with the product reference you set in Thridify.',
        code: `<div data-thridify-page-product-id="sofa-ravello"></div>`,
        codeLang: 'html',
      },
      {
        heading: 'If you add WooCommerce later',
        body: 'Switch to the Thridify for WooCommerce plugin. It connects your store, syncs the catalogue, matches products by ID, SKU, slug or name, and adds variation sync and add to cart from the viewer.',
      },
    ],
    gotchasHeading: 'WordPress-specific things to watch',
    gotchas: [
      'WordPress removes <script> tags for users without the unfiltered_html capability. On a single site, Administrators and Editors have it; on Multisite only Super Admins do. If a snippet disappears on save, that is why.',
      'Caching and optimisation plugins sometimes delay or combine scripts. If the 3D trigger does not appear, exclude viewer.thridify.com from script combining or delay, then purge the cache.',
      'The plugin requires WooCommerce. Installing it on a site without WooCommerce leaves it inactive.',
    ],
  },
};

export function getInstallGuide(slug: string): InstallGuide | undefined {
  return INSTALL_GUIDES[slug];
}
