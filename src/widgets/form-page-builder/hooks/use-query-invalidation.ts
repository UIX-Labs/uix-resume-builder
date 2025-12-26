import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Hook to handle query invalidation on navigation
 */
export function useQueryInvalidationOnNavigation(resumeId: string | null) {
  const queryClient = useQueryClient();
  const prevResumeIdRef = useRef<string | null>(null);
  const isInitialMountRef = useRef(true);

  useEffect(() => {
    if (!resumeId) return;

    const prevResumeId = prevResumeIdRef.current;
    const isResumeIdChange = prevResumeId !== null && prevResumeId !== resumeId;
    const isInitialMount = isInitialMountRef.current;

    // Update refs
    prevResumeIdRef.current = resumeId;
    if (isInitialMount) {
      isInitialMountRef.current = false;
    }

    // Invalidate when:
    // 1. User navigates to a different resume (resumeId changed)
    // 2. User comes back to the page (component remounts)
    // Skip on very first mount to avoid unnecessary invalidation
    if (isResumeIdChange) {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      queryClient.invalidateQueries({ queryKey: ['resume-data', resumeId] });
    } else if (!isInitialMount && prevResumeId === resumeId) {
      // Component remounted with same resumeId (user navigated back)
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      queryClient.invalidateQueries({ queryKey: ['resume-data', resumeId] });
    }
  }, [resumeId, queryClient]);
}
