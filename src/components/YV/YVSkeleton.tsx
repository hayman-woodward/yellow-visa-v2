import { cn } from '@/lib/utils';

type SkeletonProps = {
  className?: string;
  variant?: 'text' | 'circle' | 'rectangle';
  width?: string;
  height?: string;
};

export function YVSkeleton({
  className,
  variant = 'rectangle',
  width,
  height
}: SkeletonProps) {
  const baseClasses = 'bg-dashboard-hover animate-pulse';

  const variantClasses = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rectangle: 'rounded'
  };

  const style = {
    ...(width && { width }),
    ...(height && { height })
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
    />
  );
}

// Skeleton para Cards
export function YVSkeletonCard() {
  return (
    <div className='bg-dashboard-card rounded-lg border border-dashboard p-5 space-y-3'>
      {/* Title + Badge */}
      <div className='flex items-start justify-between mb-2'>
        <YVSkeleton width='8rem' height='1.5rem' />
        <YVSkeleton width='5rem' height='1.25rem' className='rounded-full' />
      </div>

      {/* Description (2 lines) */}
      <div className='space-y-2'>
        <YVSkeleton width='100%' height='1rem' />
        <YVSkeleton width='75%' height='1rem' />
      </div>

      {/* Info */}
      <div className='flex items-center justify-between'>
        <YVSkeleton width='6rem' height='0.75rem' />
        <YVSkeleton width='5rem' height='0.75rem' />
      </div>

      {/* Button */}
      <div className='mt-4 pt-4 border-t border-dashboard'>
        <YVSkeleton width='100%' height='2.25rem' className='rounded-lg' />
      </div>
    </div>
  );
}

// Skeleton para Forms
export function YVSkeletonForm() {
  return (
    <div className='space-y-6'>
      {/* Field */}
      <div>
        <YVSkeleton width='4rem' height='1rem' className='mb-2' />
        <YVSkeleton width='100%' height='2.75rem' />
      </div>

      {/* Field */}
      <div>
        <YVSkeleton width='8rem' height='1rem' className='mb-2' />
        <YVSkeleton width='100%' height='2.75rem' />
      </div>

      {/* Textarea */}
      <div>
        <YVSkeleton width='5rem' height='1rem' className='mb-2' />
        <YVSkeleton width='100%' height='6rem' />
      </div>

      {/* 2 columns */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <YVSkeleton width='3rem' height='1rem' className='mb-2' />
          <YVSkeleton width='100%' height='2.75rem' />
        </div>
        <div>
          <YVSkeleton width='6rem' height='1rem' className='mb-2' />
          <YVSkeleton width='100%' height='2.75rem' />
        </div>
      </div>

      {/* Field */}
      <div>
        <YVSkeleton width='10rem' height='1rem' className='mb-2' />
        <YVSkeleton width='100%' height='2.75rem' />
      </div>

      {/* Field */}
      <div>
        <YVSkeleton width='4rem' height='1rem' className='mb-2' />
        <YVSkeleton width='100%' height='2.75rem' />
      </div>

      {/* Divider */}
      <div className='border-t border-dashboard pt-4' />

      {/* Buttons */}
      <div className='flex items-center gap-3'>
        <YVSkeleton width='10rem' height='2.75rem' className='rounded-full' />
        <YVSkeleton width='6rem' height='2.75rem' className='rounded-full' />
      </div>
    </div>
  );
}

// Skeleton para Listas - Versão Compacta e Profissional
export function YVSkeletonList() {
  return (
    <div className='space-y-4'>
      {/* Header Compacto */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <YVSkeleton width='1.25rem' height='1.25rem' className='rounded' />
          <YVSkeleton width='6rem' height='1.25rem' />
          <YVSkeleton width='4rem' height='1rem' className='rounded-full' />
        </div>
        <YVSkeleton width='7rem' height='2rem' className='rounded-md' />
      </div>

      {/* Tabela Compacta */}
      <div className='bg-white rounded-lg border border-gray-200 shadow-sm'>
        {/* Header da Tabela */}
        <div className='border-b border-gray-200'>
          <div className='grid grid-cols-6 gap-4 px-4 py-3'>
            <YVSkeleton width='3rem' height='1rem' />
            <YVSkeleton width='8rem' height='1rem' />
            <YVSkeleton width='12rem' height='1rem' />
            <YVSkeleton width='6rem' height='1rem' />
            <YVSkeleton width='8rem' height='1rem' />
            <YVSkeleton width='2rem' height='1rem' />
          </div>
        </div>

        {/* Linhas da Tabela */}
        <div className='divide-y divide-gray-200'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='grid grid-cols-6 gap-4 px-4 py-3 hover:bg-gray-50'>
              <div className='flex items-center'>
                <YVSkeleton width='2rem' height='2rem' className='rounded-full' />
              </div>
              <div className='flex items-center'>
                <YVSkeleton width='10rem' height='1rem' />
              </div>
              <div className='flex items-center'>
                <YVSkeleton width='16rem' height='0.875rem' />
              </div>
              <div className='flex items-center'>
                <YVSkeleton width='5rem' height='1.25rem' className='rounded-full' />
              </div>
              <div className='flex items-center'>
                <YVSkeleton width='6rem' height='0.875rem' />
              </div>
              <div className='flex items-center justify-end'>
                <YVSkeleton width='2rem' height='2rem' className='rounded' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading Indicator (fixo no canto)
export function YVLoadingIndicator({
  text = 'Carregando...'
}: {
  text?: string;
}) {
  return (
    <div className='fixed bottom-8 right-8 bg-[#0F0005] text-[#FFBD1A] px-4 py-3 rounded-full shadow-lg flex items-center gap-3 z-50'>
      <div className='w-4 h-4 border-2 border-[#FFBD1A]/30 border-t-[#FFBD1A] rounded-full animate-spin' />
      <span className='text-sm font-medium'>{text}</span>
    </div>
  );
}
