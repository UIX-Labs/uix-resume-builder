'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import FilterDropdown from './filter-drop-down';
import { FILTER_OPTIONS } from './filter-options';
import SelectedFilters from './selected-filter';

export default function TemplateFilter({ results }: { results: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

 
  const formatQueryValue = (value: string) =>
    value.toLowerCase().trim().replace(/\s+/g, '_');

  const getLabelFromValue = (category: keyof typeof FILTER_OPTIONS, urlValue: string) => {
    const options = (FILTER_OPTIONS as any)[category] as { label: string; value: string }[];
    const option = options.find((opt) => formatQueryValue(opt.value) === urlValue);
    return option ? option.label : urlValue;
  };

  
  const getValueFromLabel = (category: keyof typeof FILTER_OPTIONS, label: string) => {
    const options = (FILTER_OPTIONS as any)[category] as { label: string; value: string }[];
    const option = options.find((opt) => opt.label === label);
    return option ? option.value : label;
  };

  
  const style =
    searchParams.get('style')?.split(',').filter(Boolean) || [];
  const column =
    searchParams.get('column')?.split(',').filter(Boolean) || [];
  const role =
    searchParams.get('role')?.split(',').filter(Boolean) || [];


  const updateFilter = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set(
        key,
        values.map((v) => formatQueryValue(v)).join(',')
      );
    } else {
      params.delete(key);
    }
    params.delete('offset');

   router.replace(`?${params.toString()}`, { scroll: false});
  };

  
  const clearAll = () => router.replace('?', { scroll: false});

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full bg-white rounded-3xl px-6 py-4 flex items-center gap-4 border">
        <span className="text-md font-semibold text-black">
          Filter by
        </span>

        {/* STYLE */}
        <FilterDropdown
          label="Style"
          options={FILTER_OPTIONS.style}
          selectedValues={style.map((s) => getLabelFromValue('style', s))}
          onSelect={(vals) => updateFilter('style', vals)}
        />

        {/* COLUMN */}
        <FilterDropdown
          label="Column"
          options={FILTER_OPTIONS.column}
          selectedValues={column.map((c) => getLabelFromValue('column', c))}
          onSelect={(vals) => updateFilter('column', vals)}
        />

        {/* ROLE */}
        <FilterDropdown
          label="Role"
          options={FILTER_OPTIONS.role}
          selectedValues={role.map((r) => getLabelFromValue('role', r))}
          onSelect={(vals) => updateFilter('role', vals)}
        />
      </div>


         

      {/* SELECTED FILTERS DISPLAY */}
      <SelectedFilters
        style={style.map((s) => getLabelFromValue('style', s))}
        column={column.map((c) => getLabelFromValue('column', c))}
        role={role.map((r) => getLabelFromValue('role', r))}
        results={results}
        onClearAll={clearAll}
        onRemoveStyle={(label) =>
          updateFilter(
            'style',
            style
              .filter((s) => getLabelFromValue('style', s) !== label)
              .map((s) => getValueFromLabel('style', getLabelFromValue('style', s)))
          )
        }
        onRemoveColumn={(label) =>
          updateFilter(
            'column',
            column
              .filter((c) => getLabelFromValue('column', c) !== label)
              .map((c) => getValueFromLabel('column', getLabelFromValue('column', c)))
          )
        }
        onRemoveRole={(label) =>
          updateFilter(
            'role',
            role
              .filter((r) => getLabelFromValue('role', r) !== label)
              .map((r) => getValueFromLabel('role', getLabelFromValue('role', r)))
          )
        }
      />
    </div>
  );
}