import { cn } from '@shared/lib/cn';
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { renderSection, willSectionRender } from './lib/section-renderers';
export { hasPendingSuggestions } from './lib/section-utils';
export { generateThumbnail } from './lib/thumbnail/thumbnail';
export type { ThumbnailOptions } from './lib/thumbnail/thumbnail';

// ---------------------------------------------------------------------------
// Pagination fix helpers
// ---------------------------------------------------------------------------

/**
 * Minimum height (px) a broken container's content must occupy on a page
 * to avoid being treated as an orphan. If the content from a broken container
 * on the starting page is shorter than this, it gets moved to the next page.
 * ~80px ≈ 3-4 lines of text at typical resume font sizes.
 */
const MIN_ORPHAN_HEIGHT = 80;

/**
 * Check if an element has no block-level child elements (only text / inline).
 * These elements can't be split by the recursive algorithm because
 * `children.length === 0`. We detect them and split on paragraph boundaries.
 */
function isTextOnlyElement(el: HTMLElement): boolean {
  if (el.children.length > 0) return false;
  const text = el.textContent ?? '';
  return text.trim().length > 0;
}

/**
 * Split a text-only element into multiple paragraph-level child divs so the
 * pagination algorithm can break between them. Splits on double-newline (\n\n)
 * for whitespace-pre-wrap content, or on <br><br> / <br>\n patterns in HTML.
 *
 * Returns a clone of the element with text split into child divs, or null if
 * splitting isn't possible (e.g., single short paragraph).
 */
