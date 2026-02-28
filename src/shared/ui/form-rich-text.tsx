'use client';

import { memo } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { FormField } from '@shared/ui/form-field';
import { TiptapTextArea } from '@shared/ui/components/textarea';

interface FormRichTextProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minHeight?: string;
  maxHeight?: string;
}

function FormRichTextInner<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  disabled,
  minHeight = '150px',
  maxHeight = '300px',
}: FormRichTextProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} error={fieldState.error?.message} className={className}>
          <TiptapTextArea
            value={field.value ?? ''}
            onChange={(_plainText, html) => field.onChange(html)}
            onBlur={field.onBlur}
            placeholder={placeholder}
            disabled={disabled}
            minHeight={minHeight}
            maxHeight={maxHeight}
            aria-invalid={!!fieldState.error}
          />
        </FormField>
      )}
    />
  );
}

export const FormRichText = memo(FormRichTextInner) as typeof FormRichTextInner;
