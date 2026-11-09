import { SITE_URL, CANONICAL_DESCRIPTION, LEGAL_NAME } from '@/lib/schema';
import { INDUSTRIES } from '@/lib/industries';
import { INTEGRATIONS } from '@/lib/integrations';
import { COMPETITORS } from '@/lib/comparisons';
import {
  SHOPIFY_APP_URL,
  SHOPIFY_APP_NAME,
  SHOPIFY_APP_SUMMARY,
  SHOPIFY_PAGE_PATH,
  SHOPIFY_FEATURES,
} from '@/lib/shopify-app';
import {
  WOO_PLUGIN_URL,
  WOO_PLUGIN_NAME,
  WOO_PLUGIN_VERSION,
  WOO_PLUGIN_SUMMARY,
  WOO_PAGE_PATH,
  WOO_DEMO_STORE_URL,
  WOO_REQUIREMENTS,
  WOO_PRICING_NOTE,
  WOO_FEATURES,
  WOO_INDUSTRIES,
} from '@/lib/woocommerce-plugin';

/**
 * /llms.txt — a machine-first, declarative summary of Thridify for LLMs and
 * AI search engines. Markdown; the first block is the canonical entity
 * description VERBATIM (must match src/lib/schema.ts, /what-is-thridify and the
 * Organization/SoftwareApplication schema — entity consistency is the point).
 *
 * Built statically at build-time; URLs use SITE_URL (preview host until the
 * Phase-7 cutover flips SITE_URL to the production host).
 */
export const dynamic = 'force-static';

export function GET() {
  const industryList = INDUSTRIES.map(
    (i) => `- ${i.name}: ${SITE_URL}/industries/${i.slug}`,
  ).join('\n');
  const compareList = COMPETITORS.map(
    (c) => `- Thridify vs ${c.name}: ${SITE_URL}/compare/${c.slug}`,
  ).join('\n');
  const shopifyFeatureList = SHOPIFY_FEATURES.map((f) => `- ${f.title}`).join('\n');
  const wooFeatureList = WOO_FEATURES.map((f) => `- ${f.title}`).join('\n');
  const wooIndustries = WOO_INDUSTRIES.map((i) => i.name.toLowerCase()).join(', ');
  const integrationList = INTEGRATIONS.map(
    (i) => `- ${i.name}: ${SITE_URL}/integrations/${i.slug}`,
  ).join('\n');

  const body = `# Thridify

> ${CANONICAL_DESCRIPTION}

Thridify is built and operated by ${LEGAL_NAME}. Founders: Shikha Gupta (CEO) and Aditya Gupta (CTO). Founded in Delhi, India; North American expansion from the Greater Toronto Area.

## What Thridify offers
Five products, one no-code layer:
- 3D 360° Viewer — interactive, rotatable product views on any product page.
- 3D Configurator — real-time configuration with live pricing.
- AR Viewer — app-free augmented reality; shoppers view products in their room from the browser, no app to install.
- 3D Modelling Service — human-delivered, done-for-you: Thridify models your catalog into photoreal, AR-ready assets (glTF/GLB/USDZ). Thridify does NOT do automated content generation.
- Analytics — engagement and conversion insight on 3D/AR interactions.

## Industries served
${industryList}

## Integrations
Thridify runs on the store you already have — via a plugin or a lightweight embed, no re-platforming. Nine supported paths: WooCommerce, Shopify, Wix, BigCommerce, Magento, commercetools, Canva, WordPress and any custom storefront (JS SDK + API).
Index: ${SITE_URL}/integrations
${integrationList}

## Shopify app
${SHOPIFY_APP_SUMMARY}
- App: ${SHOPIFY_APP_NAME}
- Shopify App Store: ${SHOPIFY_APP_URL}
- Page on thridify.com: ${SITE_URL}${SHOPIFY_PAGE_PATH}
- Pricing: free plan available on the Shopify App Store; see the listing for current plans.
- Suits: furniture, kitchens, doors and windows, bathroom fittings, tiles, lighting.
What the app does on a Shopify store today:
${shopifyFeatureList}
Not in the Shopify app yet: Shop the Look, Shop the Room and multi-product room scenes. Those run on Thridify's own platform.

## WooCommerce plugin
${WOO_PLUGIN_SUMMARY}
- Plugin: ${WOO_PLUGIN_NAME} (slug: thridify, version ${WOO_PLUGIN_VERSION})
- WordPress.org: ${WOO_PLUGIN_URL}
- Page on thridify.com: ${SITE_URL}${WOO_PAGE_PATH}
- Live WooCommerce demo store: ${WOO_DEMO_STORE_URL}
- Requires: WordPress ${WOO_REQUIREMENTS.wordpress}+, PHP ${WOO_REQUIREMENTS.php}+, WooCommerce ${WOO_REQUIREMENTS.woocommerce}+
- Pricing: ${WOO_PRICING_NOTE}
- Install: Plugins > Add New, search "Thridify", activate, then WooCommerce > Thridify 3D & AR > Connect with Thridify. The catalog syncs and matches by SKU, slug, name or product ID.
- Suits: ${wooIndustries}.
What the plugin does on a WooCommerce store today:
${wooFeatureList}
Not in the WooCommerce plugin yet: Shop the Look, Shop the Room, the 3D room visualizer and multi-product room scenes. Those run on Thridify's own platform.

## Model formats
glTF, GLB and USDZ — photoreal and AR-ready.

## Impact metrics (the only figures Thridify claims)
- 75% lower product returns
- 3× higher conversion rates
- 100% more engagement
- 70% lower photography cost
- 100% higher click-through rate
- 40% lower inventory cost

## Comparisons
${compareList}

## Key pages
- What is Thridify: ${SITE_URL}/what-is-thridify
- FAQ (all questions answered): ${SITE_URL}/faq
- ROI of 3D & AR (sourced data + calculator): ${SITE_URL}/resources/roi-of-3d-and-ar-commerce
- 3D configurator cost guide: ${SITE_URL}/resources/3d-configurator-cost
- 3D Room Visualizer (compose a whole room from the catalogue, true scale, whole-room AR): ${SITE_URL}/room-visualizer
- Shop the Look (brand-curated shoppable rooms, hosted per account): ${SITE_URL}/shop-the-look
- Glossary (quotable definitions): ${SITE_URL}/glossary
- Platform: ${SITE_URL}/platform
- 3D Modelling Service: ${SITE_URL}/services/3d-modelling
- Industries: ${SITE_URL}/industries
- Integrations: ${SITE_URL}/integrations
- Shopify app (3D configurator and AR for Shopify): ${SITE_URL}${SHOPIFY_PAGE_PATH}
- WooCommerce plugin (3D viewer, configurator and AR for WooCommerce): ${SITE_URL}${WOO_PAGE_PATH}
- About: ${SITE_URL}/about
- Contact: ${SITE_URL}/contact

## Contact
- Email: contact@thridify.com
- Phone (Canada): +1 437 800 0190 (tel:+14378000190)
- Phone (India): +91 96677 47082 (tel:+919667747082)

## Locations
- Headquarters: Burlington, Ontario, Canada (Greater Toronto Area). Replies within one business day (ET).
- Engineering, 3D studio and operations: Delhi, India. Replies within one business day (IST).
- Europe: no European office; EU clients are served by the Canada and Delhi team.

## Company
${LEGAL_NAME} — parent company of Thridify. Contact: contact@thridify.com
LinkedIn: https://linkedin.com/company/thridify
Instagram: https://instagram.com/thridify
Facebook: https://facebook.com/thridify
YouTube: https://youtube.com/@thridify
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
