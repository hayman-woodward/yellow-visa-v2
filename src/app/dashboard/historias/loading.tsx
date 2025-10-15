export default function HistoriasLoading() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-7 h-7 bg-gray-200 rounded animate-pulse' />
            <div className='w-32 h-8 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='w-64 h-4 bg-gray-200 rounded animate-pulse' />
        </div>
        <div className='w-36 h-10 bg-gray-200 rounded-full animate-pulse' />
      </div>

      {/* Cards Grid Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='bg-dashboard-card rounded-lg border border-dashboard overflow-hidden'>
            {/* Image Skeleton */}
            <div className='w-full h-48 bg-gray-200 animate-pulse' />
            
            {/* Content Skeleton */}
            <div className='p-5 space-y-3'>
              {/* Title */}
              <div className='w-full h-5 bg-gray-200 rounded animate-pulse' />
              <div className='w-3/4 h-5 bg-gray-200 rounded animate-pulse' />
              
              {/* Excerpt */}
              <div className='w-full h-4 bg-gray-200 rounded animate-pulse' />
              <div className='w-full h-4 bg-gray-200 rounded animate-pulse' />
              <div className='w-2/3 h-4 bg-gray-200 rounded animate-pulse' />
              
              {/* Meta info */}
              <div className='flex items-center gap-4'>
                <div className='w-20 h-3 bg-gray-200 rounded animate-pulse' />
                <div className='w-16 h-3 bg-gray-200 rounded animate-pulse' />
              </div>
              
              {/* Button */}
              <div className='pt-4 border-t border-dashboard'>
                <div className='w-full h-8 bg-gray-200 rounded-lg animate-pulse' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
