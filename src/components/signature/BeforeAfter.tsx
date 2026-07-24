'use client';

/**
 * BeforeAfter — DESIGN-SPEC §7.3. The positioning made physical:
 * a toggle split panel. "Flat photos" = grayscale static panel annotated
 * with pains; "Live 3D" = teal showroom panel annotated with gains (pink).
 * Real configurator/AR captures replace the placeholder panels when
 * provided (docs/ASSET-DEBT.md #4).
 */

import { useState } from 'react';
import { ImageOff, Rotate3d } from 'lucide-react';

const PAINS = ['Returns from guesswork', 'Quote delays', 'Photoshoot costs'];
const GAINS = ['Buyers see exactly what ships', 'Instant quotes', 'One 3D asset, every angle'];

export function BeforeAfter() {
  const [after, setAfter] = useState(false);

  return (
    <div>
      {/* Toggle */}
      <div className="inline-flex rounded-full border border-foreground/15 p-1 bg-paper" role="tablist" aria-label="Before and after">
        <button
          type="button"
          role="tab"
          aria-selected={!after}
          onClick={() => setAfter(false)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-micro ${
            !after ? 'bg-ink text-paper' : 'text-foreground/60 hover:text-foreground'
          }`}
        >
          Flat photos
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={after}
          onClick={() => setAfter(true)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-micro ${
            after ? 'bg-primary text-primary-contrast' : 'text-foreground/60 hover:text-foreground'
          }`}
        >
          Live 3D
        </button>
      </div>

      {/* Panel */}
      <div
        className={`mt-6 relative rounded-lg overflow-hidden border transition-ui ${
          after ? 'bg-ink border-primary/25' : 'bg-tint border-foreground/10'
        }`}
      >
        <div className="aspect-[16/9] flex items-center justify-center">
          {after ? (
            <div className="text-center px-6">
              <Rotate3d className="w-14 h-14 mx-auto text-primary" strokeWidth={1.25} aria-hidden />
              <p className="mt-3 tt-mono text-muted-dark">interactive 3D — capture pending</p>
            </div>
          ) : (
            <div className="text-center px-6">
              <ImageOff className="w-14 h-14 mx-auto text-foreground/30" strokeWidth={1.25} aria-hidden />
              <p className="mt-3 tt-mono text-muted">static product photo</p>
            </div>
          )}
        </div>

        {/* Annotations */}
        <ul className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-wrap gap-2">
          {(after ? GAINS : PAINS).map((t) => (
            <li
              key={t}
              className={`text-xs md:text-sm font-medium px-3 py-1.5 rounded-full ${
                after
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'bg-paper text-foreground/70 border border-foreground/15'
              }`}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
