'use client';

import { useState, useLayoutEffect, type RefObject } from 'react';

const A4_WIDTH_PX = 794; // 21cm at 96dpi

/**
 * Calculates the zoom/scale factor so the A4-width preview fits inside its container.
 */
export function usePreviewScale(containerRef: RefObject<HTMLDivElement | null>): number {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? el.clientWidth;
      const padding = 32; // 16px padding each side
      setScale(Math.min((width - padding) / A4_WIDTH_PX, 1));
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return scale;
}
