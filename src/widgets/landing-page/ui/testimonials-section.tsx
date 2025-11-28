'use client';

import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { testimonials } from '../models/constants';

export default function Testimonials() {
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
    <section className="relative py-4 md:py-16">
      <div className="flex justify-center items-center gap-2 md:gap-3 pt-8 pb-8 px-4">
        <span className="w-8 sm:w-16 md:w-32 h-[1px] bg-gradient-to-r from-transparent to-gray-950 opacity-40"></span>

        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 text-center md:whitespace-nowrap tracking-wide">
          Why.....people like you.....looooooove resume builder
        </p>

        <span className="w-8 sm:w-16 md:w-32 h-[1px] bg-gradient-to-l from-transparent to-gray-950 opacity-40"></span>
      </div>

      <div className="relative">
        <h2
          className="text-center font-black leading-none tracking-tight h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px] overflow-hidden"
          style={{
            fontSize: 'clamp(64px, 12vw, 168px)',
            background: 'linear-gradient(180deg, rgba(179, 179, 179, 1) 28%, rgba(255, 255, 255, 0) 94%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Testimonials
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Stats Card */}
        <div className="relative w-full lg:w-[439px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[679px] bg-[rgb(23,23,23)] border border-white rounded-[24px] md:rounded-[36px] overflow-hidden order-2 lg:order-1">
          {/* Top-left blue gradient */}
          <div
            className="absolute -left-[80px] sm:-left-[100px] lg:-left-[150px] -top-[120px] sm:-top-[160px] lg:-top-[214px] w-[300px] sm:w-[400px] lg:w-[604px] h-[300px] sm:h-[400px] lg:h-[604px] rounded-full blur-[80px] lg:blur-[100px]"
            style={{
              background: 'linear-gradient(124deg, rgba(37, 122, 255, 1) 40%, rgba(23, 23, 23, 1) 55%)',
            }}
          ></div>

          {/* Bottom-right orange/red gradient */}
          <div
            className="absolute -right-[80px] lg:-right-[120px] bottom-[-100px] lg:bottom-[-150px] w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] rounded-full blur-[100px] lg:blur-[120px]"
            style={{
              background: `linear-gradient(200deg, rgba(255, 176, 138, 1) 30%, rgba(233, 59, 54, 1) 30%)`,
            }}
          ></div>

          <div className="relative z-10 flex flex-col justify-center gap-8 sm:gap-12 lg:gap-18 px-6 sm:px-10 md:px-12 lg:px-[69px] h-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-semibold leading-tight tracking-tight text-[rgb(240,247,255)]">
                10K+
              </h3>

              <p className="text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] font-normal leading-tight tracking-tight text-[rgb(242,242,242)]">
                Resumes delivered
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-semibold leading-tight tracking-tight text-[rgb(240,247,255)]">
                77.8%
              </h3>

              <p className="text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] font-normal leading-tight tracking-tight text-[rgb(242,242,242)]">
                Higher chance of
                <br />
                selection
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative w-full lg:w-[817px] order-1 lg:order-2">
          <div className="overflow-hidden rounded-[24px] md:rounded-[36px]" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[679px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `
                        linear-gradient(180deg, rgba(0, 19, 49, 0.00) -8.84%, #000B1D 100%),
                        url('${testimonial.img}')
                      `,
                    }}
                  ></div>

                  <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-8 lg:px-10 pb-8 sm:pb-10 lg:pb-12">
                    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
                      <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-white">
                        {testimonial.text}
                      </p>

                      <div className="flex flex-col gap-1">
                        <p className="text-base sm:text-lg lg:text-xl font-normal leading-tight text-white">
                          {testimonial.name}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base sm:text-lg lg:text-xl font-semibold leading-tight text-white">
                            {testimonial.role}
                          </span>

                          <div className="w-2 h-2 rounded-full bg-white"></div>

                          <span className="text-base sm:text-lg lg:text-xl font-semibold leading-tight text-white">
                            {testimonial.position}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-1 md:bottom-6 lg:bottom-12 right-4 sm:right-6 lg:right-10 flex items-center gap-3 sm:gap-4 lg:gap-8 z-20">
            {/* Desktop buttons with rotation */}
            <button
              onClick={scrollPrev}
              type="button"
              className="hidden lg:flex w-16 h-16 rounded-full items-center justify-center text-white z-20 transition-all
                bg-[rgb(0,95,242)]/20 backdrop-blur-md border-t border-b border-white/40 -rotate-45 disabled:opacity-40"
            >
              <ChevronLeft className="w-8 h-8 text-white rotate-45" />
            </button>

            {/* Mobile/Tablet buttons without rotation */}
            <button
              onClick={scrollPrev}
              type="button"
              className="lg:hidden w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center text-white z-20 transition-all
                bg-[rgb(0,95,242)]/20 backdrop-blur-md border border-white/40 disabled:opacity-40"
            >
              <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </button>

            <span className="text-base sm:text-lg lg:text-xl min-w-[50px] sm:min-w-[63px] text-right">
              <span className="font-semibold text-white">{String(selectedIndex + 1).padStart(2, '0')}/</span>

              <span className="text-gray-700 font-normal">{String(testimonials.length).padStart(2, '0')}</span>
            </span>

            {/* Desktop buttons with rotation */}
            <button
              onClick={scrollNext}
              type="button"
              className="hidden lg:flex w-16 h-16 rounded-full items-center justify-center text-white z-20 transition-all
                bg-[rgb(0,95,242)]/20 backdrop-blur-md border-t border-b border-white/40 rotate-45 disabled:opacity-40"
            >
              <ChevronRight className="w-8 h-8 text-white -rotate-45" />
            </button>

            {/* Mobile/Tablet buttons without rotation */}
            <button
              onClick={scrollNext}
              type="button"
              className="lg:hidden w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center text-white z-20 transition-all
                bg-[rgb(0,95,242)]/20 backdrop-blur-md border border-white/40 disabled:opacity-40"
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
