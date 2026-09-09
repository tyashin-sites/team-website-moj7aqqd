/**
 * HeroArt — art-directed backdrop for hero media (industry / integration
 * pages). Abstract brand-gradient artwork only: layered teal + one-pink light
 * fields, a hairline orbit set and a fine dot grid, with a soft plinth shadow
 * under the object. No fabricated product imagery — the real render in front
 * of it is the page's own seamless demo poster. Token-driven (re-tints in the
 * dark scheme); drifts gently under ScrollFX parallax; decorative only.
 */

export function HeroArt({ className = '' }: { className?: string }) {
  return (
    <div className={`hero-art ${className}`} aria-hidden>
      <div data-parallax="0.12" className="hero-art-field" />
      <div className="hero-art-grid" />
      <svg
        className="hero-art-orbits"
        viewBox="0 0 600 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <ellipse cx="300" cy="250" rx="290" ry="132" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
        <ellipse
          cx="300"
          cy="250"
          rx="345"
          ry="168"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
        <ellipse cx="300" cy="250" rx="232" ry="100" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="10" cy="250" r="3" fill="currentColor" fillOpacity="0.7" />
        <circle cx="592" cy="212" r="2.5" fill="currentColor" fillOpacity="0.55" />
      </svg>
      <div className="hero-art-plinth" />
    </div>
  );
}
