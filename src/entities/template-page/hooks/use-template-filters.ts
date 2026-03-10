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
    const layoutTypeParam = searchParams.get('layoutType');
    const roleParam = searchParams.get('role');
    const colorParam = searchParams.get('color');

    return {
      styles: stylesParam ? stylesParam.split(',') : undefined,
      layoutType: layoutTypeParam ? layoutTypeParam.split(',') : undefined,
      role: roleParam ? roleParam.split(',') : undefined,
      primaryColor: colorParam || undefined,
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (newFilters: Partial<TemplateFilters>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(newFilters)) {
        const paramKey = key === 'primaryColor' ? 'color' : key;

        if (key === 'primaryColor') {
          if (value) {
            params.set(paramKey, String(value));
          } else {
            params.delete(paramKey);
          }
          continue;
        }

        const arr = value as string[] | undefined;
        if (arr && arr.length > 0) {
          params.set(paramKey, arr.join(','));
        } else {
          params.delete(paramKey);
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
