import { cn } from '@shared/lib/cn';
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { renderSection, willSectionRender } from './lib/section-renderers';

export { hasPendingSuggestions } from './lib/section-utils';
export { generateThumbnail } from './lib/thumbnail/thumbnail';
export type { ThumbnailOptions } from './lib/thumbnail/thumbnail';

// ---------------------------------------------------------------------------
// Pagination helpers
// ---------------------------------------------------------------------------

const DEFAULT_SAFE_BOTTOM_PADDING_PX = 24;

function isTextOnlyElement(el: HTMLElement): boolean {
  if (el.children.length > 0) return false;
  const text = el.textContent ?? '';
  return text.trim().length > 0;
}

function splitTextBlock(el: HTMLElement): HTMLElement | null {
  const html = el.innerHTML;
  if (!html) return null;

  let parts = html.split(/\n\n+/);
  if (parts.length <= 1) parts = html.split(/\n/);
  if (parts.length <= 1) parts = html.split(/<br\s*\/?>\s*<br\s*\/?>/i);
  if (parts.length <= 1) return null;

  const nonEmptyParts = parts.filter((p) => p.trim().length > 0);
  if (nonEmptyParts.length <= 1) return null;

  const wrapper = el.cloneNode(false) as HTMLElement;
  for (const part of nonEmptyParts) {
    const partDiv = document.createElement('div');
    partDiv.innerHTML = part;
    wrapper.appendChild(partDiv);
  }

  return wrapper;
}

function removeBorderClasses(el: HTMLElement) {
  if (!el.classList) return;
  el.classList.remove('border-b', 'border-t', 'border-l', 'border-r', 'border');
}

export type RenderProps = {
  template: any;
  data: any;
  className?: string;
  currentSection?: string;
  hasSuggestions?: boolean;
  isThumbnail?: boolean;
  skipImageFallbacks?: boolean;
};

