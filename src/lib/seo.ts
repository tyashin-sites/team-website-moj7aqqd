import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema';

/**
 * Per-page metadata — the ONE helper every page routes through (Tyashin
 * addendum §3a). Builds a complete, absolute-URL Metadata object: title,
 * description, canonical, Open Graph and Twitter card, so no inner page can
 * fall back to the layout's generic OG (the classic stale-social-card bug).
 *
 * `SITE_URL` is the single canonical-host constant shared with the JSON-LD
 * graph and /sitemap-pages.xml (§3c/§3g) — canonicals, OG URLs and the
 * sitemap therefore always name the same host.
 */

export const SITE = {
  name: 'Thridify',
  locale: 'en_US',
  /** Brand-placeholder OG (1200×630) — real per-page OGs live in public/og. */
  defaultOgImage: '/og/default.png',
} as const;

export function siteUrl(path = '/'): string {
  const p = path === '/' ? '' : `/${path.replace(/^\/+/, '')}`;
  return `${SITE_URL}${p}`;
}

export type PageMeta = {
  /** Page <title> (the layout template appends " | Thridify"). */
  title: string;
  description: string;
  /** Root-relative path, e.g. '/about' or `/industries/${slug}`. */
  path: string;
  /** Root-relative or absolute OG image; falls back to the brand default. */
  image?: string;
  /** Social-card title/description when they should differ from the page's. */
  ogTitle?: string;
  ogDescription?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  /** Extra Metadata fields merged last (e.g. `robots`). */
  extra?: Metadata;
};

export function pageMetadata(opts: PageMeta): Metadata {
  const url = siteUrl(opts.path);
  const image = opts.image || SITE.defaultOgImage;
  const ogTitle = opts.ogTitle || opts.title;
  const ogDescription = opts.ogDescription || opts.description;
  return {
    title: opts.title,
    description: opts.description,
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
    alternates: { canonical: opts.path },
    openGraph: {
      type: opts.type || 'website',
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      title: ogTitle,
      description: ogDescription,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
    ...(opts.extra ?? {}),
  };
}
