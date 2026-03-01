// ---------------------------------------------------------------------------
// usePagination — custom hook wrapping the DOM-based pagination engine
// ---------------------------------------------------------------------------

import { useLayoutEffect, useState } from 'react';
import type { PageLayout, MergedPage } from './pagination-engine';
import { createMeasurementPage, mergeColumnPages, paginateOneColumn } from './pagination-engine';

const DEFAULT_SAFE_BOTTOM_PADDING_PX = 24;

export interface UsePaginationOptions {
  dummyContentRef: React.RefObject<HTMLDivElement | null>;
  layout: PageLayout;
  isThumbnail: boolean;
  /** Dependencies that trigger re-pagination */
  deps: unknown[];
}

export function usePagination({ dummyContentRef, layout, isThumbnail, deps }: UsePaginationOptions): MergedPage[] {
  const [pages, setPages] = useState<MergedPage[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: deps array covers all pagination triggers
  useLayoutEffect(() => {
    const container = dummyContentRef.current;
    if (!container) return;

    let cleanedUp = false;
    const cleanups: Array<() => void> = [];
    const cleanup = () => {
      if (cleanedUp) return;
      cleanedUp = true;
      for (const fn of cleanups) fn();
    };

    const leftCol = container.querySelector('[data-column="left"]') as HTMLElement | null;
    const rightCol = container.querySelector('[data-column="right"]') as HTMLElement | null;

    if (!leftCol && !rightCol) {
      setPages([]);
      return;
    }

    // For thumbnails, layout metrics are unreliable; keep a single page.
    if (isThumbnail) {
      const leftNodes = leftCol ? Array.from(leftCol.children).map((n) => n.cloneNode(true) as HTMLElement) : [];
      const rightNodes = rightCol ? Array.from(rightCol.children).map((n) => n.cloneNode(true) as HTMLElement) : [];
      setPages([{ leftNodes, rightNodes }]);
      return;
    }

    const bannerContainer = container.querySelector('[data-section-type="banner"]') as HTMLElement | null;

    const envFirst = createMeasurementPage(layout, bannerContainer, true);
    const envOther = createMeasurementPage(layout, bannerContainer, false);
    cleanups.push(envFirst.cleanup, envOther.cleanup);

    const safeBottomPx = Math.max(layout.safeBottomPaddingPx, DEFAULT_SAFE_BOTTOM_PADDING_PX);

    const leftPages = leftCol ? paginateOneColumn(leftCol, 'left', envFirst, envOther, safeBottomPx) : [];
    const rightPages = rightCol ? paginateOneColumn(rightCol, 'right', envFirst, envOther, safeBottomPx) : [];

    setPages(mergeColumnPages(leftPages, rightPages));
    cleanup();

    return cleanup;
  }, deps);

  return pages;
}
