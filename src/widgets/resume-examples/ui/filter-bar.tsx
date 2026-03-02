'use client';

import { cn } from '@shared/lib/cn';
import type { ExampleFilters } from '@entities/resume-example/types';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterBarProps {
  filters: ExampleFilters;
  onFilterChange: (newFilters: Partial<ExampleFilters>) => void;
  onReset: () => void;
}

const EXPERIENCE_OPTIONS = [
  { label: 'Any', value: undefined },
  { label: '0 years', value: 0 },
  { label: '1-2 years', value: 1 },
  { label: '3-5 years', value: 3 },
  { label: '5+ years', value: 5 },
];

const LAYOUT_OPTIONS = [
  { label: 'Any', value: undefined },
  { label: 'Single Column', value: 'single-column' },
  { label: 'Two Column', value: 'two-column' },
];

const COLOR_OPTIONS = [
  { label: 'Any', value: undefined, hex: undefined },
  { label: 'Blue', value: '#2563EB', hex: '#2563EB' },
  { label: 'Green', value: '#059669', hex: '#059669' },
  { label: 'Purple', value: '#7C3AED', hex: '#7C3AED' },
  { label: 'Red', value: '#DC2626', hex: '#DC2626' },
  { label: 'Amber', value: '#F59E0B', hex: '#F59E0B' },
  { label: 'Pink', value: '#EC4899', hex: '#EC4899' },
  { label: 'Slate', value: '#1E293B', hex: '#1E293B' },
];

const hasActiveFilters = (filters: ExampleFilters) =>
  filters.role || filters.experienceYears !== undefined || filters.layout || filters.primaryColor;

export function FilterBar({ filters, onFilterChange, onReset }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <SlidersHorizontal className="w-4 h-4" />
        <span className="font-medium">Filters:</span>
      </div>

      {/* Experience filter */}
      <select
        value={filters.experienceYears ?? ''}
        onChange={(e) =>
          onFilterChange({
            experienceYears: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Experience: Any</option>
        {EXPERIENCE_OPTIONS.filter((o) => o.value !== undefined).map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Layout filter */}
      <select
        value={filters.layout ?? ''}
        onChange={(e) => onFilterChange({ layout: e.target.value || undefined })}
        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Layout: Any</option>
        {LAYOUT_OPTIONS.filter((o) => o.value !== undefined).map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Color filter */}
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-gray-500">Color:</span>
        {COLOR_OPTIONS.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onFilterChange({ primaryColor: opt.value })}
            className={cn(
              'w-6 h-6 rounded-full border-2 transition-all cursor-pointer',
              filters.primaryColor === opt.value
                ? 'border-blue-600 scale-110'
                : 'border-gray-200 hover:border-gray-400',
              !opt.hex && 'bg-gradient-to-br from-gray-200 to-gray-400',
            )}
            style={opt.hex ? { backgroundColor: opt.hex } : undefined}
            title={opt.label}
          />
        ))}
      </div>

      {/* Reset filters */}
      {hasActiveFilters(filters) && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <X className="w-3 h-3" />
          Clear filters
        </button>
      )}
    </div>
  );
}
