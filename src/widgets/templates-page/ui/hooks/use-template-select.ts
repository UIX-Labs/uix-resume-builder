'use client';

import { createResume, updateResumeTemplate } from '@entities/resume';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface UseTemplateOptions {
  source?: string;
  method?: string;
}

export function useUseTemplate() {
  const router = useRouter();
  const user = useCachedUser();

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const updateTemplateMutation = useMutation({
    mutationFn: updateResumeTemplate,
  });

  const isLoading = createResumeMutation.isPending || updateTemplateMutation.isPending;

  const handleUseTemplate = async (templateId: string, options?: UseTemplateOptions) => {
    if (!user) {
      // Store the intent to create a resume with this template
      if (typeof window !== 'undefined') {
        localStorage.setItem('pendingTemplateId', templateId);
      }
      router.push('/auth');
      return;
    }

    try {
      // Track the event if options are provided
      if (options?.source) {
        trackEvent('create_resume_click', {
          source: options.source,
          method: options.method || 'use_template',
          templateId,
        });
      }

      // Create a new resume
      const data = await createResumeMutation.mutateAsync({
        title: 'New Resume',
        userInfo: {
          userId: user.id,
        },
      });

      // Update the resume with the selected template
      await updateTemplateMutation.mutateAsync({
        resumeId: data.id,
        templateId,
      });

      // Navigate to the resume editor
      router.push(`/resume/${data.id}`);
    } catch (error) {
      console.error('Failed to create resume with template:', error);
      throw error;
    }
  };

  return {
    handleUseTemplate,
    isLoading,
  };
}
