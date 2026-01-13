import { cn } from '@shared/lib/cn';
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { renderSection } from './lib/section-renderers';
export { hasPendingSuggestions } from './lib/section-utils';
export { generateThumbnail } from './lib/thumbnail/thumbnail';
export type { ThumbnailOptions } from './lib/thumbnail/thumbnail';

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
    const pageMaxFirst = PAGE_HEIGHT - bHeight - PAGE_PADDING_PX;
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

          // If it fits, keep it and continue
          if (currentHeight <= max) {
            continue;
          }

          // It doesn't fit - remove it
          const container = getCurrentContainer();
          if (container?.contains(clone)) {
            container.removeChild(clone);
          } else {
            outPages[currentPageIndex].pop();
          }

          // Try to break it
          if ((canBreak || hasBreakableContent) && child.children.length > 0) {
            // Create empty wrapper and add to current page
            const wrapper = child.cloneNode(false) as HTMLElement;
            addToPage(wrapper);

            // Push to stack
            containerStack.push(wrapper);

            // Process children (they'll be added inside the wrapper)
            processChildren(child);

            // Pop from stack
            containerStack.pop();
            continue;
          }

          // Cannot break - need new page
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
            // Still doesn't fit on new page - must break it
            const container = getCurrentContainer();
            if (container?.contains(newClone)) {
              container.removeChild(newClone);
            } else {
              outPages[currentPageIndex].pop();
            }

            const wrapper = child.cloneNode(false) as HTMLElement;
            addToPage(wrapper);
            containerStack.push(wrapper);
            processChildren(child);
            containerStack.pop();
          }
        }
      }

      processChildren(columnEl);

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
          {leftItems.map((s: any, i: number) => (
            <React.Fragment key={i}>
              {renderSection(s, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks)}
            </React.Fragment>
          ))}
        </div>
        <div className={cn('flex flex-col', rightColumnClassName)} data-column="right">
          {rightItems.map((s: any, i: number) => (
            <React.Fragment key={i}>
              {renderSection(s, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks)}
            </React.Fragment>
          ))}
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
              [skipImageFallbacks ? 'height' : 'minHeight']: '29.7cm',
              backgroundColor: page.background || 'white',
              fontFamily: page.fontFamily,
              gridTemplateRows: index === 0 && bannerItems.length > 0 ? 'auto 1fr' : '1fr',
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
