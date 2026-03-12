'use client';

import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import type { Template } from '@entities/template-page/api/template-data';
import type { TemplateFilters } from '@entities/template-page/types/template-filters';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { cn } from '@shared/lib/cn';
import { Checkbox } from '@shared/ui/checkbox';
import { ChevronDown, RefreshCw, X } from 'lucide-react';
import { useMemo } from 'react';
import MobileFilterChip, { type MobileFilter } from './mobile-filter';

interface TemplateFilterBarProps {
  filters: TemplateFilters;
  onFilterChange: (newFilters: Partial<TemplateFilters>) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  templates: Template[];
  resultCount: number;
  align?: 'center' | 'start';
}

const STYLE_OPTIONS = [
  { label: 'Traditional', value: 'traditional' },
  { label: 'Modern', value: 'modern' },
  { label: 'Creative', value: 'creative' },
  { label: 'Contemporary', value: 'contemporary' },
  { label: 'Minimalist', value: 'minimalist' },
];

const COLUMN_OPTIONS = [
  { label: 'Single Column', value: 'single_column' },
  { label: 'Double Column', value: 'double_column' },
];

const DEFAULT_COLORS = [
  { hex: '#c5244e', name: 'Red' },
  { hex: '#e84c30', name: 'Orange' },
  { hex: '#2db87d', name: 'Green' },
  { hex: '#30a87d', name: 'Teal' },
  { hex: '#f5c542', name: 'Yellow' },
  { hex: '#7b3fa0', name: 'Purple' },
  { hex: '#e24e8a', name: 'Pink' },
  { hex: '#7fdfef', name: 'Cyan' },
  { hex: '#1a5fb4', name: 'Blue' },
];

const MOBILE_FILTERS: MobileFilter[] = [
  { label: 'All Templates', type: 'clear', value: null },

  { label: 'Traditional', type: 'styles', value: 'traditional' },
  { label: 'Modern', type: 'styles', value: 'modern' },
  { label: 'Creative', type: 'styles', value: 'creative' },

  { label: 'Single Column', type: 'layoutType', value: 'single_column' },
];

