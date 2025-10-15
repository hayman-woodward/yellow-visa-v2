import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const yvButtonVariants = cva(
  'rounded-[999px] font-bold transition-all duration-200 focus:outline-none active:scale-95 flex items-center justify-center gap-1 h-12 px-6 w-fit cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-[#0F0005] text-[#FFBD1A] hover:bg-[#0F0005]/90',
        secondary: 'bg-[#C04] text-[#F7F5F6] hover:bg-[#C04]/90',
        outline: 'bg-white text-black border-2 border-black hover:bg-gray-50',
        'outline-secondary':
          'bg-white text-[#C04] border-2 border-[#C04] hover:bg-[#C04]/10',
        text: 'bg-transparent text-black hover:bg-gray-100'
      },
      size: {
        sm: 'h-8 px-4 text-sm',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg'
    }
  }
);

interface YVButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-secondary' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: string;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

const YVButton = ({
  children,
  variant = 'primary',
  size = 'lg',
  className = '',
  onClick,
  href,
  disabled = false
}: YVButtonProps) => {
  return (
    <Button
      asChild={!!href}
      onClick={onClick}
      className={cn(yvButtonVariants({ variant, size }), className)}
      disabled={disabled}
    >
      {href ? <a href={href}>{children}</a> : children}
    </Button>
  );
};

export { YVButton };
