'use client';

import { updateFilters } from '@shared/hooks/update-filter';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useTemplateFilters } from '@shared/hooks/use-template-filter';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterDropdown from './filter-drop-down';
import { FILTER_OPTIONS } from './filter-options';
import MobileFilterChip from './mobile-filter-chip';
import SelectedFilters from './selected-filter';


export default function TemplateFilter({ results }: { results: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
 const { filters } = useTemplateFilters();
  // Parse current params


  const getLabelFromValue = (category: keyof typeof FILTER_OPTIONS, value: string) => {
    const options = (FILTER_OPTIONS as any)[category] as { label: string; value: string }[];
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const clearAll = () => router.replace('?', { scroll: false });

  const getStyleDisplayValues = () => {
    const labels = filters.style.map((s) => getLabelFromValue('style', s));
    if(filters.hasProfilePhoto === 'true') labels.push('With Photo');
if(filters.hasProfilePhoto === 'false') labels.push('Without Photo');
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
              ...filters.style,
              ...(filters.hasProfilePhoto === 'true' ? ['with_photo'] : []),
              ...(filters.hasProfilePhoto === 'false' ? ['without_photo'] : []),
            ]}
            onSelect={(vals) => {
              const photoVals = vals.filter((v) => v === 'with_photo' || v === 'without_photo');
              const styleVals = vals.filter((v) => v !== 'with_photo' && v !== 'without_photo');

              const photoParams = photoVals.map((v) => (v === 'with_photo' ? 'true' : 'false'));

              updateFilters({
                style: styleVals,
                hasProfilePhoto: photoParams.length === 2 ? null : photoParams.length === 1 ? photoParams[0] : null,
              },searchParams,router);
            }}
          />

          {/* LAYOUT TYPE Dropdown */}
          <FilterDropdown
            label="Column"
            options={FILTER_OPTIONS.layoutType}
            selectedValues={filters.layoutType}
            onSelect={(vals) => updateFilters({ layoutType: vals }, searchParams, router)}
          />

          {/* ROLE Dropdown */}
          <FilterDropdown
            label="Role"
            options={FILTER_OPTIONS.role}
            selectedValues={filters.role}
            onSelect={(vals) => updateFilters({ role: vals }, searchParams, router)}
          />
        </div>

        {/* SELECTED FILTERS DISPLAY */}
        <SelectedFilters
          style={getStyleDisplayValues()}
          column={filters.layoutType.map((l) => getLabelFromValue('layoutType', l))}
          role={filters.role.map((r) => getLabelFromValue('role', r))}
          results={results}
          onClearAll={clearAll}
          onRemoveStyle={(label) => {
            if (label === 'With Photo' || label === 'Without Photo') {
              updateFilters({ hasProfilePhoto: null },searchParams,router);
            } else {
              const valueToRemove = FILTER_OPTIONS.style.find((opt) => opt.label === label)?.value;
              updateFilters({ style: filters.style.filter((s) => s !== valueToRemove) },searchParams,router);
            }
          }}
          onRemoveColumn={(label) => {
            const valueToRemove = FILTER_OPTIONS.layoutType.find((opt: any) => opt.label === label)?.value;
            updateFilters({ layoutType: filters.layoutType.filter((l: string) => l !== valueToRemove) },searchParams,router);
          }}
          onRemoveRole={(label) => {
            const valueToRemove = FILTER_OPTIONS.role.find((opt: any) => opt.label === label)?.value;
            updateFilters({ role: filters.role.filter((r: string) => r !== valueToRemove) },searchParams,router);
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
            },searchParams,router);
          }}
          results={results}
        />
      )}
    </>
  );
}
