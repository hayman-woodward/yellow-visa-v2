export default function SiteLoading() {
  return (
    <div className='bg-white min-h-screen'>
      {/* Hero Skeleton - Adaptável */}
      <div className='relative h-[calc(100vh+10px)] lg:h-screen max-h-[calc(100vh+10px)] hero-max-height -mt-[88px] overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse' />
        
        {/* Overlay no topo */}
        <div className='absolute inset-0 pointer-events-none z-[1]'>
          <div className='h-[120px] w-full bg-gradient-to-b from-black/20 to-transparent' />
        </div>

        {/* Conteúdo Skeleton */}
        <div className='absolute inset-0 z-10'>
          <div className='max-w-[1248px] mx-auto px-5 sm:px-6 lg:px-8 xl:px-0 w-full h-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
              <div className='hidden md:flex items-center justify-center' />
              <div className='flex flex-col justify-end items-start mb-8 md:mb-20 pb-24 md:pb-[80px] pt-20 md:pt-0'>
                {/* Breadcrumb Skeleton */}
                <div className='h-4 w-32 bg-gray-300/70 rounded animate-pulse mb-4' />
                
                {/* Title Skeleton */}
                <div className='space-y-3 mb-6'>
                  <div className='h-8 w-64 bg-gray-300/70 rounded animate-pulse' />
                  <div className='h-8 w-72 bg-gray-300/70 rounded animate-pulse' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal Skeleton */}
      <div className='max-w-[1248px] mx-auto px-5 sm:px-6 lg:px-8 xl:px-0 py-12'>
        <div className='space-y-6'>
          {/* Texto Skeleton */}
          <div className='space-y-4'>
            <div className='h-6 w-3/4 bg-gray-200 rounded animate-pulse' />
            <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
            <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
            <div className='h-4 w-5/6 bg-gray-200 rounded animate-pulse' />
          </div>

          {/* Cards Grid Skeleton */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
                <div className='h-4 w-24 bg-gray-300 rounded animate-pulse mb-3' />
                <div className='h-4 w-full bg-gray-300 rounded animate-pulse mb-2' />
                <div className='h-4 w-3/4 bg-gray-300 rounded animate-pulse' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
