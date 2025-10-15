'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, File } from 'lucide-react';
import { YVTitle, YVText } from '@/components/YV';
import { YVSkeletonForm } from '@/components/YV';
import PageForm from '../../components/PageForm';
import { usePage } from '@/hooks/useDashboardData';

interface EditPagePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function EditPagePage({ params }: EditPagePageProps) {
  const [slug, setSlug] = useState<string>('');
  
  useEffect(() => {
    params.then(({ slug: resolvedSlug }) => {
      setSlug(resolvedSlug);
    });
  }, [params]);
  
  const { page, loading, error } = usePage(slug);

  if (loading) {
    return <YVSkeletonForm />;
  }

  if (error || !page) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <YVTitle variant='heading' className='text-red-500'>Erro ao carregar página</YVTitle>
        <YVText>{error || 'Página não encontrada'}</YVText>
        <Link href='/dashboard/pages' className='mt-4 text-[#FFBD1A] hover:underline'>
          Voltar para páginas
        </Link>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link 
          href='/dashboard/pages'
          className='p-2 rounded-lg bg-dashboard-hover hover:bg-dashboard-border transition-colors'
        >
          <ArrowLeft size={20} className='text-dashboard' />
        </Link>
        <div className='flex items-center gap-3'>
          <File size={28} className='text-[#FFBD1A]' />
          <div>
            <YVTitle variant='heading'>Editar Página</YVTitle>
            <YVText className='text-dashboard-muted'>
              {page.title}
            </YVText>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard'>
        <div className='p-6'>
          <PageForm 
            defaultValues={page}
            isEditing={true}
          />
        </div>
      </div>
    </div>
  );
}
