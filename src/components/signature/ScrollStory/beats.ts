/**
 * ScrollStory beats — the narrative data for the pinned 3D story.
 *
 * Four beats mirror the pipeline (Configure → Live price → Instant quote →
 * BOM to factory). Each beat owns a camera move (from → to, scrubbed with the
 * scroll), an optional state change on the product (finish swap, price,
 * part callouts) and the copy + widget shown beside the product.
 *
 * Camera poses are backend-agnostic: theta/phi in degrees, radius as a
 * percentage of the framed distance (100% = the viewer's own fit). The
 * poster is rendered at START_POSE, so the model reveals with no pop.
 *
 * Prices, quote and BOM values are illustrative demo values for the
 * interaction — not product claims (same rule as HeroObject).
 */

export type CameraPose = {
  /** Azimuth, degrees. 0 = front of the product; 90 = its right side. */
  theta: number;
  /** Polar angle, degrees. 90 = eye level; smaller = looking down. */
  phi: number;
  /** Distance, % of the framed distance. */
  radius: number;
};

export type BeatId = 'configure' | 'price' | 'quote' | 'bom';

export type Beat = {
  id: BeatId;
  step: string;
  title: string;
  /** ≤ 10 words — same budget as the PipelineStrip nodes. */
  copy: string;
  /** ≤ 16 words — one supporting line. */
  detail: string;
  camera: { from: CameraPose; to: CameraPose };
  /** Product state once this beat is reached (end state of the beat). */
  state: SceneState;
};

export type SceneState = {
  /** glTF material-variant name (KHR_materials_variants). */
  variant: string;
  /** Live price shown in the price widget, USD. */
  price: number;
  /** Whether the part callouts (hotspots) are shown. */
  callouts: boolean;
};

export const START_POSE: CameraPose = { theta: 0, phi: 75, radius: 105 };

/** Finishes offered in the Configure beat. `variant` = glTF variant name;
 *  each variant also re-stains the frame (walnut → black ash). */
export const FINISHES = [
  { name: 'Mango velvet', frame: 'Walnut', swatch: '#F13400', variant: 'Mango Velvet', price: 1269 },
  { name: 'Peacock velvet', frame: 'Black ash', swatch: '#1F5C6B', variant: 'Peacock Velvet', price: 1349 },
] as const;

export const INITIAL_STATE: SceneState = {
  variant: FINISHES[0].variant,
  price: FINISHES[0].price,
  callouts: false,
};

const P1: CameraPose = { theta: -34, phi: 70, radius: 96 };
const P2: CameraPose = { theta: 28, phi: 68, radius: 100 };
const P3: CameraPose = { theta: 52, phi: 60, radius: 112 };
const P4: CameraPose = { theta: 128, phi: 72, radius: 90 };

export const BEATS: Beat[] = [
  {
    id: 'configure',
    step: '01',
    title: 'Configure',
    copy: 'Buyers build their exact product.',
    detail: 'Finish, frame and hardware — every option live, in 3D, in the browser.',
    camera: { from: START_POSE, to: P1 },
    state: { variant: FINISHES[1].variant, price: FINISHES[0].price, callouts: false },
  },
  {
    id: 'price',
    step: '02',
    title: 'Live price',
    copy: 'Every change reprices instantly.',
    detail: 'No spreadsheet, no callback. The number moves with the buyer.',
    camera: { from: P1, to: P2 },
    state: { variant: FINISHES[1].variant, price: FINISHES[1].price, callouts: false },
  },
  {
    id: 'quote',
    step: '03',
    title: 'Instant quote',
    copy: 'A ready-to-sign quote, no waiting.',
    detail: 'Configuration, price and lead time — generated the moment they are done.',
    camera: { from: P2, to: P3 },
    state: { variant: FINISHES[1].variant, price: FINISHES[1].price, callouts: false },
  },
  {
    id: 'bom',
    step: '04',
    title: 'BOM to factory',
    copy: 'Production specs flow straight through.',
    detail: 'Every part, code and quantity lands on the factory floor as-configured.',
    camera: { from: P3, to: P4 },
    state: { variant: FINISHES[1].variant, price: FINISHES[1].price, callouts: true },
  },
];

/** Quote lines (beat 03). */
export const QUOTE = {
  ref: 'Q-2481',
  lines: [
    ['Lounge chair · Peacock velvet / black ash', '$1,349'],
    ['Quantity', '1'],
    ['Lead time', '3 weeks'],
  ],
  total: '$1,349',
} as const;

/** Bill of materials (beat 04). Codes map 1:1 to the part callouts. */
export const BOM = [
  { code: 'FAB-PCK-01', part: 'Peacock velvet', qty: '2.4 m' },
  { code: 'FRM-ASH-02', part: 'Black ash frame', qty: '× 1' },
  { code: 'HW-STL-14', part: 'Steel fasteners', qty: '× 12' },
  { code: 'LBL-CARE-01', part: 'Care label', qty: '× 1' },
] as const;

/** Part callouts anchored on the model (beat 04). Positions are in model
 *  space (metres); normals face the product's right side, which the camera
 *  orbits during the BOM beat, so every callout stays facing the camera. */
export const CALLOUTS = [
  { id: 'fabric', code: 'FAB-PCK-01', label: 'Peacock velvet', position: '0.18 0.43 0.17', normal: '1 0.3 0.5' },
  { id: 'frame', code: 'FRM-ASH-02', label: 'Black ash frame', position: '0.25 0.56 -0.275', normal: '0.6 0 -0.8' },
  { id: 'hardware', code: 'HW-STL-14', label: 'Steel fasteners', position: '0.26 0.22 0.10', normal: '1 -0.1 0.3' },
] as const;
