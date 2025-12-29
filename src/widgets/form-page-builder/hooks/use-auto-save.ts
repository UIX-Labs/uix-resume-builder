import { useEffect, useRef } from "react";
import { useFormDataStore } from "../models/store";
import { isSectionModified } from "../lib/data-cleanup";
import mockData from "../../../../mock-data.json";
import type { ResumeData, ResumeDataKey } from "@entities/resume";
import dayjs from "dayjs";

interface UseAutoSaveParams {
  currentStep: string;
  formData: Omit<ResumeData, "templateId"> | null | undefined;
  save: (params: { type: string; data: any; updatedAt: number }) => void;
  onSaveComplete?: () => void;
  debounceMs?: number;
}

/**
 * Simple auto-save hook that saves the current section after a period of inactivity.
 */
export function useAutoSave({
  currentStep,
  formData,
  save,
  onSaveComplete,
  debounceMs = 25000,
}: UseAutoSaveParams) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>("");

  useEffect(() => {
    // Skip if no data
    if (!currentStep || !formData) return;

    const sectionData = formData[currentStep as ResumeDataKey];
    if (!sectionData) return;

    // Skip if data unchanged
    const dataString = JSON.stringify(sectionData);
    if (dataString === lastSavedRef.current) return;

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      // Get fresh data from store
      const freshData = useFormDataStore.getState().formData;
      const freshSectionData = freshData[currentStep as ResumeDataKey];

      if (!freshSectionData) return;

      // Skip if not modified from mock data
      if (!isSectionModified(currentStep, freshData, mockData)) {
        lastSavedRef.current = JSON.stringify(freshSectionData);
        return;
      }

      // Save
      save({
        type: currentStep,
        data: freshSectionData,
        updatedAt: dayjs().valueOf(),
      });

      lastSavedRef.current = JSON.stringify(freshSectionData);
      onSaveComplete?.();
    }, debounceMs);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentStep, formData, save, onSaveComplete, debounceMs]);
}
