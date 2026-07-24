/**
 * CTA content contract — single point of truth for reading CTA labels.
 *
 * History: `content/site.json` stores CTA captions under `.text`, while some
 * page components were written against `.label`. The drift rendered EMPTY
 * demo buttons live (QA-1, phase-1 audit). Every consumer now goes through
 * `ctaLabel()`, which accepts both keys, so the drift class cannot recur.
 */

export type Cta = {
  /** Canonical caption key used by newer page code. */
  label?: string;
  /** Caption key used by content/site.json and the editor. */
  text?: string;
  href: string;
};

/** Read a CTA caption regardless of which key the content source used. */
export function ctaLabel(cta: Cta | null | undefined): string {
  return cta?.label ?? cta?.text ?? '';
}
