'use client';

import * as React from 'react';
import PhoneInputWithCountry from 'react-phone-number-input';
import { parsePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
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
    // Normalize value to E.164 format or undefined
    const normalizedValue = React.useMemo(() => {
      if (!value || value.trim() === '') {
        return undefined;
      }
      
      // If already in E.164 format, return as is
      if (value.startsWith('+')) {
        return value;
      }
      
      // Try to parse and convert to E.164 format
      try {
        // If it's a number without country code, try to parse with default country (IN = +91)
        const phoneNumber = parsePhoneNumber(value, 'IN');
        if (phoneNumber && isValidPhoneNumber(phoneNumber.number)) {
          return phoneNumber.number;
        }
      } catch (error) {
        // If parsing fails, return undefined to avoid E.164 format error
        return undefined;
      }
      
      // If value doesn't start with + and can't be parsed, return undefined
      return undefined;
    }, [value]);

    return (
      <div className={cn('relative', className)}>
        <PhoneInputWithCountry
          value={normalizedValue}
          defaultCountry="IN"
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-[8px] border border-[#959DA8] bg-[#FAFBFC] px-3 py-2 text-base',
            'ring-3 ring-[#f6f6f6] placeholder:text-[#CFD4DB] text-[#0C1118] font-normal',
            'focus-within:ring-[#d3d6db]',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          {...props}
        />
      </div>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
