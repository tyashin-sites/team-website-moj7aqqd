/**
 * Shared legal building blocks: the regional entity statement (publish kit K1),
 * the legal mailbox link and an inline link. Used by every legal page so the
 * wording stays identical across them.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { CANADA_ENTITY, ESTONIA_ENTITY, INDIA_ENTITY, LEGAL_EMAIL } from '@/content/legal/group';

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

/** Publish kit v2.0 K1 (same for Tyashin, Thridify and YOM), verbatim with {Brand} = Thridify. */
export function RegionalEntityBlock() {
  return (
    <>
      <p>
        Thridify is run by three companies in the same group. Which one you deal with depends
        on where you are. For a business account, that is the country of the business&rsquo;s
        billing address.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>India:</strong> {INDIA_ENTITY.name} (CIN {INDIA_ENTITY.cin}; registered
          office {INDIA_ENTITY.address}; principal place of business{' '}
          {INDIA_ENTITY.principalPlace}). It is the data fiduciary for your personal data under
          Indian law.
        </li>
        <li>
          <strong>European Union and United Kingdom:</strong> {ESTONIA_ENTITY.name} (registry
          code {ESTONIA_ENTITY.registryCode}, VAT {ESTONIA_ENTITY.vat}, {ESTONIA_ENTITY.address},{' '}
          {ESTONIA_ENTITY.country}). It is the controller of your personal data under the GDPR
          and the UK GDPR.
        </li>
        <li>
          <strong>Everywhere else:</strong> {CANADA_ENTITY.name} ({CANADA_ENTITY.place},{' '}
          {CANADA_ENTITY.country}). It is the controller of your personal data.
        </li>
      </ul>
      <p>
        The three companies share engineering, hosting and support, and each processes personal
        data for the others under a written intra-group agreement. In this document
        &ldquo;Thridify&rdquo;, &ldquo;we&rdquo; and &ldquo;us&rdquo; mean whichever of them you
        deal with.
      </p>
    </>
  );
}

/** Publish kit v2.0 K1 governing-law clause (website Terms of Use), verbatim. */
export function GoverningLawClause() {
  return (
    <p>
      If you are in India, Indian law governs these terms and the courts at Delhi have
      jurisdiction. If you are in the European Union or the United Kingdom, Estonian law governs
      them and the Harju County Court in Tallinn has jurisdiction, but you keep any protection
      that the mandatory law of the country where you live gives consumers. Everywhere else, the
      laws of the Province of Ontario and the federal laws of Canada that apply there govern
      them, and the courts of Ontario have jurisdiction.
    </p>
  );
}
