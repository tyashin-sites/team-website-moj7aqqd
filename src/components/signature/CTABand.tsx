/**
 * CTABand — DESIGN-SPEC §7.7. Dark ink section, subtle teal→pink aurora
 * at ~20% opacity, headline ≤10 words, single Calendly CTA.
 */

const CALENDLY_URL = 'https://calendly.com/hello-thridify/30min';

export function CTABand({
  headline = 'See your own product in 3D — live.',
  ctaLabel = 'Book a Demo',
}: {
  headline?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="on-dark relative bg-ink text-paper overflow-hidden grain">
      <div data-parallax="0.08" className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
      <div className="container-x section relative text-center">
        {/* Ornamental gradient hairline above the closing headline — draws
            itself outward as it enters the viewport (ScrollFX). */}
        <div data-fx="draw" className="hairline w-40 mx-auto mb-12 origin-center" aria-hidden />
        <h2 data-fx="rise" className="tt-1 text-paper max-w-3xl mx-auto">{headline}</h2>
        <div data-fx="rise" className="mt-4 flex justify-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-8 py-4 text-base"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
