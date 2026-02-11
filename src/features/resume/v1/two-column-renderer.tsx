import { cn } from '@shared/lib/cn';
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ResumeTemplate, TemplateColumnsConfig } from '../types';
import { paginateColumn } from './lib/pagination-utils';
import { renderSection, willSectionRender } from './lib/section-renderers';

/** A4 at 96dpi: 210mm ≈ 794px width, 297mm ≈ 1122px height (fallback when pageHeights not provided). */
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1122;
const A4_HEIGHT_CM = '29.7cm';

/** No allowance for filling the page to avoid overfilling during PDF generation. */
const FILL_TOLERANCE_PX = 0;

/** Optional uniform page heights from PageManager (preview + PDF same breaks). */
export interface PageHeights {
  firstPageMaxHeight: number;
  otherPageMaxHeight: number;
  pageHeightCm: string;
  paddingPx: number;
}

export interface TwoColumnRendererProps {
  template: ResumeTemplate;
  data: Record<string, unknown>;
  className?: string;
  currentSection?: string;
  hasSuggestions?: boolean;
  isThumbnail?: boolean;
  skipImageFallbacks?: boolean;
  /** When set, used for pagination so preview and PDF match. */
  pageHeights?: PageHeights;
}

/**
 * Renders a two-column resume layout.
 * Sections with column 'left' go in the left column, 'right' in the right column.
 * Banner (if any) is full-width on first page. Page breaks and section breaks are respected.
 */
