'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { ExampleFilters } from '../types';

export function useExampleFilters(initialCategory?: string) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: ExampleFilters = useMemo(
    () => ({
      category: initialCategory || searchParams.get('category') || undefined,
      role: searchParams.get('role') || undefined,
      experienceYears: searchParams.get('experienceYears')
        ? Number(searchParams.get('experienceYears'))
        : undefined,
      primaryColor: searchParams.get('color') || undefined,
      layout: searchParams.get('layout') || undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    }),
    [searchParams, initialCategory],
  );

  const setFilters = useCallback(
    (newFilters: Partial<ExampleFilters>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(newFilters)) {
        if (value !== undefined && value !== null && value !== '') {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      }
      // Reset to page 1 when filters change (unless page is explicitly set)
      if (!('page' in newFilters)) {
        params.set('page', '1');
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return { filters, setFilters, resetFilters };
}
