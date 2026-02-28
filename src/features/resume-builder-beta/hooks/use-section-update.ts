import { useResumeStore } from '../stores/resume-store';

/**
 * Returns stable action reference — never changes identity, never triggers re-render.
 */
export function useSectionUpdate() {
  return useResumeStore((s) => s.updateSection);
}
