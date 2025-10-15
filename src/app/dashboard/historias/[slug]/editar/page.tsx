'use client';

import React from 'react';
import { useHistoria } from '@/hooks/useDashboardData';
import { YVText } from '@/components/YV';
import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import HistoriaForm from '../../components/HistoriaForm';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function EditarHistoriaPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ slug: string } | null>(null);
  
  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const { historia, loading, error } = useHistoria(resolvedParams?.slug || '');

  if (loading) {
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

  if (error) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Link
            href='/dashboard/historias'
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
          >
            <ArrowLeft size={20} className='text-dashboard-muted' />
          </Link>
          <div>
            <h1 className='text-2xl font-normal text-dashboard'>Erro</h1>
          </div>
        </div>
        <div className='text-center py-12'>
          <YVText className='text-red-500'>{error}</YVText>
        </div>
      </div>
    );
  }

  if (!historia) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Link
            href='/dashboard/historias'
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
          >
            <ArrowLeft size={20} className='text-dashboard-muted' />
          </Link>
          <div>
            <h1 className='text-2xl font-normal text-dashboard'>História não encontrada</h1>
          </div>
        </div>
        <div className='text-center py-12'>
          <YVText className='text-dashboard-muted'>
            A história solicitada não foi encontrada
          </YVText>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link
          href='/dashboard/historias'
          className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
        >
          <ArrowLeft size={20} className='text-dashboard-muted' />
        </Link>
        <div>
          <div className='flex items-center gap-3 mb-2'>
            <Heart size={28} className='text-[#FFBD1A]' />
            <h1 className='text-2xl font-normal text-dashboard'>Editar História</h1>
          </div>
          <YVText variant='small' className='text-dashboard-muted'>
            Edite as informações da história
          </YVText>
        </div>
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <HistoriaForm
          defaultValues={{
            id: historia.id,
            title: historia.title,
            slug: historia.slug || '',
            content: historia.content,
            imageUrl: historia.imageUrl || '',
            authorName: historia.authorName,
            country: historia.country,
            status: historia.status
          }}
          isEditing={true}
        />
      </div>
    </div>
  );
}
