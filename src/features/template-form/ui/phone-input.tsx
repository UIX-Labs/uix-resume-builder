'use client';

import * as React from 'react';
import PhoneInputWithCountry from 'react-phone-number-input';
import { cn } from '@shared/lib/cn';
import 'react-phone-number-input/style.css';

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, placeholder = 'Enter phone number', className, disabled, ...props }) => {
    return (
      <div className={cn('relative', className)}>
        <PhoneInputWithCountry
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-[8px] border border-[#959DA8] bg-[#FAFBFC] px-3 py-2 text-base',
            'ring-3 ring-[#f6f6f6] placeholder:text-[#CFD4DB] text-[#0C1118] font-normal',
            'focus-within:ring-[#d3d6db]',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}a
          {...props}
        />
      </div>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
