import type { ResumeData, ResumeDataKey } from '@entities/resume';
import { useResumeStore } from '../stores/resume-store';

/**
 * Granular Zustand selector — only re-renders when THIS section changes.
 * Editing "experience" does NOT re-render a component subscribed to "skills".
 */
export function useSectionData<K extends ResumeDataKey>(section: K): ResumeData[K] | undefined {
  return useResumeStore((s) => s.data?.[section] as ResumeData[K] | undefined);
}
