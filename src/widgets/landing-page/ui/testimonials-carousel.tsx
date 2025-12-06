'use client';

import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { testimonials } from '../models/constants';

interface TestimonialsCarouselProps {
    className?: string;
    roundedClassName?: string;
}

export function TestimonialsCarousel({ className = '', roundedClassName = 'rounded-[36px]' }: TestimonialsCarouselProps) {
    const options: EmblaOptionsType = {
        loop: true,
        align: 'center',
        duration: 30,
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on('reInit', onSelect);
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className={`relative ${className}`}>
            <div className={`overflow-hidden ${roundedClassName}`} ref={emblaRef}>
                <div className="flex">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[450px] sm:h-[550px] lg:h-[679px]">
                            <div
                                className={`absolute inset-0 bg-cover bg-center ${roundedClassName}`}
                                style={{
                                    backgroundImage: `
                    linear-gradient(180deg, rgba(0, 19, 49, 0.00) -8.84%, #000B1D 100%),
                    url('${testimonial.img}')
                  `,
                                }}
                            ></div>

                            <div className="relative z-10 flex flex-col justify-end h-full px-5 pb-6 sm:px-8 sm:pb-10 lg:px-10 lg:pb-12">
                                <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
                                    <p className="text-lg sm:text-2xl lg:text-4xl font-semibold leading-tight tracking-tight text-white">
                                        {testimonial.text}
                                    </p>

                                    <div className="flex flex-col gap-1">
                                        <p className="text-base sm:text-lg lg:text-xl font-normal leading-tight text-white">{testimonial.name}</p>

                                        <div className="flex items-center gap-2">
                                            <span className="text-base sm:text-lg lg:text-xl font-semibold leading-tight text-white">{testimonial.role}</span>

                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white"></div>

                                            <span className="text-base sm:text-lg lg:text-xl font-semibold leading-tight text-white">{testimonial.position}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-6 right-5 sm:bottom-10 sm:right-8 lg:bottom-12 lg:right-10 flex items-center gap-3 sm:gap-5 lg:gap-8 z-20">
                <button
                    onClick={scrollPrev}
                    type="button"
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-white z-20 transition-all
            bg-[rgb(0,95,242)]/20 backdrop-blur-md border-t border-b border-white/40 -rotate-45 disabled:opacity-40 button-glass cursor-pointer"
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white rotate-45" />
                </button>

                <span className="text-sm sm:text-base lg:text-xl min-w-[48px] sm:min-w-[55px] lg:min-w-[63px] text-right">
                    <span className="font-semibold text-white">{String(selectedIndex + 1).padStart(2, '0')}/</span>

                    <span className="text-gray-700 font-normal">{String(testimonials.length).padStart(2, '0')}</span>
                </span>

                <button
                    onClick={scrollNext}
                    type="button"
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-white z-20 transition-all cursor-pointer
            bg-[rgb(0,95,242)]/20 backdrop-blur-md  border-t border-b border-white/40  rotate-45 disabled:opacity-40
"
                >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white -rotate-45" />
                </button>
            </div>
        </div>
    );
}

