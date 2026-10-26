/**
 * Shared legal building blocks: the regional entity statement (publish kit K1),
 * the legal mailbox link and an inline link. Used by every legal page so the
 * wording stays identical across them.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { CANADA_ENTITY, INDIA_ENTITY, LEGAL_EMAIL } from '@/content/legal/group';

const LINK_CLASS = 'text-primary underline underline-offset-4';

/** mailto link to the legal and privacy mailbox (contact@aapastech.com). */
export function LegalMail({ email = LEGAL_EMAIL }: { email?: string }) {
  return (
    <a href={`mailto:${email}`} className={LINK_CLASS}>
      {email}
    </a>
  );
}

/** Styled internal link for legal prose. */
export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={LINK_CLASS}>
      {children}
    </Link>
  );
}

/** Publish kit K1 (Thridify, regional), verbatim. */
export function RegionalEntityBlock() {
  return (
    <p>
      Thridify is run by two companies in the same group. If you are in India, your
      contract is with <strong>{INDIA_ENTITY.name}</strong> (CIN {INDIA_ENTITY.cin},{' '}
      {INDIA_ENTITY.address}), which is also the data fiduciary for your personal data.
      Everywhere else, your contract is with <strong>{CANADA_ENTITY.name}</strong> of{' '}
      {CANADA_ENTITY.place}, which is the controller of your personal data. The two
      companies share engineering, hosting and support, and each processes data for the
      other under a written intra-group agreement. In this document &ldquo;Thridify&rdquo;,
      &ldquo;we&rdquo; and &ldquo;us&rdquo; mean whichever of them you deal with.
    </p>
  );
}
