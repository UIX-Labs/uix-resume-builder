'use client';

import { useFetch } from '@shared/api/hooks/useFetch';
import { fetchExampleBySlug } from '../api';

export function useExampleDetail(slug: string | null) {
  return useFetch({
    queryKey: ['resume-example-detail', slug],
    queryFn: () => fetchExampleBySlug(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
