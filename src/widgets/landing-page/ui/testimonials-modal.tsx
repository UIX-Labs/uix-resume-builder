'use client';

import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@shared/ui/dialog';
import { testimonials } from '../models/constants';

interface TestimonialsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TestimonialsModal({ isOpen, onClose }: TestimonialsModalProps) {
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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[900px] w-full p-0 border-none bg-transparent overflow-visible shadow-none">
                <div className="relative w-full p-1 rounded-[36px] bg-gradient-to-r from-[#257AFF] via-[#005FF2] to-[#257AFF]">
                    <div className="relative w-full bg-transparent rounded-[35px] overflow-hidden">
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border-2 border-white/30 hover:bg-black/70 hover:border-white/50 transition-colors cursor-pointer"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                        <div className="overflow-hidden rounded-[35px]" ref={emblaRef}>
                            <div className="flex">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[679px]">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center rounded-[35px]"
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
                </div>
            </DialogContent>
        </Dialog>
    );
}

