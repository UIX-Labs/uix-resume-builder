'use client';

import { useCallback } from 'react';

/**
 * Captures the preview panel as an image for thumbnail.
 * Uses html2canvas when available, falls back to a no-op.
 */
export function useThumbnail(previewRef: React.RefObject<HTMLDivElement | null>) {
  const generateThumbnail = useCallback(async (): Promise<Blob | null> => {
    if (!previewRef.current) return null;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(previewRef.current, {
        scale: 0.3,
        useCORS: true,
        logging: false,
      });

      return new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png', 0.8);
      });
    } catch {
      return null;
    }
  }, [previewRef]);

  return { generateThumbnail };
}
