'use client';

/**
 * ThridifyExperience — embeds a FULL live Thridify experience via the real
 * `<thridify-view>` web component (variants, hotspots, AR — the actual Thridify
 * viewer). This is how the site dogfoods its own product: every "live demo"
 * slot renders a real experience from the connected hello@thridify.com account.
 *
 * The viewer runtime (mviewer.js, prod host) registers the custom element and
 * is loaded once, client-side, on first mount. No API key is required — preview
 * IDs are public and CDN data is public (origins policy is `warn`).
 */

import { useEffect } from 'react';
import type React from 'react';
import { THRIDIFY_ACCOUNT_ID, THRIDIFY_VIEWER_URL } from '@/lib/thridify';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'thridify-view': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Record<string, unknown>,
        HTMLElement
      >;
    }
  }
}

let viewerRequested = false;
function ensureViewerScript() {
  if (typeof document === 'undefined') return;
  if (viewerRequested || document.querySelector('script[data-thridify-mviewer]')) {
    viewerRequested = true;
    return;
  }
  viewerRequested = true;
  const s = document.createElement('script');
  s.src = `${THRIDIFY_VIEWER_URL}/mviewer.js`;
  s.async = true;
  s.setAttribute('data-thridify-mviewer', '');
  document.head.appendChild(s);
}

export function ThridifyExperience({
  previewId,
  accountId = THRIDIFY_ACCOUNT_ID,
  label = 'product',
  className = '',
  style,
}: {
  previewId: string;
  accountId?: string;
  /** Short noun for the accessible label, e.g. the industry name. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  useEffect(() => {
    ensureViewerScript();
  }, []);

  return (
    <thridify-view
      account-id={accountId}
      preview-id={previewId}
      aria-label={`Interactive 3D ${label} — powered by Thridify`}
      class={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  );
}
