import { SITE_URL, CANONICAL_DESCRIPTION, LEGAL_NAME } from '@/lib/schema';
import { INDUSTRIES } from '@/lib/industries';
import { COMPETITORS } from '@/lib/comparisons';

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
Shopify, WooCommerce, WordPress, and custom storefronts.

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
- Platform: ${SITE_URL}/platform
- 3D Modelling Service: ${SITE_URL}/services/3d-modelling
- Industries: ${SITE_URL}/industries
- About: ${SITE_URL}/about
- Contact: ${SITE_URL}/contact

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
