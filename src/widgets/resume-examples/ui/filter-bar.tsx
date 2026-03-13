'use client';

import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import type { ExampleFilters } from '@entities/resume-example/types';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { cn } from '@shared/lib/cn';
import { Checkbox } from '@shared/ui/checkbox';
import { ChevronDown, RefreshCw, X } from 'lucide-react';
import { useMemo } from 'react';

/* ─── Filter options ─── */

const EXPERIENCE_OPTIONS = [
  { label: 'Entry level', value: '0' },
  { label: '1-2 years', value: '1' },
  { label: '3-5 years', value: '3' },
  { label: '5+ years', value: '5' },
];

const LAYOUT_OPTIONS = [
  { label: 'Single Column', value: 'single-column' },
  { label: 'Two Column', value: 'two-column' },
];

const COLOR_OPTIONS = [
  { hex: '#2563EB', name: 'Blue' },
  { hex: '#059669', name: 'Green' },
  { hex: '#7C3AED', name: 'Purple' },
  { hex: '#DC2626', name: 'Red' },
  { hex: '#F59E0B', name: 'Amber' },
  { hex: '#EC4899', name: 'Pink' },
  { hex: '#1E293B', name: 'Slate' },
];

/* ─── Reusable FilterDropdown sub-component ─── */

interface FilterDropdownProps {
  label: string;
  selected: string[];
  options: { label: string; value: string }[];
  onChange: (values: string[]) => void;
}

function FilterDropdown({ label, selected, options, onChange }: FilterDropdownProps) {
  const displayLabel = useMemo(() => {
    if (selected.length === 0) return label;
    const firstOption = options.find((o) => o.value === selected[0]);
    const firstName = firstOption?.label ?? selected[0];
    if (selected.length === 1) return `${label} : ${firstName}`;
    return `${label} : ${firstName} + ${selected.length - 1}`;
  }, [selected, options, label]);

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium bg-white cursor-pointer transition-all whitespace-nowrap active:scale-[0.98]',
            selected.length > 0
              ? 'border-blue-400 text-blue-700 bg-blue-50/30'
              : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50',
          )}
        >
          {displayLabel}
          <ChevronDown className="w-3.5 h-3.5 transition-transform" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-1 min-w-[180px] max-h-[300px] overflow-y-auto">
        {options.map((opt) => (
          <Label
            key={opt.value}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm rounded"
          >
            <Checkbox
              checked={selected.includes(opt.value)}
              onCheckedChange={() => toggle(opt.value)}
              className="rounded-[2px] border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 size-3.5"
            />
            <span className="flex-1 truncate">{opt.label}</span>
          </Label>
        ))}
      </PopoverContent>
    </Popover>
  );
}

/* ─── FilterBar ─── */

interface FilterBarProps {
  filters: ExampleFilters;
  onFilterChange: (newFilters: Partial<ExampleFilters>) => void;
  onReset: () => void;
  resultCount?: number;
}