export function TwoColumnRenderer({
  template,
  data,
  className,
  currentSection,
  hasSuggestions = false,
  isThumbnail = false,
  skipImageFallbacks = false,
  pageHeights: pageHeightsProp,
}: TwoColumnRendererProps) {
  const [pages, setPages] = useState<[HTMLElement[], HTMLElement[]][]>([]);
  const measureRef = useRef<HTMLDivElement>(null);

  const { page, columns } = template;
  const padding = pageHeightsProp?.paddingPx ?? page.padding ?? 24;

  const columnConfig = columns as TemplateColumnsConfig;
  const leftItems = template.sections.filter((s) => s.column === 'left' && s.type !== 'banner');
  const rightItems = template.sections.filter((s) => s.column === 'right' && s.type !== 'banner');
  const bannerItems = template.sections.filter((s) => s.type === 'banner');
  const hasBanner = bannerItems.length > 0;

  const leftWidth = columnConfig.left.width;
  const rightWidth = columnConfig.right.width;
  const spacing = columnConfig.spacing;
  const leftColumnClassName = columnConfig.left.className ?? '';
  const rightColumnClassName = columnConfig.right.className ?? '';

  const basePageStyle = useMemo(
    () => ({
      width: '21cm',
      padding: `${padding}px`,
      gridTemplateColumns: `calc(${leftWidth} - ${spacing}) calc(${rightWidth} - ${spacing})`,
      gap: spacing,
    }),
    [padding, leftWidth, rightWidth, spacing],
  );

  useLayoutEffect(() => {
    const container = measureRef.current;
    if (!container) return;

    const bannerEl = container.querySelector('[data-section-type="banner"]') as HTMLElement | null;
    const leftCol = container.querySelector('[data-column="left"]') as HTMLElement | null;
    const rightCol = container.querySelector('[data-column="right"]') as HTMLElement | null;

    // Measured banner height should include margins/gap by checking offset of first column relative to container
    const firstCol = leftCol || rightCol;
    const bannerHeight = firstCol ? firstCol.offsetTop : bannerEl ? bannerEl.offsetHeight : 0;

    const pageMaxFirst =
      (pageHeightsProp
        ? pageHeightsProp.firstPageMaxHeight - bannerHeight
        : A4_HEIGHT_PX - bannerHeight - padding * 2) + FILL_TOLERANCE_PX;
    const pageMaxOther = (pageHeightsProp?.otherPageMaxHeight ?? A4_HEIGHT_PX - padding * 2) + FILL_TOLERANCE_PX;

    const totalContentWidthPx = A4_WIDTH_PX - padding * 2;
    const gapPx = Number.parseInt(String(spacing), 10) || 0;
    const parseWidthPx = (w: string): number | undefined => {
      const match = w.match(/^([\d.]+)(px)?$/);
      if (!match) return undefined;
      const n = Number.parseFloat(match[1]);
      return Number.isFinite(n) ? n : undefined;
    };
    const leftWidthPx = parseWidthPx(leftWidth) ?? totalContentWidthPx / 2;
    const rightWidthPx = totalContentWidthPx - gapPx - leftWidthPx;

    const leftPages: HTMLElement[][] = leftCol
      ? paginateColumn(leftCol, pageMaxFirst, pageMaxOther, Math.max(0, leftWidthPx))
      : [[]];
    const rightPages: HTMLElement[][] = rightCol
      ? paginateColumn(rightCol, pageMaxFirst, pageMaxOther, Math.max(0, rightWidthPx))
      : [[]];

    const total = Math.max(leftPages.length, rightPages.length);
    const merged: [HTMLElement[], HTMLElement[]][] = [];
    for (let i = 0; i < total; i++) {
      merged.push([leftPages[i] ?? [], rightPages[i] ?? []]);
    }
    setPages(merged);
  }, [template, data, currentSection, hasSuggestions, isThumbnail, padding, pageHeightsProp]);

  return (
    <>
      {/* Hidden measure tree — left + right columns for accurate pagination. Same typography (page.className) as visible pages so line-height/font-size match and pagination fits. */}
      <div
        ref={measureRef}
        className={cn('mb-5 grid', page.className)}
        style={{
          ...basePageStyle,
          position: 'absolute',
          visibility: 'hidden',
          gridTemplateRows: hasBanner ? 'auto 1fr' : '1fr',
        }}
      >
        {hasBanner && (
          <div style={{ gridColumn: '1 / -1' }} data-section-type="banner">
            {bannerItems.map((s, i) => (
              <React.Fragment key={i}>
                {renderSection(s, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks)}
              </React.Fragment>
            ))}
          </div>
        )}
        <div
          className={cn('flex flex-col', leftColumnClassName)}
          data-column="left"
          style={{ gridRow: hasBanner ? 2 : 1 }}
        >
          {leftItems.map((s, i) => {
            const hasNext =
              i < leftItems.length - 1 && leftItems.slice(i + 1).some((next) => willSectionRender(next, data));
            return (
              <React.Fragment key={i}>
                {renderSection(s, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks, hasNext)}
              </React.Fragment>
            );
          })}
        </div>
        <div
          className={cn('flex flex-col', rightColumnClassName)}
          data-column="right"
          style={{ gridRow: hasBanner ? 2 : 1 }}
        >
          {rightItems.map((s, i) => {
            const hasNext =
              i < rightItems.length - 1 && rightItems.slice(i + 1).some((next) => willSectionRender(next, data));
            return (
              <React.Fragment key={i}>
                {renderSection(s, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks, hasNext)}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Visible / PDF pages — one .resume-page per page for print breaks */}
      {pages.map(([leftColumn, rightColumn], index) => {
        const isFirst = index === 0;
        const showBanner = isFirst && hasBanner;

        return (
          <div
            key={index}
            className={cn('resume-page grid', !skipImageFallbacks && 'mb-5', page.className, className)}
            data-resume-page
            style={{
              ...basePageStyle,
              [skipImageFallbacks ? 'height' : 'minHeight']: pageHeightsProp?.pageHeightCm ?? A4_HEIGHT_CM,
              backgroundColor: page.background ?? 'white',
              fontFamily: page.fontFamily,
              gridTemplateRows: showBanner ? 'auto 1fr' : '1fr',
            }}
          >
            {showBanner && (
              <div
                style={{
                  gridColumn: '1 / -1',
                  gridRow: 1,
                  marginLeft: `-${padding}px`,
                  marginRight: `-${padding}px`,
                  marginTop: `-${padding}px`,
                }}
              >
                {bannerItems.map((s, i) => (
                  <React.Fragment key={i}>
                    {renderSection(s, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks)}
                  </React.Fragment>
                ))}
              </div>
            )}
            <div className={cn('flex flex-col', leftColumnClassName)} style={{ gridRow: showBanner ? 2 : 1 }}>
              {leftColumn.map((node, i) => (
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for DOM node rendering
                <div key={i} dangerouslySetInnerHTML={{ __html: node.outerHTML }} style={{ display: 'block' }} />
              ))}
            </div>
            <div className={cn('flex flex-col', rightColumnClassName)} style={{ gridRow: showBanner ? 2 : 1 }}>
              {rightColumn.map((node, i) => (
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for DOM node rendering
                <div key={i} dangerouslySetInnerHTML={{ __html: node.outerHTML }} style={{ display: 'block' }} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
