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
    <section className="relative py-16 select-none">
      <div className="flex justify-center items-center gap-3 pt-8 pb-8">
        <span className="w-32 h-[1px] bg-gradient-to-r from-transparent to-gray-950 opacity-40"></span>

        <p className="text-lg font-semibold text-gray-900 whitespace-nowrap tracking-wide">
          Why.....people like you.....looooooove resume builder
        </p>

        <span className="w-32 h-[1px] bg-gradient-to-l from-transparent to-gray-950 opacity-40"></span>
      </div>

      <div className="relative">
        <h2
          className="text-center font-black leading-none tracking-tight h-[120px] overflow-hidden"
          style={{
            fontSize: '168px',
            background: 'linear-gradient(180deg, rgba(179, 179, 179, 1) 28%, rgba(255, 255, 255, 0) 94%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Testimonials
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
        <div className="relative w-full lg:w-[439px] h-[679px] bg-[rgb(23,23,23)] border border-white rounded-[36px] overflow-hidden">
          <div
            className="absolute -left-[150px] -top-[214px] w-[604px] h-[604px] rounded-full blur-[100px]"
            style={{
              background: 'linear-gradient(124deg, rgba(37, 122, 255, 1) 40%, rgba(23, 23, 23, 1) 55%)',
            }}
          ></div>

          <div
            className="absolute -right-[120px] bottom-[-150px] w-[300px] h-[300px] rounded-full blur-[120px]"
            style={{
              background: `linear-gradient(200deg, rgba(255, 176, 138, 1) 30%, rgba(233, 59, 54, 1) 30%)`,
            }}
          ></div>

          <div className="relative z-10 flex flex-col justify-center gap-18 px-[69px] h-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-[68px] font-semibold leading-tight tracking-tight text-[rgb(240,247,255)]">10K+</h3>

              <p className="text-[32px] font-normal leading-tight tracking-tight text-[rgb(242,242,242)]">
                Resumes delivered
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-18">
              <h3 className="text-[68px] font-semibold leading-tight tracking-tight text-[rgb(240,247,255)]">77.8%</h3>

              <p className="text-[32px] font-normal leading-tight tracking-tight text-[rgb(242,242,242)]">
                Higher chance of
                <br />
                selection
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full lg:w-[817px]">
          <div className="overflow-hidden rounded-[36px]" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[679px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
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
    </section>
  );
}
