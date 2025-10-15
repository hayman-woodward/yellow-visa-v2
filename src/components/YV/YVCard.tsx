import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const yvCardVariants = cva(
  'flex flex-col items-start gap-2 rounded-2xl transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white shadow-sm border border-gray-100',
        outline: 'bg-white border-2 border-[#CCC2C5]'
      },
      padding: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-10',
        xl: 'p-12',
        none: 'p-0'
      },
      hover: {
        none: '',
        bg: 'hover:bg-gray-50',
        orange: 'hover:bg-[#FFD469] hover:border-[#FFD469]'
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'lg',
      hover: 'none'
    }
  }
);

interface YVCardProps {
  children: ReactNode;
  variant?: 'default' | 'outline';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  hover?: 'none' | 'bg' | 'orange';
  className?: string;
}

const YVCard = ({
  children,
  variant = 'default',
  padding = 'lg',
  hover = 'none',
  className = ''
}: YVCardProps) => {
  return (
    <div className={cn(yvCardVariants({ variant, padding, hover }), className)}>
      {children}
    </div>
  );
};

export { YVCard };
