'use client';

import { memo, lazy, Suspense } from 'react';
import type { ResumeDataKey } from '@entities/resume';
import { useUIStore } from '../stores/ui-store';

// ---------------------------------------------------------------------------
// Lazy-loaded section forms — code-split for bundle size
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

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-10 bg-gray-100 rounded" />
      <div className="h-10 bg-gray-100 rounded" />
      <div className="h-10 bg-gray-100 rounded" />
    </div>
  );
}

export const ResumeBuilderEditor = memo(function ResumeBuilderEditor() {
  const activeSection = useUIStore((s) => s.activeSection);
  const SectionForm = sectionForms[activeSection];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="text-lg font-semibold mb-4">{SECTION_LABELS[activeSection]}</h2>
      <Suspense fallback={<FormSkeleton />}>
        <SectionForm />
      </Suspense>
    </div>
  );
});
