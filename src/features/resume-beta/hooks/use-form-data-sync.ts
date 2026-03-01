'use client';

import { useEffect } from 'react';
import { getResumeEmptyData, type ResumeData } from '@entities/resume';
import { deepMerge, normalizeStringsFields } from '@entities/resume/models/use-resume-data';
import { useAnalyzerStore } from '@shared/stores/analyzer-store';
import { useFormDataStore } from '@widgets/form-page-builder/models/store';
import { isSectionEmpty } from '@widgets/form-page-builder/lib/section-utils';

interface UseFormDataSyncParams {
  resumeId: string;
  resumeData: ResumeData | undefined;
}

export function useFormDataSync({ resumeId, resumeData }: UseFormDataSyncParams): void {
  const setFormData = useFormDataStore((s) => s.setFormData);
  const formData = useFormDataStore((s) => s.formData);
  const formDataResumeId = useFormDataStore((s) => s.formDataResumeId);
  const setIsCreateMode = useFormDataStore((s) => s.setIsCreateMode);
  const { analyzedData, resumeId: analyzerResumeId } = useAnalyzerStore();

  useEffect(() => {
    async function processAnalyzerData() {
      if (!resumeId || !analyzedData) return;

      const emptyData = await getResumeEmptyData();

      let processedData: Record<string, unknown> = { ...analyzedData };
      for (const key of Object.keys(emptyData)) {
        processedData[key] = deepMerge(processedData[key], (emptyData as Record<string, unknown>)[key]);
      }

      processedData = normalizeStringsFields(processedData);
      setFormData(processedData as Omit<ResumeData, 'templateId'>, resumeId);
    }

    if (!resumeId) {
      return;
    }

    if (analyzerResumeId === resumeId && analyzedData) {
      processAnalyzerData();
      return;
    }

    if (!resumeData) return;

    const isSameResume = formDataResumeId === resumeId;
    if (isSameResume) {
      const hasSuggestionsInData = (data: object) =>
        Object.values(data).some(
          (s) =>
            s !== null &&
            typeof s === 'object' &&
            'suggestedUpdates' in s &&
            Array.isArray((s as { suggestedUpdates?: unknown[] }).suggestedUpdates) &&
            ((s as { suggestedUpdates: unknown[] }).suggestedUpdates).length > 0,
        );

      if (formData && hasSuggestionsInData(formData) && !hasSuggestionsInData(resumeData)) {
        return;
      }
    }

    const sectionKeys = Object.keys(resumeData).filter(
      (key) => key !== 'templateId' && key !== 'updatedAt' && key !== 'template',
    );

    const allSectionsEmpty = sectionKeys.every((key) =>
      isSectionEmpty(resumeData[key as keyof typeof resumeData]),
    );

    if (allSectionsEmpty) {
      setIsCreateMode(true);
      setFormData(resumeData as Omit<ResumeData, 'templateId'>, resumeId);
    } else {
      setIsCreateMode(false);
      setFormData(resumeData as Omit<ResumeData, 'templateId'>, resumeId);
    }
  }, [resumeId, resumeData, analyzedData, analyzerResumeId, setFormData, formDataResumeId]);
}
