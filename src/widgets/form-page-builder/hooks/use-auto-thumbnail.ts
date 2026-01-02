import { useEffect, useRef } from "react";
import type { ResumeData } from "@entities/resume";

interface UseAutoThumbnailParams {
  resumeId?: string;
  formData: Omit<ResumeData, "templateId"> | null | undefined;
  generateAndSaveThumbnail: () => Promise<void>;
  intervalMs?: number;
}

/**
 * Generates thumbnail once on page mount when formData is available,
 * and then every intervalMs (default 25s) thereafter.
 */
export function useAutoThumbnail({
  resumeId,
  formData,
  generateAndSaveThumbnail,
  intervalMs = 25000,
}: UseAutoThumbnailParams) {
  const lastResumeIdRef = useRef<string | null>(null);
  const hasFormData = formData && Object.keys(formData).length > 0;

  // Generate on mount (when resumeId changes or first load)
  useEffect(() => {
    if (!resumeId || !hasFormData) return;

    // Only generate on mount if this is a new resume
    if (lastResumeIdRef.current !== resumeId) {
      lastResumeIdRef.current = resumeId;
      const timeoutId = setTimeout(generateAndSaveThumbnail, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [resumeId, hasFormData, generateAndSaveThumbnail]);

  // Generate every intervalMs
  useEffect(() => {
    if (!resumeId || !hasFormData) return;

    const intervalId = setInterval(generateAndSaveThumbnail, intervalMs);
    return () => clearInterval(intervalId);
  }, [resumeId, hasFormData, generateAndSaveThumbnail, intervalMs]);
}
