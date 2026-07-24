/**
 * ProductVisual — brand-colored abstract representations of the five real
 * products, used wherever a real capture doesn't exist yet.
 *
 * DESIGN-SPEC §6 forbids stock photography; docs/ASSET-DEBT.md tracks the
 * missing real captures (configurator recordings, AR phone captures). Until
 * those arrive, each module gets a distinct abstract geometry in the
 * canonical palette — one pink accent max per visual (§1 scarcity rule).
 *
 * Server component, inline SVG only — zero JS, zero requests.
 */

export type ProductVisualVariant =
  | 'viewer'
  | 'configurator'
  | 'ar'
  | 'content'
  | 'analytics';

const TEAL = '#007050';
const TEAL_DEEP = '#004D37';
const TEAL_SOFT = '#6FCFAB';
const PINK = '#FEBFCC';

function strokeFor(onDark: boolean) {
  return onDark ? 'rgba(255,255,255,0.55)' : 'rgba(2,31,23,0.45)';
}
function faintFor(onDark: boolean) {
  return onDark ? 'rgba(255,255,255,0.14)' : 'rgba(2,31,23,0.10)';
}

function ViewerArt({ onDark, accent }: ArtProps) {
  const stroke = strokeFor(onDark);
  const faint = faintFor(onDark);
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden focusable="false">
      {/* object core */}
      <rect x="165" y="115" width="70" height="70" rx="12" fill={TEAL} transform="rotate(4 200 150)" />
      <rect x="158" y="108" width="70" height="70" rx="12" fill="none" stroke={TEAL_SOFT} strokeWidth="1.5" transform="rotate(-8 193 143)" />
      {/* orbit rings */}
      <ellipse cx="200" cy="150" rx="130" ry="46" fill="none" stroke={faint} strokeWidth="1.5" />
      <ellipse cx="200" cy="150" rx="130" ry="46" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="4 8" transform="rotate(18 200 150)" />
      {/* orbit dots — the single pink accent */}
      <circle cx="330" cy="150" r="5" fill={accent} />
      <circle cx="86" cy="176" r="4" fill={TEAL_SOFT} />
      {/* rotate cue */}
      <path d="M150 236 a56 16 0 0 0 100 0" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d="M250 236 l-7 -6 M250 236 l-9 3" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ConfiguratorArt({ onDark, accent }: ArtProps) {
  const stroke = strokeFor(onDark);
  const faint = faintFor(onDark);
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden focusable="false">
      {/* product plate */}
      <rect x="60" y="60" width="180" height="180" rx="16" fill={faint} />
      <rect x="88" y="88" width="124" height="124" rx="12" fill={TEAL} />
      {/* swatch rail */}
      <g>
        <circle cx="300" cy="92" r="14" fill={TEAL} />
        <circle cx="300" cy="136" r="14" fill={TEAL_DEEP} />
        <circle cx="300" cy="180" r="14" fill={accent} />
        <circle cx="300" cy="180" r="19" fill="none" stroke={stroke} strokeWidth="1.5" />
        <circle cx="300" cy="224" r="14" fill="none" stroke={stroke} strokeWidth="1.5" />
      </g>
      {/* live price line */}
      <rect x="340" y="168" width="2" height="24" fill={TEAL_SOFT} />
      <text x="352" y="186" fontFamily="monospace" fontSize="16" fill={onDark ? '#FFFFFF' : TEAL_DEEP}>$</text>
    </svg>
  );
}

function ArArt({ onDark, accent }: ArtProps) {
  const stroke = strokeFor(onDark);
  const faint = faintFor(onDark);
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden focusable="false">
      {/* phone frame */}
      <rect x="150" y="34" width="100" height="196" rx="18" fill="none" stroke={stroke} strokeWidth="2" />
      <rect x="186" y="44" width="28" height="5" rx="2.5" fill={faint} />
      {/* floor plane through the camera */}
      <path d="M60 246 L200 196 L340 246" fill="none" stroke={faint} strokeWidth="1.5" />
      <path d="M120 246 L200 216 L280 246" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="5 6" />
      {/* placed object at true scale */}
      <rect x="178" y="128" width="44" height="44" rx="8" fill={TEAL} transform="rotate(4 200 150)" />
      <rect x="172" y="122" width="44" height="44" rx="8" fill="none" stroke={accent} strokeWidth="1.5" transform="rotate(-8 194 144)" />
      {/* scale anchors */}
      <circle cx="200" cy="196" r="3.5" fill={TEAL_SOFT} />
    </svg>
  );
}

