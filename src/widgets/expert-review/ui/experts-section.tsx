'use client';

import { experts, ExpertCard } from '@features/expert-review/ui/views/shared';
import { cn } from '@shared/lib/cn';
import type { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

// Duplicate experts to have enough slides for the carousel
const carouselExperts = [...experts, ...experts, ...experts];

export function ExpertsSection() {
  const options: EmblaOptionsType = {
    loop: true,
    align: 'center',
    duration: 30,
    slidesToScroll: 1,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section className="py-12 sm:py-16 md:py-24 overflow-hidden" aria-labelledby="experts-heading">
      <div className="container mx-auto px-4 sm:px-6 max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2
            id="experts-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight mb-4"
          >
            Meet the Experts Who Review Your Resume
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Our reviewers work at companies like Google, Microsoft, TikTok, Uber, Zepto, and more. They know exactly
            what hiring managers look for.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-center">
              {carouselExperts.map((expert, index) => (
                <div key={`${expert.name}-${index}`} className="flex-[0_0_auto] px-3 sm:px-4">
                  <div className="[--expert-card-scale:1] transition-transform duration-300 hover:scale-[1.03]">
                    <ExpertCard {...expert} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left gradient fade */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-[80px] bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          {/* Right gradient fade */}
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[80px] bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

          {/* Navigation buttons */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-gray-700 z-20 transition-all bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-white hover:scale-105 disabled:opacity-40 cursor-pointer"
            aria-label="Previous expert"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-gray-700 z-20 transition-all bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-white hover:scale-105 disabled:opacity-40 cursor-pointer"
            aria-label="Next expert"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </motion.div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="flex items-center gap-2">
            {experts.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300 cursor-pointer',
                  index === selectedIndex % experts.length ? 'w-7 bg-[#005FF2]' : 'w-2.5 bg-gray-300 hover:bg-gray-400',
                )}
                aria-label={`Go to expert ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium bg-[#F3F4F8] text-gray-700 border border-gray-200">
            20+ more experts from Google, Zepto, Uber
          </span>
        </motion.div>
      </div>
    </section>
  );
}
