import { RenderProps, ResumeRenderer } from "@features/resume/renderer";
import { memo } from "react";

/**
 * ThumbnailRenderer - Separate component for thumbnail generation
 * This component is isolated from the main renderer to prevent unnecessary re-renders
 * It always renders without highlights, suggestions, or interactive features
 */
function ThumbnailRendererInternal({ template, data, className }: Omit<RenderProps, 'currentSection' | 'hasSuggestions' | 'isThumbnail'>) {
  return (
    <ResumeRenderer
      template={template}
      data={data}
      className={className}
      currentSection={undefined}
      hasSuggestions={false}
      isThumbnail={true}
    />
  );
}

// Memoize ThumbnailRenderer to prevent unnecessary re-renders during thumbnail generation
// This prevents the hidden thumbnail renderer from affecting the main visible renderer
export const ThumbnailRenderer = memo(ThumbnailRendererInternal);