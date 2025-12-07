'use client';

import { cn } from '@shared/lib/cn';
import { Button } from '@shared/ui/components/button';

import type { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCachedUser } from '@shared/hooks/use-user';
import { useGetAllTemplates, Template } from '@entities/template-page/api/template-data';
import { TemplatesDialog } from '@widgets/templates-page/ui/templates-dialog';
import { useMutation } from '@tanstack/react-query';
import { createResume, updateResumeTemplate } from '@entities/resume';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { MobileTextView } from './mobile-text-view';
import { trackEvent } from '@/shared/lib/analytics/percept';

export function TemplateCarousel() {
  const options: EmblaOptionsType = {
    loop: true,
    align: 'center',
    duration: 30,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 2000, stopOnInteraction: false })]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const user = useCachedUser();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [showMobileView, setShowMobileView] = useState(false);

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const updateTemplateMutation = useMutation({
    mutationFn: updateResumeTemplate,
  });

  const handleTemplateSelect = async (template: Template) => {
    trackEvent('create_resume_click', {
      source: 'landing_carousel',
      method: 'use_template',
      templateId: template.id
    });

    if (!user) {
      router.push('/auth');
      return;
    }

    try {
      const data = await createResumeMutation.mutateAsync({
        title: 'New Resume',
        userInfo: {
          userId: user.id,
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

  const handleMobileButtonClick = () => {
    if (isMobile) {
      setShowMobileView(true);
    }
  };

  const handleMobileTemplateClick = (template: Template) => {
    if (isMobile) {
      setShowMobileView(true);
    } else {
      handleTemplateSelect(template);
    }
  };

  const { data: templates } = useGetAllTemplates();

  // Limit templates to 3 on mobile, show all on desktop
  const displayTemplates = isMobile && templates ? templates.slice(0, 3) : templates;

  return (
    <div className="relative bg-[rgb(23,23,23)] text-white rounded-[24px] md:rounded-[36px] overflow-hidden min-h-[556px] m-2 md:m-4">
      <div className="absolute -left-[100px] md:-left-[150px] -top-[150px] md:-top-[214px] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-gradient-to-br from-[rgb(37,122,255)] via-[rgb(37,122,255)] to-[rgb(23,23,23)] blur-[100px]" />

      <div className="flex flex-col lg:flex-row lg:h-[556px] max-w-[1408px] mx-auto z-10">
        <div className="w-full lg:w-[498px] px-6 md:px-9 pt-8 lg:pt-0 flex flex-col justify-center">
          <div className="space-y-6 md:space-y-10">
            <div className="relative w-full lg:w-[498px] lg:h-[146px]">
              <h2 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[68px] font-semibold leading-[1.2] tracking-[-0.03em] text-[rgb(240,247,255)]">
                Pick A Resume
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-center mt-0 sm:mt-[-4px]">
                <h2 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[68px] font-semibold leading-[1.2] tracking-[-0.03em] text-[rgb(240,247,255)]">
                  Template
                </h2>

                <span className="text-base sm:text-lg md:text-xl font-semibold tracking-[-0.02em] text-[rgb(240,247,255)] w-auto sm:w-[199px] sm:ml-3 mt-1 sm:mt-0">
                  and build your resume in minutes!
                </span>
              </div>
            </div>

            {/* Desktop button - hidden on mobile */}
            <TemplatesDialog onTemplateSelect={handleTemplateSelect}>
              <Button
                variant="default"
                size="lg"
                onClick={() => {
                  trackEvent('navigation_click', {
                    source: 'landing_carousel',
                    destination: 'all_templates'
                  });
                }}
                 className="hidden lg:flex bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-white shadow-sm px-6 md:px-7 py-3 md:py-4 h-[52px] md:h-[68px] text-[20px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] tracking-[-0.03em] rounded-xl w-full sm:w-auto"
              >
                Check All Templates
              </Button>
            </TemplatesDialog>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col pb-8 lg:pb-0">
          <div className="flex-1 flex items-center">
            <div className="w-full lg:pl-[61px]">
              <div className="overflow-hidden w-full lg:w-[900px]" ref={emblaRef}>
                <div className="flex gap-2 items-center">
                  {displayTemplates?.map((template) => (
                    <div key={template.id} className="group">
                      <div className="cursor-pointer h-full">
                        <div className="p-4 h-full">
                          <div className="relative w-[240px] sm:w-[280px] lg:w-[312px] h-[330px] sm:h-[380px] lg:h-[428px] bg-white/5 p-3 md:p-4 rounded-[16px] md:rounded-[20px] overflow-hidden">
                            <div className="w-full h-full relative">
                              <Image
                                src={template.publicImageUrl}
                                alt={`Template ${template.id}`}
                                fill
                                className="object-fit rounded-[16px] md:rounded-[20px]"
                                unoptimized
                              />
                            </div>

                            <div className="absolute inset-0 flex items-end justify-center pb-6 md:pb-9 gap-2 transition-colors duration-500">
                              <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => handleMobileTemplateClick(template)}
                                className={cn(
                                  'cursor-pointer transform transition-all duration-500 ease-out translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
                                  'bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-[rgb(242,242,242)] border border-gray-400 shadow-sm px-4 md:px-7 py-2 md:py-3 h-10 md:h-12 text-sm md:text-lg font-semibold rounded-lg md:rounded-xl',
                                )}
                              >
                                Use This Template
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop left gradient */}
          <div className="hidden lg:block absolute left-[29px] top-[31px] bottom-[31px] w-[141px] bg-gradient-to-r from-[rgb(23,23,23)] via-[rgb(23,23,23)]/86 to-transparent pointer-events-none" />

          {/* Mobile left gradient */}
          <div className="lg:hidden absolute left-0 top-0 bottom-0 w-[60px] bg-gradient-to-r from-[rgb(23,23,23)] via-[rgb(23,23,23)]/86 to-transparent pointer-events-none" />

          {/* Desktop left button */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="hidden lg:flex absolute left-[39px] top-[246px] w-16 h-16 rounded-full items-center justify-center
            text-white z-20 transition-all -rotate-45 bg-[rgb(0,95,242)]/20 backdrop-blur-md border-t border-b border-white/40 disabled:opacity-40"
          >
            <ChevronLeft className="w-10 h-10 rotate-45" />
          </button>

          {/* Mobile left button */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center
            text-white z-20 transition-all bg-[rgb(0,95,242)]/20 backdrop-blur-md border border-white/40 disabled:opacity-40"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Desktop right gradient */}
          <div className="hidden lg:block absolute right-0 top-[31px] bottom-[31px] w-[181px] bg-gradient-to-l from-[rgb(23,23,23)] via-[rgb(23,23,23)]/86 to-transparent pointer-events-none" />

          {/* Mobile right gradient */}
          <div className="lg:hidden absolute right-0 top-0 bottom-0 w-[60px] bg-gradient-to-l from-[rgb(23,23,23)] via-[rgb(23,23,23)]/86 to-transparent pointer-events-none" />

          {/* Desktop right button */}
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="hidden lg:flex absolute right-[78px] top-[246px] w-16 h-16 rounded-full items-center justify-center text-white z-20 transition-all rotate-45 bg-[rgb(0,95,242)]/20 backdrop-blur-md border-t border-b border-white/40 disabled:opacity-40"
          >
            <ChevronRight className="w-10 h-10 -rotate-45" />
          </button>

          {/* Mobile right button */}
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white z-20 transition-all bg-[rgb(0,95,242)]/20 backdrop-blur-md border border-white/40 disabled:opacity-40"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination dots */}
          <div className="flex justify-center lg:justify-end lg:pr-[440px] pb-4 lg:pb-[29px]">
            <div className="flex items-center gap-3">
              {displayTemplates?.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    'h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition-all duration-300 ease-in-out lg:-rotate-45 backdrop-blur-md border-t border-b',
                    index === selectedIndex
                      ? 'scale-110 bg-white/60 border-white/60 shadow-lg'
                      : 'bg-white/10 hover:bg-white/50 hover:scale-105 border-white/70',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile button at bottom - visible only on mobile */}
        <div className="lg:hidden px-6 pb-6">
          <Button
            variant="default"
            size="lg"
            onClick={handleMobileButtonClick}
            className="bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-white shadow-sm px-6 py-3 h-[52px] text-[20px] font-semibold leading-[1.2] tracking-[-0.03em] rounded-xl w-full"
          >
            Check All Templates
          </Button>
        </div>
      </div>

      {/* Mobile Text View */}
      {isMobile && <MobileTextView isOpen={showMobileView} onClose={() => setShowMobileView(false)} />}
    </div>
  );
}
