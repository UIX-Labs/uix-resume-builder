'use client';

import { useFetch } from '@shared/api/hooks/useFetch';
import { fetchExamples } from '../api';
import type { ExampleFilters } from '../types';

export function useResumeExamples(filters: ExampleFilters) {
  return useFetch({
    queryKey: ['resume-examples', filters],
    queryFn: () => fetchExamples(filters),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev: any) => prev,
  });
}
