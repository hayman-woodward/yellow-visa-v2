export default function VistosLoading() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between'>
        <div>
          <div className='h-8 w-24 bg-gray-200 rounded animate-pulse mb-2' />
          <div className='h-4 w-64 bg-gray-200 rounded animate-pulse' />
        </div>
        <div className='h-10 w-32 bg-gray-200 rounded-full animate-pulse' />
      </div>

      {/* Cards Grid Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className='bg-dashboard-card rounded-lg border border-dashboard overflow-hidden'
          >
            <div className='w-full h-32 bg-gray-200 animate-pulse' />
            <div className='p-4 space-y-2'>
              <div className='h-4 w-3/4 bg-gray-200 rounded animate-pulse' />
              <div className='h-3 w-1/2 bg-gray-200 rounded animate-pulse' />
              <div className='h-3 w-full bg-gray-200 rounded animate-pulse' />
              <div className='h-3 w-2/3 bg-gray-200 rounded animate-pulse' />
              <div className='pt-3 border-t border-dashboard'>
                <div className='h-6 w-full bg-gray-200 rounded animate-pulse' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
