import { MapPin } from 'lucide-react';
import { YVSkeleton, YVSkeletonCard } from '@/components/YV';

export default function Loading() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-3 mb-2'>
            <MapPin size={28} className='text-[#FFBD1A] opacity-50' />
            <YVSkeleton width='8rem' height='2rem' />
          </div>
          <YVSkeleton width='16rem' height='1rem' />
        </div>

        <YVSkeleton width='10rem' height='2.75rem' className='rounded-full' />
      </div>

      {/* Continent Title */}
      <div className='flex items-center gap-2'>
        <MapPin size={20} className='text-[#FFBD1A] opacity-50' />
        <YVSkeleton width='6rem' height='1.5rem' />
      </div>

      {/* Cards Grid - 9 cards (3 fileiras) */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <YVSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

