'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AiFeatureCard } from './ai-feature-card';

export function AiFeaturesSection() {
  const [hoveredId, setHoveredId] = useState<'left' | 'right' | null>(null);
  const [_isMounted, setIsMounted] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  // Memoize touch detection to avoid recalculation
  const isTouch = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none)').matches;
  }, []);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Stable callbacks with proper dependencies
  const hoverLeft = useCallback(() => setHoveredId('left'), []);
  const hoverRight = useCallback(() => setHoveredId('right'), []);
  const clearHover = useCallback(() => {
    if (!isTouch) setHoveredId(null);
  }, [isTouch]);

  return (
    <section className="py-12 sm:py-16 md:py-24" aria-labelledby="ai-features-heading">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 max-w-[90rem]">
        <h2
          id="ai-features-heading"
          className="mb-8 sm:mb-12 md:mb-16 text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight"
        >
          Create your resume with{' '}
          <span className="text-[#2e75f3] inline-flex items-center gap-1 sm:gap-2">
            Pika Intelligence
            <span
              className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 relative"
              style={{
                filter: 'invert(37%) sepia(93%) saturate(4528%) hue-rotate(209deg) brightness(97%) contrast(91%)',
              }}
            >
              <Image src="/images/sparkles.svg" alt="" fill className="object-contain" priority aria-hidden="true" />
            </span>
          </span>
        </h2>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 md:h-[410px]">
          <AiFeatureCard
            id="left"
            badge="AI Powered"
            title="Tailored Resume with Job Description"
            description="Customise your resume to match the job description in seconds."
            variant="blue"
            isHovered={hoveredId === 'left'}
            isOtherHovered={hoveredId === 'right'}
            onHover={hoverLeft}
            onLeave={clearHover}
          />

          <AiFeatureCard
            id="right"
            badge="AI Powered"
            title="Better Resume Wording"
            description="Every line gets clearer grammar, stronger verbs suggestions."
            variant="green"
            isHovered={hoveredId === 'right'}
            isOtherHovered={hoveredId === 'left'}
            onHover={hoverRight}
            onLeave={clearHover}
          />
        </div>
      </div>
    </section>
  );
}