export function FilterBar({ filters, onFilterChange, onReset, resultCount }: FilterBarProps) {
  const isMobile = useIsMobile();

  // Convert current single-value filters to arrays for FilterDropdown compatibility
  const selectedExperience = filters.experienceYears !== undefined ? [String(filters.experienceYears)] : [];
  const selectedLayout = filters.layout ? [filters.layout] : [];

  const hasActiveFilters = !!(
    filters.role ||
    filters.experienceYears !== undefined ||
    filters.layout ||
    filters.primaryColor
  );

  const activeFilterPills: { label: string; onRemove: () => void }[] = useMemo(() => {
    const pills: { label: string; onRemove: () => void }[] = [];

    if (filters.experienceYears !== undefined) {
      const opt = EXPERIENCE_OPTIONS.find((o) => o.value === String(filters.experienceYears));
      pills.push({
        label: opt?.label ?? `${filters.experienceYears}yr exp`,
        onRemove: () => onFilterChange({ experienceYears: undefined }),
      });
    }

    if (filters.layout) {
      const opt = LAYOUT_OPTIONS.find((o) => o.value === filters.layout);
      pills.push({
        label: opt?.label ?? filters.layout,
        onRemove: () => onFilterChange({ layout: undefined }),
      });
    }

    if (filters.primaryColor) {
      const color = COLOR_OPTIONS.find((c) => c.hex.toLowerCase() === filters.primaryColor?.toLowerCase());
      pills.push({
        label: color?.name ?? filters.primaryColor,
        onRemove: () => onFilterChange({ primaryColor: undefined }),
      });
    }

    return pills;
  }, [filters, onFilterChange]);

  // Mobile: chip-style filters
  if (isMobile) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">Filters:</span>

          {/* Experience chips */}
          {EXPERIENCE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                onFilterChange({
                  experienceYears: selectedExperience.includes(opt.value) ? undefined : Number(opt.value),
                })
              }
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer',
                selectedExperience.includes(opt.value)
                  ? 'bg-blue-50 border-blue-400 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
              )}
            >
              {opt.label}
            </button>
          ))}

          {/* Layout chips */}
          {LAYOUT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                onFilterChange({
                  layout: selectedLayout.includes(opt.value) ? undefined : opt.value,
                })
              }
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer',
                selectedLayout.includes(opt.value)
                  ? 'bg-blue-50 border-blue-400 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Color swatches (mobile) */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">Colors:</span>
          <div className="flex items-center gap-2">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() =>
                  onFilterChange({
                    primaryColor: filters.primaryColor?.toLowerCase() === c.hex.toLowerCase() ? undefined : c.hex,
                  })
                }
                className={cn(
                  'w-[24px] h-[24px] rounded-full transition-all cursor-pointer border border-white shadow-sm',
                  filters.primaryColor?.toLowerCase() === c.hex.toLowerCase()
                    ? 'ring-2 ring-offset-2 ring-blue-600 scale-110'
                    : 'hover:scale-110',
                )}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="self-start inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Clear filters
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  // Desktop: Popover dropdowns + color swatches
  return (
    <div className="flex flex-col w-full items-center">
      {/* Row 1: Filter controls */}
      <div className="flex items-center bg-white rounded-2xl px-6 py-4 shadow-sm w-full max-w-[1112px] justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-600 whitespace-nowrap mr-2">Filters :</span>

          <FilterDropdown
            label="Experience"
            selected={selectedExperience}
            options={EXPERIENCE_OPTIONS}
            onChange={(values) =>
              onFilterChange({ experienceYears: values.length > 0 ? Number(values[values.length - 1]) : undefined })
            }
          />

          <FilterDropdown
            label="Layout"
            selected={selectedLayout}
            options={LAYOUT_OPTIONS}
            onChange={(values) =>
              onFilterChange({ layout: values.length > 0 ? values[values.length - 1] : undefined })
            }
          />
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-[15px] flex-shrink-0 bg-gray-50/50 px-4 py-2 rounded-xl border border-gray-100 ml-4">
          <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">Colors :</span>
          <div className="flex items-center gap-3">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() =>
                  onFilterChange({
                    primaryColor: filters.primaryColor?.toLowerCase() === c.hex.toLowerCase() ? undefined : c.hex,
                  })
                }
                className={cn(
                  'w-[24px] h-[24px] rounded-full transition-all cursor-pointer border border-white shadow-sm',
                  filters.primaryColor?.toLowerCase() === c.hex.toLowerCase()
                    ? 'ring-2 ring-offset-2 ring-blue-600 scale-110'
                    : 'hover:scale-120',
                )}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Active filter pills */}
      <div
        className="grid w-full transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: hasActiveFilters ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="flex items-center gap-[15px] flex-wrap pt-3 justify-center">
            {resultCount !== undefined && (
              <span className="text-sm text-gray-500">Results ({resultCount})</span>
            )}
            {activeFilterPills.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
              >
                {pill.label}
                <button type="button" onClick={pill.onRemove} className="hover:text-red-500 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Clear filters
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
