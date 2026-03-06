'use client';

import { useEffect } from 'react';
import type { ResumeDataKey } from '@entities/resume';
import { STEP_TO_SECTION_MAP } from '../lib/section-map';

interface UseScrollToSectionParams {
  targetRef: React.RefObject<HTMLDivElement | null>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  currentStep: ResumeDataKey;
  enabled: boolean;
}

export function useScrollToSection({
  targetRef,
  scrollContainerRef,
  currentStep,
  enabled,
}: UseScrollToSectionParams): void {
  useEffect(() => {
    if (!enabled) return;
    if (!targetRef.current || !currentStep) return;

    const sectionId = STEP_TO_SECTION_MAP[currentStep];
    if (!sectionId) return;

    const scrollTimer = setTimeout(() => {
      const sectionElement = targetRef.current?.querySelector(`[data-section="${sectionId}"]`) as HTMLElement;

      if (sectionElement && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const sectionRect = sectionElement.getBoundingClientRect();

        const scrollTop = container.scrollTop + sectionRect.top - containerRect.top - 100;

        container.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });
      }
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [currentStep, enabled]);
}
