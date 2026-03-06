// ---------------------------------------------------------------------------
// Renderer public API
// ---------------------------------------------------------------------------

export { ResumeRenderer } from './ResumeRenderer';
export type { RenderProps } from './ResumeRenderer';

// Re-exports from the old renderer for backward compatibility
export { hasPendingSuggestions, generateThumbnail } from './ResumeRenderer';
export type { ThumbnailOptions } from './ResumeRenderer';
