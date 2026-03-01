import type { SuggestedUpdates } from '@entities/resume';

/**
 * Represents a section of resume data after cleaning for rendering.
 * Uses loose typing since the renderer operates on resolved data paths.
 */
export interface CleanedSection {
  id?: string;
  title?: string;
  items?: Array<Record<string, unknown> | string>;
  isHidden?: boolean;
  suggestedUpdates?: SuggestedUpdates;
  [key: string]: unknown;
}

/**
 * Resume data after cleaning for the renderer.
 * Mirrors ResumeSectionMap but all sections optional with an index signature
 * for extensibility (templates can reference arbitrary paths).
 */
export interface CleanedResumeData {
  personalDetails?: CleanedSection;
  experience?: CleanedSection;
  education?: CleanedSection;
  skills?: CleanedSection;
  projects?: CleanedSection;
  certifications?: CleanedSection;
  professionalSummary?: CleanedSection;
  interests?: CleanedSection;
  achievements?: CleanedSection;
  [key: string]: CleanedSection | string | undefined;
}
