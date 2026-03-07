'use client';
import { X } from 'lucide-react';
interface Props {
  style: string[];
  column: string[];
  role: string[];
  results: number;
  onClearAll: () => void;
  onRemoveStyle: (val: string) => void;
  onRemoveColumn: (val: string) => void;
  onRemoveRole: (val: string) => void;
}

export default function SelectedFilters({
  style,
  column,
  role,
  results,
  onClearAll,
  onRemoveStyle,
  onRemoveColumn,
  onRemoveRole,
}: Props) {
  const hasFilters = style.length > 0 || column.length > 0 || role.length > 0;
  if (!hasFilters) return null;

  return (
    <div className="rounded-xl px-4 py-3 flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-600">Results ({results})</span>

      {style.map((val) => (
        <Chip key={val} label={val} onRemove={() => onRemoveStyle(val)} />
      ))}
      {column.map((val) => (
        <Chip key={val} label={val} onRemove={() => onRemoveColumn(val)} />
      ))}
      {role.map((val) => (
        <Chip key={val} label={val} onRemove={() => onRemoveRole(val)} />
      ))}

      {hasFilters && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-sm text-blue-600 underline ml-2 cursor-pointer flex items-center"
        >
          Clear filters
          <div className="relative w-4 h-4 ml-1">
            <X className="w-4 h-4 ml-1" />
          </div>
        </button>
      )}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[#E7EEF3] border border-gray-200 cursor-pointer">
      <span>{label}</span>
      <button type="button" onClick={onRemove} className="cursor-pointer">
        <X className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}
