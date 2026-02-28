'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import FilterDropdown from './filter-drop-down';
import { FILTER_OPTIONS } from './filter-options';
import SelectedFilters from './selected-filter';

export default function TemplateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const style = searchParams.get('style') || '';
  const column = searchParams.get('column') || '';
  const role = searchParams.get('role') || '';
  const color = searchParams.get('color') || '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const clearAll = () => {
    router.push('?');
  };

  const results = 10;

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full bg-white rounded-3xl px-6 py-4 flex items-center gap-4 border">
        <span className="text-md font-semibold text-black">Filter by</span>

        <FilterDropdown
          label="Style"
          options={FILTER_OPTIONS.style}
          selectedValue={style}
          onSelect={(val) => updateFilter('style', val)}
        />
        <FilterDropdown
          label="Column"
          options={FILTER_OPTIONS.column}
          selectedValue={column}
          onSelect={(val) => updateFilter('column', val)}
        />
        <FilterDropdown
          label="Role"
          options={FILTER_OPTIONS.role}
          selectedValue={role}
          onSelect={(val) => updateFilter('role', val)}
        />

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-gray-400">Colors</span>
          {FILTER_OPTIONS.colors.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => updateFilter('color', color === c ? '' : c)}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                color === c ? 'border-blue-500 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <SelectedFilters
        style={style}
        column={column}
        role={role}
        results={results}
        onClearAll={clearAll}
        onRemoveStyle={() => updateFilter('style', '')}
        onRemoveColumn={() => updateFilter('column', '')}
        onRemoveRole={() => updateFilter('role', '')}
      />
    </div>
  );
}