function splitTextBlock(el: HTMLElement): HTMLElement | null {
  const html = el.innerHTML;
  if (!html) return null;

  // Try splitting on double-newline first (whitespace-pre-wrap content)
  // Then try splitting on single newlines if the block is very tall
  let parts = html.split(/\n\n+/);
  if (parts.length <= 1) {
    parts = html.split(/\n/);
  }
  if (parts.length <= 1) {
    parts = html.split(/<br\s*\/?>\s*<br\s*\/?>/i);
  }
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

  const PAGE_HEIGHT = 1122;
  const PAGE_PADDING = page.padding ?? 24;

  // NEW: dynamic max height per column
  const PAGE_PADDING_PX = PAGE_PADDING;
  const _COLUMN_MAX_DEFAULT = PAGE_HEIGHT - PAGE_PADDING_PX * 2;

  useLayoutEffect(() => {
    const container = dummyContentRef.current;
    if (!container) return;
    // Note: skipImageFallbacks is used to hide profile pictures when no image is set during PDF generation

    // Get the actual computed height of the banner as it appears in the grid
    const bannerEl = container.querySelector('[data-section-type="banner"]') as HTMLElement | null;
    const bHeight = bannerEl ? bannerEl.offsetHeight : 0;

    // On the first page, the columns are in a grid row below the banner.
    // The banner's negative top margin means it occupies space starting from the top.
    // However, the column content is still subject to the page's bottom padding.
    const pageMaxFirst = PAGE_HEIGHT - bHeight - PAGE_PADDING_PX - 15;
    const pageMaxOther = PAGE_HEIGHT - PAGE_PADDING_PX * 2;

    const leftCol = container.querySelector('[data-column="left"]') as HTMLElement | null;
    const rightCol = container.querySelector('[data-column="right"]') as HTMLElement | null;

    const leftPages: React.ReactNode[][] = [];
    const rightPages: React.ReactNode[][] = [];

    function paginateOneColumn(columnEl: HTMLElement, _columnName: 'left' | 'right', outPages: React.ReactNode[][]) {
      const pageMax = pageMaxOther;

      // Create a test container to measure actual heights
      const testContainer = document.createElement('div');
      testContainer.style.position = 'absolute';
      testContainer.style.visibility = 'hidden';
      testContainer.style.left = '-9999px';
      testContainer.style.top = '0';

      // Copy all computed styles from the column to ensure accurate measurements
      const columnStyles = getComputedStyle(columnEl);
      testContainer.style.width = columnStyles.width;
      testContainer.style.fontFamily = columnStyles.fontFamily;
      testContainer.style.fontSize = columnStyles.fontSize;
      testContainer.style.lineHeight = columnStyles.lineHeight;
      testContainer.style.letterSpacing = columnStyles.letterSpacing;
      testContainer.style.wordSpacing = columnStyles.wordSpacing;
      testContainer.className = columnEl.className;
      testContainer.style.boxSizing = 'border-box';
      testContainer.style.padding = '0';

      document.body.appendChild(testContainer);

      // State management
      let currentPageIndex = 0;
      outPages.push([]);

      // Stack to track parent wrappers we're currently inside
      const containerStack: HTMLElement[] = [];

      function getCurrentPageMax(): number {
        return currentPageIndex === 0 ? pageMaxFirst : pageMax;
      }

      function getPageHeight(): number {
        testContainer.innerHTML = '';
        const currentPageNodes = outPages[currentPageIndex];

        currentPageNodes.forEach((node: any) => {
          if (node.nodeType) {
            testContainer.appendChild(node.cloneNode(true));
          }
        });

        return testContainer.getBoundingClientRect().height;
      }

      function startNewPage() {
        currentPageIndex++;
        outPages.push([]);

        // Recreate the container stack on the new page
        for (let i = 0; i < containerStack.length; i++) {
          const originalContainer = containerStack[i];
          const newContainer = originalContainer.cloneNode(false) as HTMLElement;

          if (i === 0) {
            // First container goes directly on the page
            outPages[currentPageIndex].push(newContainer as any);
          } else {
            // Nested containers get appended to their parent
            const parent = findContainerOnCurrentPage(i - 1);
            if (parent) {
              parent.appendChild(newContainer);
            }
          }

          // Update the stack reference
          containerStack[i] = newContainer;
        }
      }

      function findContainerOnCurrentPage(stackIndex: number): HTMLElement | null {
        if (stackIndex < 0 || stackIndex >= containerStack.length) return null;
        return containerStack[stackIndex];
      }

      function getCurrentContainer(): HTMLElement | null {
        return containerStack.length > 0 ? containerStack[containerStack.length - 1] : null;
      }

      function addToPage(element: HTMLElement) {
        const container = getCurrentContainer();
        if (container) {
          container.appendChild(element);
        } else {
          outPages[currentPageIndex].push(element as any);
        }
      }

      function removeFromPage(element: HTMLElement) {
        const container = getCurrentContainer();
        if (container?.contains(element)) {
          container.removeChild(element);
        } else {
          const pageNodes = outPages[currentPageIndex];
          const idx = pageNodes.indexOf(element as any);
          if (idx !== -1) {
            pageNodes.splice(idx, 1);
          }
        }
      }

      /** Remove border classes from a broken wrapper to prevent visual artifacts */
      function removeBorderClasses(el: HTMLElement) {
        if (el.classList) {
          el.classList.remove('border-b', 'border-t', 'border-l', 'border-r', 'border');
        }
      }

      /**
       * Measure the height of a specific page (not necessarily the current one).
       * Used by orphan detection to check the starting page after recursion.
       */
      function getPageHeightForPage(pageIdx: number): number {
        testContainer.innerHTML = '';
        const pageNodes = outPages[pageIdx];
        if (!pageNodes) return 0;

        pageNodes.forEach((node: any) => {
          if (node.nodeType) {
            testContainer.appendChild(node.cloneNode(true));
          }
        });
        return testContainer.getBoundingClientRect().height;
      }

      /**
       * Remove a wrapper element from a specific page's node list.
       * The wrapper is either a direct page node or nested inside the container
       * stack. For orphan removal, it's typically a direct child or inside the
       * stack root on that page.
       */
      function removeWrapperFromPage(wrapper: HTMLElement, pageIdx: number) {
        const pageNodes = outPages[pageIdx];
        if (!pageNodes) return;

        // Check if wrapper is a direct top-level node on that page
        const directIdx = pageNodes.indexOf(wrapper as any);
        if (directIdx !== -1) {
          pageNodes.splice(directIdx, 1);
          return;
        }

        // Otherwise the wrapper is nested — find and remove it from its parent
        for (const node of pageNodes) {
          if ((node as any).contains && (node as any).contains(wrapper) && wrapper.parentElement) {
            wrapper.parentElement.removeChild(wrapper);
            return;
          }
        }
      }

      function processChildren(parentEl: HTMLElement) {
        const children = Array.from(parentEl.children) as HTMLElement[];

        for (const child of children) {
          const tagName = child.tagName?.toLowerCase();
          const isNaturallyBreakable = ['ul', 'ol', 'p', 'div'].includes(tagName);
          const canBreak = child.getAttribute('data-canbreak') === 'true' || isNaturallyBreakable;
          const hasBreakableContent =
            child.querySelector('[data-canbreak="true"]') !== null ||
            child.querySelector('[data-has-breakable-content="true"]') !== null ||
            child.getAttribute('data-has-breakable-content') === 'true';

          // Try adding the full element first
          const clone = child.cloneNode(true) as HTMLElement;
          addToPage(clone);

          const currentHeight = getPageHeight();
          const max = getCurrentPageMax();
          if (currentHeight <= max) {
            continue;
          }

          // It doesn't fit — remove it
          removeFromPage(clone);

          // --- Text-block splitting ---
          // If this element has no child elements but has text content, try to
          // split it into paragraph-level children so we can break between them.
          if ((canBreak || hasBreakableContent) && child.children.length === 0 && isTextOnlyElement(child)) {
            const splitEl = splitTextBlock(child);
            if (splitEl && splitEl.children.length > 1) {
              // Create wrapper with same attributes, recurse into split children
              const wrapper = child.cloneNode(false) as HTMLElement;
              removeBorderClasses(wrapper);
              addToPage(wrapper);
              containerStack.push(wrapper);
              processChildren(splitEl);
              containerStack.pop();
              continue;
            }
          }

          // --- Standard breaking (element has child elements) ---
          if ((canBreak || hasBreakableContent) && child.children.length > 0) {
            // Snapshot: record the page we're starting on and what height we have
            // so far, so we can detect orphans after recursion.
            const startPage = currentPageIndex;
            const heightBefore = getPageHeight();

            // Create empty wrapper and add to current page
            const wrapper = child.cloneNode(false) as HTMLElement;
            removeBorderClasses(wrapper);
            addToPage(wrapper);

            // Push to stack
            containerStack.push(wrapper);

            // Process children (they'll be added inside the wrapper)
            processChildren(child);

            // Pop from stack
            containerStack.pop();

            // --- Orphan prevention ---
            // If the break caused a page change and the wrapper on the starting
            // page is too small, move its content to the next page instead of
            // leaving a tiny orphan fragment. We do this by removing the wrapper
            // from the start page, starting a new page at that point, and
            // re-processing the entire child so all its content lands on later
            // pages.
            if (currentPageIndex > startPage) {
              const heightAfter = getPageHeightForPage(startPage);
              const wrapperContribution = heightAfter - heightBefore;

              if (wrapperContribution > 0 && wrapperContribution < MIN_ORPHAN_HEIGHT) {
                // Remove all pages that were created during the recursion
                // (from startPage onwards) and restore to pre-recursion state
                while (outPages.length > startPage + 1) {
                  outPages.pop();
                }
                // Remove the wrapper from the start page
                removeWrapperFromPage(wrapper, startPage);

                // Restore page index and start a new page, then re-process
                // the entire child element so nothing is lost
                currentPageIndex = startPage;
                startNewPage();

                const freshClone = child.cloneNode(true) as HTMLElement;
                addToPage(freshClone);

                // Check if it fits on the fresh page
                const freshHeight = getPageHeight();
                const freshMax = getCurrentPageMax();
                if (freshHeight > freshMax && child.children.length > 0) {
                  // Still doesn't fit — break it on the new page
                  removeFromPage(freshClone);
                  const freshWrapper = child.cloneNode(false) as HTMLElement;
                  removeBorderClasses(freshWrapper);
                  addToPage(freshWrapper);
                  containerStack.push(freshWrapper);
                  processChildren(child);
                  containerStack.pop();
                }
              }
            }

            continue;
          }

          // Cannot break — need new page
          const pageHeight = getPageHeight();
          const hasContent = pageHeight > 10;

          if (!hasContent) {
            // Page is empty, must add anyway to avoid infinite loop
            addToPage(clone);
            continue;
          }

          // Start new page and try again
          startNewPage();

          // Recursively try to add on new page
          const newClone = child.cloneNode(true) as HTMLElement;
          addToPage(newClone);

          const newHeight = getPageHeight();
          const newMax = getCurrentPageMax();

          if (newHeight > newMax && (canBreak || hasBreakableContent) && child.children.length > 0) {
            // Still doesn't fit on new page — must break it
            removeFromPage(newClone);

            const wrapper = child.cloneNode(false) as HTMLElement;
            removeBorderClasses(wrapper);
            addToPage(wrapper);
            containerStack.push(wrapper);
            processChildren(child);
            containerStack.pop();
          }
        }
      }

      processChildren(columnEl);

      // Post-pass: remove empty pages that may result from orphan removal
      for (let i = outPages.length - 1; i >= 0; i--) {
        const page = outPages[i];
        const hasVisibleContent = page.some((node: any) => {
          const text = node.textContent ?? '';
          return text.trim().length > 0;
        });
        if (!hasVisibleContent && i > 0) {
          outPages.splice(i, 1);
        }
      }

      // Cleanup
      document.body.removeChild(testContainer);
    }

    if (leftCol) paginateOneColumn(leftCol, 'left', leftPages);
    if (rightCol) paginateOneColumn(rightCol, 'right', rightPages);

    const totalPages = Math.max(leftPages.length, rightPages.length);
    const merged: [React.ReactNode[], React.ReactNode[]][] = [];

    for (let i = 0; i < totalPages; i++) {
      merged.push([leftPages[i] || [], rightPages[i] || []]);
    }

    setPages(merged);
  }, [template, data, currentSection, hasSuggestions, isThumbnail]);

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

  const leftWidth = columnConfig.left.width;
  const rightWidth = columnConfig.right.width;
  const spacing = columnConfig.spacing;
  const leftColumnClassName = columnConfig.left.className || '';
  const rightColumnClassName = columnConfig.right.className || '';

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
              // [skipImageFallbacks ? 'height' : 'minHeight']: '29.7cm',
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
              {leftColumn.map((node: any, i) => (
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for DOM node rendering
                <div key={i} dangerouslySetInnerHTML={{ __html: node.outerHTML }} style={{ display: 'block' }} />
              ))}
            </div>
            <div
              className={cn('flex flex-col', rightColumnClassName)}
              style={{
                gridRow: index === 0 && bannerItems.length > 0 ? '2' : '1',
              }}
            >
              {rightColumn.map((node: any, i) => (
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

// Wrap with React.memo to prevent unnecessary re-renders
// Uses shallow comparison for all props - parent should memoize data prop
export const ResumeRenderer = React.memo(ResumeRendererComponent);
