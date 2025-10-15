'use client';

import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface YVSwitchProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const sizeClasses = {
  sm: 'h-4 w-7',
  md: 'h-5 w-9',
  lg: 'h-6 w-11'
};

const variantClasses = {
  default: 'data-[state=checked]:bg-gray-900',
  primary: 'data-[state=checked]:bg-[#FFBD1A]',
  success: 'data-[state=checked]:bg-green-600',
  warning: 'data-[state=checked]:bg-yellow-600',
  danger: 'data-[state=checked]:bg-red-600'
};

export function YVSwitch({
  id,
  checked = false,
  onCheckedChange,
  disabled = false,
  label,
  description,
  className = '',
  size = 'md',
  variant = 'primary'
}: YVSwitchProps) {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Switch
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`${sizeClasses[size]} ${variantClasses[variant]} cursor-pointer`}
      />
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <Label 
              htmlFor={switchId}
              className="text-sm font-medium text-gray-900 cursor-pointer"
            >
              {label}
            </Label>
          )}
          {description && (
            <span className="text-xs text-gray-500 mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default YVSwitch;
