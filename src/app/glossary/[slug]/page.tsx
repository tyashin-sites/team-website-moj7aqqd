import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { GLOSSARY, GLOSSARY_SLUGS, getTerm } from '@/lib/glossary';

const CALENDLY = 'https://calendly.com/hello-thridify/30min';

export function generateStaticParams() {
  return GLOSSARY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTerm(slug);
  if (!t) return {};
  return pageMetadata({
    title: `What is ${t.term}? — Definition`,
    description: t.short,
    keywords: [`what is ${t.term.toLowerCase()}`, ...(t.aka ?? []), '3D commerce glossary'],
    path: `/glossary/${t.slug}`,
    image: '/og/glossary.png',
  });
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTerm(slug);
  if (!t) notFound();
  const related = t.related.map(getTerm).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const path = `/glossary/${t.slug}`;

  const termLd: LdNode = {
    '@type': 'DefinedTerm',
    '@id': `${siteUrl(path)}#term`,
    name: t.term,
    ...(t.aka?.length ? { alternateName: t.aka } : {}),
    description: t.short,
    url: siteUrl(path),
    inDefinedTermSet: `${siteUrl('/glossary')}#terms`,
  };

  return (
    <>
      <JsonLd
        nodes={[
          webPageLd({ path, name: `${t.term} — definition`, description: t.short }),
          termLd,
          breadcrumbLd(path, [
            { name: 'Home', path: '/' },
            { name: 'Glossary', path: '/glossary' },
            { name: t.term, path },
          ]),
        ]}
      />
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/glossary" className="hover:text-primary">Glossary</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">{t.term}</li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-50 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-8 md:pb-10">
          <p className="eyebrow">Glossary</p>
          <h1 className="tt-1 mt-5 max-w-3xl">What is {t.term}?</h1>
          {/* The quotable definition — first thing in the body for extraction. */}
          <p className="mt-6 lead max-w-3xl font-medium text-foreground">{t.short}</p>
          {t.aka?.length ? (
            <p className="mt-3 text-sm text-foreground/50">Also called: {t.aka.join(', ')}</p>
          ) : null}
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8 max-w-2xl">
            {t.body.map((p) => (
              <p key={p.slice(0, 40)} className="text-foreground/75 leading-relaxed mb-5">{p}</p>
            ))}
            <div className="card p-6 md:p-7 mt-8 border-l-4 border-l-primary">
              <p className="eyebrow">Why it matters</p>
              <p className="mt-3 text-foreground/80 leading-relaxed">{t.whyItMatters}</p>
            </div>
            {t.seeAlso?.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {t.seeAlso.map((l) => (
                  <Link key={l.href} href={l.href} className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors">
                    {l.label} <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
          <aside className="lg:col-span-4">
            <div className="card p-6 lg:sticky lg:top-28">
              <p className="eyebrow">Related terms</p>
              <ul className="mt-4 divide-y divide-foreground/10">
                {related.map((r) => (
                  <li key={r.slug} className="py-3">
                    <Link href={`/glossary/${r.slug}`} className="font-semibold hover:text-primary transition-colors">{r.term}</Link>
                    <p className="mt-1 text-sm text-foreground/60 line-clamp-2">{r.short}</p>
                  </li>
                ))}
              </ul>
              <Link href="/glossary" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                All {GLOSSARY.length} terms <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
        <div className="container-x section relative text-center">
          <p className="eyebrow eyebrow-center">See it live</p>
          <h2 className="tt-1 mt-4 max-w-2xl mx-auto">Every term here is running on this site right now.</h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">Book a Demo</a>
            <Link href="/platform" className="btn-ghost">Explore the platform</Link>
          </div>
        </div>
      </section>
    </>
  );
}
