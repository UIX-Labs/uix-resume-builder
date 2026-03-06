'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface FilterDropdownProps {
  label: string;
  options: Option[];
  selectedValues: string[];
  onSelect: (values: string[]) => void;
}

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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center justify-between min-w-[140px]
                   bg-white border border-gray-300 rounded-xl
                   px-4 py-3 text-md font-medium text-gray-700 cursor-pointer 
                   hover:bg-gray-50 gap-6"
      >
        <div className="flex items-center gap-2">
          {selectedValues.length > 0 ? (
            <>
              <span className="text-lg">{label}:</span>
              <span className="text-gray-700 text-md px-2 py-0.5 rounded-full">{selectedValues[0]}</span>

              {/* +X More badge with hover popup */}
              {selectedValues.length > 1 && (
                <div className="relative group inline-block">
                  <span className="bg-gray-100 border border-gray-200 text-sm text-gray-700 px-2 py-0.5 rounded-full cursor-pointer hover:bg-gray-200 transition-all">
                    +{selectedValues.length - 1}
                  </span>

                  {/* Floating popup — upward */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3
                                  opacity-0 scale-95 pointer-events-none
                                  group-hover:opacity-100
                                  group-hover:scale-100
                                  group-hover:pointer-events-auto
                                  transition-all duration-200 ease-out
                                  z-50"
                  >
                    {/* Arrow */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 -bottom-2
                                    w-4 h-4 bg-white rotate-45 rounded-sm
                                    border-r border-b border-gray-200"
                    />

                    <div
                      className="bg-white border border-gray-200 rounded-xl
                                    shadow-xl shadow-black/10 p-4
                                    max-h-[280px] overflow-y-auto"
                    >
                      <div className="flex flex-wrap gap-2">
                        {selectedValues.slice(1).map((val, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 text-md font-medium
                                       px-3 py-1.5 rounded-md border border-gray-200
                                       hover:bg-gray-200 transition-colors duration-150
                                       cursor-default whitespace-nowrap"
                          >
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <span>{label}</span>
          )}
        </div>

        <ChevronDown className={isOpen ? 'rotate-180' : ''} />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-56
                        bg-white border border-gray-200
                        rounded-2xl shadow-xl z-50 py-2"
        >
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            if (option.disabled) {
              return (
                <div key={option.label} className="px-4 py-1 text-xs text-gray-400 border-t border-gray-100 mt-1">
                  Photo
                </div>
              );
            }
            return (
              <div
                key={option.value}
                role="button"
                tabIndex={0}
                onClick={() => toggleOption(option.value)}
                className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer
                  ${isSelected ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'}`}
              >
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
