'use client';

import { memo } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { FormField } from '@shared/ui/form-field';
import { MonthYearPicker } from '@shared/ui/month-year-picker';

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
  disabled?: boolean;
}

function parseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
}

function formatDate(date: Date | undefined): string {
  if (!date) return '';
  return date.toISOString().slice(0, 7); // YYYY-MM
}

function FormDatePickerInner<T extends FieldValues>({
  control,
  name,
  label,
  className,
  disabled,
}: FormDatePickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} error={fieldState.error?.message} className={className}>
          <MonthYearPicker
            selected={parseDate(field.value)}
            onSelect={(date) => field.onChange(formatDate(date))}
            disabled={disabled ? () => true : undefined}
          />
        </FormField>
      )}
    />
  );
}

export const FormDatePicker = memo(FormDatePickerInner) as typeof FormDatePickerInner;
