'use client';

import { useState } from 'react';

type MobileFilter = {
  label: string;
  type: string;
  value: string | null;
};

export default function MobileFilterChip({
  filters,
  onSelect,
  results,
}: {
  filters: MobileFilter[];
  onSelect: (filter: MobileFilter) => void;
  results: number;
}) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {/* FILTER CHIPS */}
      <div className="grid grid-cols-2 gap-2">
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter.label;

          return (
            <button
            type='button'
              key={filter.label}
              onClick={() => {
                setSelectedFilter(filter.label);
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
      <button type="button" className="w-fit mx-auto bg-blue-500 text-white py-2 px-6 rounded-full">Results ({results})</button>
    </div>
  );
}