function ContentArt({ onDark, accent }: ArtProps) {
  const stroke = strokeFor(onDark);
  const faint = faintFor(onDark);
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden focusable="false">
      {/* one 3D source */}
      <rect x="66" y="110" width="80" height="80" rx="12" fill={TEAL} transform="rotate(4 106 150)" />
      <rect x="60" y="104" width="80" height="80" rx="12" fill="none" stroke={TEAL_SOFT} strokeWidth="1.5" transform="rotate(-8 100 144)" />
      {/* flow */}
      <path d="M160 150 C 195 150 195 96 230 96 M160 150 C 195 150 195 150 230 150 M160 150 C 195 150 195 204 230 204" fill="none" stroke={stroke} strokeWidth="1.5" />
      {/* generated frames */}
      <rect x="236" y="66" width="110" height="60" rx="10" fill={faint} />
      <rect x="236" y="140" width="110" height="60" rx="10" fill={faint} />
      <rect x="236" y="214" width="110" height="40" rx="10" fill={faint} />
      <circle cx="262" cy="90" r="9" fill={TEAL_SOFT} />
      <path d="M282 112 l16 -14 l14 10 l18 -16 l16 20" fill="none" stroke={stroke} strokeWidth="1.5" />
      {/* the single pink accent — a "new asset" spark */}
      <circle cx="346" cy="140" r="5" fill={accent} />
    </svg>
  );
}

function AnalyticsArt({ onDark, accent }: ArtProps) {
  const stroke = strokeFor(onDark);
  const faint = faintFor(onDark);
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden focusable="false">
      {/* axis */}
      <path d="M70 60 L70 240 L340 240" fill="none" stroke={faint} strokeWidth="1.5" />
      {/* bars */}
      <rect x="100" y="180" width="30" height="60" rx="6" fill={faint} />
      <rect x="150" y="156" width="30" height="84" rx="6" fill={TEAL_SOFT} opacity="0.7" />
      <rect x="200" y="128" width="30" height="112" rx="6" fill={TEAL} />
      <rect x="250" y="96" width="30" height="144" rx="6" fill={TEAL_DEEP} />
      {/* trend line + the one pink point */}
      <path d="M84 200 L115 186 L165 160 L215 128 L265 96 L316 74" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" />
      <circle cx="316" cy="74" r="5" fill={accent} />
    </svg>
  );
}

const ART: Record<ProductVisualVariant, (p: ArtProps) => React.ReactElement> = {
  viewer: ViewerArt,
  configurator: ConfiguratorArt,
  ar: ArArt,
  content: ContentArt,
  analytics: AnalyticsArt,
};

type ArtProps = { onDark: boolean; accent: string };

export function ProductVisual({
  variant,
  onDark = false,
  /** Pink accent is scarce by design (§1) — set false when several visuals
      share a viewport (e.g. the home product trio) so only teal renders. */
  pinkAccent = true,
  className = '',
}: {
  variant: ProductVisualVariant;
  onDark?: boolean;
  pinkAccent?: boolean;
  className?: string;
}) {
  const Art = ART[variant];
  const accent = pinkAccent ? PINK : TEAL_SOFT;
  return (
    <div
      className={`relative aspect-[4/3] rounded-lg overflow-hidden border ${
        onDark ? 'bg-paper/[0.04] border-paper/15' : 'bg-tint border-foreground/10'
      } ${className}`}
    >
      <div className="absolute inset-0 p-6 md:p-10">
        <Art onDark={onDark} accent={accent} />
      </div>
    </div>
  );
}
