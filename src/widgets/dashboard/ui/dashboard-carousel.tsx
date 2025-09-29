'use client';

import { Button } from '@shared/ui/components/button';
import { templates } from '@widgets/landing-page/models/constants';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function DashboardCarousel() {
  const options: EmblaOptionsType = { loop: true, align: 'center' };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', () => onSelect(emblaApi));
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-5xl mx-auto h-[594px]">
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
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            className="w-10 h-10 rounded-full bg-blue-500 shadow-md flex items-center justify-center text-white hover:bg-blue-600 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {templates.map((template) => (
            <div key={template.id} className="group">
              <div className="cursor-pointer">
                <div className="p-4 ">
                  <div className="relative min-w-[350px] h-[548px] glass-card1 p-4 rounded-[20px] border-2 border-white overflow-hidden">
                    <div className="w-full h-full relative">
                      <Image src={template.image} alt={template.name} fill className="object-cover rounded-[20px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
