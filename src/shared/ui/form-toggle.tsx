'use client';

import { memo } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Checkbox } from '@shared/ui/checkbox';
import { Label } from '@shared/ui/label';
import { cn } from '@shared/lib/utils';

interface FormToggleProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
  disabled?: boolean;
}

function FormToggleInner<T extends FieldValues>({
  control,
  name,
  label,
  className,
  disabled,
}: FormToggleProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={cn('flex items-center gap-2', className)}>
          <Checkbox
            id={name}
            checked={!!field.value}
            onCheckedChange={(checked) => field.onChange(!!checked)}
            disabled={disabled}
          />
          {label ? (
            <Label htmlFor={name} className="text-sm text-gray-700 cursor-pointer">
              {label}
            </Label>
          ) : null}
        </div>
      )}
    />
  );
}

export const FormToggle = memo(FormToggleInner) as typeof FormToggleInner;
