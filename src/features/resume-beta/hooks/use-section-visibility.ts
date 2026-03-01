'use client';

import { useCallback } from 'react';
import type { ResumeData } from '@entities/resume';
import { debounce } from '@shared/lib/utils';
import { toast } from 'sonner';

interface UseSectionVisibilityParams {
  formData: Omit<ResumeData, 'templateId'>;
  resumeId: string;
  setFormData: (data: Omit<ResumeData, 'templateId'>) => void;
  save: (params: { type: string; data: any; updatedAt: number }) => void;
}

export function useSectionVisibility({
  formData,
  resumeId,
  setFormData,
  save,
}: UseSectionVisibilityParams) {
  const debouncedHideSave = useCallback(
    debounce((sectionId: string, data: any) => {
      try {
        save({
          type: sectionId,
          data: data,
          updatedAt: Date.now(),
        });
      } catch (error) {
        console.error('Failed to save section visibility:', error);
        toast.error('Failed to update section visibility');
      }
    }, 1000),
    [save],
  );

  const handleToggleHideSection = useCallback(
    (sectionId: string, isHidden: boolean) => {
      const sectionData = formData[sectionId as keyof typeof formData];
      if (sectionData && typeof sectionData === 'object') {
        const updatedSectionData = {
          ...(sectionData as Record<string, unknown>),
          isHidden,
        };

        setFormData(
          {
            ...formData,
            [sectionId]: updatedSectionData,
          } as Omit<ResumeData, 'templateId'>,
        );

        debouncedHideSave(sectionId, updatedSectionData);

        toast.success(isHidden ? `Section hidden from resume` : `Section visible in resume`);
      }
    },
    [formData, debouncedHideSave, setFormData, resumeId],
  );

  return { handleToggleHideSection };
}
