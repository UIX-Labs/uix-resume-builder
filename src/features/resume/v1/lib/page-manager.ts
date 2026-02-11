/**
 * Resume Engine — PageManager
 *
 * Uniform page-break engine: same logic for preview and PDF.
 * Configurable page size (A4/Letter), padding, and first-page offset (e.g. banner).
 * No template-specific logic; deterministic from config.
 */

import { PAGE_SIZE, type PageConfig } from '../types/engine';

/** A4 at 96dpi (default). */
const A4_HEIGHT_PX = PAGE_SIZE.A4.height;
const A4_HEIGHT_CM = '29.7cm';

export const DEFAULT_PAGE_PADDING_PX = 24;

/** Max padding used for pagination and visible page so content area is never too small (~429px). */
export const MAX_PAGE_PADDING_PX = 48;

export interface PageManagerHeights {
  /** Max content height for the first page (after banner if any). */
  firstPageMaxHeight: number;
  /** Max content height for subsequent pages. */
  otherPageMaxHeight: number;
  /** Page height in px (for internal measurement). */
  pageHeightPx: number;
  /** Page height in cm (for CSS min-height / print). */
  pageHeightCm: string;
  /** Padding in px. */
  paddingPx: number;
}

/**
 * Resolves page dimensions from config.
 * Uses PAGE_SIZE preset when size is set; otherwise widthPx/heightPx.
 */
function resolvePageDimensions(config: PageConfig): { widthPx: number; heightPx: number } {
  if (config.size) {
    const preset = PAGE_SIZE[config.size];
    return { widthPx: preset.width, heightPx: preset.height };
  }
  return {
    widthPx: config.widthPx ?? PAGE_SIZE.A4.width,
    heightPx: config.heightPx ?? A4_HEIGHT_PX,
  };
}

/**
 * Returns page heights and padding for pagination.
 * Same values must be used for HTML preview and PDF generation so breaks match.
 *
 * @param pageConfig - Template page config (padding, size, etc.)
 * @param firstPageBannerHeightPx - Height of banner on first page (0 if none)
 */
export function getPageHeights(pageConfig: PageConfig, firstPageBannerHeightPx: number = 0): PageManagerHeights {
  const rawPadding = pageConfig.paddingPx ?? DEFAULT_PAGE_PADDING_PX;
  const paddingPx = Math.min(rawPadding, MAX_PAGE_PADDING_PX);
  const { heightPx: pageHeightPx } = resolvePageDimensions(pageConfig);

  const firstPageMaxHeight = pageHeightPx - firstPageBannerHeightPx - paddingPx * 2;
  const otherPageMaxHeight = pageHeightPx - paddingPx * 2;

  return {
    firstPageMaxHeight: Math.max(0, firstPageMaxHeight),
    otherPageMaxHeight: Math.max(0, otherPageMaxHeight),
    pageHeightPx,
    pageHeightCm: pageHeightPx === PAGE_SIZE.A4.height ? A4_HEIGHT_CM : `${(pageHeightPx / 96) * 2.54}cm`,
    paddingPx,
  };
}

export { A4_HEIGHT_CM, A4_HEIGHT_PX };
