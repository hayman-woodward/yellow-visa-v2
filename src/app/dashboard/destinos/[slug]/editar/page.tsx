'use client';

import React from 'react';
import { useDestino } from '@/hooks/useDashboardData';
import { YVText } from '@/components/YV';
import { MapPin, ArrowLeft, Eye } from 'lucide-react';
import Link from 'next/link';
import DestinoForm from '../../components/DestinoForm';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function EditarDestinoPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ slug: string } | null>(null);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const { destino, loading, error } = useDestino(resolvedParams?.slug || '');

  if (loading) {
    return (
      <div className='space-y-6'>
        {/* Breadcrumb Skeleton */}
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 bg-gray-200 rounded animate-pulse' />
          <div className='w-32 h-4 bg-gray-200 rounded animate-pulse' />
        </div>

        {/* Header Skeleton */}
        <div>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-7 h-7 bg-gray-200 rounded animate-pulse' />
            <div className='h-8 w-40 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='h-4 w-64 bg-gray-200 rounded animate-pulse' />
        </div>

        {/* Form Skeleton */}
        <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
              </div>
              <div className='space-y-4'>
                <div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
                <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
              </div>
            </div>
            <div className='space-y-4'>
              <div className='h-4 w-32 bg-gray-200 rounded animate-pulse' />
              <div className='h-32 w-full bg-gray-200 rounded animate-pulse' />
            </div>
            <div className='flex gap-4'>
              <div className='h-10 w-24 bg-gray-200 rounded animate-pulse' />
              <div className='h-10 w-24 bg-gray-200 rounded animate-pulse' />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !destino) {
    return (
      <div className='space-y-6'>
        <Link
          href='/dashboard/destinos'
          className='inline-flex items-center gap-2 text-sm text-dashboard-muted hover:text-dashboard transition-colors'
        >
          <ArrowLeft size={16} />
          Voltar para Destinos
        </Link>
        <div className='text-center py-12'>
          <YVText className='text-red-500'>
            {error || 'Destino não encontrado'}
          </YVText>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Link
            href='/dashboard/destinos'
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
          >
            <ArrowLeft size={20} className='text-dashboard-muted' />
          </Link>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <MapPin size={28} className='text-[#FFBD1A]' />
              <h1 className='text-2xl font-normal text-dashboard'>
                Editar Destino
              </h1>
            </div>
            <YVText variant='small' className='text-dashboard-muted'>
              Atualize as informações do destino
            </YVText>
          </div>
        </div>

        {/* Botão Visualizar */}
        <Link
          href={`/destinos/${destino.slug}`}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 px-4 py-2 bg-[#FFBD1A] text-[#0F0005] rounded-lg hover:bg-[#FFBD1A]/90 transition-colors font-medium'
        >
          <Eye size={18} />
          Visualizar
        </Link>
      </div>

      {/* Form Card */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <DestinoForm
          defaultValues={{
            id: destino.id,
            name: destino.name,
            slug: destino.slug,
            description: destino.description,
            content: destino.content || '',
            bannerTitle: destino.bannerTitle || '',
            imageUrl: destino.imageUrl || '',
            country: destino.country,
            continent: destino.continent,
            highlights: destino.highlights || '',
            status: destino.status,
            // Campos das principais cidades
            cityEnabled: destino.cityEnabled || false,
            cityTitle: destino.cityTitle || '',
            cityDescription: destino.cityDescription || '',
            city1Title: destino.city1Title || '',
            city1Description: destino.city1Description || '',
            city1Image: destino.city1Image || '',
            city2Title: destino.city2Title || '',
            city2Description: destino.city2Description || '',
            city2Image: destino.city2Image || '',
            city3Title: destino.city3Title || '',
            city3Description: destino.city3Description || '',
            city3Image: destino.city3Image || '',
            city4Title: destino.city4Title || '',
            city4Description: destino.city4Description || '',
            city4Image: destino.city4Image || '',
            // Campos dos diferenciais
            diferenciaisEnabled: destino.diferenciaisEnabled || false,
            diferenciaisTitle: destino.diferenciaisTitle || '',
            diferenciaisDescription: destino.diferenciaisDescription || '',
            diferencial1Title: destino.diferencial1Title || '',
            diferencial1Description: destino.diferencial1Description || '',
            diferencial1Image: destino.diferencial1Image || '',
            diferencial2Title: destino.diferencial2Title || '',
            diferencial2Description: destino.diferencial2Description || '',
            diferencial2Image: destino.diferencial2Image || '',
            diferencial3Title: destino.diferencial3Title || '',
            diferencial3Description: destino.diferencial3Description || '',
            diferencial3Image: destino.diferencial3Image || '',
            diferencial4Title: destino.diferencial4Title || '',
            diferencial4Description: destino.diferencial4Description || '',
            diferencial4Image: destino.diferencial4Image || '',
            // Campos dos requisitos especiais
            requisitosEnabled: destino.requisitosEnabled || false,
            requisitosTitle: destino.requisitosTitle || '',
            requisitosDescription: destino.requisitosDescription || '',
            requisitosBreadcrumb: destino.requisitosBreadcrumb || '',
            requisitosButtonText: destino.requisitosButtonText || '',
            requisitosButtonUrl: destino.requisitosButtonUrl || '',
            requisito1Title: destino.requisito1Title || '',
            requisito1Description: destino.requisito1Description || '',
            requisito1Icon: destino.requisito1Icon || '',
            requisito2Title: destino.requisito2Title || '',
            requisito2Description: destino.requisito2Description || '',
            requisito2Icon: destino.requisito2Icon || '',
            requisito3Title: destino.requisito3Title || '',
            requisito3Description: destino.requisito3Description || '',
            requisito3Icon: destino.requisito3Icon || '',
            requisito4Title: destino.requisito4Title || '',
            requisito4Description: destino.requisito4Description || '',
            requisito4Icon: destino.requisito4Icon || '',
            requisito5Title: destino.requisito5Title || '',
            requisito5Description: destino.requisito5Description || '',
            requisito5Icon: destino.requisito5Icon || '',
            requisito6Title: destino.requisito6Title || '',
            requisito6Description: destino.requisito6Description || '',
            requisito6Icon: destino.requisito6Icon || '',
            requisito7Title: destino.requisito7Title || '',
            requisito7Description: destino.requisito7Description || '',
            requisito7Icon: destino.requisito7Icon || '',
            requisito8Title: destino.requisito8Title || '',
            requisito8Description: destino.requisito8Description || '',
            requisito8Icon: destino.requisito8Icon || ''
          }}
          isEditing
        />
      </div>
    </div>
  );
}
