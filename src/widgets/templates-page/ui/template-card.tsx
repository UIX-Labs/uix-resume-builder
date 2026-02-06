'use client';

import { createResume, updateResumeTemplate } from '@entities/resume';
import { type Template } from '@entities/template-page/api/template-data';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { cn } from '@shared/lib/cn';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import { Button } from '@shared/ui/components/button';
import { PreviewButton } from '@shared/ui/components/preview-button';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface TemplateCardProps {
  template: Template;
  onClick?: () => void;
  isDashboard?: boolean;
  onPreviewClick?: () => void;
}

export function TemplateCard({ template, onClick, isDashboard = false, onPreviewClick }: TemplateCardProps) {
  const user = useCachedUser();
  const router = useRouter();

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const updateTemplateMutation = useMutation({
    mutationFn: updateResumeTemplate,
  });

  const handleDefaultClick = async () => {
    trackEvent('create_resume_click', {
      source: isDashboard ? 'dashboard_card' : 'template_card',
      method: 'use_template',
      templateId: template.id,
    });

    // biome-ignore lint/correctness/noUnusedVariables: guestEmail is used to ensure localStorage has guest email for API calls
    let guestEmail: string | undefined;

    if (!user?.isLoggedIn) {
      guestEmail = getOrCreateGuestEmail();
    } else if (!user) {
      return;
    }

    try {
      const data = await createResumeMutation.mutateAsync({
        title: 'New Resume',
        userInfo: {
          userId: user?.id ?? '',
        },
      });

      await updateTemplateMutation.mutateAsync({
        resumeId: data.id,
        templateId: template.id,
      });

      router.push(`/resume/${data.id}`);
    } catch (error) {
      console.error('Failed to create resume:', error);
    }
  };

  return (
    <div
      className={cn(
        'group cursor-pointer rounded-lg transition-all duration-200 flex-shrink-0 hover:shadow-lg',
        isDashboard ? 'w-[380px] h-[547px]' : 'w-[260px] h-[360px]',
      )}
    >
      <div
        className={cn(
          'relative glass-card2 border-0 p-4 rounded-[20px]',
          isDashboard ? 'w-[380px] h-[547px]' : 'w-[260px] h-[360px]',
        )}
      >
        <div className="w-full h-full relative">
          <Image
            src={template.publicImageUrl}
            alt={`Template ${template.id}`}
            fill
            className="object-fit rounded-[20px]"
            unoptimized
          />
        </div>

        {/* Eye Icon - Preview Button */}
        <PreviewButton onClick={() => onPreviewClick?.()} />

        <div className="absolute inset-0 flex items-end justify-center pb-9 gap-2 transition-colors duration-500">
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              'cursor-pointer transform transition-all duration-500 ease-out translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
              'bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-[rgb(242,242,242)] border  border-gray-400 shadow-sm px-7 py-3 h-12 text-lg font-semibold rounded-xl',
            )}
            onClick={onClick ?? handleDefaultClick}
          >
            Use This Template
          </Button>
        </div>
      </div>
    </div>
  );
}
