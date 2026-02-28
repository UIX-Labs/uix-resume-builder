import { cn } from '@shared/lib/utils';

interface DateRangeProps {
  startDate?: string;
  endDate?: string;
  ongoing?: boolean;
  separator?: string;
  presentLabel?: string;
  className?: string;
}

function formatDateValue(value: string | undefined): string {
  if (!value) return '';
  // Handle YYYY-MM format
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function DateRange({
  startDate,
  endDate,
  ongoing,
  separator = ' - ',
  presentLabel = 'Present',
  className,
}: DateRangeProps) {
  const start = formatDateValue(startDate);
  const end = ongoing ? presentLabel : formatDateValue(endDate);

  if (!start && !end) return null;

  return (
    <span className={cn(className)}>
      {start}
      {start && end ? separator : null}
      {end}
    </span>
  );
}
