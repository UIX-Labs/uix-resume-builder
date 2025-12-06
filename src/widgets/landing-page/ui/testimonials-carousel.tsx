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
                        <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[679px]">
                            <div
                                className={`absolute inset-0 bg-cover bg-center ${roundedClassName}`}
                                style={{
                                    backgroundImage: `
                    linear-gradient(180deg, rgba(0, 19, 49, 0.00) -8.84%, #000B1D 100%),
                    url('${testimonial.img}')
                  `,
                                }}
                            ></div>

                            <div className="relative z-10 flex flex-col justify-end h-full px-10 pb-12">
                                <div className="flex flex-col gap-12">
                                    <p className="text-4xl font-semibold leading-tight tracking-tight text-white">
                                        {testimonial.text}
                                    </p>

                                    <div className="flex flex-col gap-1">
                                        <p className="text-xl font-normal leading-tight text-white">{testimonial.name}</p>

                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-semibold leading-tight text-white">{testimonial.role}</span>

                                            <div className="w-2 h-2 rounded-full bg-white"></div>

                                            <span className="text-xl font-semibold leading-tight text-white">{testimonial.position}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-12 right-10 flex items-center gap-8 z-20">
                <button
                    onClick={scrollPrev}
                    type="button"
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white z-20 transition-all
            bg-[rgb(0,95,242)]/20 backdrop-blur-md border-t border-b border-white/40 -rotate-45 disabled:opacity-40 button-glass cursor-pointer"
                >
                    <ChevronLeft className="w-8 h-8 text-white rotate-45" />
                </button>

                <span className="text-xl min-w-[63px] text-right">
                    <span className="font-semibold text-white">{String(selectedIndex + 1).padStart(2, '0')}/</span>

                    <span className="text-gray-700 font-normal">{String(testimonials.length).padStart(2, '0')}</span>
                </span>

                <button
                    onClick={scrollNext}
                    type="button"
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white z-20 transition-all cursor-pointer
            bg-[rgb(0,95,242)]/20 backdrop-blur-md  border-t border-b border-white/40  rotate-45 disabled:opacity-40
"
                >
                    <ChevronRight className="w-8 h-8 text-white -rotate-45" />
                </button>
            </div>
        </div>
    );
}

