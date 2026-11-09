import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, ORG_ID, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { HeroArt } from '@/components/HeroArt';
import { CapabilityDemo } from '@/components/signature/CapabilityDemo';
import { EXP } from '@/lib/thridify';
import { calendlyHref } from '@/lib/calendly';
import {
  WOO_PLUGIN_URL,
  WOO_PLUGIN_NAME,
  WOO_PLUGIN_VERSION,
  WOO_PLUGIN_INTRO,
  WOO_PLUGIN_SUMMARY,
  WOO_PAGE_PATH,
  WOO_DEMO_STORE_URL,
  WOO_REQUIREMENTS,
  WOO_PRICING_NOTE,
  WOO_FEATURES,
  WOO_SETUP,
  WOO_INDUSTRIES,
  WOO_USE_CASES,
  WOO_FAQS,
} from '@/lib/woocommerce-plugin';

/**
 * /integrations/woocommerce: the canonical thridify.com page for the Thridify
 * plugin for WooCommerce (wordpress.org/plugins/thridify).
 *
 * Why here: the old WordPress /woocommerce URL 301s to this path
 * (next.config.ts), it is in the sitemap, and the FAQ and hub link to it. A
 * static segment wins over /integrations/[slug], and [slug] skips
 * "woocommerce" in generateStaticParams so the two never collide.
 * /integrations/wordpress stays the page for non-WooCommerce WordPress sites
 * and points WooCommerce merchants here.
 *
 * Content rules: capabilities match the plugin readme and source only (see
 * src/lib/woocommerce-plugin.ts), no Thridify prices or plans.
 */

const PATH = WOO_PAGE_PATH;
const CALENDLY = calendlyHref('integrations-woocommerce');
const UPDATED = '2026-11-04';
const BLOG_HOWTO = '/blog/how-to-add-a-3d-product-configurator-to-woocommerce';
const BLOG_SETUP = '/blog/how-to-add-3d-and-ar-to-woocommerce-product-pages';

const TITLE = 'WooCommerce 3D Product Viewer, Configurator & AR Plugin';
const DESCRIPTION =
  'Free WordPress plugin that adds a 3D product viewer, 3D configurator with variation sync and AR view in your room to WooCommerce product pages and shop grids.';

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'WooCommerce 3D product viewer',
    'WooCommerce product configurator',
    'WooCommerce 3D configurator plugin',
    'WooCommerce AR',
    'augmented reality WooCommerce',
    '3D product viewer WordPress plugin',
    '360 product viewer WooCommerce',
    'view in your room',
  ],
  path: PATH,
  image: '/og/integration-woocommerce.png',
  ogTitle: 'Thridify for WooCommerce: 3D configurator and AR view in your room',
  ogDescription: WOO_PLUGIN_INTRO,
});

