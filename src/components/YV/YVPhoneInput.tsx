'use client';

import { forwardRef } from 'react';
import PhoneInput, { CountryCode, E164Number } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { phoneCountries } from '@/lib/phoneCountries';

interface YVPhoneInputProps {
  value?: string;
  onChange?: (value: E164Number | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

const YVPhoneInput = forwardRef<HTMLInputElement, YVPhoneInputProps>(
  ({ value, onChange, placeholder = "Telefone", className = "", disabled = false, error = false, ...props }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <PhoneInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          countries={phoneCountries as CountryCode[]}
          international
          countryCallingCodeEditable={true}
          className="w-full"
          style={{
            border: 'none',
            borderBottom: `1px solid ${error ? '#ef4444' : '#000'}`,
            background: 'transparent',
            outline: 'none',
            padding: '0 0 0 16px',
            fontSize: '16px',
            color: '#374151'
          }}
          {...props}
        />
      </div>
    );
  }
);

YVPhoneInput.displayName = 'YVPhoneInput';

export default YVPhoneInput;