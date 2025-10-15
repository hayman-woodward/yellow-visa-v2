import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';

const yvSelectVariants = cva(
  'flex items-center gap-2 self-stretch appearance-none cursor-pointer transition-colors',
  {
    variants: {
      variant: {
        default: 'rounded-xl border border-[#3D2B31] bg-[#FAFAFA]',
        modern:
          'rounded-md border border-input bg-background hover:border-dashboard',
        error: 'rounded-md border border-red-500 bg-background',
        success: 'rounded-md border border-green-500 bg-background'
      },
      size: {
        sm: 'px-3 py-2 text-sm h-8',
        md: 'px-3 py-2 text-sm h-10',
        lg: 'px-5 py-3 pr-10 text-base h-12'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg'
    }
  }
);

interface YVSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  variant?: 'default' | 'modern' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  showSuccess?: boolean;
  leftIcon?: React.ReactNode;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
}

const YVSelect = forwardRef<HTMLSelectElement, YVSelectProps>(
  (
    {
      label,
      variant = 'default',
      size = 'lg',
      className = '',
      id,
      error,
      showSuccess,
      leftIcon,
      options,
      children,
      ...props
    },
    ref
  ) => {
    const finalVariant = error
      ? 'error'
      : showSuccess
      ? 'success'
      : variant || 'default';

    return (
      <div className='flex flex-col w-full'>
        {label && (
          <label
            htmlFor={id}
            className='block text-xs font-normal leading-4 text-[#3D2B31] mb-1'
          >
            {label}
          </label>
        )}
        <div className='relative w-full'>
          {leftIcon && (
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-dashboard-muted z-10 pointer-events-none'>
              {leftIcon}
            </div>
          )}
          <select
            ref={ref}
            id={id}
            {...props}
            className={cn(
              yvSelectVariants({ variant: finalVariant, size }),
              leftIcon && 'pl-10',
              'pr-10',
              'w-full',
              'focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors',
              className
            )}
          >
            {options
              ? options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              : children}
          </select>

          {/* Ícones de status */}
          <div className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none'>
            {showSuccess && !error && (
              <CheckCircle2 size={18} className='text-green-500' />
            )}
            {error && <AlertCircle size={18} className='text-red-500' />}
            {!showSuccess && !error && (
              <ChevronDown size={18} className='text-dashboard-muted' />
            )}
          </div>
        </div>
        {error && (
          <p className='text-sm text-red-600 mt-1.5 flex items-center gap-1'>
            <span className='text-xs'>⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

YVSelect.displayName = 'YVSelect';

export { YVSelect };
