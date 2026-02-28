import { useResumeStore } from '../stores/resume-store';

/**
 * Returns the current resume ID from the store.
 */
export function useResumeId(): string | null {
  return useResumeStore((s) => s.resumeId);
}
