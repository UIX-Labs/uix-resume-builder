'use client';

import { memo, useState, useCallback } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { ShadcnInput } from '@shared/ui/input';
import { FormField } from '@shared/ui/form-field';
import { cn } from '@shared/lib/utils';
import { X } from 'lucide-react';

interface FormTagsInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Tag/chip input for string arrays.
 * RHF Controller manages the array — minimal local state (just the current input text).
 */
function FormTagsInputInner<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Type and press Enter',
  className,
  disabled,
}: FormTagsInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} error={fieldState.error?.message} className={className}>
          <TagInputControl
            tags={(field.value as string[]) ?? []}
            onChange={field.onChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        </FormField>
      )}
    />
  );
}

/** Internal presentational component — isolated from Controller to prevent re-renders */
const TagInputControl = memo(function TagInputControl({
  tags,
  onChange,
  placeholder,
  disabled,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (trimmed && !tags.includes(trimmed)) {
          onChange([...tags, trimmed]);
        }
        setInputValue('');
      }
      if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
        onChange(tags.slice(0, -1));
      }
    },
    [inputValue, tags, onChange],
  );

  const removeTag = useCallback(
    (index: number) => {
      onChange(tags.filter((_, i) => i !== index));
    },
    [tags, onChange],
  );

  return (
    <div
      className={cn(
        'border-input flex flex-wrap items-center gap-1.5 rounded-md border px-2 py-1.5',
        'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
      )}
    >
      {tags.map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700"
        >
          {tag}
          {!disabled ? (
            <button type="button" onClick={() => removeTag(i)} className="hover:text-red-500">
              <X className="h-3 w-3" />
            </button>
          ) : null}
        </span>
      ))}
      <ShadcnInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        disabled={disabled}
        className="flex-1 border-0 shadow-none focus-visible:ring-0 min-w-[80px] h-7 px-0"
      />
    </div>
  );
});

export const FormTagsInput = memo(FormTagsInputInner) as typeof FormTagsInputInner;
