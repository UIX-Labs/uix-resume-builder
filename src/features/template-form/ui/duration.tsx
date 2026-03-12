import { cn } from '@shared/lib/cn';
import { Checkbox } from '@shared/ui/checkbox';
import { Input } from '@shared/ui/components/input';
import { MonthYearPicker } from '@shared/ui/month-year-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { isAfter, startOfToday } from 'date-fns';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';

interface DurationData {
  startDate: string | null;
  endDate: string | null;
  ongoing: boolean;
}

interface DurationProps {
  data: DurationData;
  onChange: (data: DurationData) => void;
}

interface DateFieldProps {
  id: string;
  label: string;
  displayValue: string;
  selectedDate: Date | undefined;
  placeholder: string;
  onSelect: (date: Date | undefined) => void;
  isDisabled: (date: Date) => boolean;
  header?: React.ReactNode;
  pickerDisabled?: boolean;
}

const DATE_FORMAT = 'YYYY-MM';
const DISPLAY_FORMAT = 'MMM YYYY';

const DATE_INPUT_CLASS = cn(
  'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-[8px]',
  'placeholder:text-[#DBCFD4] text-base text-[#0C1118] font-normal',
  'focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB]',
  'bg-[#FAFBFC] cursor-pointer min-w-[120px] text-center',
);

const parseDate = (dateStr: string | null | undefined): Date | undefined =>
  dateStr ? dayjs(dateStr).toDate() : undefined;

const serializeDate = (date: Date | undefined): string | null => (date ? dayjs(date).format(DATE_FORMAT) : null);

const formatDateForDisplay = (date: Date | undefined): string => (date ? dayjs(date).format(DISPLAY_FORMAT) : '');

const DateField = React.memo(
  ({
    id,
    label,
    displayValue,
    selectedDate,
    placeholder,
    onSelect,
    isDisabled,
    header,
    pickerDisabled = false,
  }: DateFieldProps) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Input id={id} className={DATE_INPUT_CLASS} placeholder={placeholder} value={displayValue} readOnly />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {header}
          <div className={cn(pickerDisabled && 'opacity-50 pointer-events-none')}>
            <MonthYearPicker selected={selectedDate} onSelect={onSelect} disabled={isDisabled} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
);

DateField.displayName = 'DateField';

export function Duration({ data, onChange }: DurationProps) {
  const startDate = useMemo(() => parseDate(data?.startDate), [data?.startDate]);
  const endDate = useMemo(() => parseDate(data?.endDate), [data?.endDate]);
  const isOngoing = data?.ongoing ?? false;

  const handleUpdate = useCallback(
    (updates: Partial<DurationData>) => {
      onChange({
        startDate: data?.startDate ?? null,
        endDate: data?.endDate ?? null,
        ongoing: data?.ongoing ?? false,
        ...updates,
      });
    },
    [data, onChange],
  );
  const handleStartDateSelect = useCallback(
    (date: Date | undefined) => {
      handleUpdate({ startDate: serializeDate(date) });
    },
    [handleUpdate],
  );

  const handleEndDateSelect = useCallback(
    (date: Date | undefined) => {
      handleUpdate({
        endDate: serializeDate(date),
        ongoing: false,
      });
    },
    [handleUpdate],
  );
  const handleOngoingChange = useCallback(
    (checked: boolean | 'indeterminate') => {
      const ongoing = checked === true;
      handleUpdate({
        ongoing,
        endDate: ongoing ? null : data?.endDate,
      });
    },
    [data?.endDate, handleUpdate],
  );
  const isStartDateDisabled = useCallback(
    (date: Date): boolean => {
      if (isAfter(date, startOfToday())) return true;
      if (!isOngoing && endDate) return date > dayjs(endDate).endOf('month').toDate();
      return false;
    },
    [isOngoing, endDate],
  );

  const isEndDateDisabled = useCallback(
    (date: Date): boolean => {
      if (isAfter(date, startOfToday())) return true;
      if (startDate) return date < dayjs(startDate).startOf('month').toDate();
      return false;
    },
    [startDate],
  );

  return (
    <div className="flex gap-3 w-full">
      <DateField
        id="start-date"
        label="Start Date"
        displayValue={formatDateForDisplay(startDate)}
        selectedDate={startDate}
        placeholder="Select start date"
        onSelect={handleStartDateSelect}
        isDisabled={isStartDateDisabled}
      />

      <DateField
        id="end-date"
        label="End Date"
        displayValue={isOngoing ? 'Ongoing' : formatDateForDisplay(endDate)}
        selectedDate={endDate}
        placeholder="Select end date"
        onSelect={handleEndDateSelect}
        isDisabled={isEndDateDisabled}
        pickerDisabled={isOngoing}
        header={
          <div className="flex items-center gap-2 p-2 border-b border-[#959DA8]">
            <Checkbox id="ongoing" checked={isOngoing} onCheckedChange={handleOngoingChange} />
            <label htmlFor="ongoing" className="text-base font-medium text-[#0C1118]">
              Currently ongoing
            </label>
          </div>
        }
      />
    </div>
  );
}
