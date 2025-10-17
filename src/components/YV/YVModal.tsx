'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const yvModalVariants = cva('', {
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

interface YVModalProps extends VariantProps<typeof yvModalVariants> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

const YVModal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  size,
  className
}: YVModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(yvModalVariants({ size }), 'p-0 gap-0', className)}
      >
        {/* Header */}
        {(title || description) && (
          <DialogHeader className='px-6 pt-6 pb-4 border-b border-gray-100'>
            {title && (
              <DialogTitle className='text-xl font-bold text-[#0F0005]'>
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className='text-sm text-gray-600 mt-1'>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {/* Body */}
        <div className='px-6 py-6'>{children}</div>

        {/* Footer */}
        {footer && (
          <DialogFooter className='px-6 pb-6 pt-4 border-t border-gray-100'>
            {footer}
          </DialogFooter>
        )}

        {/* Close button */}
        {showCloseButton && (
          <button
            onClick={() => onOpenChange(false)}
            className='absolute right-4 top-4 rounded-full p-1.5 hover:bg-gray-100 transition-colors cursor-pointer'
          >
            <X size={18} className='text-gray-500' />
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
};

YVModal.displayName = 'YVModal';

export { YVModal };
