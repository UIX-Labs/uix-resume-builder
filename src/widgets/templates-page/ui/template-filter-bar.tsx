'use client';

import { cn } from '@shared/lib/cn';
import type { Template } from '@entities/template-page/api/template-data';
import type { TemplateFilters } from '@entities/template-page/types/template-filters';
import { ChevronDown, RefreshCw, X } from 'lucide-react';
import { useMemo, useRef, useState, useEffect } from 'react';

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

function formatRoleName(name: string): string {
  return name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function StyleMultiSelect({ selected, onChange }: { selected: string[]; onChange: (styles: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const label = useMemo(() => {
    if (selected.length === 0) return 'Style';
    const first = STYLE_OPTIONS.find((o) => o.value === selected[0])?.label ?? selected[0];
    if (selected.length === 1) return `Style : ${first}`;
    return `Style : ${first} + ${selected.length - 1}`;
  }, [selected]);

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm bg-white cursor-pointer transition-colors',
          selected.length > 0 ? 'border-blue-300 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-gray-300',
        )}
      >
        {label}
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px]">
          {STYLE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggle(opt.value)}
                className="rounded border-gray-300"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
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
  const uniqueRoles = useMemo(() => {
    const roleMap = new Map<string, string>();
    for (const t of templates) {
      for (const r of t.roles || []) {
        if (!roleMap.has(r.name)) roleMap.set(r.name, r.name);
      }
    }
    return Array.from(roleMap.values()).sort();
  }, [templates]);

  const uniqueColors = useMemo(() => {
    const colorSet = new Map<string, string>();
    for (const t of templates) {
      for (const cv of t.colorVariations || []) {
        const hex = cv.primaryColor.toLowerCase();
        if (!colorSet.has(hex)) colorSet.set(hex, cv.name);
      }
    }
    const fromApi = Array.from(colorSet.entries()).map(([hex, name]) => ({ hex, name }));
    return fromApi.length > 0 ? fromApi : DEFAULT_COLORS;
  }, [templates]);

  const activeFilterPills: { label: string; onRemove: () => void }[] = useMemo(() => {
    const pills: { label: string; onRemove: () => void }[] = [];
    if (filters.styles) {
      for (const style of filters.styles) {
        const opt = STYLE_OPTIONS.find((o) => o.value === style);
        pills.push({
          label: opt?.label ?? style,
          onRemove: () => onFilterChange({ styles: filters.styles?.filter((s) => s !== style) }),
        });
      }
    }
    if (filters.layoutType) {
      const opt = COLUMN_OPTIONS.find((o) => o.value === filters.layoutType);
      pills.push({
        label: opt?.label ?? filters.layoutType,
        onRemove: () => onFilterChange({ layoutType: undefined }),
      });
    }
    if (filters.role) {
      pills.push({
        label: formatRoleName(filters.role),
        onRemove: () => onFilterChange({ role: undefined }),
      });
    }
    if (filters.primaryColor) {
      const colorEntry = uniqueColors.find((c) => c.hex === filters.primaryColor?.toLowerCase());
      pills.push({
        label: colorEntry?.name ?? filters.primaryColor,
        onRemove: () => onFilterChange({ primaryColor: undefined }),
      });
    }
    return pills;
  }, [filters, onFilterChange, uniqueColors]);

  return (
    <div className={cn('flex flex-col w-full', align === 'center' ? 'items-center' : 'items-start')}>
      {/* Row 1: Filter controls — Figma: W 1075, H 71, Gap 19 */}
      <div
        className={cn(
          'flex items-center gap-[19px] bg-white rounded-2xl px-4 py-3 shadow-sm flex-nowrap overflow-x-auto scrollbar-hide',
          align === 'center' ? 'justify-center' : 'justify-start',
        )}
      >
        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Filter by :</span>

        <StyleMultiSelect selected={filters.styles || []} onChange={(styles) => onFilterChange({ styles })} />

        <select
          value={filters.layoutType ?? ''}
          onChange={(e) => onFilterChange({ layoutType: e.target.value || undefined })}
          className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">Column</option>
          {COLUMN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={filters.role ?? ''}
          onChange={(e) => onFilterChange({ role: e.target.value || undefined })}
          className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">Role</option>
          {uniqueRoles.map((role) => (
            <option key={role} value={role}>
              {formatRoleName(role)}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-[13px] flex-shrink-0">
          <span className="text-sm text-gray-500 whitespace-nowrap">Colors :</span>
          {uniqueColors.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() =>
                onFilterChange({
                  primaryColor: filters.primaryColor?.toLowerCase() === c.hex ? undefined : c.hex,
                })
              }
              className={cn(
                'w-[22px] h-[22px] rounded-full transition-all cursor-pointer',
                filters.primaryColor?.toLowerCase() === c.hex
                  ? 'ring-2 ring-offset-2 ring-blue-600 scale-110'
                  : 'hover:scale-110',
              )}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Row 2: Active filters — smooth reveal with grid transition to avoid layout jerk */}
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
  );
}
