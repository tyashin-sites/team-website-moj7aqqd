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
    <section className="relative bg-ink text-paper overflow-hidden">
      <div className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
      <div className="container-x section relative text-center">
        <h2 className="tt-1 text-paper max-w-3xl mx-auto">{headline}</h2>
        <div className="mt-2 flex justify-center">
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
