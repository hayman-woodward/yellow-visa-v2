import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface YVSectionProps {
  children: ReactNode;
  className?: string;
  as?: 'section' | 'div' | 'main' | 'article';
  variant?: 'default' | 'no-centered';
}

const YVSection = ({
  children,
  className = '',
  as: Component = 'section',
  variant = 'default'
}: YVSectionProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'no-centered':
        return 'md:py-[80px]';

      default: // default
        return 'py-[40px] px-4 md:px-5 mx-auto md:py-[80px] md:px-[96px]';
    }
  };

  return (
    <Component className={cn(getVariantClasses(), className)}>
      {children}
    </Component>
  );
};

export { YVSection };
