import { useState, useEffect } from 'react';
import { useUpdateResumeTemplate } from '@entities/resume';
import type { Template } from '@entities/template-page/api/template-data';
import { toast } from 'sonner';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import aniketTemplate from '@features/resume/templates/standard';
import brianWayneTemplate from '@features/resume/templates/template4';
import template5 from '@features/resume/templates/template5';
import template7 from '@features/resume/templates/template-7';
import template8 from '@features/resume/templates/template8';
import enzoTemplate1 from '@features/resume/templates/enzo-template1';
import template10 from '@features/resume/templates/template10';
import template13 from '@features/resume/templates/template13';
import enzoTemplate2 from '@features/resume/templates/enzo-template2';
import enjiTemplate from '@features/resume/templates/eren-templete1';
import laurenChenTemplate from '@features/resume/templates/eren-templete2';
import erenTemplate3 from '@features/resume/templates/eren-templete-3';
import aniketTemplate1 from '@features/resume/templates/aniket';
import aniketTemplate2 from '@features/resume/templates/template1';
import annaFieldTemplate from '@features/resume/templates/template3';
import template11 from '@features/resume/templates/template11';

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
    if (initialTemplate) {
      setSelectedTemplate(erenTemplate3);
    }
  }, [initialTemplate]);

  useEffect(() => {
    if (initialTemplateId) {
      setSelectedTemplateId(initialTemplateId);
    }
  }, [initialTemplateId]);

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
