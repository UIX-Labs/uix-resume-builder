import { useEffect, useCallback, useRef } from "react";
import { useFormDataStore } from "../models/store";
import { isSectionModified } from "../lib/data-cleanup";
import mockData from "../../../../mock-data.json";
import type { ResumeData, ResumeDataKey } from "@entities/resume";
import { debounce } from "@shared/lib/utils";

interface UseAutoSaveParams {
  currentStep: string;
  formData: Omit<ResumeData, "templateId"> | null | undefined;
  save: (params: { type: string; data: any; updatedAt: number }) => void;
  onSaveComplete?: () => void;
  debounceMs?: number;
}

export function useAutoSave({
  currentStep,
  formData,
  save,
  onSaveComplete,
  debounceMs = 25000,
}: UseAutoSaveParams) {
  const lastSaveTimeRef = useRef<number>(Date.now());

  // Debounced auto-save function
  const debouncedAutoSave = useCallback(
    debounce(async (step: string, data: any) => {
      try {
        // Get fresh formData from store instead of using stale closure
        const currentFormData = useFormDataStore.getState().formData;

        // Check if section has been modified compared to mock data
        const hasModifications = isSectionModified(
          step,
          currentFormData,
          mockData
        );

        if (!hasModifications) {
          return;
        }

        save({
          type: step,
          data: data,
          updatedAt: Date.now(),
        });

        lastSaveTimeRef.current = Date.now();
        onSaveComplete?.();
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, debounceMs),
    [save, debounceMs, onSaveComplete]
  );

  // Auto-save effect - triggers when formData changes
  useEffect(() => {
    if (!currentStep || !formData || !formData[currentStep as ResumeDataKey]) {
      return;
    }

    // Trigger auto-save after specified delay of inactivity
    debouncedAutoSave(currentStep, formData[currentStep as ResumeDataKey]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, currentStep]);

  return {
    lastSaveTime: lastSaveTimeRef.current,
  };
}
