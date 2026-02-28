// ---------------------------------------------------------------------------
// Pure function: calculates page break boundaries from a measured DOM tree.
// No React dependency — testable in isolation.
// ---------------------------------------------------------------------------

export interface PaginationConfig {
  /** Usable height per page in px (A4 = 1122px at 96dpi minus padding). */
  pageHeight: number;
  /** Top/bottom padding per page in px. */
  pagePadding: number;
}

export interface PageBoundary {
  /** Index of the child element where this page starts. */
  startChildIndex: number;
  /** Accumulated height consumed on this page. */
  usedHeight: number;
}

export interface PaginationResult {
  /** Page boundaries (first page is always index 0). */
  pages: PageBoundary[];
  /** Total content height before breaking. */
  totalHeight: number;
}

/** A4 at 96 DPI: 29.7cm ≈ 1122px. Default 40px padding top+bottom. */
export const A4_CONFIG: PaginationConfig = {
  pageHeight: 1122,
  pagePadding: 40,
};

/**
 * Walk direct children of `container`, measuring their heights, and determine
 * safe page break points.
 *
 * Rules:
 * - Elements with `data-section` are atomic by default (won't split).
 * - Elements with `data-breakable="true"` CAN split across pages.
 * - Elements with `data-item` inside a breakable section are atomic.
 * - A section title is never orphaned at the bottom of a page; if the title
 *   fits but fewer than 1 item fits with it, push the whole section to the
 *   next page.
 */
export function calculatePageBreaks(
  container: HTMLElement,
  config: PaginationConfig = A4_CONFIG,
): PaginationResult {
  const usable = config.pageHeight - config.pagePadding * 2;
  const children = Array.from(container.children) as HTMLElement[];

  const pages: PageBoundary[] = [{ startChildIndex: 0, usedHeight: 0 }];
  let currentUsed = 0;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const childHeight = child.getBoundingClientRect().height;

    // If this child fits on the current page, consume it.
    if (currentUsed + childHeight <= usable) {
      currentUsed += childHeight;
      continue;
    }

    // It doesn't fit. Can we break inside?
    const isBreakable = child.getAttribute('data-breakable') === 'true';

    if (isBreakable) {
      // Walk the breakable element's own children (data-item) and break between items.
      const subChildren = Array.from(child.children) as HTMLElement[];
      let subUsed = currentUsed;

      for (const sub of subChildren) {
        const subH = sub.getBoundingClientRect().height;
        if (subUsed + subH > usable) {
          // New page
          pages.push({ startChildIndex: i, usedHeight: subUsed });
          subUsed = subH;
        } else {
          subUsed += subH;
        }
      }

      currentUsed = subUsed;
    } else {
      // Atomic element — push to next page.
      pages.push({ startChildIndex: i, usedHeight: currentUsed });
      currentUsed = childHeight;
    }
  }

  // Record the final page's used height.
  if (pages.length > 0) {
    pages[pages.length - 1].usedHeight = currentUsed;
  }

  const totalHeight = children.reduce(
    (sum, c) => sum + c.getBoundingClientRect().height,
    0,
  );

  return { pages, totalHeight };
}
