import { useEffect } from "react";
import type { ResumeData } from "@entities/resume";

interface UseAutoThumbnailParams {
  resumeId?: string;
  formData: Omit<ResumeData, "templateId"> | null | undefined;
  generateAndSaveThumbnail: () => Promise<void>;
  intervalMs?: number;
}

export function useAutoThumbnail({
  resumeId,
  formData,
  generateAndSaveThumbnail,
  intervalMs = 25000,
}: UseAutoThumbnailParams) {
  useEffect(() => {
    if (!resumeId) {
      return;
    }

    const intervalId = setInterval(() => {
      if (formData && Object.keys(formData).length > 0) {
        generateAndSaveThumbnail();
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [resumeId, formData, generateAndSaveThumbnail, intervalMs]);
}
