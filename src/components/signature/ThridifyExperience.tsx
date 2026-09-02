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
import {
  THRIDIFY_ACCOUNT_ID,
  THRIDIFY_VIEWER_URL,
  PID_BY_PREVIEW,
  DEFAULT_VARIANT_BY_PREVIEW,
} from '@/lib/thridify';

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
  variantId,
  label = 'product',
  className = '',
  style,
}: {
  previewId: string;
  accountId?: string;
  /** Explicit variant to open on; falls back to the experience's default. */
  variantId?: string;
  /** Short noun for the accessible label, e.g. the industry name. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  useEffect(() => {
    ensureViewerScript();
  }, []);

  // The viewer requires the product id (pid); preview-id alone throws
  // "Product ID is required". Pass both (pid resolves the experience).
  const productId = PID_BY_PREVIEW[previewId];
  // Open on the default variant when none is specified (e.g. Store Modern Sofa
  // → Single Seater Chair instead of the full multi-seat model).
  const variant = variantId ?? DEFAULT_VARIANT_BY_PREVIEW[previewId];

  return (
    <thridify-view
      account-id={accountId}
      {...(productId ? { 'product-id': productId } : {})}
      preview-id={previewId}
      {...(variant ? { 'variant-id': variant } : {})}
      aria-label={`Interactive 3D ${label} — powered by Thridify`}
      class={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  );
}
