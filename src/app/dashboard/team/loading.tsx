export default function TeamLoading() {
  return (
    <div className="p-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Filters Skeleton */}
      <div className="bg-dashboard-card rounded-lg p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-dashboard-card rounded-lg p-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse mx-auto mb-4" />
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse mb-4" />
              <div className="flex justify-center gap-2">
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
