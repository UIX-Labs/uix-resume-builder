import { useState, useEffect, useMemo } from "react";
import { useUpdateResumeTemplate } from "@entities/resume";
import type { Template } from "@entities/template-page/api/template-data";
import { useGetTemplateById } from "@entities/template-page/api/template-data";
import { toast } from "sonner";
import { trackEvent } from "@shared/lib/analytics/Mixpanel";
import aniketTemplate from "@features/resume/templates/standard";

interface UseTemplateManagementParams {
  resumeId: string;
  initialTemplate?: any;
  initialTemplateId?: string;
}

export function useTemplateManagement({
  resumeId,
  initialTemplate,
  initialTemplateId,
}: UseTemplateManagementParams) {
  // Store only the template ID - the single source of truth
  const [templateId, setTemplateId] = useState<string | null>(
    initialTemplateId ?? null
  );

  const { mutateAsync: updateResumeTemplateMutation } =
    useUpdateResumeTemplate();

  // Only fetch template if we have an ID but don't have initial template JSON
  const shouldFetchTemplate = templateId && !initialTemplate;
  const { data: templateData } = useGetTemplateById(
    shouldFetchTemplate ? templateId : null
  );

  // Derive template JSON: use fetched data if available, otherwise fall back to initial or default
  const selectedTemplate = useMemo(() => {
    return templateData?.json ?? initialTemplate ?? aniketTemplate;
  }, [templateData?.json, initialTemplate]);

  useEffect(() => {
    if (initialTemplateId) {
      setTemplateId(initialTemplateId);
    }
  }, [initialTemplateId]);

  const handleTemplateSelect = async (template: Template) => {
    try {
      await updateResumeTemplateMutation({
        resumeId: resumeId,
        templateId: template.id,
      });
      setTemplateId(template.id);

      toast.success("Template updated successfully");

      trackEvent("template_selected", {
        templateId: template.id,
        resumeId,
      });
    } catch (error) {
      console.error("Failed to update template:", error);
      toast.error("Failed to update template");
    }
  };

  return {
    selectedTemplate,
    selectedTemplateId: templateId,
    handleTemplateSelect,
  };
}
