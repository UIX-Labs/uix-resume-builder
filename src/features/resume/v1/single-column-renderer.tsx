import { cn } from '@shared/lib/cn';
import React, { useLayoutEffect, useRef, useState } from 'react';
import type { ResumeTemplate } from '../types';
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

export interface SingleColumnRendererProps {
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
 * Renders a single-column resume layout.
 * All sections flow in one column; banner (if any) is full-width on first page.
 * Page breaks and section breaks (data-canbreak) are respected for UI and PDF.
 */
export function SingleColumnRenderer({
  template,
  data,
  className,
  currentSection,
  hasSuggestions = false,
  isThumbnail = false,
  skipImageFallbacks = false,
  pageHeights: pageHeightsProp,
}: SingleColumnRendererProps) {
  const [pages, setPages] = useState<HTMLElement[][]>([]);
  const measureRef = useRef<HTMLDivElement>(null);

  const { page } = template;
  const padding = pageHeightsProp?.paddingPx ?? page.padding ?? 24;
  const sections = template.sections;
  const bannerItems = sections.filter((s) => s.type === 'banner');
  const contentItems = sections.filter((s) => s.type !== 'banner');
  const hasBanner = bannerItems.length > 0;

  useLayoutEffect(() => {
    const container = measureRef.current;
    if (!container) return;

    const bannerEl = container.querySelector('[data-section-type="banner"]') as HTMLElement | null;
    const contentCol = container.querySelector('[data-column="content"]') as HTMLElement | null;

    // Measured banner height should include margins/gap by checking offset of content relative to container
    const bannerHeight = contentCol ? contentCol.offsetTop : bannerEl ? bannerEl.offsetHeight : 0;

    const pageMaxFirst =
      (pageHeightsProp
        ? pageHeightsProp.firstPageMaxHeight - bannerHeight
        : A4_HEIGHT_PX - bannerHeight - padding * 2) + FILL_TOLERANCE_PX;
    const pageMaxOther = (pageHeightsProp?.otherPageMaxHeight ?? A4_HEIGHT_PX - padding * 2) + FILL_TOLERANCE_PX;

    if (!contentCol) {
      setPages([]);
      return;
    }

    const contentWidthPx = A4_WIDTH_PX - padding * 2;
    const contentPages = paginateColumn(contentCol, pageMaxFirst, pageMaxOther, contentWidthPx);
    setPages(contentPages);
  }, [template, data, currentSection, hasSuggestions, isThumbnail, padding, pageHeightsProp]);

  const basePageStyle: React.CSSProperties = {
    width: '21cm',
    padding: `${padding}px`,
    backgroundColor: page.background ?? 'white',
    fontFamily: page.fontFamily ?? undefined,
  };

  return (
    <>
      {/* Hidden measure tree — one column for accurate pagination. Same typography (page.className) as visible pages so line-height/font-size match and pagination fits. */}
      <div
        ref={measureRef}
        className={cn('mb-5 grid', page.className)}
        style={{
          ...basePageStyle,
          position: 'absolute',
          visibility: 'hidden',
          gridTemplateColumns: '1fr',
          gridTemplateRows: hasBanner ? 'auto 1fr' : '1fr',
        }}
      >
        {hasBanner && (
          <div style={{ gridColumn: 1, gridRow: 1 }} data-section-type="banner">
            {bannerItems.map((s, i) => (
              <React.Fragment key={i}>
                {renderSection(s, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks)}
              </React.Fragment>
            ))}
          </div>
        )}
        <div className="flex flex-col" data-column="content" style={{ gridRow: hasBanner ? 2 : 1, gridColumn: 1 }}>
          {contentItems.map((s, i) => {
            const hasNext =
              i < contentItems.length - 1 && contentItems.slice(i + 1).some((next) => willSectionRender(next, data));
            return (
              <React.Fragment key={i}>
                {renderSection(s, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks, hasNext)}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Visible / PDF pages — one .resume-page per page for print breaks */}
      {pages.map((columnNodes, index) => {
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
              gridTemplateRows: showBanner ? 'auto 1fr' : '1fr',
              gridTemplateColumns: '1fr',
            }}
          >
            {showBanner && (
              <div
                style={{
                  gridColumn: 1,
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
            <div className="flex flex-col" style={{ gridRow: showBanner ? 2 : 1, gridColumn: 1 }}>
              {columnNodes.map((node, i) => (
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
