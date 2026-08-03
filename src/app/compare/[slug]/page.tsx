import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import {
  COMPETITORS,
  COMPETITOR_SLUGS,
  getCompetitor,
  type Competitor,
} from '@/lib/comparisons';
import { SITE_URL } from '@/lib/schema';

const CALENDLY = 'https://calendly.com/hello-thridify/30min';

// FULLY STATIC — build-time content only (see industries/[slug] rationale for
// why dynamicParams:false + generateStaticParams + no revalidate avoids the
// OpenNext soft-404/cache-MISS trap on this project).
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPETITOR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) return {};
  const canonical = `/compare/${c.slug}`;
  return {
    title: `${c.seoTitle} | Thridify`,
    description: c.seoDescription,
    keywords: c.keywords,
    alternates: { canonical },
    openGraph: {
      title: `${c.seoTitle} | Thridify`,
      description: c.seoDescription,
      url: `${SITE_URL}${canonical}`,
      type: 'website',
      siteName: 'Thridify',
      images: ['/og/default.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${c.seoTitle} | Thridify`,
      images: ['/og/default.png'],
    },
  };
}

/** A cell whose text starts with "Yes" renders an affirmative check chip. */
function Cell({ text, accent }: { text: string; accent?: boolean }) {
  const yes = /^Yes\b/.test(text);
  return (
    <div className="flex items-start gap-2">
      {yes && (
        <Check
          className={`w-4 h-4 shrink-0 mt-0.5 ${accent ? 'text-accent' : 'text-primary'}`}
          strokeWidth={2.5}
          aria-hidden
        />
      )}
      <span className="text-sm leading-relaxed">{text}</span>
    </div>
  );
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) notFound();

  const canonicalUrl = `${SITE_URL}/compare/${c.slug}`;
  const related = c.related
    .map((s) => COMPETITORS.find((x) => x.slug === s))
    .filter((x): x is Competitor => Boolean(x));

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: `${SITE_URL}/compare/${c.slug}` },
      { '@type': 'ListItem', position: 3, name: `Thridify vs ${c.name}`, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumb (visible) */}
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/55">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">Thridify vs {c.name}</li>
        </ol>
      </nav>

      {/* HERO */}
      <section className="container-x section pt-12">
        <p className="eyebrow">Comparison</p>
        <h1 className="tt-1 max-w-4xl">Thridify vs {c.name}: an honest comparison</h1>
        <p className="mt-6 lead max-w-3xl">{c.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Book a Demo
          </a>
          <Link href="/#demo" className="btn btn-ghost">Try the live demo</Link>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="container-x section pt-0">
        <h2 className="tt-2">Feature comparison</h2>
        <p className="mt-3 text-foreground/70 max-w-2xl text-sm">
          Where we are unsure of a competitor’s exact capability, the cell reads “varies / contact vendor” — we do not guess.
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="w-full border-collapse text-left min-w-[640px]">
            <thead>
              <tr className="bg-surface">
                <th className="p-4 font-heading text-sm font-semibold tracking-tight w-[38%]">Capability</th>
                <th className="p-4 font-heading text-sm font-semibold tracking-tight text-primary w-[31%]">Thridify</th>
                <th className="p-4 font-heading text-sm font-semibold tracking-tight w-[31%]">{c.name}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row) => (
                <tr key={row.feature} className="border-t border-foreground/10 align-top">
                  <th scope="row" className="p-4 font-medium text-sm text-foreground/80">{row.feature}</th>
                  <td className="p-4 text-foreground/80"><Cell text={row.thridify} accent /></td>
                  <td className="p-4 text-foreground/70"><Cell text={row.competitor} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* WHERE EACH FITS — concede competitor strengths honestly. */}
      <section className="section on-dark bg-ink text-paper">
        <div className="container-x grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <h2 className="font-heading text-xl font-semibold tracking-tight mb-3 text-paper">Where {c.name} is strong</h2>
            <p className="text-muted-dark leading-relaxed">{c.competitorStrengths}</p>
          </div>
          <div className="glass-card p-8">
            <h2 className="font-heading text-xl font-semibold tracking-tight mb-3 text-accent">Where Thridify fits</h2>
            <p className="text-muted-dark leading-relaxed">{c.thridifyFit}</p>
          </div>
        </div>
      </section>

      {/* FAQ — FAQPage schema above. */}
      <section className="container-x section">
        <p className="eyebrow">FAQ</p>
        <h2 className="tt-2">Thridify vs {c.name}, answered</h2>
        <div className="mt-8 max-w-3xl divide-y divide-foreground/10 border-t border-foreground/10">
          {c.faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-heading text-lg font-semibold tracking-tight">
                {f.q}
                <ArrowRight className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-90" aria-hidden />
              </summary>
              <p className="mt-3 text-foreground/70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CROSS-LINKS — related comparisons + platform (no ghost links). */}
      <section className="container-x section pt-0">
        <h2 className="tt-2">Keep comparing</h2>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
          {related.map((r) => (
            <Link key={r.slug} href={`/compare/${r.slug}`} className="text-primary hover:underline">
              Thridify vs {r.name} →
            </Link>
          ))}
          <Link href="/platform" className="text-primary hover:underline">See the platform →</Link>
          <Link href="/services/3d-modelling" className="text-primary hover:underline">3D Modelling Service →</Link>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
        <div className="container-x section relative text-center">
          <h2 className="tt-1 text-paper max-w-3xl mx-auto">See Thridify on your own product — live.</h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-8 py-4 text-base">
              Book a Demo
            </a>
            <Link href="/#demo" className="btn btn-ghost px-8 py-4 text-base">Try the live demo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
