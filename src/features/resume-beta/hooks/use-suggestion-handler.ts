'use client';

import { useCallback, useState } from 'react';
import type { ResumeDataKey, SuggestedUpdate, SuggestionType } from '@entities/resume';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import {
  applySuggestionsToArrayField,
  applySuggestionsToFieldValue,
  findItemById,
  removeAppliedSuggestions,
  updateItemFieldValue,
} from '@widgets/form-page-builder/lib/suggestion-helpers';
import { invalidateQueriesIfAllSuggestionsApplied } from '@widgets/form-page-builder/lib/query-invalidation';
import type { SuggestionClickParams } from '@widgets/form-page-builder/hooks/use-suggestion-click-handler';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SECTION_TO_FORM_DATA_MAP } from '../lib/section-map';
import type { AnalyzerModalData } from '../models/types';
import type { ResumeFormData, AnySection } from '../models/resume-sections';

/** Safely access a section from formData by a dynamic key */
function getSectionByKey(formData: ResumeFormData, key: string): AnySection | undefined {
  return (formData as unknown as Record<string, AnySection | undefined>)[key];
}

interface UseSuggestionHandlerParams {
  formData: ResumeFormData;
  currentStep: ResumeDataKey;
  resumeId: string;
  setFormData: (data: ResumeFormData) => void;
}

export function useSuggestionHandler({ formData, currentStep, resumeId, setFormData }: UseSuggestionHandlerParams) {
  const queryClient = useQueryClient();
  const [analyzerModalOpen, setAnalyzerModalOpen] = useState(false);
  const [analyzerModalData, setAnalyzerModalData] = useState<AnalyzerModalData | null>(null);

  const hasSuggestions = Boolean(
    formData &&
      Object.values(formData).some((section) => {
        if (section && typeof section === 'object' && 'suggestedUpdates' in section) {
          const suggestedUpdates = (section as { suggestedUpdates?: unknown[] }).suggestedUpdates;
          return Array.isArray(suggestedUpdates) && suggestedUpdates.length > 0;
        }
        return false;
      }),
  );

  const handleOpenAnalyzerModal = useCallback(
    (itemId: string, fieldName: string, suggestionType: SuggestionType) => {
      const currentData = formData?.[currentStep];

      if (!currentData || !currentData.suggestedUpdates) {
        return;
      }

      const itemUpdate = currentData.suggestedUpdates.find((update: SuggestedUpdate) => update.itemId === itemId);

      if (!itemUpdate || !itemUpdate.fields[fieldName]) {
        return;
      }

      const fieldData = itemUpdate.fields[fieldName];
      const suggestions =
        fieldData.suggestedUpdates?.filter(
          (s: { old?: string; new: string; type: SuggestionType }) => s.type === suggestionType,
        ) || [];

      setAnalyzerModalData({
        suggestions,
        fieldName,
        itemId,
        suggestionType,
        formDataSectionKey: currentStep,
      });
      setAnalyzerModalOpen(true);

      trackEvent('builder_intelligence_viewed', {
        resumeId,
        section: currentStep,
        field: fieldName,
        suggestionType,
        suggestionCount: suggestions.length,
      });
    },
    [formData, currentStep, resumeId],
  );

  const handleSuggestionClickFromDOM = useCallback(
    ({ sectionId, itemId, fieldName, suggestionType }: SuggestionClickParams) => {
      const formDataSectionKey = SECTION_TO_FORM_DATA_MAP[sectionId.toLowerCase()] || sectionId;

      const sectionData = getSectionByKey(formData, formDataSectionKey);

      if (!sectionData || !sectionData.suggestedUpdates) {
        return;
      }

      const itemUpdate = sectionData.suggestedUpdates.find((update: SuggestedUpdate) => update.itemId === itemId);

      if (!itemUpdate || !itemUpdate.fields[fieldName]) {
        return;
      }

      const fieldData = itemUpdate.fields[fieldName];

      const suggestions =
        fieldData.suggestedUpdates?.filter(
          (s: { old?: string; new: string; type: SuggestionType }) => s.type === suggestionType,
        ) || [];

      if (suggestions.length === 0) {
        return;
      }

      setAnalyzerModalData({
        suggestions,
        fieldName,
        itemId,
        suggestionType: suggestionType as SuggestionType,
        formDataSectionKey,
      });
      setAnalyzerModalOpen(true);

      trackEvent('builder_intelligence_viewed', {
        resumeId,
        section: formDataSectionKey,
        field: fieldName,
        suggestionType,
        suggestionCount: suggestions.length,
      });
    },
    [formData, resumeId],
  );

  const handleApplySuggestions = useCallback(
    async (
      selectedSuggestions: Array<{
        old?: string;
        new: string;
        type: SuggestionType;
      }>,
    ) => {
      if (!analyzerModalData) return;

      const { itemId, fieldName, formDataSectionKey } = analyzerModalData;
      const sectionKey = formDataSectionKey || currentStep;
      const currentData = getSectionByKey(formData, sectionKey);

      if (!currentData || !currentData.items || !Array.isArray(currentData.items)) {
        toast.error('Failed to apply suggestions');
        return;
      }

      try {
        const items = currentData.items;
        const itemIndex = findItemById(items, itemId);

        if (itemIndex === -1) {
          toast.error('Item not found');
          return;
        }

        const currentItem = items[itemIndex];
        if (typeof currentItem !== 'object' || currentItem === null) {
          toast.error('Invalid item type');
          return;
        }

        const currentFieldValue = (currentItem as unknown as Record<string, unknown>)[fieldName];

        const isArrayField = Array.isArray(currentFieldValue);

        let updatedFieldValue: string | string[];

        if (isArrayField) {
          updatedFieldValue = applySuggestionsToArrayField(currentFieldValue as string[], selectedSuggestions);
        } else {
          updatedFieldValue = applySuggestionsToFieldValue(currentFieldValue as string, selectedSuggestions);
        }

        const hasChanged = isArrayField
          ? JSON.stringify(updatedFieldValue) !== JSON.stringify(currentFieldValue)
          : updatedFieldValue !== currentFieldValue;

        if (!hasChanged) {
          toast.error('Suggestions could not be applied');
          return;
        }

        const updatedItems = updateItemFieldValue(items, itemIndex, fieldName, updatedFieldValue);

        const updatedSuggestedUpdates = removeAppliedSuggestions(
          currentData.suggestedUpdates,
          itemId,
          fieldName,
          selectedSuggestions,
        );

        trackEvent('builder_intelligence_applied', {
          resumeId,
          section: sectionKey,
          field: fieldName,
          suggestionType: analyzerModalData.suggestionType,
          count: selectedSuggestions.length,
        });

        const updatedData = {
          ...formData,
          [sectionKey]: {
            ...currentData,
            items: updatedItems,
            suggestedUpdates:
              updatedSuggestedUpdates && updatedSuggestedUpdates.length > 0 ? updatedSuggestedUpdates : undefined,
          },
        };

        setFormData(updatedData as ResumeFormData);

        invalidateQueriesIfAllSuggestionsApplied(queryClient, updatedData, resumeId);

        toast.success('Suggestions applied successfully.');
        setAnalyzerModalOpen(false);
      } catch (error) {
        console.error('Failed to apply suggestions:', error);
        toast.error('Failed to apply suggestions');
      }
    },
    [analyzerModalData, formData, resumeId, queryClient, setFormData, currentStep],
  );

  return {
    analyzerModalOpen,
    setAnalyzerModalOpen,
    analyzerModalData,
    hasSuggestions,
    handleOpenAnalyzerModal,
    handleSuggestionClickFromDOM,
    handleApplySuggestions,
  };
}
