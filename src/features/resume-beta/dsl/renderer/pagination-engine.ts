// ---------------------------------------------------------------------------
// Pagination engine — pure DOM-based pagination logic
//
// This module contains no React — it operates on raw DOM elements and returns
// arrays of HTMLElement nodes that represent each paginated page.
// ---------------------------------------------------------------------------

import { cn } from '@shared/lib/cn';
import { isTextOnlyElement, removeBorderClasses, splitTextBlock } from './page-helpers';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PageLayout {
  pageClassName?: string;
  className?: string;
  pagePaddingPx: number;
  spacing: string;
  leftWidth: string;
  rightWidth: string;
  leftColumnClassName: string;
  rightColumnClassName: string;
  background: string;
  fontFamily?: string;
  safeBottomPaddingPx: number;
}

export interface MergedPage {
  leftNodes: HTMLElement[];
  rightNodes: HTMLElement[];
}

// ---------------------------------------------------------------------------
// Measurement page factory
// ---------------------------------------------------------------------------

export interface MeasurementPageEnv {
  root: HTMLElement;
  pageEl: HTMLElement;
  left: HTMLElement;
  right: HTMLElement;
  cleanup: () => void;
}

export function createMeasurementPage(
  layout: PageLayout,
  bannerContainer: HTMLElement | null,
  withBanner: boolean,
): MeasurementPageEnv {
  const root = document.createElement('div');
  root.style.position = 'absolute';
  root.style.visibility = 'hidden';
  root.style.left = '-99999px';
  root.style.top = '0';
  root.style.pointerEvents = 'none';

  const pageEl = document.createElement('div');
  pageEl.className = cn('grid', layout.pageClassName, layout.className);
  pageEl.style.width = '21cm';
  pageEl.style.height = '29.7cm';
  pageEl.style.overflow = 'hidden';
  pageEl.style.boxSizing = 'border-box';
  pageEl.style.padding = `${layout.pagePaddingPx}px`;
  pageEl.style.gap = layout.spacing;
  pageEl.style.gridTemplateColumns = `calc(${layout.leftWidth} - ${layout.spacing}) calc(${layout.rightWidth} - ${layout.spacing})`;
  pageEl.style.alignContent = 'start';
  pageEl.style.backgroundColor = layout.background;
  if (layout.fontFamily) pageEl.style.fontFamily = layout.fontFamily;
  pageEl.style.gridTemplateRows = withBanner && bannerContainer ? 'auto auto' : 'auto';

  if (withBanner && bannerContainer) {
    const bannerRow = document.createElement('div');
    bannerRow.style.gridColumn = '1 / -1';
    bannerRow.style.gridRow = '1';
    bannerRow.style.marginLeft = `-${layout.pagePaddingPx}px`;
    bannerRow.style.marginRight = `-${layout.pagePaddingPx}px`;
    bannerRow.style.marginTop = `-${layout.pagePaddingPx}px`;

    for (const child of Array.from(bannerContainer.children)) {
      bannerRow.appendChild(child.cloneNode(true));
    }
    pageEl.appendChild(bannerRow);
  }

  const gridRow = withBanner && bannerContainer ? '2' : '1';

  const left = document.createElement('div');
  left.className = cn('flex flex-col', layout.leftColumnClassName);
  left.style.gridRow = gridRow;
  left.setAttribute('data-column', 'left');

  const right = document.createElement('div');
  right.className = cn('flex flex-col', layout.rightColumnClassName);
  right.style.gridRow = gridRow;
  right.setAttribute('data-column', 'right');

  pageEl.appendChild(left);
  pageEl.appendChild(right);
  root.appendChild(pageEl);
  document.body.appendChild(root);

  return {
    root,
    pageEl,
    left,
    right,
    cleanup: () => document.body.removeChild(root),
  };
}

// ---------------------------------------------------------------------------
// Single-column paginator
// ---------------------------------------------------------------------------

