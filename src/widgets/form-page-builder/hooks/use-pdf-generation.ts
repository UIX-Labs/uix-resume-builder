import type { ResumeData } from '@entities/resume';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { generatePdfFromHtml } from '../lib/pdf-helpers';

interface UsePdfGenerationParams {
  /** Ref to element containing full multi-page resume HTML (not thumbnail) */
  pdfSourceRef: React.RefObject<HTMLDivElement | null>;
  formData: Omit<ResumeData, 'templateId'> | null | undefined;
  resumeId?: string;
}

/**
 * Hook for PDF generation functionality
 */
export function usePdfGeneration({ pdfSourceRef, formData, resumeId }: UsePdfGenerationParams) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const getResumeFileName = useCallback(() => {
    const currentMonthYear = dayjs().format('MMMM-YYYY').toLowerCase();
    const fullName = formData?.personalDetails?.items?.[0]?.fullName;
    const formattedName = fullName ? fullName.toLowerCase().replace(/\s+/g, '-') : 'resume';
    return `${formattedName}-${currentMonthYear}.pdf`;
  }, [formData]);

  const generatePDF = useCallback(async (): Promise<
    { downloadsLeft: number; downloadsAllowed: number; downloadsDone: number; referralUrl?: string } | undefined
  > => {
    setIsGeneratingPDF(true);

    try {
      // Wait for React to re-render
      await new Promise((resolve) => setTimeout(resolve, 100));

      const pdfSourceElement = pdfSourceRef.current;

      if (!pdfSourceElement) {
        throw new Error('PDF source element not found');
      }

      // Clone and remove measurement div so PDF contains only paginated pages
      const clone = pdfSourceElement.cloneNode(true) as HTMLDivElement;
      const measurementDiv = clone.querySelector('[data-resume-measurement="true"]');
      if (measurementDiv) measurementDiv.remove();

      const htmlContent = clone.innerHTML;

      if (!htmlContent || htmlContent.trim() === '') {
        throw new Error('No content available');
      }

      const filename = getResumeFileName();
      const downloadInfo = await generatePdfFromHtml(htmlContent, filename, resumeId);
      return downloadInfo;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [pdfSourceRef, getResumeFileName, resumeId]);

  return {
    isGeneratingPDF,
    generatePDF,
    resumeFileName: getResumeFileName(),
  };
}
