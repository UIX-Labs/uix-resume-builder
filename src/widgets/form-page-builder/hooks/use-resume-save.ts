import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useFormDataStore } from '../models/store';
import { saveSectionWithSuggestions } from '../lib/save-helpers';
import { invalidateQueriesIfAllSuggestionsApplied } from '../lib/query-invalidation';
import { isSectionModified } from '../lib/data-cleanup';
import mockData from '../../../../mock-data.json';

interface UseResumeSaveParams {
  resumeId: string;
  currentStep: string;
  save: (params: { type: string; data: any; updatedAt: number }) => Promise<void>;
  onSuccess?: () => void;
}

/**
 * Hook for handling resume save operations with suggestion preservation
 */
export function useResumeSave({ resumeId, currentStep, save, onSuccess }: UseResumeSaveParams) {
  const queryClient = useQueryClient();

  const saveCurrentSection = useCallback(async () => {
    const formData = useFormDataStore.getState().formData;

    // Check if current section has been modified compared to mock data
    const hasModifications = isSectionModified(currentStep, formData, mockData);

    if (!hasModifications) {
      return false;
    }

    // Save current section and all sections with suggestions
    await saveSectionWithSuggestions(currentStep, formData, save);

    // Get fresh formData after save to check suggestion state
    const updatedFormData = useFormDataStore.getState().formData;
    invalidateQueriesIfAllSuggestionsApplied(queryClient, updatedFormData, resumeId);

    onSuccess?.();
    return true;
  }, [resumeId, currentStep, save, queryClient, onSuccess]);

  return { saveCurrentSection };
}
