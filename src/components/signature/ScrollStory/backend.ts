/**
 * Scene backends — the ONE seam between the scroll choreography and whatever
 * renders the product. The story only ever calls this interface; it never
 * touches a viewer element directly.
 *
 * Why two backends (research, 2026-09):
 *  - `<thridify-view>` (mviewer.js) exposes NO camera surface: its public
 *    contract is eight attributes (account/product/preview/variant ids…) plus
 *    the `__thridifyCommands` bridge (applyOption / applyDesign / getPrice /
 *    enterAR). Every attribute write re-renders its React tree, so it cannot
 *    be driven per frame. It DOES bundle Google model-viewer inside an OPEN
 *    shadow root, hard-codes `interpolation-decay="200"`, and snaps the
 *    camera itself on load.
 *  - Google `<model-viewer>` is the same renderer with full camera control at
 *    ~300 KB instead of 5 MB — so the story ships on it today.
 *
 * `createThridifyViewBackend` documents the swap: same interface, reaching the
 * inner model-viewer through the shadow root. It is best-effort and NOT wired
 * by default — flip `ScrollStory`'s `backend` prop to 'thridify-view' once the
 * viewer publishes a camera contract (THRIDIFY-SDK-PLAN has none yet).
 */

import type { CameraPose } from './beats';

export type BackendKind = 'model-viewer' | 'thridify-view';

export interface SceneBackend {
  readonly kind: BackendKind;
  /** Callouts need model-space hotspot positioning — model-viewer only. */
  readonly supportsCallouts: boolean;
  /** Set the camera. Safe to call every frame. */
  setCamera(pose: CameraPose): void;
  /** Switch the product finish (glTF material-variant name). */
  setVariant(name: string): void;
  /** Resolves once the model is loaded and the camera can be driven. */
  whenReady(): Promise<void>;
  dispose(): void;
}

/** The subset of the model-viewer element the backends rely on. */
type ModelViewerLike = HTMLElement & {
  cameraOrbit?: string;
  variantName?: string | null;
  interpolationDecay?: number;
  loaded?: boolean;
  jumpCameraToGoal?: () => void;
};

function orbitString(pose: CameraPose): string {
  return `${pose.theta}deg ${pose.phi}deg ${pose.radius}%`;
}

/**
 * Google model-viewer backend. Camera writes go straight to `cameraOrbit`
 * (the % radius is relative to the viewer's own framing, so the pose is
 * model-agnostic). The decay is kept short: the scroll scrub is already
 * smoothed by GSAP, so the viewer must not add a second lag on top.
 */
export function createModelViewerBackend(el: HTMLElement): SceneBackend {
  const mv = el as ModelViewerLike;
  let disposed = false;
  let pendingVariant: string | null = null;

  const ready = new Promise<void>((resolve) => {
    if (mv.loaded) return resolve();
    mv.addEventListener('load', () => resolve(), { once: true });
  });

  void ready.then(() => {
    if (disposed) return;
    mv.interpolationDecay = 30;
    if (pendingVariant !== null) mv.variantName = pendingVariant;
  });

  return {
    kind: 'model-viewer',
    supportsCallouts: true,
    setCamera(pose) {
      if (disposed) return;
      mv.cameraOrbit = orbitString(pose);
    },
    setVariant(name) {
      if (disposed) return;
      // The scene graph only exists after load; queue the variant until then.
      if (mv.loaded) mv.variantName = name;
      else pendingVariant = name;
    },
    whenReady: () => ready,
    dispose() {
      disposed = true;
    },
  };
}

/**
 * Experimental `<thridify-view>` backend (see header). Reaches the bundled
 * model-viewer through the open shadow root, neutralises the hard-coded
 * 200 ms decay, and waits for both the model `load` and the command bridge.
 * Variants map to glTF variant names on the inner viewer; finish switching
 * through Thridify's own `applyDesign(sku)` bridge is left to the caller.
 */
export function createThridifyViewBackend(host: HTMLElement): SceneBackend {
  let inner: SceneBackend | null = null;
  let disposed = false;
  const queued: Array<(b: SceneBackend) => void> = [];

  const ready = new Promise<void>((resolve) => {
    const attach = () => {
      if (disposed || inner) return true;
      const mv = host.shadowRoot?.querySelector<HTMLElement>('model-viewer');
      if (!mv) return false;
      inner = createModelViewerBackend(mv);
      void inner.whenReady().then(() => {
        (mv as ModelViewerLike).interpolationDecay = 0;
        queued.splice(0).forEach((fn) => inner && fn(inner));
        resolve();
      });
      return true;
    };
    if (attach()) return;
    // The viewer mounts its React tree asynchronously — poll briefly for it.
    const timer = window.setInterval(() => {
      if (attach() || disposed) window.clearInterval(timer);
    }, 250);
  });

  const call = (fn: (b: SceneBackend) => void) => (inner ? fn(inner) : queued.push(fn));

  return {
    kind: 'thridify-view',
    supportsCallouts: false,
    setCamera: (pose) => call((b) => b.setCamera(pose)),
    setVariant: (name) => call((b) => b.setVariant(name)),
    whenReady: () => ready,
    dispose() {
      disposed = true;
      inner?.dispose();
    },
  };
}
