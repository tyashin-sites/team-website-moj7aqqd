/**
 * Thridify live-experience wiring for this site.
 *
 * The site dogfoods Thridify: real experiences are embedded via the
 * `<thridify-view>` web component (see components/signature/ThridifyExperience).
 * All experiences live in the connected account hello@thridify.com; some were
 * shared in from other accounts (DNV door, Merino board, Nasher luggage,
 * realistic room) via Thridify's super-admin share (additive copy under this
 * account's namespace). Preview IDs are public identifiers — safe to ship.
 */

export const THRIDIFY_ACCOUNT_ID = '9778c64430db8927b214b554a5819391'; // hello@thridify.com
export const THRIDIFY_VIEWER_URL = 'https://viewer.thridify.com';

/** Curated preview IDs, one per demonstrated capability / vertical. */
export const EXP = {
  modernSofa: 'k5h0f_', // Store Modern Sofa (5 finishes) — flagship configure + AR
  bicycle: '8_-uco', // Store Bicycle — detailed 360° viewer
  loungeChair: '_z8ksj', // Lounge chair — clean viewer / AR
  diningTable: 'jthf23', // Store Dining Table (5 variants) — configurator
  armChair: 'lb724x', // Store Arm chair — AR
  baxterLounge: '$_xy-3', // Store Baxter Lounge Chair — viewer
  modularKitchen: '1z0_aa', // Store ModularKitchen (4 variants) — configurator
  luxuryFurniture: '37$i57', // luxury furniture (4 variants) — delivered-asset showcase
  nasherLuggage: '$_jaes', // Nasher Miles Alexandria (54 colorways) — showstopper configurator
  door: 's2dy4-', // DNV Door — doors & windows
  merinoBoard: '17ocfi', // Merino Marine Board (5 finishes) — laminates & surfaces
  realisticRoom: 'kn7ym_', // realistic room — prefab & modular structures
} as const;

/** Industry slug → live experience preview id (undefined = keep placeholder). */
export const INDUSTRY_EXPERIENCE: Record<string, string | undefined> = {
  furniture: EXP.modernSofa,
  'modular-kitchens': EXP.modularKitchen,
  'doors-and-windows': EXP.door,
  'prefab-structures': EXP.realisticRoom,
  'industrial-machinery': undefined, // no representative machine model yet — stays on placeholder
  'laminates-surfaces': EXP.merinoBoard,
};
