'use client';

import { memo } from 'react';
import { Label } from '@shared/ui/label';
import { cn } from '@shared/lib/utils';

interface FormFieldProps {
  label?: string;
  error?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField = memo(function FormField({
  label,
  error,
  htmlFor,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label ? (
        <Label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      ) : null}
      {children}
      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : null}
    </div>
  );
});
