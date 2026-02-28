'use client';

import { memo } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { FormField } from '@shared/ui/form-field';
import { PhoneInput } from '@shared/ui/components/phone-input';

interface FormPhoneInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function FormPhoneInputInner<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  disabled,
}: FormPhoneInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} error={fieldState.error?.message} className={className}>
          <PhoneInput
            value={field.value ?? ''}
            onChange={(val) => field.onChange(val ?? '')}
            placeholder={placeholder}
            disabled={disabled}
          />
        </FormField>
      )}
    />
  );
}

export const FormPhoneInput = memo(FormPhoneInputInner) as typeof FormPhoneInputInner;
