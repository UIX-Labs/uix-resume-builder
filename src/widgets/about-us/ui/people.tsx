'use client';

import { cn } from '@shared/lib/cn';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { MemberDetailModal } from './member-detail-modal';
import { Button } from '@shared/ui';
import Autoplay from 'embla-carousel-autoplay';

const teamMembers = [
  {
    id: 1,
    name: 'Aman',
    role: 'CEO and Founder',
    image: 'https://uixlabs.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAman.4cefaeb6.png&w=640&q=75',
    description: 'Leading the vision for human-centric resumes',
    bio: 'With over 12 years of expertise in product development, I am the chief hustler at UIX Labs.',
  },
  {
    id: 2,
    name: 'Anmol Saxena',
    role: 'Chief Technology Officer',
    image: 'https://uixlabs.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPhoneix.1e85ac43.jpg&w=640&q=75',
    description: 'Crafting beautiful and inclusive experiences',
    bio: 'Software architect and industry leader with a knack for building and managing teams across big tech, fintech and deep tech.',
  },
  {
    id: 3,
    name: 'Vaibhav Bhatnagar',
    role: 'Growth Hacker',
    image: 'https://uixlabs.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvaibhav.5be2c197.jpg&w=640&q=75',
    description: 'Building innovative solutions for the future',
    bio: 'Handles everything non-tech @ UIX LABS. Expertise in recruitment and lead acuisition.',
  },
  {
    id: 4,
    name: 'Kunal Gupta',
    role: 'Backend Engineer, L1',
    image: 'https://uixlabs.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FkunalGupta.bda211d5.jpeg&w=640&q=75',
    description: 'Shaping products that make an impact',
    bio: 'Aspiring Backend Engineer (L1) driven by a strong desire to learn, grow, and prove his potential through consistent effort and curiosity.',
  },
  {
    id: 5,
    name: 'Vishnu Malav',
    role: 'UI Engineer, L2',
    image: 'https://uixlabs.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fenzo.a98443ad.jpg&w=640&q=75',
    description: 'Driving technical excellence',
    bio: 'Ex MX Player, IIT Roorkee Alum with 2+ years of working experience as a UI Engineer.',
  },
  {
    id: 6,
    name: 'Kunal Yadav',
    role: 'UI Engineer, L2',
    image: 'https://uixlabs.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLoki.1f66544d.jpg&w=640&q=75',
    description: 'Driving technical excellence',
    bio: 'Driving user engagement and optimizing performance, I engineer seamless digital experiences at UIX Labs.',
  },
  {
    id: 7,
    name: 'Devendra Joshi',
    role: 'Backend Engineer, L2',
    image: 'https://uixlabs.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FGeoris.ca1cd52e.jpg&w=640&q=75',
    description: 'Driving technical excellence',
    bio: 'Fullstack developer with a love for clean code, crisp photos, and compelling stories.',
  },
  {
    id: 8,
    name: 'Deepanshu',
    role: 'Full Stack Engineer, L1',
    image: 'https://uixlabs.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDeepanshu.3676d747.jpeg&w=640&q=75',
    description: 'Driving technical excellence',
    bio: 'Gen Z dev with MERN stack expertise — just a chill guy with a guitar.',
  },
  {
    id: 9,
    name: 'Tanushi Gupta',
    role: 'UI Engineer, L1',
    image: 'https://uixlabs.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTanushiGupta.9f42715b.jpeg&w=640&q=75',
    description: 'Driving technical excellence',
    bio: 'Hardworking and smart frontend ninja by day, bug whisperer by night — trying to transform Figma dreams into pixel-perfect realities with a dash of caffeine and code.',
  },
];

