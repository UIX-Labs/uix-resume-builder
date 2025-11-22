import { Calendar } from '@shared/ui/calendar';
import { Input } from '@shared/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { useEffect, useState } from 'react';
import { cn } from '@shared/lib/cn';
import { Checkbox } from '@shared/ui/checkbox';
import dayjs from 'dayjs';

interface DurationProps {
  data: {
    startDate: string;
    endDate: string;
    ongoing: boolean;
  };
  onChange: (data: any) => void;
  section: any;
}

export function Duration({ data, onChange }: DurationProps) {
  const [isOngoing, setIsOngoing] = useState(data?.ongoing || false);

  const [startDate, setStartDate] = useState<Date | undefined>(() => {
    if (data?.startDate) {
      return dayjs(data.startDate).toDate();
    }

    return dayjs().toDate();
  });

  const [endDate, setEndDate] = useState<Date | undefined>(() => {
    if (data?.endDate) {
      return dayjs(data.endDate).toDate();
    }

    return dayjs().toDate();
  });

  useEffect(() => {
    const updatedData = {
      startDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : null,
      endDate: isOngoing ? null : endDate ? dayjs(endDate).format('YYYY-MM-DD') : null,
      ongoing: isOngoing,
    };

    onChange(updatedData);
  }, [startDate, endDate, isOngoing]);

  const handleOngoingChange = (checked: boolean) => {
    setIsOngoing(checked);
  };

  const formatDateForDisplay = (date: Date | undefined) => {
    if (!date) {
      return '';
    }

    return dayjs(date).format('DD MMM YYYY');
  };

  return (
    <div className="flex gap-3 w-full">
      <div className="flex flex-col gap-2">
        <label htmlFor="start-date" className="text-sm font-medium text-gray-700">
          Start Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Input
              id="start-date"
              className={cn(
                'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-[8px]',
                'placeholder:text-[#DBCFD4] text-base text-[#0C1118] font-normal',
                'focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB]',
                'bg-[#FAFBFC] cursor-pointer min-w-[120px] text-center',
              )}
              placeholder="Select start date"
              value={formatDateForDisplay(startDate)}
              readOnly
            />
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              captionLayout="dropdown"
              mode="single"
              defaultMonth={startDate}
              selected={startDate}
              onSelect={(date) => setStartDate(date)}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* End Date - only show if not ongoing */}
      <div className="flex flex-col gap-2">
        <label htmlFor="end-date" className="text-sm font-medium text-gray-700">
          End Date
        </label>

        <Popover>
          <PopoverTrigger asChild>
            <Input
              id="end-date"
              className={cn(
                'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-[8px]',
                'placeholder:text-[#DBCFD4] text-base text-[#0C1118] font-normal',
                'focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB]',
                'bg-[#FAFBFC] cursor-pointer min-w-[120px] text-center',
              )}
              placeholder="Select end date"
              value={isOngoing ? 'Ongoing' : formatDateForDisplay(endDate)}
              readOnly
            />
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex items-center gap-2 p-2 border-b border-[#959DA8]">
              <Checkbox id="ongoing" checked={isOngoing} onCheckedChange={handleOngoingChange} />
              <label htmlFor="ongoing" className="text-base font-medium text-[#0C1118]">
                Currently ongoing
              </label>
            </div>

            <Calendar
              captionLayout="dropdown"
              mode="single"
              selected={endDate}
              defaultMonth={endDate}
              onSelect={(date) => setEndDate(date)}
              disabled={(date) => (startDate ? dayjs(date).isBefore(dayjs(startDate), 'day') : false)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