function formatRoleName(name: string): string {
  return name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

interface FilterMultiSelectProps {
  label: string;
  selected: string[];
  options: { label: string; value: string; hex?: string }[];
  onChange: (values: string[]) => void;
}

function FilterMultiSelect({ label, selected, options, onChange }: FilterMultiSelectProps) {
  const displayLabel = useMemo(() => {
    if (selected.length === 0) return label;
    const firstValue = selected[0];
    const firstOption = options.find((o) => o.value === firstValue);
    const firstLabel = firstOption
      ? label === 'Role'
        ? formatRoleName(firstOption.label)
        : firstOption.label
      : firstValue;

    if (selected.length === 1) return `${label} : ${firstLabel}`;
    return `${label} : ${firstLabel} + ${selected.length - 1}`;
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
            {opt.hex && (
              <span
                className="w-3 h-3 rounded-full border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: opt.hex }}
              />
            )}
            <span className="flex-1 truncate">{label === 'Role' ? formatRoleName(opt.label) : opt.label}</span>
          </Label>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export function TemplateFilterBar({
  filters,
  onFilterChange,
  onReset,
  hasActiveFilters,
  templates,
  resultCount,
  align = 'center',
}: TemplateFilterBarProps) {
  const isMobile = useIsMobile();
  const roleOptions = useMemo(() => {
    const roleMap = new Map<string, string>();
    for (const t of templates) {
      for (const r of t.roles || []) {
        if (!roleMap.has(r.name)) roleMap.set(r.name, r.name);
      }
    }
    return Array.from(roleMap.values())
      .sort()
      .map((role) => ({ label: role, value: role }));
  }, [templates]);

  console.log(roleOptions);

  const colorOptions = useMemo(() => {
    const colorSet = new Map<string, string>();
    for (const t of templates) {
      for (const cv of t.colorVariations || []) {
        const hex = cv.primaryColor.toLowerCase();
        if (!colorSet.has(hex)) colorSet.set(hex, cv.name);
      }
    }
    const fromApi = Array.from(colorSet.entries()).map(([hex, name]) => ({ label: name, value: hex, hex }));
    return fromApi.length > 0 ? fromApi : DEFAULT_COLORS.map((c) => ({ label: c.name, value: c.hex, hex: c.hex }));
  }, [templates]);

  const activeFilterPills: { label: string; onRemove: () => void }[] = useMemo(() => {
    const pills: { label: string; onRemove: () => void }[] = [];

    // Styles
    if (filters.styles) {
      for (const style of filters.styles) {
        const opt = STYLE_OPTIONS.find((o) => o.value === style);
        pills.push({
          label: opt?.label ?? style,
          onRemove: () => onFilterChange({ styles: filters.styles?.filter((s) => s !== style) }),
        });
      }
    }

    // Layout
    if (filters.layoutType) {
      for (const layout of filters.layoutType) {
        const opt = COLUMN_OPTIONS.find((o) => o.value === layout);
        pills.push({
          label: opt?.label ?? layout,
          onRemove: () => onFilterChange({ layoutType: filters.layoutType?.filter((l) => l !== layout) }),
        });
      }
    }

    // Roles
    if (filters.role) {
      for (const role of filters.role) {
        pills.push({
          label: formatRoleName(role),
          onRemove: () => onFilterChange({ role: filters.role?.filter((r) => r !== role) }),
        });
      }
    }

    // Colors
    if (filters.primaryColor) {
      const colorEntry = colorOptions.find((c) => c.value === filters.primaryColor?.toLowerCase());
      pills.push({
        label: colorEntry?.label ?? filters.primaryColor,
        onRemove: () => onFilterChange({ primaryColor: undefined }),
      });
    }

    return pills;
  }, [filters, onFilterChange, colorOptions]);

  return (
    <>
      <div className={cn('md:flex flex-col w-full hidden', align === 'center' ? 'items-center' : 'items-start')}>
        {/* Row 1: Filter controls */}
        <div
          className={cn(
            'flex items-center bg-white rounded-2xl px-6 py-4 shadow-sm flex-nowrap scrollbar-hide w-full max-w-[1112px]',
            align === 'center' ? 'justify-between' : 'justify-between',
          )}
        >
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-600 whitespace-nowrap mr-2">Filters :</span>

            <FilterMultiSelect
              label="Style"
              selected={filters.styles || []}
              options={STYLE_OPTIONS}
              onChange={(styles) => onFilterChange({ styles })}
            />

            <FilterMultiSelect
              label="Column"
              selected={filters.layoutType || []}
              options={COLUMN_OPTIONS}
              onChange={(layoutType) => onFilterChange({ layoutType })}
            />

            <FilterMultiSelect
              label="Role"
              selected={filters.role || []}
              options={roleOptions}
              onChange={(role) => onFilterChange({ role })}
            />
          </div>

          {/* Color filter — hidden until color swatch implementation is complete
          <div className="flex items-center gap-[15px] flex-shrink-0 bg-gray-50/50 px-4 py-2 rounded-xl border border-gray-100 ml-4">
            <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">Colors :</span>
            <div className="flex items-center gap-3">
              {colorOptions.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      primaryColor: filters.primaryColor?.toLowerCase() === c.value ? undefined : c.value,
                    })
                  }
                  className={cn(
                    'w-[24px] h-[24px] rounded-full transition-all cursor-pointer border border-white shadow-sm',
                    filters.primaryColor?.toLowerCase() === c.value
                      ? 'ring-2 ring-offset-2 ring-blue-600 scale-110'
                      : 'hover:scale-120',
                  )}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                />
              ))}
            </div>
          </div>
          */}
        </div>

        {/* Row 2: Active filters */}
        <div
          className="grid w-full transition-[grid-template-rows] duration-200 ease-out"
          style={{ gridTemplateRows: hasActiveFilters ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                'flex items-center gap-[15px] flex-wrap pt-3',
                align === 'center' ? 'justify-center' : 'justify-start',
              )}
            >
              <span className="text-sm text-gray-500">Results ({resultCount})</span>
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

      {isMobile && (
        <MobileFilterChip
          filters={MOBILE_FILTERS}
          activeFilters={filters}
          onSelect={(filter) => {
            if (filter.type === 'clear') {
              onReset();
              return;
            }
            onFilterChange({
              [filter.type]: filter.value ? [filter.value] : undefined,
            });
          }}
          results={resultCount}
        />
      )}
    </>
  );
}
