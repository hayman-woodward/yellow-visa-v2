import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const yvGridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12'
    },
    smCols: {
      1: 'sm:grid-cols-1',
      2: 'sm:grid-cols-2',
      3: 'sm:grid-cols-3',
      4: 'sm:grid-cols-4',
      5: 'sm:grid-cols-5',
      6: 'sm:grid-cols-6',
      12: 'sm:grid-cols-12'
    },
    mdCols: {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
      5: 'md:grid-cols-5',
      6: 'md:grid-cols-6',
      12: 'md:grid-cols-12'
    },
    lgCols: {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
      5: 'lg:grid-cols-5',
      6: 'lg:grid-cols-6',
      12: 'lg:grid-cols-12'
    },
    xlCols: {
      1: 'xl:grid-cols-1',
      2: 'xl:grid-cols-2',
      3: 'xl:grid-cols-3',
      4: 'xl:grid-cols-4',
      5: 'xl:grid-cols-5',
      6: 'xl:grid-cols-6',
      12: 'xl:grid-cols-12'
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12'
    },
    alignItems: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch'
    },
    justifyContent: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly'
    }
  },
  defaultVariants: {
    cols: 1,
    gap: 4,
    alignItems: 'stretch'
  }
});

interface YVGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  smCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  mdCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  lgCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  xlCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  className?: string;
}

const YVGrid = ({
  children,
  cols = 1,
  smCols,
  mdCols,
  lgCols,
  xlCols,
  gap = 4,
  alignItems = 'stretch',
  justifyContent,
  className = ''
}: YVGridProps) => {
  return (
    <div
      className={cn(
        yvGridVariants({
          cols,
          smCols,
          mdCols,
          lgCols,
          xlCols,
          gap,
          alignItems,
          justifyContent
        }),
        className
      )}
    >
      {children}
    </div>
  );
};

export { YVGrid };
