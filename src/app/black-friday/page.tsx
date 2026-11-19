import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import { SHOPIFY_APP_URL } from '@/lib/shopify-app';
import { BLACK_FRIDAY_COPY, BLACK_FRIDAY_LAYOUT } from '@/content/black-friday';
import { DeferredExperience } from '@/components/signature/DeferredExperience';
import { EXP } from '@/lib/thridify';
import {
  BLACK_FRIDAY_CALL_PATH,
  BLACK_FRIDAY_PATH,
  BLACK_FRIDAY_SHOW_SHOPIFY_LINK,
} from '@/lib/black-friday';

/**
 * /black-friday — temporary campaign page (16–25 Nov 2026).
 *
 * Reachability and expiry are decided per request in src/middleware.ts via
 * src/lib/black-friday.ts; this file only renders the copy. Rendered per
 * request (never prerendered or cached) so nothing can serve the page past
 * its expiry.
 *
 * NOT indexable and NOT discoverable: `noindex, nofollow`, absent from
 * src/lib/site-routes.ts (so not in /sitemap-pages.xml), absent from
 * /llms.txt, and not linked from the nav or footer. Keep it that way.
 *
 * Layout (aapastech/tyashin-platform issue 54): dark hero with a live 3D
 * sofa, offer cards as the visual centre, three-step strip, teal closing
 * band. Words come from src/content/black-friday.ts only. No countdown, no
 * prices, no scarcity signals: the "closes" pill is static text.
 */
export const dynamic = 'force-dynamic';

const ROBOTS: Metadata['robots'] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export function generateMetadata(): Metadata {
  const copy = BLACK_FRIDAY_COPY;
  if (!copy) return { robots: ROBOTS };
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: BLACK_FRIDAY_PATH,
    // The tab title is part of the supplied copy: no " | Thridify" suffix.
    extra: { robots: ROBOTS, title: { absolute: copy.metaTitle } },
  });
}

function BookCallButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={BLACK_FRIDAY_CALL_PATH}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`btn btn-accent ${className}`}
    >
      {BLACK_FRIDAY_LAYOUT.cta}
    </a>
  );
}

