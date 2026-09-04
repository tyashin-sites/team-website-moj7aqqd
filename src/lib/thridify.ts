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
  robot: '5c9$25', // RobotExpressive — industrial machinery / automation
} as const;

/** The <thridify-view> viewer requires the product id (pid); preview-id alone
 *  throws "Product ID is required". Map every embedded preview id → its pid. */
export const PID_BY_PREVIEW: Record<string, string> = {
  'k5h0f_': 'StoreModernSofa',
  '8_-uco': '51',
  '_z8ksj': 'loungechair',
  'jthf23': 'DiningTable',
  'lb724x': 'StoreArmchair',
  '$_xy-3': '105',
  '1z0_aa': '84',
  '37$i57': 'luxuryfurniture',
  '$_jaes': 'alexandria',
  's2dy4-': '07',
  '17ocfi': 'MM001',
  'kn7ym_': '903',
  '5c9$25': 'RobotExpressive',
};

/**
 * Experience Modes seam contract (THRIDIFY-EXPERIENCE-MODES-PLAN §5, Layer C).
 * The site's ONLY job is declarative: say WHICH mode a placement uses and supply
 * a poster source + a relative, sized container. The SDK owns the governor
 * (context cap, warm window, hysteresis) and the poster↔3D handoff — NONE of
 * that logic lives here. Values are inert until the new SDK engine ships.
 */
export type ThridifyMode = 'instant' | 'ready' | 'on-demand' | 'hover';

/** Local placeholder poster used until an experience's own published poster URL
 *  (models.thridify.com/<account>/<uuid>/poster/…) is wired. */
export const PLACEHOLDER_POSTER = '/models/sheen-chair-poster.webp';

/** Preview id → poster image URL. The SDK's poster↔3D handoff (§2/§5) needs a
 *  poster source per placement; the host supplies it here. Real published
 *  posters where known, local placeholder otherwise (see PLACEHOLDER_POSTER —
 *  swap in each experience's own poster as the URLs become available). */
export const POSTER_BY_PREVIEW: Record<string, string> = {
  // Lounge chair — the experience's own published poster (its flat photo).
  '_z8ksj':
    'https://models.thridify.com/9778c64430db8927b214b554a5819391/b3042c32-0807-4f67-861a-7a4c9d12cdb1/poster/1hfll6ityj1-Lounge%20chair-poster.png',
};

/** Resolve the poster source for a placement, falling back to the placeholder. */
export function posterFor(previewId: string): string {
  return POSTER_BY_PREVIEW[previewId] ?? PLACEHOLDER_POSTER;
}

/** Preview id → default variant id, for experiences that should open on a
 *  specific variant when none is otherwise specified (e.g. the Store Modern
 *  Sofa's "Single Seater Chair" default rather than the full multi-seat model). */
// NOTE: the viewer matches variant-id against the variant's vId (short id shown
// in the admin "Variant Id" column), NOT the Mongo id.
export const DEFAULT_VARIANT_BY_PREVIEW: Record<string, string> = {
  'k5h0f_': 'ssc', // Store Modern Sofa → Single Seater Chair
};

/** Industry slug → live experience preview id (undefined = keep placeholder). */
export const INDUSTRY_EXPERIENCE: Record<string, string | undefined> = {
  furniture: EXP.modernSofa,
  'modular-kitchens': EXP.modularKitchen,
  'doors-and-windows': EXP.door,
  'prefab-structures': EXP.realisticRoom,
  'industrial-machinery': EXP.robot, // RobotExpressive — automation/robotics stand-in
  'laminates-surfaces': EXP.merinoBoard,
};
