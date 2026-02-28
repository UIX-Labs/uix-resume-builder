'use client';

import { useCallback } from 'react';
import { useResumeStore } from '../stores/resume-store';
import { useUpdateResumeTemplate } from '@entities/resume/models/queries';
import { getTemplate, getAllTemplates } from '../templates/registry';

/**
 * Switches the active template and persists the choice to the API.
 */
export function useTemplateSwitch() {
  const templateId = useResumeStore((s) => s.templateId);
  const resumeId = useResumeStore((s) => s.resumeId);
  const setTemplateId = useResumeStore((s) => s.setTemplateId);
  const updateMutation = useUpdateResumeTemplate();

  const switchTemplate = useCallback(
    (newId: string) => {
      if (newId === templateId) return;
      setTemplateId(newId);

      if (resumeId) {
        updateMutation.mutate({ resumeId, templateId: newId });
      }
    },
    [templateId, resumeId, setTemplateId, updateMutation],
  );

  const currentTemplate = getTemplate(templateId);
  const allTemplates = getAllTemplates();

  return { switchTemplate, currentTemplate, allTemplates, templateId };
}
