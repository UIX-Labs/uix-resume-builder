
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const updateFilters = (
  updates: Record<string, string[] | string | null>,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance
) => {
  const params = new URLSearchParams(searchParams.toString());

  for (const [key, value] of Object.entries(updates)) {
    const resolved = Array.isArray(value) ? value.join(',') : value;
    if (!resolved) {
      params.delete(key);
    } else {
      params.set(key, resolved);
    }
  }

  params.delete('offset');
  router.replace(`?${params.toString()}`, { scroll: false });
};