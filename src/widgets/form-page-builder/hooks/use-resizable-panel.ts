import { useEffect, useRef, useState, useCallback } from "react";

interface UseResizablePanelParams {
  containerRef: React.RefObject<HTMLDivElement | null>;
  previewWrapperRef: React.RefObject<HTMLDivElement | null>;
  defaultWidth?: number;
  minPercent?: number;
  maxPercent?: number;
  /** Fixed width of the resume preview (A4 width in px) */
  resumeWidth?: number;
  /** Fixed height of the resume preview (A4 height in px) */
  resumeHeight?: number;
}

interface UseResizablePanelReturn {
  leftWidth: number;
  previewScale: number;
  startResizing: () => void;
  isDragging: boolean;
}

/**
 * Hook for managing resizable panel logic
 * Handles mouse drag resizing and responsive preview scaling
 */
export function useResizablePanel({
  containerRef,
  previewWrapperRef,
  defaultWidth = 50,
  minPercent = 20,
  maxPercent = 70,
  resumeWidth = 794,
  resumeHeight = 1122,
}: UseResizablePanelParams): UseResizablePanelReturn {
  const [leftWidth, setLeftWidth] = useState(defaultWidth);
  const [previewScale, setPreviewScale] = useState(1);
  const isDragging = useRef(false);

  // Handle preview scaling based on container width
  useEffect(() => {
    const element = previewWrapperRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // Add some padding (40px) to ensure content doesn't touch edges
        const scale = (width - 40) / resumeWidth;
        setPreviewScale(Math.max(scale, 0.4)); // Minimum scale 0.4
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [previewWrapperRef, resumeWidth]);

  // Handle mouse drag for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = e.clientX - containerRect.left;
      const newPercent = (newLeftWidth / containerRect.width) * 100;

      // Calculate minimum width based on aspect ratio
      const minLeftWidthPx =
        (containerRect.height * resumeWidth) / resumeHeight + 40;
      const calculatedMinPercent = (minLeftWidthPx / containerRect.width) * 100;

      const effectiveMinPercent = Math.max(calculatedMinPercent, minPercent);

      if (newPercent > effectiveMinPercent && newPercent < maxPercent) {
        setLeftWidth(newPercent);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [containerRef, minPercent, maxPercent, resumeWidth, resumeHeight]);

  const startResizing = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  return {
    leftWidth,
    previewScale,
    startResizing,
    isDragging: isDragging.current,
  };
}
