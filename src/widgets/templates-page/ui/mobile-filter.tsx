'use client';

import type { TemplateFilters } from '@entities/template-page/types/template-filters';

export type MobileFilter = {
  label: string;
  type: string;
  value: string | null;
};

export default function MobileFilterChip({
  filters,
  activeFilters,
  onSelect,
  results,
}: {
  filters: MobileFilter[];
  activeFilters: TemplateFilters;
  onSelect: (filter: MobileFilter) => void;
  results: number;
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* FILTER CHIPS */}
      <div className="grid grid-cols-2 gap-2">
        {filters.map((filter) => {
          let isSelected = false;

          if (filter.type === 'clear') {
            isSelected =
              !activeFilters.styles?.length &&
              !activeFilters.layoutType?.length &&
              !activeFilters.role?.length &&
              !activeFilters.primaryColor;
          } else {
            const currentValues = activeFilters[filter.type as keyof TemplateFilters];
            isSelected = Array.isArray(currentValues)
              ? currentValues.includes(filter.value as string)
              : currentValues === filter.value;
          }

          return (
            <button
              type="button"
              key={filter.label}
              onClick={() => {
                onSelect(filter);
              }}
              className={`px-2 py-2 rounded-lg text-center cursor-pointer
              ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* RESULTS BUTTON */}
      <button type="button" className="w-fit mx-auto bg-blue-500 text-white py-2 px-6 rounded-full">
        Results ({results})
      </button>
    </div>
  );
}
