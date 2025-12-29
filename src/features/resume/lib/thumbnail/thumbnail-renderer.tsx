import { RenderProps, ResumeRenderer } from '@features/resume/renderer';

/**
 * ThumbnailRenderer - Separate component for thumbnail generation
 * This component is isolated from the main renderer to prevent unnecessary re-renders
 * It always renders without highlights, suggestions, or interactive features
 */
export function ThumbnailRenderer({
  template,
  data,
  className,
}: Omit<RenderProps, 'currentSection' | 'hasSuggestions' | 'isThumbnail'>) {
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
