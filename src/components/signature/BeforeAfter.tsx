'use client';

/**
 * BeforeAfter — DESIGN-SPEC §7.3 + §6a (DEMO-FIRST). The positioning made
 * physical: the SAME product shown as two experiences, side by side.
 *   - LEFT  = the "flat photo" — a static raster still of the chair
 *             (the hero's seamless poster, §6), annotated with the pains of
 *             selling from flat images.
 *   - RIGHT = the interactive 3D of that IDENTICAL product (poster-first,
 *             activate-on-interaction), annotated with the gains in pink.
 * It must read as "same product, two experiences" — comparing the
 * EXPERIENCE, not two different graphics.
 *
 * Real product photo + matching 3D model are asset debt (docs/ASSET-DEBT.md
 * #4/#1) — the placeholder chair stands in for both sides so the comparison
 * is honestly apples-to-apples.
 */

import { CapabilityDemo } from '@/components/signature/CapabilityDemo';

const PAINS = ['Returns from guesswork', 'Quote delays', 'Photoshoot costs'];
const GAINS = ['Buyers see exactly what ships', 'Instant quotes', 'One 3D asset, every angle'];

const POSTER_SRC = '/models/sheen-chair-poster.webp';

export function BeforeAfter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
      {/* LEFT — the flat photo */}
      <figure>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">Flat photo</span>
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-foreground/10 bg-tint">
          {/* Same product, rendered flat — desaturated to read as "just a
              photo". eslint-disable-next-line @next/next/no-img-element */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={POSTER_SRC}
            alt="Flat product photo of a lounge chair — one fixed angle, no interaction"
            width={640}
            height={480}
            className="w-full h-full object-contain grayscale-[0.35] opacity-90"
          />
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {PAINS.map((t) => (
            <li
              key={t}
              className="text-xs md:text-sm font-medium px-3 py-1.5 rounded-full bg-paper text-foreground/70 border border-foreground/15"
            >
              {t}
            </li>
          ))}
        </ul>
      </figure>

      {/* RIGHT — the SAME product, live 3D */}
      <figure>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Live 3D · same product</span>
        </div>
        <CapabilityDemo mode="viewer" aspect="aspect-[4/3]" />
        <ul className="mt-4 flex flex-wrap gap-2">
          {GAINS.map((t) => (
            <li
              key={t}
              className="text-xs md:text-sm font-medium px-3 py-1.5 rounded-full bg-accent/20 text-foreground/80 border border-accent/50"
            >
              {t}
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}
