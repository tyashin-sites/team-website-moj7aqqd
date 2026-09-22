import Image from 'next/image';

/**
 * The media box on a blog card — the ONE place card imagery is fitted, so the
 * featured card and the grid cards can never drift apart.
 *
 * Why it is not simply `object-cover`: featured images arrive in at least two
 * shapes and cover damaged both.
 *
 *   platform-generated heroes   1536×1024   3:2      1.50 : 1
 *   OG-style cards              1200×630             1.91 : 1
 *   the card box                16/10                1.60 : 1
 *
 * Cover crops the first top-and-bottom and the second left-and-right — and the
 * second is a designed card whose headline runs to the edge, so the crop ate
 * the words. No single fixed ratio can hold both, so the image is CONTAINED
 * and never cropped, while the box keeps its fixed ratio so the grid stays
 * even and nothing shifts as images load.
 *
 * The leftover space is filled by the same image, blurred and scaled, so the
 * letterbox reads as a deliberate surround instead of empty bars. Pure CSS —
 * no JS, no measuring — and it is correct for any aspect ratio, including
 * whatever an author uploads by hand later.
 */
export function PostCardMedia({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  if (!src) return <div className="absolute inset-0 aurora" aria-hidden />;
  return (
    <>
      {/* Decorative: aria-hidden + empty alt, so the title is announced once
          by the real image below rather than twice. */}
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        className="object-cover scale-110 blur-2xl saturate-150 opacity-50"
        sizes={sizes}
        unoptimized
      />
      <Image
        src={src}
        alt={alt}
        fill
        className="relative object-contain transition-transform duration-700 group-hover:scale-105"
        sizes={sizes}
        priority={priority}
        unoptimized
      />
    </>
  );
}
