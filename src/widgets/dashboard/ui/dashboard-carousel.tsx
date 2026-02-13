'use client';

import { type Template, useGetAllTemplates } from '@entities/template-page/api/template-data';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { TemplateCard } from '@widgets/templates-page/ui/template-card';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createResume, updateResumeTemplate } from '@entities/resume';
import { useUserProfile } from '@shared/hooks/use-user';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import { NewProgressBar } from '@shared/ui/components/new-progress-bar';
import ResumeCreationModal from './resume-creation-modal';
import { LinkedInModal } from './linkedin-integration-card';
import JDUploadMobileModal from './jd-upload-mobile-modal';
import { useJDModal } from '@entities/jd-modal-mobile/hooks/use-jd-modal';

export default function DashboardCarousel() {
  const router = useRouter();
  const { data: user } = useUserProfile();
  const isMobile = useIsMobile();

  const options: EmblaOptionsType = { loop: true, align: 'center', containScroll: 'trimSnaps' };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  const [_selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const { data: templates } = useGetAllTemplates();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [creationTemplate, setCreationTemplate] = useState<Template | null>(null);
  const [activeAction, setActiveAction] = useState<'create' | 'upload' | 'tailoredResume' | 'tailoredJD' | null>(null);
  const [optionsLocked, setOptionsLocked] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const updateTemplateMutation = useMutation({
    mutationFn: updateResumeTemplate,
  });

  const [showScanningOverlay, setShowScanningOverlay] = useState(false);

  const lockOptions = (action: 'create' | 'upload' | 'tailoredJD') => {
    setActiveAction(action);
    setOptionsLocked(true);
  };

  const releaseOptions = () => {
    setActiveAction(null);
    setOptionsLocked(false);
  };

  const { isJDModalOpen, handleJDModalOpen, handleJDModalClose, handleJDSubmittingChange } = useJDModal({
    onRelease: releaseOptions,
  });

  const handleMobileUseTemplate = (template: Template) => {
    setCreationTemplate(template);
    setIsCreationModalOpen(true);
  };

  const handleTemplateSelect = async (templateId: string) => {
    try {
      setShowScanningOverlay(true);

      // biome-ignore lint/correctness/noUnusedVariables: guestEmail is used to ensure localStorage has guest email for API calls
      let guestEmail: string | undefined;

      if (!user?.isLoggedIn) {
        guestEmail = getOrCreateGuestEmail();
      } else if (!user) {
        setShowScanningOverlay(false);
        return;
      }

      const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const userName = user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Guest User';
      const title = `${userName}-Resume-${currentDate}`;

      const data = await createResumeMutation.mutateAsync({
        title,
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
      setShowScanningOverlay(false);
    }
  };

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', () => onSelect(emblaApi));
  }, [emblaApi, onSelect]);

  return (
    <>
      <NewProgressBar
        isVisible={showScanningOverlay}
        showSpinner={true}
        spinnerTitle="Creating Resume..."
        spinnerSubtitle="Setting up your workspace"
      />
      <div className="relative w-full h-full mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1">
            <h2 className="font-normal text-sm sm:text-base">Choose ATS friendly templates</h2>

            <p className="text-[rgb(149,157,168)] font-normal text-xs mt-1">
              Videos to help you avoid mistakes, boost scores, and land more interviews.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 shadow-md flex items-center justify-center text-white hover:bg-blue-600 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex my-4 sm:my-6 gap-2 sm:gap-4 items-center">
            {templates?.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onClick={() => (isMobile ? handleMobileUseTemplate(template) : handleTemplateSelect(template.id))}
                isDashboard={true}
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

      <ResumeCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onJDModalOpen={handleJDModalOpen}
        onLinkedInClick={() => setIsLinkedInModalOpen(true)}
        onActionLock={lockOptions}
        onActionRelease={releaseOptions}
        activeAction={activeAction}
        optionsLocked={optionsLocked}
        template={creationTemplate}
      />
      <LinkedInModal isOpen={isLinkedInModalOpen} onClose={() => setIsLinkedInModalOpen(false)} />

      <JDUploadMobileModal
        isOpen={isJDModalOpen}
        onClose={handleJDModalClose}
        onSubmittingChange={handleJDSubmittingChange}
      />
    </>
  );
}
