'use client';

/**
 * DeferredExperience — a live Thridify experience that waits its turn.
 *
 * For pages whose first screen is TEXT (campaign pages): the box is reserved
 * by the caller, a CSS-only placeholder paints with the page, and the real
 * `<thridify-view>` (and its mviewer.js runtime) mounts only after the first
 * paint, on idle. The placeholder is a gradient, not an image, so it is never
 * a Largest Contentful Paint candidate and the headline stays the largest
 * paint. No layout shift: the viewer fills the already-sized box.
 */

import { useEffect, useState } from 'react';
import { ThridifyExperience } from '@/components/signature/ThridifyExperience';

export function DeferredExperience({
  previewId,
  label,
  className = '',
}: {
  previewId: string;
  /** Short noun for the accessible label, e.g. "sofa". */
  label: string;
  /** Sizing for the reserved box (aspect ratio, max height, radius, border). */
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    let idle = 0;
    let timer = 0;
    const mount = () => setMounted(true);
    // Two frames guarantee the server-rendered text has painted; idle keeps
    // the runtime download out of the way of hydration.
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (typeof window.requestIdleCallback === 'function') {
          idle = window.requestIdleCallback(mount, { timeout: 2000 });
        } else {
          timer = window.setTimeout(mount, 300);
        }
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (idle && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`} data-print="hide">
      {/* Neutral placeholder: stays underneath; the viewer paints over it. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_62%,color-mix(in_oklab,var(--brand-paper)_14%,transparent),transparent_68%)]"
      />
      {mounted && (
        <ThridifyExperience
          previewId={previewId}
          label={label}
          mode="ready"
          style={{ position: 'absolute', inset: 0 }}
        />
      )}
    </div>
  );
}
