'use client';

import { useEffect } from 'react';

/**
 * Root-level error boundary — only renders if the ROOT LAYOUT itself throws, so
 * it must supply its own <html>/<body> and cannot rely on globals.css or
 * next/font being present. Styles are inlined with the canonical palette
 * (DESIGN-SPEC §1) so it degrades gracefully to a branded page, never a white
 * screen. External error reporting is a plugin/analytics concern (ASSET-DEBT).
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[thridify] global error boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#021F17',
          color: '#FFFFFF',
          fontFamily: "'Space Grotesk', Inter, system-ui, sans-serif",
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: '34rem', textAlign: 'center' }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#6FCFAB', fontSize: '0.875rem', margin: 0 }}>
            Something went wrong
          </p>
          <h1 style={{ fontSize: '2.25rem', lineHeight: 1.1, margin: '1rem 0 0', fontWeight: 700 }}>
            A hiccup on our end.
          </h1>
          <p style={{ color: '#A3BFB5', margin: '1.25rem 0 0', fontSize: '1.05rem' }}>
            The page couldn&rsquo;t load. Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '2rem',
              backgroundColor: '#007050',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
              padding: '0.9rem 1.75rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
          <p style={{ marginTop: '1.25rem' }}>
            <a href="/" style={{ color: '#6FCFAB', textDecoration: 'underline' }}>
              Back to home
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