export default function BlackFridayPage() {
  const copy = BLACK_FRIDAY_COPY;
  if (!copy) notFound();

  const L = BLACK_FRIDAY_LAYOUT;
  const section = (heading: string) => copy.sections.find((s) => s.heading === heading);
  const whatYouGet = section('What you get');
  const offer = section('The offer');
  const howItWorks = section('How it works');
  const details = section('The details');

  return (
    <>
      {/* 1. Hero: the offer, the button, and a real product to turn. */}
      <section className="on-dark relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 aurora opacity-20 pointer-events-none" aria-hidden />
        <div className="container-x relative pt-10 pb-14 md:pt-20 md:pb-24">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <div>
              <p className="eyebrow">{L.hero.label}</p>
              {/* One sentence from the source copy, split so the offer leads. */}
              <h1 className="m-0">
                <span className="tt-1 block text-paper !mb-3">{L.hero.offerLine}</span>{' '}
                <span className="lead block max-w-[32ch] font-body font-normal tracking-normal">
                  {L.hero.subLine}
                </span>
              </h1>
              <div className="mt-7 flex flex-col items-start gap-4">
                <BookCallButton className="px-7 py-4 text-base" />
                <p className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-3.5 py-1.5 text-sm text-muted-dark">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {L.hero.closes}
                </p>
              </div>
              {BLACK_FRIDAY_SHOW_SHOPIFY_LINK && (
                <a
                  href={SHOPIFY_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-sm font-semibold text-primary-soft underline underline-offset-4"
                >
                  Thridify on the Shopify App Store
                </a>
              )}
            </div>
            <figure className="m-0">
              {/* Reserved box: wider than tall (a touch on phones, 4:3 from md), so the whole sofa is in frame
                  before anyone touches it; capped at ~55% of a phone's height. */}
              <DeferredExperience
                previewId={EXP.arloSofa}
                label="sofa"
                fitAuthoredView
                className="mx-auto aspect-[11/10] w-full max-h-[55svh] md:aspect-[4/3] rounded-lg border border-paper/15 bg-paper/[0.04] md:max-h-[560px] md:max-w-[640px]"
              />
              <figcaption className="mx-auto mt-3 max-w-[640px] text-center text-sm text-muted-dark">
                {L.hero.viewerCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. What you get */}
      {whatYouGet && (
        <section className="container-x py-16 md:py-24">
          <h2 className="tt-2 text-foreground">{whatYouGet.heading}</h2>
          <ul className="mt-8 grid list-none gap-6 p-0 md:grid-cols-3 md:gap-8">
            {L.whatYouGet.map((label, i) => (
              <li key={label} className="border-t-2 border-primary pt-4">
                <span className="tt-mono text-primary" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-1 font-heading text-xl font-medium leading-snug text-foreground">{label}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 max-w-[65ch] space-y-4 leading-relaxed text-foreground/80">
            {whatYouGet.paragraphs?.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>
      )}

      {/* 3. The offer: three numbers, nothing competing with them. */}
      {offer && (
        <section className="on-dark bg-ink text-paper">
          <div className="container-x py-16 md:py-24">
            <h2 className="tt-2 text-paper">{offer.heading}</h2>
            <div className="max-w-[65ch] space-y-4 text-lg leading-relaxed text-paper/85">
              {offer.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            </div>
            <ul className="mt-10 grid list-none gap-5 p-0 md:grid-cols-3 md:gap-6">
              {L.offerCards.map((card) => (
                <li
                  key={card.term}
                  className={`rounded-lg border bg-paper/[0.05] p-7 md:p-9 ${
                    card.accent ? 'border-accent' : 'border-paper/25'
                  }`}
                >
                  <p
                    className={`m-0 font-heading font-medium leading-none tracking-tight text-[clamp(4rem,9vw,6.5rem)] ${
                      card.accent ? 'text-accent' : 'text-paper'
                    }`}
                  >
                    {card.saving}
                  </p>
                  <p className="mt-4 font-heading text-xl font-medium text-paper">{card.label}</p>
                  <p className="mt-1 text-base text-muted-dark">{card.term}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[65ch] text-paper/85">{L.offerNote}</p>
            <div className="mt-8">
              <BookCallButton className="px-7 py-4 text-base" />
            </div>
          </div>
        </section>
      )}

      {/* 4. How it works */}
      {howItWorks?.steps && (
        <section className="container-x py-16 md:py-24">
          <h2 className="tt-2 text-foreground">{howItWorks.heading}</h2>
          <ol className="mt-8 grid list-none gap-8 p-0 md:grid-cols-3 md:gap-0">
            {howItWorks.steps.map((step, i) => (
              <li
                key={step}
                className="border-t-2 border-primary pt-5 md:pr-8 md:[&:not(:first-child)]:pl-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-l-border"
              >
                <div className="flex items-center gap-3">
                  <span className="tt-mono text-primary" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {L.stepTags[i] && (
                    <span className="rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {L.stepTags[i]}
                    </span>
                  )}
                </div>
                <p className="mt-4 leading-relaxed text-foreground/85">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 5. The details: small print, still AA. */}
      {details && (
        <section className="container-x pb-16 md:pb-24">
          <div className="border-t border-border pt-8">
            <h2 className="font-heading text-base font-medium text-foreground">{details.heading}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              {details.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {copy.footnote && <p>{copy.footnote}</p>}
            </div>
          </div>
        </section>
      )}

      {/* 6. Closing band */}
      <section className="bg-primary text-primary-contrast">
        <div className="container-x flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16">
          <p className="tt-2 !m-0">{L.closingLine}</p>
          <BookCallButton className="shrink-0 px-7 py-4 text-base" />
        </div>
      </section>
    </>
  );
}
