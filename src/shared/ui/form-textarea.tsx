'use client';

import { memo } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { FormField } from '@shared/ui/form-field';
import { cn } from '@shared/lib/utils';

interface FormTextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
}

function FormTextareaInner<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows = 3,
  className,
  disabled,
}: FormTextareaProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} error={fieldState.error?.message} className={className}>
          <textarea
            {...field}
            value={field.value ?? ''}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            aria-invalid={!!fieldState.error}
            className={cn(
              'border-input placeholder:text-muted-foreground flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'aria-invalid:border-destructive',
            )}
          />
        </FormField>
      )}
    />
  );
}

export const FormTextarea = memo(FormTextareaInner) as typeof FormTextareaInner;
