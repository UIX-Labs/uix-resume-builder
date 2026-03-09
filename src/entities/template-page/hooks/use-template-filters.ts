'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { TemplateFilters } from '../types/template-filters';

export function useTemplateFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: TemplateFilters = useMemo(() => {
    const stylesParam = searchParams.get('styles');
    return {
      styles: stylesParam ? stylesParam.split(',') : undefined,
      layoutType: searchParams.get('layoutType') || undefined,
      role: searchParams.get('role') || undefined,
      primaryColor: searchParams.get('color') || undefined,
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (newFilters: Partial<TemplateFilters>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(newFilters)) {
        if (key === 'styles') {
          const arr = value as string[] | undefined;
          if (arr && arr.length > 0) {
            params.set('styles', arr.join(','));
          } else {
            params.delete('styles');
          }
        } else if (key === 'primaryColor') {
          if (value) {
            params.set('color', String(value));
          } else {
            params.delete('color');
          }
        } else {
          if (value !== undefined && value !== null && value !== '') {
            params.set(key, String(value));
          } else {
            params.delete(key);
          }
        }
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActiveFilters =
    (filters.styles && filters.styles.length > 0) || !!filters.layoutType || !!filters.role || !!filters.primaryColor;

  return { filters, setFilters, resetFilters, hasActiveFilters };
}
