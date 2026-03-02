'use client';

import { cn } from '@shared/lib/utils';
import type { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface Step {
  icon: string;
  title: string;
  description: string;
  threadImage?: string;
  threadImageTop?: string;
}

interface ReferralStepsCarouselProps {
  steps: Step[];
}

export function ReferralStepsCarousel({ steps }: ReferralStepsCarouselProps) {
  const options: EmblaOptionsType = {
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {steps.map((step, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
              <div className="flex flex-col items-center gap-2 relative pt-16 z-10">
                {step.threadImage && (
                  <>
                    <div className="absolute left-0 top-16 pointer-events-none">
                      <Image src="/images/join-thread1.png" alt="" width={157} height={80} className="object-contain" />
                    </div>

                    {step.threadImage === 'both' && (
                      <div className="absolute right-0 top-[70px] pointer-events-none">
                        <Image
                          src="/images/join-thread2.png"
                          alt=""
                          width={157}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="relative z-10 w-19 h-19 rounded-full bg-referral-icon-bg flex items-center justify-center mb-2 overflow-hidden">
                  <Image src={step.icon} alt="" width={28} height={28} />
                </div>
                <h3 className="text-base font-semibold leading-[1.375] tracking-[-0.011em] text-center text-white opacity-80">
                  {step.title}
                </h3>
                <p className="text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-white/60 max-w-[233px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {steps.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              'h-[5px] rounded-full transition-all duration-300 border border-white/50',
              index === selectedIndex ? 'w-[12px] bg-white' : 'w-[7px] hover:bg-white/80',
            )}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
