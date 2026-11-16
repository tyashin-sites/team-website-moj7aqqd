/**
 * Black Friday 2026 campaign page — the COPY, and nothing else.
 *
 * Source of truth: section 1 ("Campaign page") of
 * THRIDIFY-BLACK-FRIDAY-2026.md, taken WORD FOR WORD. Do not rewrite it, and
 * add no prices, no countdown timer, no "X left" signals, no founder names.
 *
 * `null` until the requester supplies the text on
 * aapastech/tyashin-platform issue 53; while it is null the route is a 404 on
 * every host (src/lib/black-friday.ts).
 */

export type BlackFridaySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
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

export const BLACK_FRIDAY_COPY: BlackFridayCopy | null = null;
