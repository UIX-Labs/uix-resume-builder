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
    image: '/images/intro.png',
    description: 'Leading the vision for human-centric resumes',
    bio: 'Aman is passionate about creating tools that help people present their best selves. With years of experience in product development, he leads our team with a vision for innovation and inclusivity.',
  },
  {
    id: 2,
    name: 'Sarah',
    role: 'Head of Design',
    image: '/images/intro.png',
    description: 'Crafting beautiful and inclusive experiences',
    bio: 'Sarah brings a unique perspective to design, focusing on creating experiences that are both beautiful and accessible to everyone.',
  },
  {
    id: 3,
    name: 'Rajesh',
    role: 'Chief Technology Officer',
    image: '/images/intro.png',
    description: 'Building innovative solutions for the future',
    bio: 'Rajesh leads our technical team with expertise in building scalable, innovative solutions that power our platform.',
  },
  {
    id: 4,
    name: 'Emily',
    role: 'Head of Product',
    image: '/images/intro.png',
    description: 'Shaping products that make an impact',
    bio: "Emily focuses on creating products that truly make a difference in people's careers and lives.",
  },
  {
    id: 5,
    name: 'Michael',
    role: 'VP of Engineering',
    image: '/images/intro.png',
    description: 'Driving technical excellence',
    bio: 'Michael ensures our engineering team delivers high-quality, reliable solutions that exceed expectations.',
  },
  {
    id: 6,
    name: 'Michael',
    role: 'VP of Engineering',
    image: '/images/intro.png',
    description: 'Driving technical excellence',
    bio: 'Michael ensures our engineering team delivers high-quality, reliable solutions that exceed expectations.',
  },
  {
    id: 7,
    name: 'Michael',
    role: 'VP of Engineering',
    image: '/images/intro.png',
    description: 'Driving technical excellence',
    bio: 'Michael ensures our engineering team delivers high-quality, reliable solutions that exceed expectations.',
  },
  {
    id: 8,
    name: 'Michael',
    role: 'VP of Engineering',
    image: '/images/intro.png',
    description: 'Driving technical excellence',
    bio: 'Michael ensures our engineering team delivers high-quality, reliable solutions that exceed expectations.',
  },
  {
    id: 9,
    name: 'Michael',
    role: 'VP of Engineering',
    image: '/images/intro.png',
    description: 'Driving technical excellence',
    bio: 'Michael ensures our engineering team delivers high-quality, reliable solutions that exceed expectations.',
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
    <div className="w-full max-w-[1408px] h-[761px] relative rounded-[36px] mx-auto my-14 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-center gap-3">
        <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-black/33 to-black/33 rounded-full" />
        <span className="text-[#666666] font-semibold text-[18px] leading-[1.33em] tracking-[-0.0144em] whitespace-nowrap">
          And now meet
        </span>
        <div className="w-28 h-[1px] bg-gradient-to-l from-transparent via-black/33 to-black/33 rounded-full" />
      </div>

      <div className="flex h-full">
        {/* Left content */}
        <div className="w-[482px] flex flex-col justify-center pl-12">
          <h2 className="text-black font-semibold text-[80px] leading-[0.95em] tracking-[-0.03em] mb-6">
            The
            <br />
            faces of <span className="text-[#005FF2]">Innovation</span>
          </h2>
          <p className="text-[#666666] text-lg leading-[1.33em] tracking-[-0.0144em]">
            Meet the people leading the movement to make resumes more human, inclusive, and impactful.
          </p>
        </div>

        {/* Right Section - Carousel */}
        <div className="flex-1 flex items-center">
          <div className="pl-[61px]">
            <div className="overflow-hidden w-[900px]" ref={emblaRef}>
              <div className="flex items-center">
                {teamMembers.map((template, index) => {
                  const isExpanded = hoveredIndex === index;
                  const cardWidth = isExpanded ? 'w-[324px]' : 'w-[125px]';

                  return (
                    <button
                      type="button"
                      key={template.id}
                      onClick={() => handleOpenModal(template)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(0)}
                    >
                      <div className="cursor-pointer h-full">
                        <div className="h-full">
                          <div
                            className={cn(
                              'relative h-[628px] bg-white/5 p-4 rounded-[20px] overflow-hidden transition-all duration-500 ease-in-out',
                              cardWidth,
                            )}
                          >
                            <div className="w-full h-full relative">
                              <Image
                                src={template.image}
                                alt={template.name}
                                fill
                                className={cn(
                                  'object-cover rounded-[20px] transition-all duration-500',
                                  isExpanded ? 'brightness-75' : 'brightness-100',
                                )}
                              />

                              {/* Text Overlay - Only visible when expanded */}
                              <div
                                className={cn(
                                  'absolute inset-0 flex flex-col justify-between p-6 transition-opacity duration-500',
                                  isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none',
                                )}
                              >
                                {/* Top content */}
                                <div className="text-white">
                                  <h3 className="text-[48px] font-semibold leading-[1.1em] tracking-[-0.02em] mb-2">
                                    {template.name}
                                  </h3>
                                  <p className="text-[16px] leading-[1.33em] tracking-[-0.0144em] opacity-90">
                                    {template.role}
                                  </p>
                                </div>

                                {/* Bottom button */}
                                <Button className="bg-white/90 hover:bg-white text-black px-6 py-3 rounded-full text-[14px] font-medium transition-colors duration-200 self-start">
                                  More about {template.name}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
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
          className="absolute right-30 -bottom-5 -translate-y-1/2 w-12 h-12 disabled:opacity-40 z-10 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          disabled={!emblaApi}
          className="absolute right-8 -bottom-5 -translate-y-1/2 w-12 h-12 disabled:opacity-40 z-10 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>

        <MemberDetailModal isOpen={isModalOpen} onClose={handleCloseModal} member={selectedMember} />
      </div>
    </div>
  );
}
