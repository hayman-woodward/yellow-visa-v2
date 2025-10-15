export default function NovaHistoriaLoading() {
  return (
    <div className='space-y-6'>
      {/* Breadcrumb Skeleton */}
      <div className='flex items-center gap-2 text-sm text-dashboard-muted'>
        <div className='w-16 h-4 bg-gray-200 rounded animate-pulse' />
        <span>/</span>
        <div className='w-20 h-4 bg-gray-200 rounded animate-pulse' />
      </div>

      {/* Header Skeleton */}
      <div className='flex items-center gap-3 mb-2'>
        <div className='w-7 h-7 bg-gray-200 rounded animate-pulse' />
        <div className='w-40 h-8 bg-gray-200 rounded animate-pulse' />
      </div>
      <div className='w-64 h-4 bg-gray-200 rounded animate-pulse mb-6' />

      {/* Form Skeleton */}
      <div className='bg-dashboard-card rounded-lg p-6 border border-dashboard space-y-6'>
        <div className='space-y-4'>
          <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
          <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
        </div>
        <div className='space-y-4'>
          <div className='h-4 w-32 bg-gray-200 rounded animate-pulse' />
          <div className='h-32 w-full bg-gray-200 rounded animate-pulse' />
        </div>
        <div className='space-y-4'>
          <div className='h-4 w-28 bg-gray-200 rounded animate-pulse' />
          <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
        </div>
        <div className='flex gap-4'>
          <div className='h-10 w-24 bg-gray-200 rounded animate-pulse' />
          <div className='h-10 w-24 bg-gray-200 rounded animate-pulse' />
        </div>
      </div>
    </div>
  );
}
