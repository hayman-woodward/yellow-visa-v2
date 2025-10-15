import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const yvTextFieldVariants = cva(
  'flex items-center gap-2 self-stretch transition-colors',
  {
    variants: {
      variant: {
        default: 'rounded-xl border border-[#3D2B31] bg-[#FAFAFA]',
        modern:
          'rounded-md border border-input bg-background hover:border-dashboard focus-within:border-[#FFBD1A] focus-within:ring-2 focus-within:ring-[#FFBD1A]/20',
        error: 'rounded-md border border-red-500 bg-background',
        success: 'rounded-md border border-green-500 bg-background',
        underline: 'bg-transparent border-0 border-b border-black focus:border-black active:border-black outline-none transition-colors duration-300 rounded-none px-0 py-2 shadow-none focus:shadow-none active:shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0'
      },
      size: {
        sm: 'px-3 py-2 text-sm h-8',
        md: 'px-3 py-2 text-sm h-10',
        lg: 'pt-4 pr-2 pb-4 pl-5 text-base h-12',
        xl: 'pt-4 pr-2 pb-4 pl-5 text-lg h-14'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg'
    }
  }
);

interface YVTextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  variant?: 'default' | 'modern' | 'error' | 'success' | 'underline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  error?: string;
  showSuccess?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  hasRightButton?: boolean; // Para quando tem botão customizado (ex: toggle senha)
}

const YVTextField = forwardRef<HTMLInputElement, YVTextFieldProps>(
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
      rightIcon,
      hasRightButton,
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
        <div className='w-full'>
          <div className='relative'>
            {leftIcon && (
              <div className='absolute left-3 top-1/2 -translate-y-1/2 text-dashboard-muted z-10'>
                {leftIcon}
              </div>
            )}
            <Input
              ref={ref}
              id={id}
              {...props}
              className={cn(
                yvTextFieldVariants({ variant: finalVariant, size }),
                leftIcon && 'pl-10',
                (rightIcon || showSuccess || error) && 'pr-10',
                finalVariant === 'underline' && 'ring-0 focus:ring-0 active:ring-0 focus-visible:ring-0 bg-transparent focus:outline-none active:outline-none outline-none focus:ring-offset-0 focus-visible:ring-offset-0 [&:focus]:ring-0 [&:focus]:ring-offset-0 [&:focus]:outline-none',
                className
              )}
              style={finalVariant === 'underline' ? {
                outline: 'none !important',
                boxShadow: 'none !important',
                borderColor: 'transparent !important',
                borderBottomColor: '#000 !important',
                backgroundColor: 'transparent !important',
                borderTop: 'none !important',
                borderLeft: 'none !important',
                borderRight: 'none !important',
                borderBottom: '1px solid #000 !important'
              } : undefined}
            />
            {showSuccess && !error && (
              <div className={cn(
                'absolute top-1/2 -translate-y-1/2 flex items-center justify-center z-10',
                hasRightButton ? 'right-10' : 'right-3'
              )}>
                <CheckCircle2
                  size={18}
                  className='text-green-500'
                />
              </div>
            )}
            {error && (
              <div className={cn(
                'absolute top-1/2 -translate-y-1/2 flex items-center justify-center z-10',
                hasRightButton ? 'right-10' : 'right-3'
              )}>
                <AlertCircle
                  size={18}
                  className='text-red-500'
                />
              </div>
            )}
            {rightIcon && (
              <div className={cn(
                'absolute top-1/2 -translate-y-1/2 flex items-center justify-center z-10',
                hasRightButton ? 'right-3' : 'right-3'
              )}>
                {rightIcon}
              </div>
            )}
          </div>
          {error && (
            <p className='text-sm text-red-600 mt-1.5 flex items-center gap-1'>
              <span className='text-xs'>⚠</span>
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

YVTextField.displayName = 'YVTextField';

export { YVTextField };
