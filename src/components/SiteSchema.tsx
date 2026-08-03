import {
  organizationLd,
  softwareApplicationLd,
  websiteLd,
} from '@/lib/schema';

/**
 * Sitewide entity schema — Organization + SoftwareApplication on EVERY page
 * (mounted in the root layout). Kept separate from per-page Service/FAQ/
 * Breadcrumb blocks (industries + service pages emit their own); the @types
 * never collide, so no duplicate/conflicting entity is produced.
 */
export function EntitySchema() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationLd()) }}
      />
    </>
  );
}

/**
 * WebSite entity — added ONLY on Home and /platform (the two "site root"
 * surfaces), on top of the sitewide EntitySchema. Not mounted in the layout,
 * so it is never duplicated across every page.
 */
export function WebsiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd()) }}
    />
  );
}
