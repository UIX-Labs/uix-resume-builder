import { cn } from "@shared/lib/cn";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { renderSection } from "./lib/section-renderers";
export { hasPendingSuggestions } from "./lib/section-utils";
export { generateThumbnail } from "./lib/thumbnail/thumbnail";
export type { ThumbnailOptions } from "./lib/thumbnail/thumbnail";

export type RenderProps = {
  template: any;
  data: any;
  className?: string;
  currentSection?: string;
  hasSuggestions?: boolean;
  isThumbnail?: boolean;
};

export function ResumeRenderer({
  template,
  data,
  className,
  currentSection,
  hasSuggestions = false,
  isThumbnail = false,
}: RenderProps) {
  const [pages, setPages] = useState<[React.ReactNode[], React.ReactNode[]][]>(
    []
  );
  const dummyContentRef = useRef<HTMLDivElement>(null);

  const { page } = template;

  const PAGE_HEIGHT = 1122;
  const PAGE_PADDING = page.padding ?? 24;

  // NEW: dynamic max height per column
  const DEFAULT_MAX = PAGE_HEIGHT - PAGE_PADDING * 2;
  const COLUMN_MAX = {
    left: DEFAULT_MAX,
    right: DEFAULT_MAX,
  };

  useLayoutEffect(() => {
    const container = dummyContentRef.current;
    if (!container) return;

    const bannerEl = container.querySelector(
      '[data-section-type="banner"]'
    ) as HTMLElement | null;
    const calculatedBannerHeight = bannerEl ? bannerEl.offsetHeight : 0;

    const leftCol = container.querySelector(
      '[data-column="left"]'
    ) as HTMLElement | null;
    const rightCol = container.querySelector(
      '[data-column="right"]'
    ) as HTMLElement | null;

    const leftPages: React.ReactNode[][] = [];
    const rightPages: React.ReactNode[][] = [];

    function paginateOneColumn(
      columnEl: HTMLElement,
      columnName: "left" | "right",
      outPages: React.ReactNode[][],
      bHeight: number
    ) {
      const pageMax = COLUMN_MAX[columnName];
      const pageMaxFirst = pageMax - bHeight;

      // Create a test container to measure actual heights
      const testContainer = document.createElement("div");
      testContainer.style.position = "absolute";
      testContainer.style.visibility = "hidden";
      testContainer.style.width =
        columnEl.style.width || getComputedStyle(columnEl).width;
      testContainer.style.left = "-9999px";
      testContainer.className = columnEl.className;
      document.body.appendChild(testContainer);

      let currentColumnPage: React.ReactNode[] = [];
      outPages.push(currentColumnPage);

      // Map to track the active cloned containers on the current page
      let pageClones = new Map<HTMLElement, HTMLElement>();

      function processChildren(
        parentEl: HTMLElement,
        ancestorChain: HTMLElement[] = []
      ) {
        // Helper to append a node to the current page while maintaining its hierarchy
        const appendNode = (node: HTMLElement, lineage: HTMLElement[]) => {
          if (lineage.length === 0) {
            // Top level element, just add to page
            currentColumnPage.push(node as any);
            return;
          }

          let currentParentClone: HTMLElement | null = null;

          // Reconstruct the ancestorChain chain on the current page if needed
          for (let i = 0; i < lineage.length; i++) {
            const ancestor = lineage[i];
            let clone = pageClones.get(ancestor);

            if (!clone) {
              clone = ancestor.cloneNode(false) as HTMLElement; // Shallow clone (container only)
              pageClones.set(ancestor, clone);

              if (i === 0) {
                // This is a top-level ancestor for this page
                currentColumnPage.push(clone as any);
              } else {
                // Append to previous ancestor's clone
                if (currentParentClone) {
                  currentParentClone.appendChild(clone);
                }
              }
            }
            currentParentClone = clone;
          }

          // Finally append the node to its immediate parent clone
          if (currentParentClone) {
            currentParentClone.appendChild(node);
          }
        };

        const children = Array.from(parentEl.children) as HTMLElement[];

        for (const child of children) {
          // Check if element is breakable - either via attribute or by tag name (ul, ol are naturally breakable)
          const tagName = child.tagName?.toLowerCase();
          const isListElement =
            tagName === "ul" ||
            tagName === "ol" ||
            tagName === "p" ||
            tagName === "li" ||
            tagName === "p" ||
            tagName === "span" ||
            tagName === "div";
          const canBreak =
            child.getAttribute("data-canbreak") === "true" || isListElement;
          const hasBreakableContent =
            child.querySelector('[data-has-breakable-content="true"]') !==
              null ||
            child.getAttribute("data-has-breakable-content") === "true";

          // Clone and measure the actual height
          const clone = child.cloneNode(true) as HTMLElement;
          testContainer.innerHTML = "";
          testContainer.appendChild(clone);

          const isFirstPage = outPages.length === 1;
          const currentMax = isFirstPage ? pageMaxFirst : pageMax;

          const cloneHeight = clone.getBoundingClientRect().height;
          const computedStyle = window.getComputedStyle(clone);
          const marginTop = parseFloat(computedStyle.marginTop) || 0;
          const marginBottom = parseFloat(computedStyle.marginBottom) || 0;
          const totalHeight = cloneHeight + marginTop + marginBottom;

          // Calculate current page height
          testContainer.innerHTML = "";
          currentColumnPage.forEach((node: any) => {
            const nodeClone =
              typeof node === "string"
                ? document.createRange().createContextualFragment(node)
                    .firstChild
                : node.cloneNode(true);
            if (nodeClone) testContainer.appendChild(nodeClone as Node);
          });

          const currentHeight = testContainer.getBoundingClientRect().height;

          // If element is too tall to fit on remaining space
          // Reduced buffer from 40 to 5 to avoid wasting space
          if (
            currentHeight + totalHeight + 5 > currentMax &&
            currentColumnPage.length > 0
          ) {
            // If the element is breakable and has children, try to break it
            if (canBreak && child.children.length > 0) {
              processChildren(child, [...ancestorChain, child]);
              continue;
            }

            if (canBreak && child.children.length === 0 && child.textContent) {
              const fullText = child.textContent;
              const words = fullText.split(" ");

              if (words.length > 1) {
                // Binary search for the split point
                let low = 0;
                let high = words.length;
                let splitIndex = 0;

                // We need to test the height with partial text
                // Create a temporary clone for testing
                const testClone = child.cloneNode(true) as HTMLElement;
                testContainer.innerHTML = "";
                // Append everything on current page first to get accurate offsets
                currentColumnPage.forEach((node: any) => {
                  const nodeClone =
                    typeof node === "string"
                      ? document.createRange().createContextualFragment(node)
                          .firstChild
                      : node.cloneNode(true);
                  if (nodeClone) testContainer.appendChild(nodeClone as Node);
                });

                // Helper to check if text fits
                const checkFits = (count: number) => {
                  const partialText = words.slice(0, count).join(" ");
                  testClone.textContent = partialText;
                  testContainer.appendChild(testClone);
                  const h = testContainer.getBoundingClientRect().height;
                  testContainer.removeChild(testClone);
                  return h <= currentMax;
                };

                while (low <= high) {
                  const mid = Math.floor((low + high) / 2);
                  if (mid === 0) {
                    low = 1;
                    continue;
                  }
                  if (checkFits(mid)) {
                    splitIndex = mid;
                    low = mid + 1;
                  } else {
                    high = mid - 1;
                  }
                }

                if (splitIndex > 0 && splitIndex < words.length) {
                  // Optimization: Try to split at a sentence boundary (., !, ?)
                  // Look back from splitIndex up to 50 words to find a sentence end.
                  let bestSplitIndex = splitIndex;
                  const lookBackLimit = Math.max(0, splitIndex - 50);

                  for (let i = splitIndex - 1; i >= lookBackLimit; i--) {
                    const word = words[i];
                    if (/[.!?]['")\]]*$/.test(word)) {
                      bestSplitIndex = i + 1;
                      break;
                    }
                  }

                  splitIndex = bestSplitIndex;

                  // meaningful split found
                  const part1Text = words.slice(0, splitIndex).join(" ");
                  const part2Text = words.slice(splitIndex).join(" ");

                  // Create first part and append to current page
                  const part1Node = child.cloneNode(true) as HTMLElement;
                  part1Node.textContent = part1Text;
                  appendNode(part1Node, ancestorChain);

                  // Break page
                  currentColumnPage = [];
                  outPages.push(currentColumnPage);
                  pageClones.clear();

                  // Process second part - recursively in case it needs to split again
                  const part2Node = child.cloneNode(true) as HTMLElement;
                  part2Node.textContent = part2Text;

                  const tempWrapper = document.createElement("div");
                  tempWrapper.appendChild(part2Node);

                  // Modify ancestorChain: set list-style to none for li elements in the continuation
                  // This ensures the next page has the indentation but no bullet point
                  const modifiedAncestry = ancestorChain.map((node) => {
                    if (node.tagName.toLowerCase() === "li") {
                      const liClone = node.cloneNode(false) as HTMLElement;
                      liClone.style.listStyle = "none";
                      return liClone;
                    }
                    return node;
                  });

                  processChildren(tempWrapper, modifiedAncestry);

                  continue;
                }
              }
            }

            currentColumnPage = [];
            outPages.push(currentColumnPage);
            pageClones.clear(); // Reset clones
          }

          if (totalHeight > pageMax && child.children.length > 0) {
            // If element itself is breakable, process its children
            if (canBreak) {
              processChildren(child, [...ancestorChain, child]);
              continue;
            }
            // If not breakable but has breakable content (via template prop), process children
            if (hasBreakableContent) {
              processChildren(child, [...ancestorChain, child]);
              continue;
            }
          }

          // Use helper to append
          appendNode(child.cloneNode(true) as HTMLElement, ancestorChain);
        }
      }

      processChildren(columnEl);

      // Cleanup
      document.body.removeChild(testContainer);
    }

    if (leftCol)
      paginateOneColumn(leftCol, "left", leftPages, calculatedBannerHeight);
    if (rightCol)
      paginateOneColumn(rightCol, "right", rightPages, calculatedBannerHeight);

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
          spacing: "0px",
          left: {
            width: "100%",
          },
          right: {
            width: "0%",
          },
        },

        leftItems: template.sections,
        rightItems: [],
        bannerItems: [],
      };
    }

    const bannerItems = template.sections.filter(
      (s: any) => s.type === "banner"
    );
    const leftItems = template.sections.filter(
      (s: any) => s.column === "left" && s.type !== "banner"
    );
    const rightItems = template.sections.filter(
      (s: any) => s.column === "right" && s.type !== "banner"
    );

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
  const leftColumnClassName = columnConfig.left.className || "";
  const rightColumnClassName = columnConfig.right.className || "";

  const baseStyle = {
    width: "21cm",
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
          position: "absolute",
          visibility: "hidden",
        }}
      >
        {bannerItems.length > 0 && (
          <div style={{ gridColumn: "1 / -1" }} data-section-type="banner">
            {bannerItems.map((s: any, i: number) => (
              <React.Fragment key={i}>
                {renderSection(
                  s,
                  data,
                  currentSection,
                  hasSuggestions,
                  isThumbnail
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        <div
          className={cn("flex flex-col", leftColumnClassName)}
          data-column="left"
        >
          {leftItems.map((s: any, i: number) => (
            <React.Fragment key={i}>
              {renderSection(
                s,
                data,
                currentSection,
                hasSuggestions,
                isThumbnail
              )}
            </React.Fragment>
          ))}
        </div>
        <div
          className={cn("flex flex-col", rightColumnClassName)}
          data-column="right"
        >
          {rightItems.map((s: any, i: number) => (
            <React.Fragment key={i}>
              {renderSection(
                s,
                data,
                currentSection,
                hasSuggestions,
                isThumbnail
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {pages.map((columns, index) => {
        const [leftColumn, rightColumn] = columns;
        return (
          <div
            key={index}
            className={cn("grid mb-5", page.className, className)}
            style={{
              ...baseStyle,
              height: "29.7cm",
              backgroundColor: page.background || "white",
              fontFamily: page.fontFamily,
              gridTemplateRows:
                index === 0 && bannerItems.length > 0 ? "auto 1fr" : "1fr",
            }}
          >
            {index === 0 && bannerItems.length > 0 && (
              <div
                style={{
                  gridColumn: "1 / -1",
                  gridRow: "1",
                  marginLeft: `-${PAGE_PADDING}px`,
                  marginRight: `-${PAGE_PADDING}px`,
                  marginTop: `-${PAGE_PADDING}px`,
                }}
              >
                {bannerItems.map((s: any, i: number) => (
                  <React.Fragment key={i}>
                    {renderSection(
                      s,
                      data,
                      currentSection,
                      hasSuggestions,
                      isThumbnail
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            <div
              className={cn("flex flex-col", leftColumnClassName)}
              style={{
                gridRow: index === 0 && bannerItems.length > 0 ? "2" : "1",
              }}
            >
              {leftColumn.map((node: any, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: node.outerHTML }}
                  className={node.containerClassName}
                />
              ))}
            </div>
            <div
              className={cn("flex flex-col", rightColumnClassName)}
              style={{
                gridRow: index === 0 && bannerItems.length > 0 ? "2" : "1",
              }}
            >
              {rightColumn.map((node: any, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: node.outerHTML }}
                  className={node.containerClassName}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
