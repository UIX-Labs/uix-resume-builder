import { useSearchParams } from 'next/navigation';
export interface TemplateFilters {
  style: string[];
  layoutType: string[];
  role: string[];
  hasProfilePhoto?: string; 
}

export const useTemplateFilters = () => {
  const searchParams = useSearchParams();

  const filters: TemplateFilters = {
    style: searchParams.get('style')?.split(',').filter(Boolean) || [],
    layoutType: searchParams.get('layoutType')?.split(',').filter(Boolean) || [],
    role: searchParams.get('role')?.split(',').filter(Boolean) || [],
    hasProfilePhoto: searchParams.get('hasProfilePhoto') || undefined, 
  };

  const hasFilters =
    filters.style.length > 0 ||
    filters.layoutType.length > 0 ||
    filters.role.length > 0 ||
    filters.hasProfilePhoto !== undefined;

  return { filters, hasFilters };
};