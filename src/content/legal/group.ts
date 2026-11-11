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
  /** Registered office (the only address we publish for this company). */
  address: '8/3, 2nd Floor, Roop Nagar, Delhi 110007',
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
 * Publish kit v2.1: each regional company bills and collects payment from its
 * own customers (owner statement, 27 Oct 2026). Name kept for import stability.
 */
export const BILLING_AGENCY_SENTENCE =
  'Each company bills and collects payment from its own customers: Aapastech Private Limited in India, Aapastech OÜ in the European Union and the United Kingdom, and 14818032 Canada Inc. everywhere else.';

/** Hindi translation of BILLING_AGENCY_SENTENCE for the Hindi privacy policy (the English prevails). */
export const BILLING_AGENCY_SENTENCE_HI =
  'हर कंपनी अपने ग्राहकों को स्वयं बिल भेजती है और उनसे भुगतान लेती है: भारत में Aapastech Private Limited, यूरोपीय संघ और यूनाइटेड किंगडम में Aapastech OÜ, और बाकी सभी जगह 14818032 Canada Inc.।';

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

/**
 * Effective date of the current legal pages. 2 November 2026: rights in Canada and Quebec (publish kit
 * K6-CA), Hindi privacy policy and terms, and the India entity shown with its registered office only,
 * which changed the text of every page that uses this date. (27 October 2026: three-entity model.)
 * The PMCA keeps its own date (PMCA_EFFECTIVE_DATE).
 */
export const LEGAL_UPDATE_DATE = '2 November 2026';

/**
 * Privacy Policy and Security page only. 11 November 2026: the Meta Pixel (consent-gated advertising
 * tag) and the cookie-settings link. The other legal pages did not change, so they keep LEGAL_UPDATE_DATE.
 */
export const PRIVACY_UPDATE_DATE = '11 November 2026';
