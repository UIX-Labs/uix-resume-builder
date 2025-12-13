import { useRef, useState, useCallback } from "react";
import { generatePdfFromHtml } from "../lib/pdf-helpers";
import dayjs from "dayjs";
import type { ResumeData } from "@entities/resume";

interface UsePdfGenerationParams {
  thumbnailRef: React.RefObject<HTMLDivElement | null>;
  formData: Omit<ResumeData, "templateId"> | null | undefined;
  resumeId?: string;
}

/**
 * Hook for PDF generation functionality
 */
export function usePdfGeneration({
  thumbnailRef,
  formData,
  resumeId,
}: UsePdfGenerationParams) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const getResumeFileName = useCallback(() => {
    const currentMonthYear = dayjs().format("MMMM-YYYY").toLowerCase();
    const fullName = formData?.personalDetails?.items?.[0]?.fullName;
    const formattedName = fullName
      ? fullName.toLowerCase().replace(/\s+/g, "-")
      : "resume";
    return `${formattedName}-${currentMonthYear}.pdf`;
  }, [formData]);

  const generatePDF = useCallback(async () => {
    setIsGeneratingPDF(true);

    try {
      // Wait for React to re-render
      await new Promise((resolve) => setTimeout(resolve, 100));

      const pdfSourceElement = thumbnailRef.current;

      if (!pdfSourceElement) {
        throw new Error("PDF source element not found");
      }

      const htmlContent = pdfSourceElement.innerHTML;

      if (!htmlContent || htmlContent.trim() === "") {
        throw new Error("No content available");
      }

      const filename = getResumeFileName();
      await generatePdfFromHtml(htmlContent, filename, resumeId);
    } catch (error) {
      console.error("PDF generation error:", error);
      throw error;
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [thumbnailRef, getResumeFileName, resumeId]);

  return {
    isGeneratingPDF,
    generatePDF,
    resumeFileName: getResumeFileName(),
  };
}

