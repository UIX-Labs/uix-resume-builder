import { useState, useEffect } from 'react';
import { useUpdateResumeTemplate } from '@entities/resume';
import type { Template } from '@entities/template-page/api/template-data';
import { toast } from 'sonner';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import aniketTemplate from '@features/resume/templates/standard';
import mohsinaTemplate4 from '@features/resume/templates/mohsina-template-4';
interface UseTemplateManagementParams {
  resumeId: string;
  initialTemplate?: any;
  initialTemplateId?: string;
}

export function useTemplateManagement({ resumeId, initialTemplate, initialTemplateId }: UseTemplateManagementParams) {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(initialTemplate ?? aniketTemplate);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(initialTemplateId ?? null);

  const { mutateAsync: updateResumeTemplateMutation } = useUpdateResumeTemplate();

  useEffect(() => {
    if (mohsinaTemplate4) {
      setSelectedTemplate(mohsinaTemplate4);
    }
  }, [mohsinaTemplate4]);

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