function ResumeRendererComponent({
  template,
  data,
  className,
  currentSection,
  hasSuggestions = false,
  isThumbnail = false,
  skipImageFallbacks = false,
}: RenderProps) {
  const [pages, setPages] = useState<[React.ReactNode[], React.ReactNode[]][]>([]);
  const dummyContentRef = useRef<HTMLDivElement>(null);

  const { page } = template;

  const { columnConfig, leftItems, rightItems, bannerItems } = useMemo(() => {
    if (!template.columns) {
      return {
        columnConfig: {
          spacing: '0px',
          left: {
            width: '100%',
          },
          right: {
            width: '0%',
          },
        },
        leftItems: template.sections,
        rightItems: [],
        bannerItems: [],
      };
    }

    const bannerItems = template.sections.filter((s: any) => s.type === 'banner');
    const leftItems = template.sections.filter((s: any) => s.column === 'left' && s.type !== 'banner');
    const rightItems = template.sections.filter((s: any) => s.column === 'right' && s.type !== 'banner');

    return {
      columnConfig: template.columns,
      leftItems,
      rightItems,
      bannerItems,
    };
  }, [template]);

  const PAGE_PADDING = page.padding ?? 24;
  const PAGE_PADDING_PX = PAGE_PADDING;
  const safeBottomPaddingPx = Math.max(
    (page as any)?.safeBottomPaddingPx ?? DEFAULT_SAFE_BOTTOM_PADDING_PX,
    DEFAULT_SAFE_BOTTOM_PADDING_PX,
  );

  const leftWidth = columnConfig.left.width;
  const rightWidth = columnConfig.right.width;
  const spacing = columnConfig.spacing;
  const leftColumnClassName = columnConfig.left.className || '';
  const rightColumnClassName = columnConfig.right.className || '';

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

    // For thumbnails and jsdom, layout metrics are unreliable; keep a single page.
    if (isThumbnail) {
      const leftNodes = leftCol ? Array.from(leftCol.children).map((n) => n.cloneNode(true) as HTMLElement) : [];
      const rightNodes = rightCol ? Array.from(rightCol.children).map((n) => n.cloneNode(true) as HTMLElement) : [];
      setPages([[leftNodes as any, rightNodes as any]]);
      return;
    }

    const createMeasurementPage = (withBanner: boolean) => {
      const root = document.createElement('div');
      root.style.position = 'absolute';
      root.style.visibility = 'hidden';
      root.style.left = '-99999px';
      root.style.top = '0';
      root.style.pointerEvents = 'none';

      const pageEl = document.createElement('div');
      pageEl.className = cn('grid', page.className, className);
      pageEl.style.width = '21cm';
      pageEl.style.height = '29.7cm';
      pageEl.style.overflow = 'hidden';
      pageEl.style.boxSizing = 'border-box';
      pageEl.style.padding = `${PAGE_PADDING_PX}px`;
      pageEl.style.gap = spacing;
      pageEl.style.gridTemplateColumns = `calc(${leftWidth} - ${spacing}) calc(${rightWidth} - ${spacing})`;
      pageEl.style.alignContent = 'start';
      pageEl.style.backgroundColor = page.background || 'white';
      if (page.fontFamily) pageEl.style.fontFamily = page.fontFamily;
      pageEl.style.gridTemplateRows = withBanner && bannerItems.length > 0 ? 'auto auto' : 'auto';

      if (withBanner && bannerItems.length > 0) {
        const bannerSource = container.querySelector('[data-section-type="banner"]') as HTMLElement | null;
        const bannerRow = document.createElement('div');
        bannerRow.style.gridColumn = '1 / -1';
        bannerRow.style.gridRow = '1';
        bannerRow.style.marginLeft = `-${PAGE_PADDING_PX}px`;
        bannerRow.style.marginRight = `-${PAGE_PADDING_PX}px`;
        bannerRow.style.marginTop = `-${PAGE_PADDING_PX}px`;

        if (bannerSource) {
          for (const child of Array.from(bannerSource.children)) {
            bannerRow.appendChild(child.cloneNode(true));
          }
        }
        pageEl.appendChild(bannerRow);
      }

      const left = document.createElement('div');
      left.className = cn('flex flex-col', leftColumnClassName);
      left.style.gridRow = withBanner && bannerItems.length > 0 ? '2' : '1';
      left.setAttribute('data-column', 'left');

      const right = document.createElement('div');
      right.className = cn('flex flex-col', rightColumnClassName);
      right.style.gridRow = withBanner && bannerItems.length > 0 ? '2' : '1';
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
    };

    const envFirst = createMeasurementPage(true);
    const envOther = createMeasurementPage(false);
    cleanups.push(envFirst.cleanup, envOther.cleanup);

    const getEnvForPage = (pageIdx: number) => (pageIdx === 0 ? envFirst : envOther);

    const getSafeBottomForPage = (pageIdx: number): number => {
      const env = getEnvForPage(pageIdx);
      const pageRect = env.pageEl.getBoundingClientRect();
      // jsdom: rects are often 0; treat as unbounded to avoid infinite loops in tests.
      if (!pageRect.height) return Number.POSITIVE_INFINITY;
      return pageRect.bottom - safeBottomPaddingPx;
    };

    const paginateOneColumn = (sourceColumnEl: HTMLElement, columnName: 'left' | 'right'): HTMLElement[][] => {
      const outPages: HTMLElement[][] = [[]];
      let currentPageIndex = 0;

      // Prototypes track the original (dummy) wrappers for stack reconstruction.
      const wrapperPrototypes: HTMLElement[] = [];
      let wrapperClones: HTMLElement[] = [];

      const getLiveColumn = (pageIdx: number): HTMLElement => {
        const env = getEnvForPage(pageIdx);
        return columnName === 'left' ? env.left : env.right;
      };

      const clearLivePage = (pageIdx: number) => {
        const col = getLiveColumn(pageIdx);
        col.innerHTML = '';
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
    };

    const leftPages = leftCol ? paginateOneColumn(leftCol, 'left') : [];
    const rightPages = rightCol ? paginateOneColumn(rightCol, 'right') : [];

    const totalPages = Math.max(leftPages.length, rightPages.length);
    const merged: [React.ReactNode[], React.ReactNode[]][] = [];
    for (let i = 0; i < totalPages; i++) {
      merged.push([(leftPages[i] || []) as any, (rightPages[i] || []) as any]);
    }

    setPages(merged);
    cleanup();

    return cleanup;
  }, [
    template,
    data,
    currentSection,
    hasSuggestions,
    isThumbnail,
    skipImageFallbacks,
    PAGE_PADDING_PX,
    safeBottomPaddingPx,
  ]);

  const baseStyle = {
    width: '21cm',
    padding: PAGE_PADDING,
    gridTemplateColumns: `calc(${leftWidth} - ${spacing}) calc(${rightWidth} - ${spacing})`,
    gap: spacing,
  };

  return (
    <>
      <div
        ref={dummyContentRef}
        className="mb-5 grid"
        style={{
          ...baseStyle,
          position: 'absolute',
          visibility: 'hidden',
        }}
      >
        {bannerItems.length > 0 && (
          <div style={{ gridColumn: '1 / -1' }} data-section-type="banner">
            {bannerItems.map((s: any, i: number) => (
              <React.Fragment key={i}>
                {renderSection(s, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks)}
              </React.Fragment>
            ))}
          </div>
        )}
        <div className={cn('flex flex-col', leftColumnClassName)} data-column="left">
          {leftItems.map((s: any, i: number) => {
            const hasNextSection =
              i < leftItems.length - 1 &&
              leftItems.slice(i + 1).some((nextSection: any) => willSectionRender(nextSection, data));
            return (
              <React.Fragment key={i}>
                {renderSection(
                  s,
                  data,
                  currentSection,
                  hasSuggestions,
                  isThumbnail,
                  skipImageFallbacks,
                  hasNextSection,
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className={cn('flex flex-col', rightColumnClassName)} data-column="right">
          {rightItems.map((s: any, i: number) => {
            const hasNextSection =
              i < rightItems.length - 1 &&
              rightItems.slice(i + 1).some((nextSection: any) => willSectionRender(nextSection, data));
            return (
              <React.Fragment key={i}>
                {renderSection(
                  s,
                  data,
                  currentSection,
                  hasSuggestions,
                  isThumbnail,
                  skipImageFallbacks,
                  hasNextSection,
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {pages.map((columns, index) => {
        const [leftColumn, rightColumn] = columns;
        return (
          <div
            key={index}
            className={cn('grid', !skipImageFallbacks && 'mb-5', page.className, className)}
            style={{
              ...baseStyle,
              height: '29.7cm',
              overflow: 'hidden',
              backgroundColor: page.background || 'white',
              fontFamily: page.fontFamily,
              gridTemplateRows: index === 0 && bannerItems.length > 0 ? 'auto auto' : 'auto',
              alignContent: 'start',
            }}
          >
            {index === 0 && bannerItems.length > 0 && (
              <div
                style={{
                  gridColumn: '1 / -1',
                  gridRow: '1',
                  marginLeft: `-${PAGE_PADDING}px`,
                  marginRight: `-${PAGE_PADDING}px`,
                  marginTop: `-${PAGE_PADDING}px`,
                }}
              >
                {bannerItems.map((s: any, i: number) => (
                  <React.Fragment key={i}>
                    {renderSection(s, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks)}
                  </React.Fragment>
                ))}
              </div>
            )}
            <div
              className={cn('flex flex-col', leftColumnClassName)}
              style={{
                gridRow: index === 0 && bannerItems.length > 0 ? '2' : '1',
              }}
            >
              {(leftColumn as any[]).map((node: any, i) => (
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for DOM node rendering
                <div
                  key={`${index}-left-${i}-${node?.getAttribute?.('data-section') ?? node?.getAttribute?.('data-item') ?? node?.tagName ?? 'node'}`}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for DOM node rendering
                  dangerouslySetInnerHTML={{ __html: node.outerHTML }}
                  style={{ display: 'block' }}
                />
              ))}
            </div>
            <div
              className={cn('flex flex-col', rightColumnClassName)}
              style={{
                gridRow: index === 0 && bannerItems.length > 0 ? '2' : '1',
              }}
            >
              {(rightColumn as any[]).map((node: any, i) => (
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for DOM node rendering
                <div
                  key={`${index}-right-${i}-${node?.getAttribute?.('data-section') ?? node?.getAttribute?.('data-item') ?? node?.tagName ?? 'node'}`}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for DOM node rendering
                  dangerouslySetInnerHTML={{ __html: node.outerHTML }}
                  style={{ display: 'block' }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export const ResumeRenderer = React.memo(ResumeRendererComponent);
