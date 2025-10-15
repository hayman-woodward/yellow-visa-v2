import { MapPin, ArrowLeft } from 'lucide-react';
import { YVSkeleton, YVSkeletonForm } from '@/components/YV';

export default function Loading() {
  return (
    <div className='space-y-6'>
      {/* Breadcrumb Skeleton */}
      <div className='inline-flex items-center gap-2'>
        <ArrowLeft size={16} className='text-dashboard-muted' />
        <YVSkeleton width='8rem' height='1rem' />
      </div>

      {/* Header Skeleton */}
      <div>
        <div className='flex items-center gap-3 mb-2'>
          <MapPin size={28} className='text-[#FFBD1A] opacity-50' />
          <YVSkeleton width='12rem' height='2rem' />
        </div>
        <YVSkeleton width='16rem' height='1rem' />
      </div>

      {/* Form Card Skeleton */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <YVSkeletonForm />
      </div>
    </div>
  );
}

