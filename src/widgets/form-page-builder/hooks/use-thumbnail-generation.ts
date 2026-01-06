import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { generateThumbnail } from '@features/resume/renderer';
import { uploadThumbnail } from '@entities/resume/api/upload-resume';

export function useThumbnailGeneration(resumeId?: string) {
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const [lastThumbnailDataUrl, setLastThumbnailDataUrl] = useState<string | null>(null);
  const thumbnailGeneratedRef = useRef(false);

  const { mutateAsync: uploadThumbnailMutation } = useMutation({
    mutationFn: uploadThumbnail,
  });

  async function generateAndSaveThumbnail() {
    if (!thumbnailRef.current || !resumeId) {
      return;
    }

    try {
      const container = thumbnailRef.current.parentElement as HTMLElement;

      if (!container) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      if (!thumbnailRef.current.innerHTML || thumbnailRef.current.innerHTML.trim() === '') {
        return;
      }

      // Store original styles
      const originalHeight = container.style.height;
      const originalOverflow = container.style.overflow;
      const originalVisibility = container.style.visibility;
      const originalZIndex = container.style.zIndex;
      const originalPosition = container.style.position;
      const originalLeft = container.style.left;

      // Temporarily make visible for capture but move it far off-screen
      container.style.height = 'auto';
      container.style.overflow = 'visible';
      container.style.visibility = 'visible';
      container.style.position = 'fixed';
      container.style.left = '-99999px';
      container.style.top = '0';
      container.style.zIndex = '-9999';

      await new Promise((resolve) => setTimeout(resolve, 100));

      const thumbnailDataUrl = await generateThumbnail(thumbnailRef.current);

      // Restore original styles immediately
      container.style.height = originalHeight;
      container.style.overflow = originalOverflow;
      container.style.visibility = originalVisibility;
      container.style.zIndex = originalZIndex;
      container.style.position = originalPosition;
      container.style.left = originalLeft;

      if (!thumbnailDataUrl) {
        return;
      }

      // Check if thumbnail has changed compared to the last one
      if (lastThumbnailDataUrl && lastThumbnailDataUrl === thumbnailDataUrl) {
        console.log('Thumbnail unchanged, skipping upload');
        return;
      }

      // Upload only if different
      await uploadThumbnailMutation({ resumeId, thumbnail: thumbnailDataUrl });
      setLastThumbnailDataUrl(thumbnailDataUrl);
      thumbnailGeneratedRef.current = true;
    } catch (error) {
      console.error('Error generating thumbnail:', error);
    }
  }

  const invalidateThumbnail = () => {
    thumbnailGeneratedRef.current = false;
  };

  return {
    thumbnailRef,
    generateAndSaveThumbnail,
    invalidateThumbnail,
    thumbnailGenerated: thumbnailGeneratedRef.current,
  };
}
