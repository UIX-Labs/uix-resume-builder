import { useLayoutEffect, useState, type RefObject } from 'react';
import {
  calculatePageBreaks,
  A4_CONFIG,
  type PaginationConfig,
  type PaginationResult,
} from './page-break-engine';

/**
 * Thin React wrapper around the pure `calculatePageBreaks` engine.
 *
 * Recalculates whenever `deps` change (typically the resume data).
 * Returns `null` until the first measurement pass completes.
 */
export function usePagination(
  contentRef: RefObject<HTMLDivElement | null>,
  deps: unknown[],
  config: PaginationConfig = A4_CONFIG,
): PaginationResult | null {
  const [result, setResult] = useState<PaginationResult | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!contentRef.current) return;
    setResult(calculatePageBreaks(contentRef.current, config));
  }, deps);

  return result;
}
