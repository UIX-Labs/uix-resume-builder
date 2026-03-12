// ---------------------------------------------------------------------------
// ResumeRenderer — top-level component for the DSL-based renderer
//
// Delegates to sub-components for measurement, pagination, and page rendering.
// Uses SectionRegistry instead of if/else chains.
// ---------------------------------------------------------------------------

import React, { useRef } from 'react';
import type { SectionRenderContext } from '../section-registry';
import { SectionRegistry } from '../section-registry';
import type { CleanedResumeDataCompat } from '../cleaned-data';
import type { TypedTemplateConfig } from '../template-config';
import type { TemplateConfig } from '@features/resume-beta/models/template-types';
import type { CleanedResumeData } from '@features/resume-beta/models/cleaned-data';
import { useColumnSplit } from './useColumnSplit';
import { usePagination } from './usePagination';
import { MeasurementContainer } from './MeasurementContainer';
import { PageContainer } from './PageContainer';

// Re-exports for consumers
export { hasPendingSuggestions } from '@features/resume/lib/section-utils';
export { generateThumbnail } from '@features/resume/lib/thumbnail/thumbnail';
export type { ThumbnailOptions } from '@features/resume/lib/thumbnail/thumbnail';

// ---------------------------------------------------------------------------
// Props
//
// Accepts both old (TemplateConfig / CleanedResumeData) and new
// (TypedTemplateConfig / CleanedResumeDataCompat) types for incremental
// migration. At runtime the shapes are identical — branded paths are just
// strings and the compat data type carries the same index signature.
// ---------------------------------------------------------------------------

export type RenderProps = {
  template: TypedTemplateConfig | TemplateConfig;
  data: CleanedResumeDataCompat | CleanedResumeData;
  className?: string;
  currentSection?: string;
  hasSuggestions?: boolean;
  isThumbnail?: boolean;
  skipImageFallbacks?: boolean;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const DEFAULT_SAFE_BOTTOM_PADDING_PX = 24;

function ResumeRendererComponent({
  template: templateProp,
  data: dataProp,
  className,
  currentSection,
  hasSuggestions = false,
  isThumbnail = false,
  skipImageFallbacks = false,
}: RenderProps) {
  // Cast to internal typed versions — safe because branded paths are plain
  // strings at runtime and the data shapes are structurally compatible.
  const template = templateProp as TypedTemplateConfig;
  const data = dataProp as CleanedResumeDataCompat;

  const dummyContentRef = useRef<HTMLDivElement>(null);

  const { page } = template;
  const { columnConfig, leftItems, rightItems, bannerItems } = useColumnSplit(template);

  const PAGE_PADDING_PX = (typeof page.padding === 'number' ? page.padding : 24) as number;
  const safeBottomPaddingPx = Math.max(
    page.safeBottomPaddingPx ?? DEFAULT_SAFE_BOTTOM_PADDING_PX,
    DEFAULT_SAFE_BOTTOM_PADDING_PX,
  );

  const leftWidth = String(columnConfig.left.width);
  const rightWidth = String(columnConfig.right.width);
  const spacing = String(columnConfig.spacing ?? '0px');
  const leftColumnClassName = columnConfig.left.className || '';
  const rightColumnClassName = columnConfig.right.className || '';

  // Build the render context passed to every section renderer
  const ctx: SectionRenderContext = {
    data: data as CleanedResumeDataCompat,
    currentSection,
    hasSuggestions,
    isThumbnail,
    skipImageFallbacks,
    renderSection: (section, innerCtx) => SectionRegistry.renderSection(section as { type: string }, innerCtx),
  };

  const pages = usePagination({
    dummyContentRef,
    layout: {
      pageClassName: page.className,
      className,
      pagePaddingPx: PAGE_PADDING_PX,
      spacing,
      leftWidth,
      rightWidth,
      leftColumnClassName,
      rightColumnClassName,
      background: page.background || 'white',
      fontFamily: page.fontFamily,
      safeBottomPaddingPx,
    },
    isThumbnail,
    deps: [
      template,
      data,
      currentSection,
      hasSuggestions,
      isThumbnail,
      skipImageFallbacks,
      PAGE_PADDING_PX,
      safeBottomPaddingPx,
    ],
  });

  const baseStyle: React.CSSProperties = {
    width: '21cm',
    padding: PAGE_PADDING_PX,
    gridTemplateColumns: `calc(${leftWidth} - ${spacing}) calc(${rightWidth} - ${spacing})`,
    gap: spacing,
  };

  return (
    <>
      <MeasurementContainer
        ref={dummyContentRef}
        leftItems={leftItems}
        rightItems={rightItems}
        bannerItems={bannerItems}
        ctx={ctx}
        leftColumnClassName={leftColumnClassName}
        rightColumnClassName={rightColumnClassName}
        baseStyle={baseStyle}
      />

      {pages.map((page, index) => (
        <PageContainer
          key={index}
          page={page}
          pageIndex={index}
          baseStyle={baseStyle}
          pageClassName={template.page.className}
          className={className}
          background={template.page.background || 'white'}
          fontFamily={template.page.fontFamily}
          pagePaddingPx={PAGE_PADDING_PX}
          leftColumnClassName={leftColumnClassName}
          rightColumnClassName={rightColumnClassName}
          bannerItems={bannerItems}
          ctx={ctx}
          skipImageFallbacks={skipImageFallbacks}
        />
      ))}
    </>
  );
}

export const ResumeRenderer = React.memo(ResumeRendererComponent);
