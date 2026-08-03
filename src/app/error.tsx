'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, ArrowLeft } from 'lucide-react';

const CALENDLY = 'https://calendly.com/hello-thridify/30min';

/**
 * Route-segment error boundary. Renders INSIDE the root layout (Header/Footer
 * stay), so a client render error shows a graceful, on-brand page instead of a
 * white screen. Runtime error REPORTING to an external service is deliberately
 * NOT wired here — that hooks in with the analytics/YOM plugin at install
 * (docs/ASSET-DEBT.md). The console.error below is the local breadcrumb.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[thridify] route error boundary caught:', error);
  }, [error]);

  return (
    <section className="on-dark bg-ink text-paper relative overflow-hidden">
      <div
        className="absolute -right-40 top-0 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div className="container-x section relative">
        <div className="max-w-2xl">
          <p className="tt-mono text-primary-soft text-sm">Something went wrong</p>
          <h1 className="tt-display mt-4 text-paper">A hiccup on our end.</h1>
          <p className="mt-6 lead max-w-xl">
            This page hit an unexpected error. Try again — if it keeps happening,
            book a demo and we&rsquo;ll help directly.
          </p>
          {error?.digest && <p className="mt-3 tt-mono text-xs text-muted-dark">Reference: {error.digest}</p>}

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={reset}
              className="btn btn-primary px-7 py-4 text-base inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={1.75} aria-hidden />
              Try again
            </button>
            <Link href="/" className="btn btn-ghost px-7 py-4 text-base inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} aria-hidden />
              Back to home
            </Link>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost px-7 py-4 text-base"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
