'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Drag-to-resize between editor and preview panels.
 * Returns the width percentage (0-100) for the left panel.
 */
export function useResizablePanel(initial = 50, min = 30, max = 70) {
  const [width, setWidth] = useState(initial);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const startResizing = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDraggingRef.current = true;

      const startX = e.clientX;
      const startWidth = width;
      const containerWidth = containerRef.current?.offsetWidth ?? window.innerWidth;

      function onMouseMove(ev: MouseEvent) {
        if (!isDraggingRef.current) return;
        const delta = ev.clientX - startX;
        const pct = startWidth + (delta / containerWidth) * 100;
        setWidth(Math.max(min, Math.min(max, pct)));
      }

      function onMouseUp() {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [width, min, max],
  );

  return {
    width,
    startResizing,
    isDragging: isDraggingRef.current,
    containerRef,
  };
}
