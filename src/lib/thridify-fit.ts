/**
 * Authored field of view for an embedded Thridify experience.
 *
 * An experience is framed by its author with a camera distance AND a field of
 * view (the showcase sofas use 45 degrees). The viewer passes the authored
 * `field-of-view` to its inner <model-viewer> but leaves `max-field-of-view`
 * on `auto`, which that element resolves to 30 degrees, so a wider authored
 * view is silently narrowed and a wide product (a 2.35 m sofa) is cropped on
 * both sides in a square or portrait box.
 *
 * Until the viewer itself raises the limit, a placement can opt in to
 * restoring the authored value (see DeferredExperience `fitAuthoredView`).
 * Nothing here invents a camera: it only lets the author's own number apply.
 *
 * No imports on purpose: tests/black-friday.test.mjs runs this file directly.
 */

/** Degrees of slack before the authored value counts as narrowed. */
const TOLERANCE_DEG = 0.5;
/** Never widen past this, whatever an attribute says. */
const CEILING_DEG = 60;

/**
 * The field of view (degrees) to restore, or null when there is nothing to
 * do: no authored value, an `auto` value, or a limit that already allows it.
 */
export function authoredFovToRestore(
  fieldOfViewAttr: string | null | undefined,
  currentMaxDeg: number,
): number | null {
  if (!fieldOfViewAttr) return null;
  const match = /^\s*(\d+(?:\.\d+)?)deg\s*$/.exec(fieldOfViewAttr);
  if (!match) return null;
  const authored = Number(match[1]);
  if (!Number.isFinite(authored) || authored <= 0 || authored > CEILING_DEG) return null;
  if (!Number.isFinite(currentMaxDeg)) return null;
  if (currentMaxDeg + TOLERANCE_DEG >= authored) return null;
  return authored;
}

type ModelViewerLike = HTMLElement & {
  loaded?: boolean;
  fieldOfView?: string;
  maxFieldOfView?: string;
  updateComplete?: Promise<unknown>;
  getMaximumFieldOfView?: () => number;
  jumpCameraToGoal?: () => void;
};

/**
 * Watch `box` for a live <thridify-view> and let its authored field of view
 * apply. Safe to call before the viewer exists; gives up quietly after
 * `giveUpMs`. If the viewer's internals change, this does nothing and the
 * experience renders exactly as it does without it. Returns a cleanup.
 */
export function restoreAuthoredFieldOfView(box: HTMLElement, giveUpMs = 60_000): () => void {
  let stopped = false;
  let poll = 0;
  let viewer: ModelViewerLike | null = null;

  const apply = () => {
    const mv = viewer;
    if (stopped || !mv || typeof mv.getMaximumFieldOfView !== 'function') return;
    let fov: number | null = null;
    try {
      fov = authoredFovToRestore(mv.getAttribute('field-of-view'), mv.getMaximumFieldOfView());
    } catch {
      return;
    }
    if (fov === null) return;
    const value = `${fov}deg`;
    mv.maxFieldOfView = value;
    // The element only re-reads its goal when the value changes, so step off
    // the authored value and back, then land without an animated zoom-out.
    mv.fieldOfView = 'auto';
    Promise.resolve(mv.updateComplete)
      .then(() => {
        if (stopped) return;
        mv.fieldOfView = value;
        return mv.updateComplete;
      })
      .then(() => {
        if (!stopped) mv.jumpCameraToGoal?.();
      })
      .catch(() => {});
  };

  const startedAt = Date.now();
  const find = () => {
    if (stopped) return;
    const host = box.querySelector('thridify-view');
    const mv = host?.shadowRoot?.querySelector('model-viewer') as ModelViewerLike | null | undefined;
    if (mv) {
      viewer = mv;
      mv.addEventListener('load', apply);
      apply();
      return;
    }
    if (Date.now() - startedAt < giveUpMs) poll = window.setTimeout(find, 200);
  };
  find();

  return () => {
    stopped = true;
    if (poll) window.clearTimeout(poll);
    viewer?.removeEventListener('load', apply);
  };
}
