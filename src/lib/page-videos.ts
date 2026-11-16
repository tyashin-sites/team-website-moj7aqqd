import { SITE_URL, ORG_ID } from '@/lib/schema';
import type { LdNode } from '@/lib/knowledge-graph';

/**
 * Short product videos shown below the hero on the pages we push in search.
 *
 * Every video is a recording of a live Thridify experience from `EXP` in
 * lib/thridify.ts being used in the public viewer. The files live in
 * /public/videos: `<file>.mp4` (1:1, 720 px, H.264 + AAC) and `<file>.jpg`
 * (poster, also the VideoObject thumbnail).
 *
 * ONE source for three consumers, so they cannot drift:
 *  - <PageVideo> renders the player,
 *  - videoObjectLd() adds the VideoObject node to the page's JSON-LD graph,
 *  - /sitemap-pages.xml adds the <video:video> entry for the page.
 */
export interface PageVideo {
  /** Root-relative page path the video lives on. */
  path: string;
  /** Basename in /public/videos (no extension). */
  file: string;
  /** VideoObject name / sitemap title. */
  name: string;
  /** VideoObject description / sitemap description. */
  description: string;
  /** Section heading above the player. */
  heading: string;
  /** Whole seconds. */
  durationSeconds: number;
  /** ISO 8601 date the video was first published. */
  uploadDate: string;
  /** The spoken words, shown under the player and sent as `transcript`. */
  transcript: string;
}

const UPLOADED = '2026-11-15T00:00:00+00:00';
const SIZE = 720;

export const PAGE_VIDEOS: PageVideo[] = [
  {
    path: '/3d-product-configurator',
    file: '3d-product-configurator',
    name: '3D product configurator: one sofa, every fabric, leg and size',
    description:
      'A live Thridify 3D product configurator in use. The shopper taps a new fabric, changes the legs and switches the curved sofa between a lounge chair, a two seater and a three seater, all in the browser on the product page.',
    heading: 'Watch a 3D product configurator being used',
    durationSeconds: 23,
    uploadDate: UPLOADED,
    transcript:
      'Your shoppers want every finish before they buy. So let them build it. Tap a new fabric. The whole sofa changes. New legs, new size, all on your product page. That is a 3D product configurator. It runs in the browser. No app for your shopper. Want this on your store? Book a demo, 30 minutes.',
  },
  {
    path: '/industries/furniture',
    file: 'furniture-3d-configurator',
    name: 'Furniture 3D configurator with fabric and finish options',
    description:
      'A chaise lounger configured live in Thridify: the arm on the left or the right, wood legs or a metal plinth, and velvet, leather or boucle upholstery, all on one 3D model.',
    heading: 'Watch a furniture configurator with fabric and finish options',
    durationSeconds: 22,
    uploadDate: UPLOADED,
    transcript:
      'Furniture buyers cannot judge your fabric from a swatch. So show the whole piece. Arm on the left or right. Wood legs or a plinth. Velvet, leather, boucle. Every option you make, on one 3D model. Your buyer chooses with their own hands. Want your catalogue like this? Book a demo, 30 minutes.',
  },
  {
    path: '/integrations/magento',
    file: 'magento-3d-product-configurator',
    name: '3D product configurator for Magento (Adobe Commerce)',
    description:
      'What a Thridify 3D product configurator looks like on a Magento product page: the shopper picks a kitchen look, changes the door style, swaps the island hood and opens the larder in the browser.',
    heading: 'Watch the 3D configurator a Magento shopper would use',
    durationSeconds: 22,
    uploadDate: UPLOADED,
    transcript:
      'Your Magento product page can do more than photos. Let shoppers pick the look. Change the door style. Swap the island hood. Then open the larder. It is a 3D product configurator, embedded on your Magento template. No app for your shoppers. Want it on your store? Book a demo, 30 minutes.',
  },
  {
    path: '/360-product-viewer',
    file: '360-product-viewer',
    name: '360 product viewer: spin, zoom and look inside',
    description:
      'A perfume bottle in the Thridify 360 product viewer. The shopper spins it a full turn, zooms into the glass, lifts the cap off and switches between bottle designs on the same model.',
    heading: 'Watch the 360 product viewer on a real product',
    durationSeconds: 21,
    uploadDate: UPLOADED,
    transcript:
      'More product photos still leave your shopper guessing. A 360 product viewer does not. They spin it around. Zoom into the glass. Lift the cap off. Every angle you have, from one 3D model. Nothing left for your shopper to guess. Want it on your pages? Book a demo, 30 minutes.',
  },
  {
    path: '/ar-viewer',
    file: 'ar-viewer',
    name: 'AR viewer: from the product page to the customer’s room',
    description:
      'The AR hand-off in the Thridify viewer. One tap on the view-in-your-space button; on a laptop a QR code passes the sofa to the phone, where it opens at true scale with no app to install.',
    heading: 'Watch the AR hand-off from a product page',
    durationSeconds: 22,
    uploadDate: UPLOADED,
    transcript:
      'Will this sofa even fit in your customer’s room? Let them check it themselves. One tap on the button. On a laptop, a QR code hands it to their phone. The sofa lands at true scale, with no app to install. Your product, in their room, before they buy. Want AR on your store? Book a demo, 30 minutes.',
  },
];

export function getPageVideo(path: string): PageVideo | undefined {
  return PAGE_VIDEOS.find((v) => v.path === path);
}

export const videoSrc = (v: PageVideo) => `/videos/${v.file}.mp4`;
export const videoPoster = (v: PageVideo) => `/videos/${v.file}.jpg`;
export const VIDEO_SIZE = SIZE;

/** ISO 8601 duration, e.g. PT21S. */
export const videoDuration = (v: PageVideo) => `PT${v.durationSeconds}S`;

/** VideoObject node for the page's JSON-LD graph. */
export function videoObjectLd(v: PageVideo): LdNode {
  const page = `${SITE_URL}${v.path}`;
  return {
    '@type': 'VideoObject',
    '@id': `${page}#video`,
    name: v.name,
    description: v.description,
    thumbnailUrl: [`${SITE_URL}${videoPoster(v)}`],
    uploadDate: v.uploadDate,
    duration: videoDuration(v),
    contentUrl: `${SITE_URL}${videoSrc(v)}`,
    width: SIZE,
    height: SIZE,
    inLanguage: 'en',
    isFamilyFriendly: true,
    transcript: v.transcript,
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': `${page}#webpage` },
  };
}
