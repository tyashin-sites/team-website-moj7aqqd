'use client';

/**
 * HeaderCta — the header's booking button (desktop). A client leaf only so it
 * can read the path: on the campaign page it carries the campaign link and
 * label (src/lib/black-friday.ts), everywhere else the site-wide ones.
 */

import { usePathname } from 'next/navigation';
import { blackFridayCta } from '@/lib/black-friday';

export function HeaderCta({ href, label }: { href: string; label: string }) {
  const campaign = blackFridayCta(usePathname());
  return (
    <a
      href={campaign?.href ?? href}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:inline-flex btn btn-primary"
    >
      {campaign ? (
        <>
          {/* The longer campaign label only where the bar has room for it. */}
          <span className="lg:hidden">{label}</span>
          <span className="hidden lg:inline">{campaign.label}</span>
        </>
      ) : (
        label
      )}
    </a>
  );
}
