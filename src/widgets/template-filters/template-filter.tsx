'use client';

import { useState } from 'react';
import FilterDropdown from './filter-drop-down';
import { FILTER_OPTIONS } from './filter-options';
import SelectedFilters from './selected-filter';

export default function TemplateFilter() {
  const [style, setStyle] = useState('');
  const [column, setColumn] = useState('');
  const [role, setRole] = useState('');
  const [color, setColor] = useState('');

  const results = 10;

  const clearAll = () => {
    setStyle('');
    setColumn('');
    setRole('');
    setColor('');
  };

  return (
    <div className="flex flex-col gap-3">
      {/* TOP BAR */}
      <div className="w-full bg-white rounded-3xl px-6 py-4 flex items-center gap-4 border">
        <span className="text-md font-semibold text-black">Filter by</span>

        <FilterDropdown label="Style" options={FILTER_OPTIONS.style} selectedValue={style} onSelect={setStyle} />

        <FilterDropdown label="Column" options={FILTER_OPTIONS.column} selectedValue={column} onSelect={setColumn} />

        <FilterDropdown label="Role" options={FILTER_OPTIONS.role} selectedValue={role} onSelect={setRole} />

        {/* COLORS */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-gray-400">Colors</span>

          {FILTER_OPTIONS.colors.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full border-2  cursor-pointer ${
                color === c ? 'border-blue-500 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* SELECTED FILTERS */}
      <SelectedFilters
        style={style}
        column={column}
        role={role}
        results={results}
        onClearAll={clearAll}
        onRemoveStyle={() => setStyle('')}
        onRemoveColumn={() => setColumn('')}
        onRemoveRole={() => setRole('')}
      />
    </div>
  );
}
