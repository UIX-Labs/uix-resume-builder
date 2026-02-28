'use client';

import { memo } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { ShadcnInput } from '@shared/ui/input';
import { FormField } from '@shared/ui/form-field';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}

function FormInputInner<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  className,
  disabled,
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} error={fieldState.error?.message} className={className}>
          <ShadcnInput
            {...field}
            value={field.value ?? ''}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={!!fieldState.error}
          />
        </FormField>
      )}
    />
  );
}

export const FormInput = memo(FormInputInner) as typeof FormInputInner;
