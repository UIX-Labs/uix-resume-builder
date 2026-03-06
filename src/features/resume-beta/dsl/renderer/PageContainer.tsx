// ---------------------------------------------------------------------------
// PageContainer — single paginated page wrapper
// ---------------------------------------------------------------------------

import { cn } from '@shared/lib/cn';
import React from 'react';
import type { SectionRenderContext } from '../section-registry';
import { SectionRegistry } from '../section-registry';
import type { TypedTemplateSection } from '../template-config';
import { PaginatedColumn } from './PaginatedColumn';
import type { MergedPage } from './pagination-engine';

interface PageContainerProps {
  page: MergedPage;
  pageIndex: number;
  baseStyle: React.CSSProperties;
  pageClassName?: string;
  className?: string;
  background: string;
  fontFamily?: string;
  pagePaddingPx: number;
  leftColumnClassName: string;
  rightColumnClassName: string;
  bannerItems: TypedTemplateSection[];
  ctx: SectionRenderContext;
  skipImageFallbacks: boolean;
}

export function PageContainer({
  page,
  pageIndex,
  baseStyle,
  pageClassName,
  className,
  background,
  fontFamily,
  pagePaddingPx,
  leftColumnClassName,
  rightColumnClassName,
  bannerItems,
  ctx,
  skipImageFallbacks,
}: PageContainerProps) {
  const hasBanner = pageIndex === 0 && bannerItems.length > 0;

  return (
    <div
      className={cn('grid', !skipImageFallbacks && 'mb-5', pageClassName, className)}
      style={{
        ...baseStyle,
        height: '29.7cm',
        overflow: 'hidden',
        backgroundColor: background,
        fontFamily,
        gridTemplateRows: hasBanner ? 'auto auto' : 'auto',
        alignContent: 'start',
      }}
    >
      {hasBanner && (
        <div
          style={{
            gridColumn: '1 / -1',
            gridRow: '1',
            marginLeft: `-${pagePaddingPx}px`,
            marginRight: `-${pagePaddingPx}px`,
            marginTop: `-${pagePaddingPx}px`,
          }}
        >
          {bannerItems.map((s, i) => (
            <React.Fragment key={i}>{SectionRegistry.renderSection(s, ctx)}</React.Fragment>
          ))}
        </div>
      )}

      <div className={cn('flex flex-col', leftColumnClassName)} style={{ gridRow: hasBanner ? '2' : '1' }}>
        <PaginatedColumn nodes={page.leftNodes} columnKey={`${pageIndex}-left`} />
      </div>

      <div className={cn('flex flex-col', rightColumnClassName)} style={{ gridRow: hasBanner ? '2' : '1' }}>
        <PaginatedColumn nodes={page.rightNodes} columnKey={`${pageIndex}-right`} />
      </div>
    </div>
  );
}
