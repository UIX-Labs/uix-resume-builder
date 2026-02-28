'use client';

import { useCallback, useRef } from 'react';
import { convertHtmlToPdf } from '@entities/download-pdf/api/html-to-pdf';
import { useUIStore } from '../stores/ui-store';
import { useResumeStore } from '../stores/resume-store';

/**
 * PDF generation + download flow.
 * Captures the preview DOM, sends to backend for conversion, triggers download.
 */
export function usePdfDownload(previewRef: React.RefObject<HTMLDivElement | null>) {
  const setIsGeneratingPDF = useUIStore((s) => s.setIsGeneratingPDF);
  const isGenerating = useUIStore((s) => s.isGeneratingPDF);
  const resumeId = useResumeStore((s) => s.resumeId);

  const downloadPdf = useCallback(async () => {
    if (!previewRef.current || isGenerating) return;

    setIsGeneratingPDF(true);

    try {
      const html = previewRef.current.innerHTML;
      const { blob } = await convertHtmlToPdf(html, resumeId ?? undefined);

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${resumeId ?? 'draft'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [previewRef, isGenerating, resumeId, setIsGeneratingPDF]);

  return { downloadPdf, isGenerating };
}
