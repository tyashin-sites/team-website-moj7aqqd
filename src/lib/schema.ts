/**
 * Sitewide entity graph (DESIGN-SPEC growth surface / BUILD-PLAN Phase 3).
 *
 * The point of this module is ENTITY CONSISTENCY: every page carries the same
 * Organization + SoftwareApplication description, name, socials and legal name,
 * so search engines and LLMs resolve one unambiguous "Thridify" entity. The
 * canonical description below is used VERBATIM here, on /what-is-thridify, and
 * in /llms.txt — do not paraphrase it in one place and not another.
 *
 * These blocks intentionally do NOT declare offers/price/aggregateRating —
 * we have no honest, verifiable aggregate rating or public price, and the
 * No-Faking rule forbids inventing one.
 *
 * URLs are absolute against SITE_URL — the ONE canonical-host source shared by
 * layout.tsx (metadataBase → <link rel=canonical>), the JSON-LD here, and
 * /sitemap-pages.xml, so canonicals and the sitemap always agree. The fallback
 * is the live preview host (team-website-moj7aqqd.sites.tyashin.com) — the host
 * the site is actually served on and the one the platform's sitemap-index +
 * robots reference; the Phase-7 cutover sets env SITE_URL to the production host
 * and everything moves together.
 */

export const SITE_URL =
  process.env.SITE_URL ?? 'https://team-website-moj7aqqd.sites.tyashin.com';

/** The single canonical entity description — reused verbatim everywhere. */
export const CANONICAL_DESCRIPTION =
  'Thridify is a no-code 3D and AR commerce platform and 3D modelling service that lets furniture, kitchen, door, and other custom-product brands offer 3D product configurators with live pricing, app-free AR viewing, and photoreal 3D models — reducing product returns and closing sales faster.';

export const LEGAL_NAME = 'Aapastech Private Limited';

/** The four canonical Thridify social profiles (sameAs). WhatsApp is a contact
 *  channel, not a profile, so it is deliberately excluded from sameAs. */
export const CANONICAL_SOCIALS = [
  'https://linkedin.com/company/thridify',
  'https://instagram.com/thridify',
  'https://facebook.com/thridify',
  'https://youtube.com/@thridify',
];

/** Absolute logo URL for schema (Organization.logo / image). */
const LOGO_URL = `${SITE_URL}/brand/logo-favicon.png`;

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Thridify',
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    description: CANONICAL_DESCRIPTION,
    email: 'contact@thridify.com',
    founder: [
      { '@type': 'Person', name: 'Shikha Gupta', jobTitle: 'CEO' },
      { '@type': 'Person', name: 'Aditya Gupta', jobTitle: 'CTO' },
    ],
    sameAs: CANONICAL_SOCIALS,
  };
}

export function softwareApplicationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Thridify',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    image: LOGO_URL,
    description: CANONICAL_DESCRIPTION,
    publisher: { '@type': 'Organization', name: 'Thridify', legalName: LEGAL_NAME, url: SITE_URL },
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Thridify',
    url: SITE_URL,
    description: CANONICAL_DESCRIPTION,
    publisher: { '@type': 'Organization', name: 'Thridify', url: SITE_URL },
  };
}
