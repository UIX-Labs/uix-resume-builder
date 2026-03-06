// ---------------------------------------------------------------------------
// Typed cleaned resume data
//
// Preserves item types through the data cleaning pipeline instead of erasing
// them via index signatures. The compat type allows gradual migration from
// the old untyped CleanedResumeData.
// ---------------------------------------------------------------------------

import type { SuggestedUpdates } from '@entities/resume';
import type {
  PersonalDetailsItem,
  ExperienceItem,
  EducationItem,
  SkillItem,
  ProjectItem,
  CertificationItem,
  SummaryItem,
} from '../models/resume-sections';

// ---------------------------------------------------------------------------
// Section wrappers (mirror the form data wrappers but with optional fields)
// ---------------------------------------------------------------------------

export interface CleanedObjectSection<T> {
  id?: string;
  title?: string;
  items: T[];
  isHidden?: boolean;
  suggestedUpdates?: SuggestedUpdates;
}

export interface CleanedStringSection {
  id?: string;
  title?: string;
  items: string[];
  isHidden?: boolean;
  suggestedUpdates?: SuggestedUpdates;
}

// ---------------------------------------------------------------------------
// TypedCleanedResumeData — preserves item types
// ---------------------------------------------------------------------------

export interface TypedCleanedResumeData {
  personalDetails?: CleanedObjectSection<PersonalDetailsItem>;
  experience?: CleanedObjectSection<ExperienceItem>;
  education?: CleanedObjectSection<EducationItem>;
  skills?: CleanedObjectSection<SkillItem>;
  projects?: CleanedObjectSection<ProjectItem>;
  certifications?: CleanedObjectSection<CertificationItem>;
  professionalSummary?: CleanedObjectSection<SummaryItem>;
  interests?: CleanedStringSection;
  achievements?: CleanedStringSection;
}

// ---------------------------------------------------------------------------
// Migration compat type
//
// During migration, code that does dynamic property access (e.g.
// `data[sectionId]`) still works via the index signature. Once all
// access is through typed paths, the index signature can be removed.
// ---------------------------------------------------------------------------

export type CleanedResumeDataCompat = TypedCleanedResumeData & {
  [key: string]: unknown;
};
