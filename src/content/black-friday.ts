/**
 * Black Friday 2026 campaign page — the COPY, and nothing else.
 *
 * Source of truth: section 1 ("Campaign page") of
 * THRIDIFY-BLACK-FRIDAY-2026.md, taken WORD FOR WORD. Do not rewrite it, and
 * add no prices, no countdown timer, no "X left" signals, no founder names.
 *
 * Text as pasted by the requester on aapastech/tyashin-platform issue 53
 * (final, terms confirmed 16 Nov 2026). The "On Shopify?" block is left out on
 * purpose until the Shopify campaign pricing is live (thridify-be issue 496).
 * If this is ever set back to `null` the route is a 404 on every host
 * (src/lib/black-friday.ts).
 */

export type BlackFridaySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Numbered list, rendered after the paragraphs and bullets. */
  steps?: string[];
};

export type BlackFridayCopy = {
  /** <title> and social-card title. */
  metaTitle: string;
  metaDescription: string;
  eyebrow?: string;
  headline: string;
  /** Paragraphs under the headline, above the button. */
  intro: string[];
  sections: BlackFridaySection[];
  /** Small print under the last section, if the source has any. */
  footnote?: string;
};

export const BLACK_FRIDAY_COPY: BlackFridayCopy | null = {
  metaTitle: 'Black Friday at Thridify',
  metaDescription:
    'Up to 100% off 3D modelling when you sign a multi-year Thridify plan by 25 November 2026.',
  headline: 'Black Friday at Thridify',
  intro: [
    'Up to 100% off 3D modelling when you sign a multi-year Thridify plan by 25 November 2026.',
  ],
  sections: [
    {
      heading: 'What you get',
      paragraphs: [
        'Your products in 3D on your own product pages. Shoppers turn them, change the finish, and place them in their room with AR. We build the models, set up the configurator and connect it to your store.',
      ],
    },
    {
      heading: 'The offer',
      paragraphs: [
        'Pay for your Thridify plan upfront and we take the saving off your 3D modelling:',
      ],
      bullets: [
        '5 years: 100% off modelling',
        '3 years: 50% off modelling',
        '2 years: 20% off modelling',
      ],
    },
    {
      heading: 'How it works',
      steps: [
        'Book a call. We walk through Thridify using products from your category.',
        'Send us the products you want to start with. You get a written quote for each term, with the Black Friday saving applied.',
        'Sign by 25 November. We start modelling in December, so your first products are live in January.',
      ],
    },
    {
      heading: 'The details',
      paragraphs: [
        "The offer is for new Thridify agreements signed between 16 and 25 November 2026, with the full term paid at signing. The saving for your term applies to 3D modelling for your first 50 products. Products beyond 50 get 20% off modelling. The Thridify subscription is charged at the standard rate. One offer per business. It can't be combined with another quote or discount.",
      ],
    },
  ],
};

/**
 * Presentation labels for the redesigned page (aapastech/tyashin-platform
 * issue 54). The copy above stays the word-for-word source; these are the
 * short labels the requester supplied for the new layout, and nothing else.
 * Add no words here that the requester did not write.
 *
 * `offerLine` + ' ' + `subLine` is the intro sentence above, split so the
 * offer can be the headline (tests/black-friday.test.mjs holds them equal).
 */
export type BlackFridayOfferCard = {
  /** Big numeral. */
  saving: string;
  label: string;
  term: string;
  /** The one card that carries the accent colour. */
  accent?: boolean;
};

export const BLACK_FRIDAY_LAYOUT = {
  cta: 'Book a 30-minute call',
  hero: {
    label: 'Black Friday at Thridify',
    offerLine: 'Up to 100% off 3D modelling',
    subLine: 'when you sign a multi-year Thridify plan by 25 November 2026.',
    /** Static text. Never a timer. */
    closes: 'Offer closes 25 November 2026',
    viewerCaption: 'Drag to turn it. Tap a fabric to change it. This is what your shoppers get.',
  },
  whatYouGet: [
    '3D on your product pages',
    'Finishes that change on the model',
    "AR in the shopper's own room",
  ],
  /** Longest term first. Mirrors the "The offer" bullets above. */
  offerCards: [
    { saving: '100%', label: 'off 3D modelling', term: '5-year plan, paid upfront', accent: true },
    { saving: '50%', label: 'off 3D modelling', term: '3-year plan, paid upfront' },
    { saving: '20%', label: 'off 3D modelling', term: '2-year plan, paid upfront' },
  ] as BlackFridayOfferCard[],
  offerNote: 'The saving applies to your first 50 products. Products beyond 50 get 20% off.',
  /** One tag per "How it works" step, same order. */
  stepTags: ['This week', 'By 25 November', 'December to January'],
  closingLine: 'Sign this month. Live in 3D in January.',
} as const;
