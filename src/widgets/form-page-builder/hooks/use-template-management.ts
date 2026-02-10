import { useUpdateResumeTemplate } from '@entities/resume';
import type { Template } from '@entities/template-page/api/template-data';
import enzoTemplate1 from '@features/resume/templates/enzo-template1';
import { default as standardTemplate } from '@features/resume/templates/standard';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import aniketTemplate from '@features/resume/templates/standard';
import template7 from '@features/resume/templates/template-7';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UseTemplateManagementParams {
  resumeId: string;
  initialTemplate?: unknown;
  initialTemplateId?: string | null;
}

export function useTemplateManagement({ resumeId, initialTemplate, initialTemplateId }: UseTemplateManagementParams) {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(initialTemplate ?? standardTemplate);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(initialTemplateId ?? null);

  const { mutateAsync: updateResumeTemplateMutation } = useUpdateResumeTemplate();

  //  useEffect(() => {
  //   if (initialTemplate) {
  //     setSelectedTemplate(initialTemplate);
  //   }
  // }, [initialTemplate]);

  // useEffect(() => {
  //   if (initialTemplateId) {
  //     setSelectedTemplateId(initialTemplateId);
  //   }
  // }, [initialTemplateId]);

  const handleTemplateSelect = async (template: Template) => {
    try {
      await updateResumeTemplateMutation({
        resumeId: resumeId,
        templateId: template.id,
      });
      setSelectedTemplate(template.json);
      setSelectedTemplateId(template.id);

      toast.success('Template updated successfully');

      trackEvent('template_selected', {
        templateId: template.id,
        resumeId,
      });
    } catch (error) {
      console.error('Failed to update template:', error);
      toast.error('Failed to update template');
    }
  };

  return {
    selectedTemplate,
    selectedTemplateId,
    handleTemplateSelect,
  };
}
