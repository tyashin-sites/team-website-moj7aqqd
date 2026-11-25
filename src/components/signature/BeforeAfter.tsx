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
 * Both sides are the SAME real Thridify experience (Dering Lounger, from the
 * movablefurniture@ showcase account): LEFT is a still of that experience (the
 * flat photo), RIGHT is the live interactive experience — a true
 * apples-to-apples "flat vs 3D of the identical product". (Until 2026-11-25
 * this was the hello@ Lounge chair, which was deleted in the admin;
 * aapastech/tyashin-platform#105.)
 */

import { CapabilityDemo } from '@/components/signature/CapabilityDemo';
import { EXP, posterFor } from '@/lib/thridify';

const PAINS = ['Returns from guesswork', 'Quote delays', 'Photoshoot costs'];
const GAINS = ['Buyers see exactly what ships', 'Instant quotes', 'One 3D asset, every angle'];

// The experience's poster (a still from the live viewer) — same source the SDK
// handoff uses for the live 3D on the right (single-sourced from lib/thridify's
// POSTER_BY_PREVIEW).
const BEFORE_AFTER_EXPERIENCE = EXP.deringLounger;
const POSTER_SRC = posterFor(BEFORE_AFTER_EXPERIENCE);

export function BeforeAfter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
      {/* LEFT — the flat photo. The two figures drift at slightly different
          scroll speeds (ScrollFX parallax) — quiet depth between "flat" and
          "live", nothing carnival. */}
      <figure data-parallax="0.05">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Flat photo</span>
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-foreground/10 bg-tint">
          {/* Same product, rendered flat — desaturated to read as "just a
              photo". eslint-disable-next-line @next/next/no-img-element */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={POSTER_SRC}
            alt="Flat product photo of a lounger — one fixed angle, no interaction"
            width={640}
            height={480}
            className="w-full h-full object-contain grayscale-[0.35] opacity-90"
          />
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {PAINS.map((t) => (
            <li
              key={t}
              className="text-xs md:text-sm font-medium px-3 py-1.5 rounded-full bg-surface text-foreground/70 border border-foreground/15"
            >
              {t}
            </li>
          ))}
        </ul>
      </figure>

      {/* RIGHT — the SAME product, live 3D */}
      <figure data-parallax="0.1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Live 3D · same product</span>
        </div>
        {/* The section's focal "aha" — a single live experience → `ready` so it
            pre-warms and feels instant on scroll (Experience Modes §3). */}
        <CapabilityDemo mode="viewer" aspect="aspect-[4/3]" experiencePreviewId={BEFORE_AFTER_EXPERIENCE} experienceMode="ready" modelLabel="Dering lounger" />
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
