import { useCallback } from "react";
import { toast } from "sonner";
import { trackEvent } from "@shared/lib/analytics/Mixpanel";
import { isSectionModified } from "../lib/data-cleanup";
import { saveSectionWithSuggestions } from "../lib/save-helpers";
import mockData from "../../../../mock-data.json";
import type { ResumeData } from "@entities/resume";

interface UseSaveAndNextParams {
  currentStep: string;
  formData: Omit<ResumeData, "templateId"> | null | undefined;
  resumeData?: Omit<ResumeData, "templateId"> | null;
  save: (params: { type: string; data: any; updatedAt: number }) => void;
  resumeId: string;
  navs: Array<{ name: string }>;
  nextStepIndex: number;
  setCurrentStep: (step: string) => void;
  onThumbnailInvalidate?: () => void;
  generateAndSaveThumbnail?: () => Promise<void>;
}

export function useSaveAndNext({
  currentStep,
  formData,
  resumeData,
  save,
  resumeId,
  navs,
  nextStepIndex,
  setCurrentStep,
  onThumbnailInvalidate,
  generateAndSaveThumbnail,
}: UseSaveAndNextParams) {
  const handleSaveResume = useCallback(async () => {
    try {
      if (!formData) {
        toast.info(`No data to save`);
        return;
      }

      // Check if current section has been modified compared to mock data
      const hasModifications = isSectionModified(
        currentStep,
        formData as Record<string, unknown>,
        mockData
      );

      if (!hasModifications) {
        toast.info(`No changes to save in ${currentStep}`);
        return;
      }

      onThumbnailInvalidate?.();

      // Save current section + any other modified sections
      await saveSectionWithSuggestions(
        currentStep,
        formData!,
        save,
        resumeData as Omit<ResumeData, "templateId"> | undefined
      );

      if (generateAndSaveThumbnail) {
        await generateAndSaveThumbnail();
      }

      toast.success(`Resume saved successfully`);

      trackEvent("resume_saved", {
        resumeId,
        section: currentStep,
        autoSave: false,
      });
    } catch {
      toast.error("Failed to save resume");
    }
  }, [
    currentStep,
    formData,
    resumeData,
    save,
    resumeId,
    onThumbnailInvalidate,
    generateAndSaveThumbnail,
  ]);

  const handleNextStep = useCallback(async () => {
    try {
      if (formData) {
        // Check if current section has been modified compared to mock data
        const hasModifications = isSectionModified(
          currentStep,
          formData as Record<string, unknown>,
          mockData
        );

        if (hasModifications) {
          onThumbnailInvalidate?.();

          // Save current section + any other modified sections
          await saveSectionWithSuggestions(
            currentStep,
            formData,
            save,
            resumeData as Omit<ResumeData, "templateId"> | undefined
          );

          // Generate thumbnail after saving
          if (generateAndSaveThumbnail) {
            await generateAndSaveThumbnail();
          }
        }
      }
    } catch (error) {
      console.error("Failed to save before moving to next step:", error);
      toast.error("Failed to save changes");
      return;
    }

    setCurrentStep(navs[nextStepIndex]?.name ?? "");
  }, [
    currentStep,
    formData,
    resumeData,
    save,
    navs,
    nextStepIndex,
    setCurrentStep,
    onThumbnailInvalidate,
    generateAndSaveThumbnail,
  ]);

  return {
    handleSaveResume,
    handleNextStep,
  };
}
