import Image from 'next/image';

/**
 * RoomCapture — a REAL screen capture of the Room Visualizer / Shop the Look
 * surfaces, taken from the live dev account on 2026-10-11 (Playwright,
 * 1600×1000 @2x, stored as WebP under public/room-visualizer/).
 *
 * No-Faking: every image rendered through this component is an unedited
 * capture of the shipped product. Captions say what the viewer is looking
 * at; they never describe a capability the capture does not show.
 */
export function RoomCapture({
  src,
  alt,
  caption,
  width = 1600,
  height = 1000,
  priority = false,
  sizes = '(min-width: 1024px) 60vw, 100vw',
  className = '',
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={`card overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="w-full h-auto block"
      />
      {caption ? (
        <figcaption className="px-5 py-3 text-xs text-foreground/60 border-t border-foreground/10">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * The ~35-second screen recording of the shopper flow (browse → room →
 * orbit → plan → walk → room styles → elements). Muted, looped, inline; the poster is the
 * first room frame so the LCP is an image, not a video (performance law).
 */
export function RoomRecording({ className = '' }: { className?: string }) {
  return (
    <div className={`card overflow-hidden ${className}`}>
      <video
        className="w-full h-auto block"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/room-visualizer/room.webp"
        aria-label="Screen recording of Thridify Shop the Look: catalogue products placed in a 3D room, orbited, viewed in plan and walk-through, then re-styled across room styles."
      >
        <source src="/room-visualizer/shop-the-look.mp4" type="video/mp4" />
        <source src="/room-visualizer/shop-the-look.webm" type="video/webm" />
      </video>
      <p className="px-5 py-3 text-xs text-foreground/60 border-t border-foreground/10">
        Screen recording of the shopper flow on a live Thridify account, 11 Oct 2026 — cut for length, nothing composited or retouched.
      </p>
    </div>
  );
}
