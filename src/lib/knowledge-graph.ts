/**
 * Knowledge graph helpers — Tyashin addendum §3b.
 *
 * Every page ships ONE `<script type="application/ld+json">` holding a single
 * interlinked `@graph` rather than scattered standalone snippets, so search
 * engines and LLM crawlers traverse the site as one connected entity. Nodes
 * reference each other by `@id`:
 *
 *   Organization    → `${SITE_URL}/#organization`
 *   WebSite         → `${SITE_URL}/#website`
 *   WebPage         → `${pageUrl}#webpage`
 *   BreadcrumbList  → `${pageUrl}#breadcrumb`
 *
 * The root layout emits the sitewide nodes (Organization, SoftwareApplication,
 * WebSite); each page emits its own graph (WebPage + BreadcrumbList + any
 * Service / FAQPage / ItemList node) pointing back at those @ids. The
 * Tyashin edge injects a baseline idempotently by @type, so nothing here is
 * duplicated by the platform.
 */

import { SITE_URL, ORG_ID, WEBSITE_ID } from '@/lib/schema';

export { ORG_ID, WEBSITE_ID };

export type LdNode = Record<string, unknown>;

/** Serialise nodes as one @graph, escaping `<`/`>` so a value containing
 *  `</script>` can never break out of the tag (§3b SAFETY). */
export function graphJson(nodes: LdNode[]): string {
  const graph: LdNode[] = nodes.map((n) => {
    // Nodes may carry their own @context from older helpers — strip it; the
    // graph declares it once.
    const { '@context': _ctx, ...rest } = n;
    return rest;
  });
  // Every non-home route ships WebPage + BreadcrumbList (addendum §3b). The
  // breadcrumb's last crumb IS the page, so derive the WebPage node from it
  // here — one point of change instead of per-page boilerplate — and give
  // the BreadcrumbList its @id so the two link up.
  const crumbs = graph.find((n) => n['@type'] === 'BreadcrumbList') as
    | (LdNode & { itemListElement?: { name?: string; item?: string }[] })
    | undefined;
  const last = crumbs?.itemListElement?.at(-1);
  if (crumbs && last?.item && !graph.some((n) => n['@type'] === 'WebPage')) {
    const url = last.item;
    crumbs['@id'] ??= `${url}#breadcrumb`;
    graph.unshift({
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: last.name,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORG_ID },
      breadcrumb: { '@id': crumbs['@id'] },
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');
}

/** WebPage node for a route, linked to the WebSite and Organization. */
export function webPageLd(opts: { path: string; name: string; description?: string; breadcrumb?: boolean }): LdNode {
  const url = `${SITE_URL}${opts.path}`;
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    ...(opts.breadcrumb === false ? {} : { breadcrumb: { '@id': `${url}#breadcrumb` } }),
  };
}

/** BreadcrumbList node for a route (Home › … › page). */
export function breadcrumbLd(path: string, items: { name: string; path: string }[]): LdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${path}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === '/' ? '/' : it.path}`,
    })),
  };
}
