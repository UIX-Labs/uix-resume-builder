'use client';

import { useIsMobile } from '@shared/hooks/use-mobile';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterDropdown from './filter-drop-down';
import { FILTER_OPTIONS } from './filter-options';
import MobileFilterChip from './mobile-filter-chip';
import SelectedFilters from './selected-filter';

export default function TemplateFilter({ results }: { results: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  // Parse current params
  const style = searchParams.get('style')?.split(',').filter(Boolean) || [];
  const layoutType = searchParams.get('layoutType')?.split(',').filter(Boolean) || [];
  const role = searchParams.get('role')?.split(',').filter(Boolean) || [];
  const hasProfilePhoto = searchParams.get('hasProfilePhoto');

  const getLabelFromValue = (category: keyof typeof FILTER_OPTIONS, value: string) => {
    const options = (FILTER_OPTIONS as any)[category] as { label: string; value: string }[];
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const updateFilters = (updates: Record<string, string[] | string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, value);
      }
    }

    params.delete('offset');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => router.replace('?', { scroll: false });

  const getStyleDisplayValues = () => {
    const labels = style.map((s) => getLabelFromValue('style', s));
    if (hasProfilePhoto?.split(',').includes('true')) labels.push('With Photo');
    if (hasProfilePhoto?.split(',').includes('false')) labels.push('Without Photo');
    return labels;
  };

  const MOBILE_FILTERS: MobileFilter[] = [
    { label: 'All Templates', type: 'clear', value: null },

    { label: 'Traditional', type: 'style', value: 'traditional' },
    { label: 'Modern', type: 'style', value: 'modern' },
    { label: 'Creative', type: 'style', value: 'creative' },

    { label: 'Single Column', type: 'layoutType', value: 'single_column' },
  ];

  return (
    <>
      <div className="hidden md:flex flex-col gap-3">
        <div className="w-full bg-white rounded-3xl md:px-6 md:py-4 flex items-center gap-4 border p-0">
          <span className="text-md font-semibold text-black">Filter by</span>

          {/* STYLE Dropdown */}
          <FilterDropdown
            label="Style"
            options={FILTER_OPTIONS.style}
            selectedValues={[
              ...style,
              ...(hasProfilePhoto?.split(',').includes('true') ? ['with_photo'] : []),
              ...(hasProfilePhoto?.split(',').includes('false') ? ['without_photo'] : []),
            ]}
            onSelect={(vals) => {
              const photoVals = vals.filter((v) => v === 'with_photo' || v === 'without_photo');
              const styleVals = vals.filter((v) => v !== 'with_photo' && v !== 'without_photo');

              const photoParams = photoVals.map((v) => (v === 'with_photo' ? 'true' : 'false'));

              updateFilters({
                style: styleVals,
                hasProfilePhoto: photoParams.length > 0 ? photoParams.join(',') : null,
              });
            }}
          />

          {/* LAYOUT TYPE Dropdown */}
          <FilterDropdown
            label="Column"
            options={FILTER_OPTIONS.layoutType}
            selectedValues={layoutType}
            onSelect={(vals) => updateFilters({ layoutType: vals })}
          />

          {/* ROLE Dropdown */}
          <FilterDropdown
            label="Role"
            options={FILTER_OPTIONS.role}
            selectedValues={role}
            onSelect={(vals) => updateFilters({ role: vals })}
          />
        </div>

        {/* SELECTED FILTERS DISPLAY */}
        <SelectedFilters
          style={getStyleDisplayValues()}
          column={layoutType.map((l) => getLabelFromValue('layoutType', l))}
          role={role.map((r) => getLabelFromValue('role', r))}
          results={results}
          onClearAll={clearAll}
          onRemoveStyle={(label) => {
            if (label === 'With Photo' || label === 'Without Photo') {
              updateFilters({ hasProfilePhoto: null });
            } else {
              const valueToRemove = FILTER_OPTIONS.style.find((opt) => opt.label === label)?.value;
              updateFilters({ style: style.filter((s) => s !== valueToRemove) });
            }
          }}
          onRemoveColumn={(label) => {
            const valueToRemove = FILTER_OPTIONS.layoutType.find((opt: any) => opt.label === label)?.value;
            updateFilters({ layoutType: layoutType.filter((l) => l !== valueToRemove) });
          }}
          onRemoveRole={(label) => {
            const valueToRemove = FILTER_OPTIONS.role.find((opt: any) => opt.label === label)?.value;
            updateFilters({ role: role.filter((r) => r !== valueToRemove) });
          }}
        />
      </div>

      {isMobile && (
        <MobileFilterChip
          filters={MOBILE_FILTERS}
          onSelect={(filter) => {
            if (filter.type === 'clear') {
              clearAll();
              return;
            }

            updateFilters({
              [filter.type]: filter.value ? [filter.value] : null,
            });
          }}
          results={results}
        />
      )}
    </>
  );
}
