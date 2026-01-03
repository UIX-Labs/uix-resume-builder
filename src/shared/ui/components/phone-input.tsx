'use client';

import * as React from 'react';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
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
  ({ value, onChange, placeholder = 'Enter phone number', className, disabled, ...props }, _ref) => {
    return (
      <div className={cn('relative', className)}>
        <PhoneInputWithCountry
          name=""
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-[8px] border border-[#959DA8] bg-[#FAFBFC] px-3 py-2 text-base',
            'ring-4 ring-[#f6f6f6] placeholder:text-[#CFD4DB] text-[#0C1118] font-normal',
            'focus-within:border-[#0059ED] focus-within:ring-[#CBE7FF]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'PhoneInputCountry',
          )}
          inputClassName={cn(
            'flex-1 border-0 bg-transparent outline-none focus:ring-0',
            'placeholder:text-[#CFD4DB] text-base text-[#0C1118] font-normal',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          countrySelectClassName={cn(
            'border-0 bg-transparent outline-none focus:ring-0 mr-2',
            'text-base text-[#0C1118] font-normal',
          )}
          {...props}
        />
        <style jsx>{`
          .PhoneInputCountry {
            display: flex;
            align-items: center;
          }
          .PhoneInputCountrySelect {
            border: none;
            background: transparent;
            outline: none;
            margin-right: 8px;
            font-size: 16px;
            color: #0C1118;
          }
          .PhoneInputCountrySelect:focus {
            outline: none;
            box-shadow: none;
          }
          .PhoneInputInput {
            flex: 1;
            border: none;
            background: transparent;
            outline: none;
            font-size: 16px;
            color: #0C1118;
          }
        `}</style>
      </div>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
