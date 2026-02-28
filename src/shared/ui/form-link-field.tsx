'use client';

import { memo } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { ShadcnInput } from '@shared/ui/input';
import { FormField } from '@shared/ui/form-field';
import { cn } from '@shared/lib/utils';

interface FormLinkFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Two-input field for { title, link } objects.
 * Each sub-field uses its own Controller — editing one does NOT re-render the other.
 */
function FormLinkFieldInner<T extends FieldValues>({
  control,
  name,
  label,
  className,
  disabled,
}: FormLinkFieldProps<T>) {
  return (
    <FormField label={label} className={className}>
      <div className={cn('grid grid-cols-2 gap-2')}>
        <Controller
          control={control}
          name={`${name}.title` as Path<T>}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <ShadcnInput
                {...field}
                value={field.value ?? ''}
                placeholder="Link title"
                disabled={disabled}
                aria-invalid={!!fieldState.error}
              />
              {fieldState.error ? (
                <p className="text-xs text-red-500">{fieldState.error.message}</p>
              ) : null}
            </div>
          )}
        />
        <Controller
          control={control}
          name={`${name}.link` as Path<T>}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <ShadcnInput
                {...field}
                value={field.value ?? ''}
                placeholder="https://..."
                disabled={disabled}
                aria-invalid={!!fieldState.error}
              />
              {fieldState.error ? (
                <p className="text-xs text-red-500">{fieldState.error.message}</p>
              ) : null}
            </div>
          )}
        />
      </div>
    </FormField>
  );
}

export const FormLinkField = memo(FormLinkFieldInner) as typeof FormLinkFieldInner;
