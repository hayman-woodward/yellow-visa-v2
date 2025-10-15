import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface YVContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const YVContainer = ({
  children,
  className = '',
  maxWidth = 'xl'
}: YVContainerProps) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm':
        return 'max-w-2xl';
      case 'md':
        return 'max-w-4xl';
      case 'lg':
        return 'max-w-6xl';
      case 'xl':
        return 'max-w-[1248px]';
      case '2xl':
        return 'max-w-7xl';
      case 'full':
        return 'max-w-full';
      default:
        return 'max-w-[1248px]';
    }
  };

  return (
    <div
      className={cn(
        getMaxWidthClass(),
        'px-4 sm:px-6 lg:px-8 xl:px-0 mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

export { YVContainer };
