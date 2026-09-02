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

/** Industry slug → live experience preview id (undefined = keep placeholder). */
export const INDUSTRY_EXPERIENCE: Record<string, string | undefined> = {
  furniture: EXP.modernSofa,
  'modular-kitchens': EXP.modularKitchen,
  'doors-and-windows': EXP.door,
  'prefab-structures': EXP.realisticRoom,
  'industrial-machinery': EXP.robot, // RobotExpressive — automation/robotics stand-in
  'laminates-surfaces': EXP.merinoBoard,
};
