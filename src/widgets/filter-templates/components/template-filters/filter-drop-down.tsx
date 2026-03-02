'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ---------------- TYPES ---------------- */

export interface Option {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: Option[];
  selectedValues: string[];
  onSelect: (values: string[]) => void;
}

/* ---------------- COMPONENT ---------------- */

export default function FilterDropdown({ label, options, selectedValues, onSelect }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelect(selectedValues.filter((v) => v !== value));
    } else {
      onSelect([...selectedValues, value]);
    }
  };

  const getLabel = () => {
    if (selectedValues.length === 0) return label;
    if (selectedValues.length === 1) return selectedValues[0];
    return `${selectedValues[0]} +${selectedValues.length - 1}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center justify-between min-w-[140px]
                   bg-white border border-gray-300 rounded-xl
                   px-4 py-3 text-md font-medium text-gray-700 cursor-pointer 
                   hover:bg-gray-50 gap-6"
      >
        <span>{getLabel()}</span>

        <ChevronDown className={isOpen ? 'rotate-180' : ''} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-56
                        bg-white border border-gray-200
                        rounded-2xl shadow-xl z-50 py-2"
        >
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <div
                key={option.value}
                role="button"
                tabIndex={0}
                onClick={() => toggleOption(option.value)}
                className={`flex items-center gap-3 px-4 py-2.5
                            cursor-pointer
                  ${isSelected ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                {/* Checkbox */}
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center
                  ${isSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </div>

                <span className="text-sm">{option.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

