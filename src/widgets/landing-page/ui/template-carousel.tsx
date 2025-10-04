'use client';

import { cn } from '@shared/lib/cn';
import { Button } from '@shared/ui/components/button';

import type { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { templates } from '../models/constants';
import { useRouter } from 'next/navigation';
import { useCachedUser } from '@shared/hooks/use-user';

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
  const user= useCachedUser();
  const router = useRouter();
  const handleNavigate = () => {
    router.push(user ? '/dashboard' : '/auth');
  };

  return (
    <div className="relative bg-[rgb(23,23,23)] text-white rounded-[36px] overflow-hidden min-h-[556px] m-4">
      <div className="absolute -left-[150px] -top-[214px] w-[400px] h-[400px] bg-gradient-to-br from-[rgb(37,122,255)] via-[rgb(37,122,255)] to-[rgb(23,23,23)] blur-[100px]" />

      <div className="flex h-[556px] max-w-[1408px] mx-auto z-10">
        <div className="w-[498px] px-9 flex flex-col justify-center">
          <div className="space-y-10">
            <div className="relative w-[498px] h-[146px]">
              <h2 className="text-[68px] font-semibold leading-[1.2] tracking-[-0.03em] text-[rgb(240,247,255)]">
                Pick A Resume
              </h2>

              <div className="flex items-center justify-center mt-[-4px]">
                <h2 className="text-[68px] font-semibold leading-[1.2] tracking-[-0.03em] text-[rgb(240,247,255)]">
                  Template
                </h2>

                <span className="text-xl font-semibold tracking-[-0.02em] text-[rgb(240,247,255)] w-[199px] ml-3">
                  and build your resume in minutes!
                </span>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              className="bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-white shadow-sm px-7 py-4 h-[68px] text-[32px] font-semibold leading-[1.2] tracking-[-0.03em] rounded-xl"
            >
              Check All Templates
            </Button>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col">
          <div className="flex-1 flex items-center">
            <div className="pl-[61px]">
              <div className="overflow-hidden w-[900px]" ref={emblaRef}>
                <div className="flex gap-2 items-center">
                  {templates.map((template) => (
                    <div key={template.id} className="group">
                      <div className="cursor-pointer h-full">
                        <div className="p-4 h-full">
                          <div className="relative w-[312px] h-[428px] bg-white/5 p-4 rounded-[20px] overflow-hidden">
                            <div className="w-full h-full relative">
                              <Image
                                src={template.image}
                                alt={template.name}
                                fill
                                className="object-cover rounded-[20px]"
                              />
                            </div>

                            <div className="absolute inset-0 flex items-end justify-center pb-9 gap-2 transition-colors duration-500">
                              <Button
                                variant="secondary"
                                size="lg"
                                onClick={handleNavigate}
                                className={cn(
                                  'transform transition-all duration-500 ease-out translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
                                  'bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-[rgb(242,242,242)] border  border-gray-400 shadow-sm px-7 py-3 h-12 text-lg font-semibold rounded-xl',
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

          <div className="absolute left-[29px] top-[31px] bottom-[31px] w-[141px] bg-gradient-to-r from-[rgb(23,23,23)] via-[rgb(23,23,23)]/86 to-transparent pointer-events-none" />

          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-[39px] top-[246px] w-16 h-16 rounded-full flex items-center justify-center
            text-white z-20 transition-all -rotate-45 bg-[rgb(0,95,242)]/20 backdrop-blur-md border-t border-b border-white/40 disabled:opacity-40"
          >
            <ChevronLeft className="w-10 h-10 rotate-45" />
          </button>

          <div className="absolute right-0 top-[31px] bottom-[31px] w-[181px] bg-gradient-to-l from-[rgb(23,23,23)] via-[rgb(23,23,23)]/86 to-transparent pointer-events-none" />
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-[78px] top-[246px] w-16 h-16 rounded-full flex items-center justify-center text-white z-20 transition-all rotate-45 bg-[rgb(0,95,242)]/20 backdrop-blur-md border-t border-b border-white/40 disabled:opacity-40"
          >
            <ChevronRight className="w-10 h-10 -rotate-45" />
          </button>

          <div className="flex justify-end pr-[440px] pb-[29px]">
            <div className="flex items-center gap-3">
              {templates.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    'h-3 w-3 rounded-full transition-all duration-300 ease-in-out -rotate-45 backdrop-blur-md border-t border-b',
                    index === selectedIndex
                      ? 'scale-110 bg-white/60 border-white/60 shadow-lg'
                      : 'bg-white/10 hover:bg-white/50 hover:scale-105 border-white/70',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
