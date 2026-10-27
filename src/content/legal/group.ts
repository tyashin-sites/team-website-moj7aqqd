// Group facts shared by every legal page on thridify.com. Single point of
// change: the privacy policy, the Shopify app pages, the Platform Terms, the
// DPA and the grievance pages all read these, so they cannot drift.
// Source: yom-legal-pack/PUBLISH-KIT.md v2.0 ("Facts used", K1) and
// COUNSEL-DETERMINATIONS.md v2.0 section 1 (27 October 2026): India ->
// Aapastech Private Limited; EU and UK -> Aapastech OÜ; everywhere else ->
// 14818032 Canada Inc. Region = country of a business's billing address.

export const LEGAL_EMAIL = 'contact@aapastech.com';

export const INDIA_ENTITY = {
  name: 'Aapastech Private Limited',
  cin: 'U72900DL2022PTC395508',
  /** Registered office: legal notices go here. */
  address: '8/3, 2nd Floor, Roop Nagar, Delhi 110007',
  /** Principal place of business (publish kit v1.1 facts; GSTIN 06AAVCA6693D1ZK). */
  principalPlace: '1st Floor, 145, Sector 44, Gurugram, Haryana 122003',
  country: 'India',
} as const;

/** EU and UK contracting party and controller (GDPR / UK GDPR). */
export const ESTONIA_ENTITY = {
  name: 'Aapastech OÜ',
  registryCode: '16453146',
  vat: 'EE102489493',
  address: 'Tornimäe tn 3 // 5 // 7, 10145 Tallinn',
  country: 'Estonia',
} as const;

/**
 * Publish kit v2.0 K1, Thridify billing agent sentence: Aapastech Private
 * Limited invoices and collects every Thridify direct purchase; outside India
 * it does so as agent of the regional company (intra-group agreement s.8).
 */
export const BILLING_AGENCY_SENTENCE =
  'Direct purchases are currently invoiced and collected by Aapastech Private Limited. For customers outside India it acts as billing and collection agent for the company you contract with. This does not change who your contract is with.';

export const CANADA_ENTITY = {
  name: '14818032 Canada Inc.',
  place: 'Burlington, Ontario',
  country: 'Canada',
} as const;

/** Grievance Officer (India), Privacy Officer (Canada), person in charge (Quebec), privacy contact for Aapastech OÜ. */
export const OFFICER = {
  name: 'Shikha Gupta',
  email: LEGAL_EMAIL,
  phoneIndia: '+91 96677 47082',
  phoneIndiaHref: 'tel:+919667747082',
  phoneCanada: '+1 437 800 0190',
  phoneCanadaHref: 'tel:+14378000190',
} as const;

/** Effective date of the current legal pages (27 October 2026: three-entity model). */
export const LEGAL_UPDATE_DATE = '27 October 2026';