export default function WooCommercePluginPage() {
  const url = siteUrl(PATH);

  const appLd: LdNode = {
    '@type': 'SoftwareApplication',
    '@id': `${url}#app`,
    name: WOO_PLUGIN_NAME,
    alternateName: ['Thridify for WooCommerce', 'Thridify WordPress plugin'],
    description: WOO_PLUGIN_SUMMARY,
    abstract: WOO_PLUGIN_INTRO,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: '3D/AR/VR',
    operatingSystem: 'WordPress',
    softwareVersion: WOO_PLUGIN_VERSION,
    softwareRequirements: `WordPress ${WOO_REQUIREMENTS.wordpress}+, PHP ${WOO_REQUIREMENTS.php}+, WooCommerce ${WOO_REQUIREMENTS.woocommerce}+, Thridify account`,
    url,
    downloadUrl: WOO_PLUGIN_URL,
    installUrl: WOO_PLUGIN_URL,
    sameAs: [WOO_PLUGIN_URL],
    featureList: WOO_FEATURES.map((f) => f.title),
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      name: 'Free plugin',
      description: WOO_PRICING_NOTE,
      price: 0,
      priceCurrency: 'USD',
      url: WOO_PLUGIN_URL,
    },
    license: 'https://www.gnu.org/licenses/gpl-2.0.html',
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  };
  const howToLd: LdNode = {
    '@type': 'HowTo',
    '@id': `${url}#setup`,
    name: 'How to add a 3D product viewer, configurator and AR to a WooCommerce store',
    description:
      'Install the free Thridify plugin from WordPress.org, connect a Thridify account, let the catalog sync and publish your 3D products.',
    tool: [{ '@type': 'HowToTool', name: WOO_PLUGIN_NAME }],
    supply: [{ '@type': 'HowToSupply', name: 'WooCommerce store' }],
    step: WOO_SETUP.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${url}#setup`,
    })),
  };
  const faqLd: LdNode = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: WOO_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <JsonLd
        nodes={[
          {
            ...webPageLd({ path: PATH, name: TITLE, description: DESCRIPTION }),
            mainEntity: { '@id': `${url}#app` },
            dateModified: UPDATED,
          },
          appLd,
          howToLd,
          faqLd,
          breadcrumbLd(PATH, [
            { name: 'Home', path: '/' },
            { name: 'Integrations', path: '/integrations' },
            { name: 'WooCommerce', path: PATH },
          ]),
        ]}
      />

      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/integrations" className="hover:text-primary">
              Integrations
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">
            WooCommerce
          </li>
        </ol>
      </nav>

      {/* HERO: WordPress.org is the primary action; the demo store is secondary. */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pt-12 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <p className="eyebrow">WooCommerce plugin</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="tt-1 mt-5">3D product viewer, configurator and AR for WooCommerce</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 lead max-w-xl">
                Shoppers spin the product, pick a finish that selects the right variation, add it to
                cart from 3D and place it in their room with AR. All of it on your WooCommerce
                product page, from one free plugin.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={WOO_PLUGIN_URL} target="_blank" rel="noopener" className="btn btn-primary">
                  Get it on WordPress.org
                  <ArrowUpRight className="w-4 h-4" aria-hidden />
                </a>
                <a
                  href={WOO_DEMO_STORE_URL}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-ghost"
                >
                  Live WooCommerce demo store
                </a>
              </div>
              <p className="mt-4 text-sm text-foreground/60">{WOO_PRICING_NOTE}</p>
            </Reveal>
          </div>
          <div className="relative">
            <HeroArt />
            <CapabilityDemo
              mode="configurator"
              aspect="aspect-[4/3]"
              modelLabel="WooCommerce product"
              priority
              experiencePreviewId={EXP.modernSofa}
            />
          </div>
        </div>
      </section>

      {/* SHORT ANSWER: the paragraph an answer engine should quote. */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="card p-7 md:p-9 max-w-4xl">
            <p className="eyebrow">In short</p>
            <p className="mt-3 text-lg leading-relaxed text-foreground/85">
              {WOO_PLUGIN_SUMMARY} It needs WordPress {WOO_REQUIREMENTS.wordpress}, PHP{' '}
              {WOO_REQUIREMENTS.php} and WooCommerce {WOO_REQUIREMENTS.woocommerce} or later. Install
              it from the{' '}
              <a
                href={WOO_PLUGIN_URL}
                target="_blank"
                rel="noopener"
                className="font-semibold text-primary hover:underline"
              >
                Thridify plugin on WordPress.org
              </a>
              , or see it working on the{' '}
              <a
                href={WOO_DEMO_STORE_URL}
                target="_blank"
                rel="noopener"
                className="font-semibold text-primary hover:underline"
              >
                live WooCommerce demo store
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* WHAT THE PLUGIN DOES: matches the readme, nothing more. */}
      <section id="features" className="section pt-0 scroll-mt-20">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">What it does on WooCommerce</p>
            <h2 className="tt-2">Everything the plugin adds to your store</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WOO_FEATURES.map((f) => (
              <li key={f.title} className="card p-7 h-full">
                <Check className="w-5 h-5 text-primary" strokeWidth={2} aria-hidden />
                <h3 className="font-heading text-lg font-semibold tracking-tight mt-4 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SETUP: mirrors the HowTo node. */}
      <section id="setup" className="section pt-0 scroll-mt-20">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">Setup</p>
            <h2 className="tt-2">How to add 3D and AR to your WooCommerce store</h2>
            <p className="mt-4 lead">
              Installing and connecting takes a few minutes, and the catalog matches itself. The
              slow part, if there is one, is getting the 3D models made.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {WOO_SETUP.map((s, idx) => (
              <li key={s.name} className="card p-6 h-full">
                <span className="font-mono tabular-nums text-sm text-primary">{`0${idx + 1}`}</span>
                <h3 className="font-heading text-base font-semibold tracking-tight mt-3 mb-2">
                  {s.name}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-foreground/70">
            Need models first? The{' '}
            <Link href="/services/3d-modelling" className="font-semibold text-primary hover:underline">
              3D modelling service
            </Link>{' '}
            builds them from your photos and dimensions. For a longer walkthrough, read{' '}
            <Link href={BLOG_SETUP} className="font-semibold text-primary hover:underline">
              how to add a 3D product viewer and AR to WooCommerce
            </Link>{' '}
            or{' '}
            <Link href={BLOG_HOWTO} className="font-semibold text-primary hover:underline">
              how to add a 3D product configurator to WooCommerce
            </Link>
            .
          </p>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className="section pt-0 scroll-mt-20">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">Use cases</p>
            <h2 className="tt-2">What WooCommerce stores use it for</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WOO_USE_CASES.map((u) => (
              <li key={u.title} className="card p-7 h-full">
                <h3 className="font-heading text-lg font-semibold tracking-tight mb-2">{u.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{u.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section
        id="industries"
        className="section bg-surface/50 border-y border-foreground/5 scroll-mt-20"
      >
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">Who it’s for</p>
            <h2 className="tt-2">WooCommerce stores where buyers need to see the product first</h2>
            <p className="mt-4 lead">
              Anything a shopper wants to turn over, configure or check for size before buying.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WOO_INDUSTRIES.map((i) => {
              const inner = (
                <>
                  <h3 className="font-heading text-base font-semibold tracking-tight">{i.name}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{i.body}</p>
                </>
              );
              return (
                <li key={i.name}>
                  {i.href ? (
                    <Link
                      href={i.href}
                      className="card p-6 block h-full hover:border-primary/40 transition-colors"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="card p-6 h-full">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* SCOPE: what lives on thridify.com but not in the plugin yet.
          Stated plainly so neither people nor LLMs over-claim the plugin. */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="eyebrow">Good to know</p>
            <h2 className="tt-2">What the WooCommerce plugin doesn’t do yet</h2>
            <p className="mt-4 text-foreground/75 leading-relaxed">
              The plugin shows one product at a time. Shoppable rooms with several products in one
              scene, like{' '}
              <Link href="/shop-the-look" className="font-semibold text-primary hover:underline">
                Shop the Look
              </Link>{' '}
              and the{' '}
              <Link href="/room-visualizer" className="font-semibold text-primary hover:underline">
                3D room visualizer
              </Link>
              , run on Thridify’s own platform today and aren’t part of the plugin. If you need them
              on a WooCommerce store, talk to us and we’ll tell you what’s possible now.
            </p>
            <p className="mt-4 text-foreground/75 leading-relaxed">
              Not on WooCommerce? For a plain WordPress site, see{' '}
              <Link
                href="/integrations/wordpress"
                className="font-semibold text-primary hover:underline"
              >
                Thridify on WordPress
              </Link>
              . On Shopify, see the{' '}
              <Link
                href="/integrations/shopify"
                className="font-semibold text-primary hover:underline"
              >
                Thridify Shopify app
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ: FAQPage node above. */}
      <section id="faq" className="section pt-0 scroll-mt-20">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">Thridify on WooCommerce, answered</h2>
            <p className="mt-4 text-sm text-foreground/60">Last reviewed {UPDATED}.</p>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {WOO_FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-heading text-lg font-semibold tracking-tight">
                  {f.q}
                  <ArrowRight
                    className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-90"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 text-foreground/70 leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <p className="eyebrow">Keep reading</p>
          <h2 className="tt-2 mb-8">Related</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { href: '/3d-product-configurator', t: '3D product configurator', b: 'How a configurator works on any storefront.' },
              { href: '/ar-viewer', t: 'AR viewer', b: 'View in your room, on iPhone and Android.' },
              { href: '/360-product-viewer', t: '360° product viewer', b: 'Spin and zoom instead of a flat gallery.' },
              { href: '/integrations', t: 'Other platforms', b: 'Shopify, WordPress, Wix and the rest.' },
            ].map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="card p-6 block h-full hover:border-primary/40 transition-colors"
                >
                  <h3 className="font-heading text-base font-semibold tracking-tight">{r.t}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{r.b}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
        <div className="container-x section relative text-center">
          <p className="eyebrow eyebrow-center">Thridify for WooCommerce</p>
          <h2 className="tt-1 mt-4 max-w-2xl mx-auto text-paper">
            Put your first product in 3D and AR today.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WOO_PLUGIN_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-primary px-8 py-4 text-base"
            >
              Get it on WordPress.org
            </a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost px-8 py-4 text-base"
            >
              Book a demo
            </a>
          </div>
          <p className="mt-4 text-sm text-paper/70">{WOO_PRICING_NOTE}</p>
        </div>
      </section>
    </>
  );
}