export function paginateOneColumn(
  sourceColumnEl: HTMLElement,
  columnName: 'left' | 'right',
  envFirst: MeasurementPageEnv,
  envOther: MeasurementPageEnv,
  safeBottomPaddingPx: number,
): HTMLElement[][] {
  const outPages: HTMLElement[][] = [[]];
  let currentPageIndex = 0;

  const wrapperPrototypes: HTMLElement[] = [];
  let wrapperClones: HTMLElement[] = [];

  const getEnvForPage = (pageIdx: number) => (pageIdx === 0 ? envFirst : envOther);

  const getLiveColumn = (pageIdx: number): HTMLElement => {
    const env = getEnvForPage(pageIdx);
    return columnName === 'left' ? env.left : env.right;
  };

  const clearLivePage = (pageIdx: number) => {
    const col = getLiveColumn(pageIdx);
    col.innerHTML = '';
  };

  const getSafeBottomForPage = (pageIdx: number): number => {
    const env = getEnvForPage(pageIdx);
    const pageRect = env.pageEl.getBoundingClientRect();
    // jsdom: rects are often 0; treat as unbounded to avoid infinite loops in tests.
    if (!pageRect.height) return Number.POSITIVE_INFINITY;
    return pageRect.bottom - safeBottomPaddingPx;
  };

  const rebuildWrapperStack = () => {
    wrapperClones = [];
    const col = getLiveColumn(currentPageIndex);
    let parent: HTMLElement | null = null;

    for (let i = 0; i < wrapperPrototypes.length; i++) {
      const proto = wrapperPrototypes[i];
      const clone = proto.cloneNode(false) as HTMLElement;
      removeBorderClasses(clone);

      if (i === 0) {
        outPages[currentPageIndex].push(clone);
        col.appendChild(clone);
      } else if (parent) {
        parent.appendChild(clone);
      }

      wrapperClones.push(clone);
      parent = clone;
    }
  };

  const getCurrentContainer = (): HTMLElement | null =>
    wrapperClones.length > 0 ? wrapperClones[wrapperClones.length - 1] : null;

  const fitsOnCurrentPage = (element: HTMLElement): boolean => {
    const safeBottom = getSafeBottomForPage(currentPageIndex);
    const rect = element.getBoundingClientRect();
    return rect.bottom <= safeBottom + 0.5;
  };

  const addToPage = (element: HTMLElement) => {
    const col = getLiveColumn(currentPageIndex);
    const container = getCurrentContainer();
    if (container) {
      container.appendChild(element);
      return;
    }
    outPages[currentPageIndex].push(element);
    col.appendChild(element);
  };

  const removeFromPage = (element: HTMLElement) => {
    const col = getLiveColumn(currentPageIndex);
    const container = getCurrentContainer();
    if (container?.contains(element)) {
      container.removeChild(element);
      return;
    }
    if (col.contains(element)) col.removeChild(element);
    const idx = outPages[currentPageIndex].indexOf(element);
    if (idx !== -1) outPages[currentPageIndex].splice(idx, 1);
  };

  const finalizePage = (pageIdx: number) => {
    outPages[pageIdx] = outPages[pageIdx].map((n) => n.cloneNode(true) as HTMLElement);
  };

  const startNewPage = () => {
    finalizePage(currentPageIndex);
    currentPageIndex++;
    outPages.push([]);
    clearLivePage(currentPageIndex);
    rebuildWrapperStack();
  };

  const processChildren = (parentEl: HTMLElement) => {
    const children = Array.from(parentEl.children) as HTMLElement[];

    for (const child of children) {
      const tagName = child.tagName?.toLowerCase();
      const isNaturallyBreakable = ['ul', 'ol', 'p', 'div'].includes(tagName);
      const canBreak = child.getAttribute('data-canbreak') === 'true' || isNaturallyBreakable;
      const hasBreakableContent =
        child.querySelector('[data-canbreak="true"]') !== null ||
        child.querySelector('[data-has-breakable-content="true"]') !== null ||
        child.getAttribute('data-has-breakable-content') === 'true';

      const clone = child.cloneNode(true) as HTMLElement;
      addToPage(clone);

      if (fitsOnCurrentPage(clone)) continue;

      removeFromPage(clone);

      // Try splitting text-only elements into paragraph-level blocks.
      if ((canBreak || hasBreakableContent) && child.children.length === 0 && isTextOnlyElement(child)) {
        const splitEl = splitTextBlock(child);
        if (splitEl && splitEl.children.length > 1) {
          const wrapperProto = child;
          const wrapper = wrapperProto.cloneNode(false) as HTMLElement;
          removeBorderClasses(wrapper);
          addToPage(wrapper);
          wrapperPrototypes.push(wrapperProto);
          wrapperClones.push(wrapper);
          processChildren(splitEl);
          wrapperPrototypes.pop();
          wrapperClones.pop();
          continue;
        }
      }

      // Break by recursing into children.
      if ((canBreak || hasBreakableContent) && child.children.length > 0) {
        const wrapperProto = child;
        const wrapper = wrapperProto.cloneNode(false) as HTMLElement;
        removeBorderClasses(wrapper);
        addToPage(wrapper);
        wrapperPrototypes.push(wrapperProto);
        wrapperClones.push(wrapper);
        processChildren(child);
        wrapperPrototypes.pop();
        wrapperClones.pop();
        continue;
      }

      // Not breakable; move it to the next page.
      const col = getLiveColumn(currentPageIndex);
      const pageHasContent = col.childElementCount > 0;
      if (!pageHasContent) {
        addToPage(child.cloneNode(true) as HTMLElement);
        continue;
      }

      startNewPage();

      const newClone = child.cloneNode(true) as HTMLElement;
      addToPage(newClone);
      if (!fitsOnCurrentPage(newClone) && (canBreak || hasBreakableContent) && child.children.length > 0) {
        removeFromPage(newClone);
        const wrapperProto = child;
        const wrapper = wrapperProto.cloneNode(false) as HTMLElement;
        removeBorderClasses(wrapper);
        addToPage(wrapper);
        wrapperPrototypes.push(wrapperProto);
        wrapperClones.push(wrapper);
        processChildren(child);
        wrapperPrototypes.pop();
        wrapperClones.pop();
      }
    }
  };

  clearLivePage(0);
  rebuildWrapperStack();
  processChildren(sourceColumnEl);
  finalizePage(currentPageIndex);

  // Remove trailing empty pages.
  for (let i = outPages.length - 1; i >= 0; i--) {
    const hasVisibleContent = outPages[i].some((node) => (node.textContent ?? '').trim().length > 0);
    if (!hasVisibleContent && i > 0) outPages.splice(i, 1);
  }

  return outPages;
}

// ---------------------------------------------------------------------------
// Merge left + right column pages
// ---------------------------------------------------------------------------

export function mergeColumnPages(leftPages: HTMLElement[][], rightPages: HTMLElement[][]): MergedPage[] {
  const totalPages = Math.max(leftPages.length, rightPages.length);
  const merged: MergedPage[] = [];
  for (let i = 0; i < totalPages; i++) {
    merged.push({
      leftNodes: leftPages[i] || [],
      rightNodes: rightPages[i] || [],
    });
  }
  return merged;
}
