'use client';

import { memo, lazy, Suspense } from 'react';
import type { ResumeDataKey } from '@entities/resume';
import { cn } from '@shared/lib/utils';
import { useUIStore } from '../stores/ui-store';
import { ArrowLeft } from 'lucide-react';

// ---------------------------------------------------------------------------
// Lazy-loaded section forms (same as editor-panel)
// ---------------------------------------------------------------------------

const sectionForms: Record<ResumeDataKey, React.LazyExoticComponent<React.ComponentType>> = {
  personalDetails: lazy(() => import('../forms/personal-details-form')),
  professionalSummary: lazy(() => import('../forms/professional-summary-form')),
  experience: lazy(() => import('../forms/experience-form')),
  education: lazy(() => import('../forms/education-form')),
  skills: lazy(() => import('../forms/skills-form')),
  projects: lazy(() => import('../forms/projects-form')),
  certifications: lazy(() => import('../forms/certifications-form')),
  interests: lazy(() => import('../forms/interests-form')),
  achievements: lazy(() => import('../forms/achievements-form')),
};

const SECTION_LABELS: Record<ResumeDataKey, string> = {
  personalDetails: 'Personal Details',
  professionalSummary: 'Professional Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  interests: 'Interests',
  achievements: 'Achievements',
};

const SECTION_ORDER: ResumeDataKey[] = [
  'personalDetails', 'professionalSummary', 'experience', 'education',
  'skills', 'projects', 'certifications', 'interests', 'achievements',
];

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse p-4">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-10 bg-gray-100 rounded" />
      <div className="h-10 bg-gray-100 rounded" />
      <div className="h-10 bg-gray-100 rounded" />
    </div>
  );
}

/**
 * Full-screen slide-in sheet for editing a section on mobile.
 */
export const MobileFormSheet = memo(function MobileFormSheet() {
  const isOpen = useUIStore((s) => s.isMobileFormOpen);
  const setIsOpen = useUIStore((s) => s.setIsMobileFormOpen);
  const activeSection = useUIStore((s) => s.activeSection);
  const setActiveSection = useUIStore((s) => s.setActiveSection);

  const SectionForm = sectionForms[activeSection];
  const currentIndex = SECTION_ORDER.indexOf(activeSection);

  const goNext = () => {
    if (currentIndex < SECTION_ORDER.length - 1) {
      setActiveSection(SECTION_ORDER[currentIndex + 1]);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setActiveSection(SECTION_ORDER[currentIndex - 1]);
    }
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] bg-white flex flex-col transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-white sticky top-0 z-10">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-lg hover:bg-gray-100"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-semibold flex-1">
          {SECTION_LABELS[activeSection]}
        </h2>
        <span className="text-xs text-gray-400">
          {currentIndex + 1}/{SECTION_ORDER.length}
        </span>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Suspense fallback={<FormSkeleton />}>
          <SectionForm />
        </Suspense>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-t bg-white sticky bottom-0">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={currentIndex === SECTION_ORDER.length - 1 ? () => setIsOpen(false) : goNext}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
        >
          {currentIndex === SECTION_ORDER.length - 1 ? 'Done' : 'Next'}
        </button>
      </div>
    </div>
  );
});
