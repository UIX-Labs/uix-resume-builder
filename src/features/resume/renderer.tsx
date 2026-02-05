import { ResumeRenderer as ResumeRendererV0 } from '@features/resume/v0/renderer';
import * as React from 'react';
import { getResumeTemplateLayout } from './v1/lib/layout-utils';
import { getPageHeights } from './v1/lib/page-manager';
import { isTemplateConfig, templateConfigToResumeTemplate } from './v1/lib/template-adapter';
import { SingleColumnRenderer as SingleColumnRendererV1 } from './v1/single-column-renderer';
import { TwoColumnRenderer as TwoColumnRendererV1 } from './v1/two-column-renderer';
import type { ResumeTemplate } from './v1/types';
import type { TemplateConfig } from './v1/types/engine';

export { getResumeTemplateLayout } from './v1/lib/layout-utils';
export type { ResumeLayoutKind } from './v1/lib/layout-utils';
export { hasPendingSuggestions } from './v1/lib/section-utils';
export { generateThumbnail } from './v1/lib/thumbnail/thumbnail';
export type { ThumbnailOptions } from './v1/lib/thumbnail/thumbnail';
export { SingleColumnRenderer } from './v1/single-column-renderer';
export { TwoColumnRenderer } from './v1/two-column-renderer';

/** Legacy template or engine TemplateConfig. Public API accepts both. */
export type RenderTemplate = ResumeTemplate | TemplateConfig;

export interface RenderProps {
  template: RenderTemplate;
  data: Record<string, unknown>;
  className?: string;
  currentSection?: string;
  hasSuggestions?: boolean;
  isThumbnail?: boolean;
  skipImageFallbacks?: boolean;
  version?: string;
}

/**
 * Builds a minimal page config from legacy template.page for PageManager.
 */
function getLegacyPageConfig(legacyPage: ResumeTemplate['page']): { paddingPx: number } {
  const p = legacyPage?.padding;
  const paddingPx = typeof p === 'number' ? p : typeof p === 'string' ? Number.parseInt(p, 10) || 24 : 24;
  return { paddingPx: Number.isFinite(paddingPx) ? paddingPx : 24 };
}

/**
 * Single resume renderer: same output for live preview and PDF export.
 * Dispatches to versioned implementations (v0 or v1).
 */
function ResumeRendererComponent({
  template,
  data,
  className,
  currentSection,
  hasSuggestions = false,
  isThumbnail = false,
  skipImageFallbacks = false,
  version = 'v1',
}: RenderProps) {
  const isConfig = isTemplateConfig(template as RenderTemplate);
  const resumeTemplate: ResumeTemplate = isConfig
    ? templateConfigToResumeTemplate(template as TemplateConfig)
    : (template as ResumeTemplate);

  // Dispatch to V0 if requested
  if (version === 'v0') {
    return (
      <ResumeRendererV0
        template={resumeTemplate}
        data={data as any}
        className={className}
        currentSection={currentSection}
        hasSuggestions={hasSuggestions}
        isThumbnail={isThumbnail}
        skipImageFallbacks={skipImageFallbacks}
      />
    );
  }

  // Default to V1
  const layout = isConfig
    ? (template as TemplateConfig).layout.kind === 'two-column'
      ? 'two-column'
      : 'single'
    : getResumeTemplateLayout(resumeTemplate);

  const pageHeights = isConfig
    ? getPageHeights((template as TemplateConfig).page)
    : getPageHeights(getLegacyPageConfig(resumeTemplate.page));

  const commonProps = {
    template: resumeTemplate,
    data: data as any,
    className,
    currentSection,
    hasSuggestions,
    isThumbnail,
    skipImageFallbacks,
    pageHeights,
  };

  if (layout === 'two-column') {
    return <TwoColumnRendererV1 {...commonProps} />;
  }

  return <SingleColumnRendererV1 {...commonProps} />;
}

export const ResumeRenderer = React.memo(ResumeRendererComponent);
