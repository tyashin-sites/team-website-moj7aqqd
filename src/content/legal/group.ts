// Group facts shared by every legal page on thridify.com. Single point of
// change: the privacy policy, the Shopify app pages, the Platform Terms, the
// DPA and the grievance pages all read these, so they cannot drift.
// Source: yom-legal-pack/PUBLISH-KIT.md ("Facts used") and
// COUNSEL-DETERMINATIONS.md section 1 (v1.0, 26 October 2026).

export const LEGAL_EMAIL = 'contact@aapastech.com';

export const INDIA_ENTITY = {
  name: 'Aapastech Private Limited',
  cin: 'U72900DL2022PTC395508',
  address: '8/3, 2nd Floor, Roop Nagar, Delhi 110007',
  country: 'India',
} as const;

export const CANADA_ENTITY = {
  name: '14818032 Canada Inc.',
  place: 'Burlington, Ontario',
  country: 'Canada',
} as const;

/** Grievance Officer (India), Privacy Officer (Canada), person in charge (Quebec). */
export const OFFICER = {
  name: 'Shikha Gupta',
  email: LEGAL_EMAIL,
  phoneIndia: '+91 96677 47082',
  phoneIndiaHref: 'tel:+919667747082',
  phoneCanada: '+1 437 800 0190',
  phoneCanadaHref: 'tel:+14378000190',
} as const;

/** Effective date of the 26 October 2026 legal update. */
export const LEGAL_UPDATE_DATE = '26 October 2026';
