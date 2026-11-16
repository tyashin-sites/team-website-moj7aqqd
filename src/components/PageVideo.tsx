import { getPageVideo, videoPoster, videoSrc, VIDEO_SIZE } from '@/lib/page-videos';

/**
 * PageVideo — the short product video below a page's hero.
 *
 * Below the fold and click-to-play: `preload="none"` means the browser fetches
 * only the poster (lazy-loaded) until someone presses play, so the video adds
 * nothing to LCP. No autoplay, so sound never starts on its own. The words are
 * printed under the player for people who watch without sound and for crawlers.
 * Renders nothing for a path with no video.
 */
export function PageVideo({ path }: { path: string }) {
  const v = getPageVideo(path);
  if (!v) return null;
  return (
    <section id="video" className="section pt-0 scroll-mt-20">
      <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <p className="eyebrow">Video · {v.durationSeconds} seconds</p>
          <h2 className="tt-2 mt-3">{v.heading}</h2>
          <p className="mt-5 text-foreground/80 max-w-xl">{v.description}</p>
          <details className="mt-6 max-w-xl text-sm text-foreground/75">
            <summary className="cursor-pointer font-medium text-foreground/85">Read the words</summary>
            <p className="mt-3 leading-relaxed">{v.transcript}</p>
            <p className="mt-3 text-foreground/60">Voice: AI-generated, cloned with consent.</p>
          </details>
        </div>
        <div className="w-full max-w-[520px] mx-auto lg:mx-0 lg:justify-self-end">
          <video
            className="w-full h-auto rounded-2xl border border-border bg-surface shadow-sm"
            style={{ aspectRatio: '1 / 1' }}
            width={VIDEO_SIZE}
            height={VIDEO_SIZE}
            controls
            playsInline
            preload="none"
            poster={videoPoster(v)}
            aria-label={v.name}
          >
            <source src={videoSrc(v)} type="video/mp4" />
            <a href={videoSrc(v)}>Download the video (MP4)</a>
          </video>
        </div>
      </div>
    </section>
  );
}
