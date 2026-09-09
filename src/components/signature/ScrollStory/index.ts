/**
 * ScrollStory — self-contained signature section. Everything it needs lives
 * in this folder (beats, backend seam, stage, choreography) plus the
 * `.scroll-story` / `.story-*` rules in globals.css.
 *
 * Feature flag: the homepage renders <ScrollStory/> when SCROLL_STORY_ENABLED
 * is true and falls back to the flat <PipelineStrip/> otherwise, so the
 * scene can be switched off (or removed) without touching the choreography.
 */

export const SCROLL_STORY_ENABLED = true;

export { ScrollStory } from './ScrollStory';
export type { BackendKind, SceneBackend } from './backend';