export function People() {
  const options: EmblaOptionsType = {
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // Default first card expanded

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

  const handleOpenModal = (member: (typeof teamMembers)[0]) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  //   const activeIndex = hoveredIndex !== null ? hoveredIndex : 0;

  return (
    <div className="w-full max-w-[1408px] min-h-[500px] md:min-h-[600px] lg:h-[761px] relative rounded-[20px] md:rounded-[36px] mx-auto my-8 md:my-14 overflow-hidden px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <div className="w-12 sm:w-20 md:w-28 h-[1px] bg-gradient-to-r from-transparent via-black/33 to-black/33 rounded-full" />
        <span className="text-[#666666] font-semibold text-sm sm:text-base md:text-[18px] leading-[1.33em] tracking-[-0.0144em] whitespace-nowrap">
          And now meet
        </span>
        <div className="w-12 sm:w-20 md:w-28 h-[1px] bg-gradient-to-l from-transparent via-black/33 to-black/33 rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row h-full">
        {/* Left content */}
        <div className="w-full lg:w-[482px] flex flex-col justify-center py-8 lg:py-0 lg:pl-12 text-center lg:text-left">
          <h2 className="text-black font-semibold text-[36px] sm:text-[48px] md:text-[60px] lg:text-[80px] leading-[0.95em] tracking-[-0.03em] mb-4 md:mb-6">
            The
            <br />
            faces of <span className="text-[#005FF2]">Innovation</span>
          </h2>
          <p className="text-[#666666] text-base md:text-lg leading-[1.33em] tracking-[-0.0144em] max-w-[400px] mx-auto lg:mx-0">
            Meet the people leading the movement to make resumes more human, inclusive, and impactful.
          </p>
        </div>

        {/* Right Section - Carousel */}
        <div className="flex-1 flex items-center">
          <div className="pl-0 md:pl-4 lg:pl-[61px] w-full">
            <div className="overflow-hidden w-full lg:w-[900px]" ref={emblaRef}>
              <div className="flex items-center">
                {teamMembers.map((template, index) => {
                  const isExpanded = hoveredIndex === index;
                  const cardWidth = isExpanded
                    ? 'w-[200px] sm:w-[260px] md:w-[324px]'
                    : 'w-[80px] sm:w-[100px] md:w-[125px]';

                  return (
                    <div
                      key={template.id}
                      onClick={() => handleOpenModal(template)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(0)}
                    >
                      <div className="cursor-pointer h-full">
                        <div className="h-full">
                          <div
                            className={cn(
                              'relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[628px] bg-white/5 p-2 md:p-4 rounded-[12px] md:rounded-[20px] overflow-hidden transition-all duration-500 ease-in-out',
                              cardWidth,
                            )}
                          >
                            <div className="w-full h-full relative">
                              <Image
                                src={template.image}
                                alt={template.name}
                                fill
                                className={cn(
                                  'object-cover rounded-[12px] md:rounded-[20px] transition-all duration-500',
                                  isExpanded ? 'brightness-75' : 'brightness-100',
                                )}
                                unoptimized
                              />

                              {/* Text Overlay - Only visible when expanded */}
                              <div
                                className={cn(
                                  'absolute inset-0 flex flex-col justify-between p-3 sm:p-4 md:p-6 transition-opacity duration-500',
                                  isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none',
                                )}
                              >
                                {/* Top content */}
                                <div className="text-white">
                                  <h3 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-semibold leading-[1.1em] tracking-[-0.02em] mb-1 md:mb-2">
                                    {template.name}
                                  </h3>
                                  <p className="text-[12px] sm:text-[14px] md:text-[16px] leading-[1.33em] tracking-[-0.0144em] opacity-90">
                                    {template.role}
                                  </p>
                                </div>

                                {/* Bottom button */}
                                <Button className="bg-white/90 hover:bg-white text-black px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-full text-[11px] sm:text-[12px] md:text-[14px] font-medium transition-colors duration-200 self-start">
                                  More about {template.name}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          disabled={!emblaApi}
          className="absolute right-20 md:right-30 bottom-0 md:-bottom-5 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 disabled:opacity-40 z-10 transition-all"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          disabled={!emblaApi}
          className="absolute right-6 md:right-8 bottom-0 md:-bottom-5 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 disabled:opacity-40 z-10 transition-all"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </button>

        <MemberDetailModal isOpen={isModalOpen} onClose={handleCloseModal} member={selectedMember} />
      </div>
    </div>
  );
}
