'use client';

import { createResume, updateResumeTemplate } from '@entities/resume';
import { type Template, useGetAllTemplates } from '@entities/template-page/api/template-data';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import { useMutation } from '@tanstack/react-query';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { TemplateCard } from '@widgets/templates-page/ui/template-card';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function DashboardCarousel() {
  const options: EmblaOptionsType = { loop: true, align: 'center' };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  const [_selectedIndex, setSelectedIndex] = useState(0);
  const user = useCachedUser();
  const router = useRouter();

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const updateTemplateMutation = useMutation({
    mutationFn: updateResumeTemplate,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const { data: templates } = useGetAllTemplates();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', () => onSelect(emblaApi));
  }, [emblaApi, onSelect]);

  const handleUseTemplate = async (templateId: string) => {
    trackEvent('create_resume_click', {
      source: 'dashboard_card',
      method: 'use_template',
      templateId,
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
        templateId,
      });

      router.push(`/resume/${data.id}`);
    } catch (error) {
      console.error('Failed to create resume:', error);
    }
  };

  return (
    <>
      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div>
            <h2 className="font-normal text-base">Choose ATS friendly templates</h2>

            <p className="text-[rgb(149,157,168)] font-normal text-xs mt-1">
              Videos to help you avoid mistakes, boost scores, and land more interviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-blue-500 shadow-md flex items-center justify-center text-white hover:bg-blue-600 transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex my-6 gap-4">
            {templates?.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isDashboard={true}
                onClick={() => handleUseTemplate(template.id)}
                onPreviewClick={() => {
                  setPreviewTemplate(template);
                  setIsPreviewOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <PreviewModal template={previewTemplate} isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </>
  );
}
