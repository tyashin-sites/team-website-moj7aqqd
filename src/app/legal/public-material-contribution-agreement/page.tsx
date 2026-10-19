import { Fragment, type ReactNode } from 'react';

import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import {
  PMCA_DOCUMENT,
  PMCA_EFFECTIVE_DATE,
  PMCA_VERSION,
  PML_VERSION,
} from '@/content/legal/pmca';

// The Public Material Contribution Agreement (PMCA) and the user licence for
// public materials (PML). Brands accept the PMCA version shown here when they
// submit materials in the Thridify app, which links to this page. The text is
// generated from the approved draft (src/content/legal/pmca.ts).

const CANONICAL = '/legal/public-material-contribution-agreement';

export const metadata = pageMetadata({
  title: 'Public Material Contribution Agreement',
  description:
    'The agreement brands accept when they publish materials to the Thridify Public Material Library, and the licence under which every Thridify account may use them.',
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: 'Public Material Contribution Agreement — Thridify',
  ogDescription: 'How brands share materials in the Thridify Public Material Library.',
});

/** **bold**, URLs and email addresses in the approved text, without HTML in the source. */
function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  text.split(/(\*\*[^*]+\*\*)/g).forEach((chunk, i) => {
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      out.push(<strong key={`b${i}`}>{chunk.slice(2, -2)}</strong>);
      return;
    }
    chunk.split(/(https?:\/\/[^\s)]*[^\s).,;]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g).forEach((part, j) => {
      const key = `t${i}-${j}`;
      if (/^https?:\/\//.test(part)) {
        out.push(
          <a key={key} href={part} className="text-primary underline underline-offset-4">
            {part}
          </a>,
        );
      } else if (/^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(part)) {
        out.push(
          <a key={key} href={`mailto:${part}`} className="text-primary underline underline-offset-4">
            {part}
          </a>,
        );
      } else if (part) {
        out.push(<Fragment key={key}>{part}</Fragment>);
      }
    });
  });
  return <>{out}</>;
}

export default function PublicMaterialContributionAgreementPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Public Material Contribution Agreement',
        item: `${SITE_URL}${CANONICAL}`,
      },
    ],
  };

  return (
    <>
      <JsonLd nodes={[breadcrumbLd]} />
      <LegalDocument
        eyebrow={`Legal · ${PMCA_VERSION} / ${PML_VERSION}`}
        title="Public Material Contribution Agreement"
        breadcrumbLabel="Material Contribution Agreement"
        effectiveDate={PMCA_EFFECTIVE_DATE}
      >
        {PMCA_DOCUMENT.map(part => (
          <Fragment key={part.title}>
            <p className="eyebrow mt-16 first:mt-0">{part.title}</p>
            {part.sections.map(section => (
              <LegalSection key={`${part.title}-${section.title}`} title={section.title}>
                {section.blocks.map((block, k) =>
                  block.type === 'p' ? (
                    <p key={k}>
                      <Rich text={block.text} />
                    </p>
                  ) : (
                    <ul key={k} className="list-disc space-y-2 pl-6">
                      {block.items.map((item, n) => (
                        <li key={n}>
                          <Rich text={item} />
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </LegalSection>
            ))}
          </Fragment>
        ))}
      </LegalDocument>
    </>
  );
}
