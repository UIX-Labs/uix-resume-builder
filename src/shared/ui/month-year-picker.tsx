'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/button';

interface MonthYearPickerProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  disabled?: (date: Date) => boolean;
  defaultMonth?: Date;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function MonthYearPicker({ selected, onSelect, className, disabled, defaultMonth }: MonthYearPickerProps) {
  const [currentYear, setCurrentYear] = React.useState(() => {
    if (selected) return selected.getFullYear();
    if (defaultMonth) return defaultMonth.getFullYear();
    return new Date().getFullYear();
  });

  const selectedMonth = selected ? selected.getMonth() : undefined;
  const selectedYear = selected ? selected.getFullYear() : undefined;

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentYear, monthIndex, 1);
    if (disabled?.(newDate)) {
      return;
    }
    onSelect?.(newDate);
  };

  const handlePreviousYear = () => {
    setCurrentYear((prev) => prev - 1);
  };

  const handleNextYear = () => {
    setCurrentYear((prev) => prev + 1);
  };

  return (
    <div className={cn('p-3 bg-background', className)}>
      {/* Year selector */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={handlePreviousYear} className="h-8 w-8" type="button">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-semibold text-sm">{currentYear}</div>
        <Button variant="ghost" size="icon" onClick={handleNextYear} className="h-8 w-8" type="button">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-3 gap-2">
        {MONTHS.map((month, index) => {
          const date = new Date(currentYear, index, 1);
          const isSelected = selectedMonth === index && selectedYear === currentYear;
          const isDisabled = disabled?.(date);

          return (
            <Button
              key={month}
              variant={isSelected ? 'default' : 'ghost'}
              onClick={() => handleMonthSelect(index)}
              disabled={isDisabled}
              className={cn(
                'h-9 text-sm font-normal',
                isSelected && 'bg-primary text-primary-foreground',
                !isSelected && 'hover:bg-accent hover:text-accent-foreground',
              )}
              type="button"
            >
              {month.slice(0, 3)}
            </Button>
          );
        })}
      </div>

      {/* Year range selector */}
      {/* <div className="mt-4 pt-3 border-t">
        <select
          value={currentYear}
          onChange={(e) => setCurrentYear(Number(e.target.value))}
          className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {Array.from({ length: 100 }, (_, i) => {
            const year = new Date().getFullYear() - 50 + i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div> */}
    </div>
  );
}
