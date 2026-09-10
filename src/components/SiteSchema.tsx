import { organizationLd, softwareApplicationLd, websiteLd } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';

/**
 * Sitewide entity graph — ONE @graph on EVERY page (mounted in the root
 * layout, addendum §3b): Organization (#organization), SoftwareApplication
 * and WebSite (#website). Per-page nodes (WebPage, BreadcrumbList, Service,
 * FAQPage, ItemList) ship in each page's own <JsonLd> graph and reference
 * these by @id, so the site reads as one connected entity.
 */
export function EntitySchema() {
  return <JsonLd nodes={[organizationLd(), softwareApplicationLd(), websiteLd()]} />;
}
