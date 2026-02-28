'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadThumbnail } from '@entities/resume/api/upload-resume';
import { useResumeStore } from '../stores/resume-store';

const THUMBNAIL_INTERVAL = 25_000; // 25 seconds

/**
 * Periodically captures the preview panel as a thumbnail and uploads it.
 * Uses html2canvas (dynamically imported) to render to a data URL.
 */
export function useAutoThumbnail(previewRef: React.RefObject<HTMLDivElement | null>) {
  const resumeId = useResumeStore((s) => s.resumeId);
  const data = useResumeStore((s) => s.data);
  const lastDataUrlRef = useRef<string | null>(null);

  const { mutateAsync: upload } = useMutation({
    mutationFn: uploadThumbnail,
  });

  const capture = useCallback(async () => {
    if (!previewRef.current || !resumeId) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(previewRef.current, {
        scale: 0.3,
        useCORS: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png', 0.8);

      // Skip upload if identical to last capture
      if (dataUrl === lastDataUrlRef.current) return;

      await upload({ resumeId, thumbnail: dataUrl });
      lastDataUrlRef.current = dataUrl;
    } catch {
      // Silently fail — thumbnail is non-critical
    }
  }, [previewRef, resumeId, upload]);

  // Initial capture after mount (with delay for rendering)
  useEffect(() => {
    if (!resumeId || !data) return;
    const timer = setTimeout(capture, 2000);
    return () => clearTimeout(timer);
  }, [resumeId, data, capture]);

  // Periodic capture
  useEffect(() => {
    if (!resumeId || !data) return;
    const interval = setInterval(capture, THUMBNAIL_INTERVAL);
    return () => clearInterval(interval);
  }, [resumeId, data, capture]);
}
