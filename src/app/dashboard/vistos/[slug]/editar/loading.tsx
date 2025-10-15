export default function EditarVistoLoading() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='flex items-center gap-4'>
        <div className='p-2 rounded-lg bg-gray-200 animate-pulse w-10 h-10' />
        <div>
          <div className='h-8 w-32 bg-gray-200 rounded animate-pulse mb-2' />
          <div className='h-4 w-48 bg-gray-200 rounded animate-pulse' />
        </div>
      </div>

      {/* Form Skeleton */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <div className='space-y-6'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='space-y-2'>
              <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
              <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

