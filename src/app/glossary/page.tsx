import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { GLOSSARY } from '@/lib/glossary';

/**
 * /glossary — the 3D & AR commerce vocabulary, one quotable definition per
 * term. Index page carries a DefinedTermSet so assistants and search engines
 * can attribute each definition to Thridify.
 */
export const metadata = pageMetadata({
  title: 'Glossary — 3D & AR Commerce Terms Explained',
  description:
    'Plain-English definitions of the terms behind 3D and AR commerce: configurators, WebAR, AR Quick Look, glTF/GLB, USDZ, Draco, KTX2, PBR materials, variant mapping and more.',
  keywords: [
    '3D commerce glossary',
    'what is WebAR',
    'what is a 3D product configurator',
    'glTF vs USDZ',
    'AR Quick Look explained',
  ],
  path: '/glossary',
  image: '/og/glossary.png',
});

export default function GlossaryIndex() {
  const setLd: LdNode = {
    '@type': 'DefinedTermSet',
    '@id': `${siteUrl('/glossary')}#terms`,
    name: 'Thridify 3D & AR Commerce Glossary',
    hasDefinedTerm: GLOSSARY.map((g) => ({
      '@type': 'DefinedTerm',
      '@id': `${siteUrl(`/glossary/${g.slug}`)}#term`,
      name: g.term,
      description: g.short,
      url: siteUrl(`/glossary/${g.slug}`),
    })),
  };
  return (
    <>
      <JsonLd
        nodes={[
          webPageLd({ path: '/glossary', name: 'Glossary', description: metadata.description as string }),
          setLd,
          breadcrumbLd('/glossary', [
            { name: 'Home', path: '/' },
            { name: 'Glossary', path: '/glossary' },
          ]),
        ]}
      />
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">Glossary</li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-10 md:pb-12">
          <Reveal><p className="eyebrow">Glossary</p></Reveal>
          <Reveal delay={0.08}>
            <h1 className="tt-display mt-5 max-w-3xl">The vocabulary of 3D and AR commerce.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 lead max-w-2xl">
              {GLOSSARY.length} terms, each with a one-sentence definition you can quote and a plain
              explanation of why it matters when you sell configurable products.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-5">
          {GLOSSARY.map((g, i) => (
            <Reveal key={g.slug} delay={Math.min(i, 8) * 0.04}>
              <Link href={`/glossary/${g.slug}`} className="group card p-7 h-full flex flex-col">
                <h2 className="font-heading text-xl font-semibold tracking-tight">{g.term}</h2>
                <p className="mt-3 text-foreground/70 leading-relaxed">{g.short}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Read the definition <ArrowRight className="w-4 h-4" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
