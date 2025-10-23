'use client';

import { YVText, YVButton } from '@/components/YV';
import DashboardHeader from '@/components/shared/DashboardHeader';
import { useVistos } from '@/hooks/useDashboardData';
import { FileText, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function VistosPage() {
  const { vistos, error } = useVistos();
  const [loadingEdit, setLoadingEdit] = useState<string | null>(null);
  const router = useRouter();

  const handleEditClick = (slug: string) => {
    setLoadingEdit(slug);
    router.push(`/dashboard/vistos/${slug}/editar`);
  };


  if (error) {
    return (
      <div className='text-center py-12'>
        <YVText className='text-red-500'>
          Erro ao carregar vistos: {error}
        </YVText>
      </div>
    );
  }

  // Agrupar por país
  const groupedByCountry = vistos.reduce((acc, visto) => {
    if (!acc[visto.country]) {
      acc[visto.country] = [];
    }
    acc[visto.country].push(visto);
    return acc;
  }, {} as Record<string, typeof vistos>);

  const countryLabels = {
    'Estados Unidos': 'Estados Unidos',
    'Portugal': 'Portugal',
    'Brasil': 'Brasil'
  };


  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardHeader
        title="Vistos"
        icon={FileText}
        count={vistos.length}
        countLabel="vistos"
        buttonText="Novo Visto"
        buttonVariant='outline'
        buttonIcon={Plus}
        buttonHref="/dashboard/vistos/novo"
      />

      <YVText variant='small' className='text-dashboard-muted mb-6'>
        Gerencie os vistos por país de destino
      </YVText>

      {/* Por País - Ordenado: EUA, Portugal, outros */}
      {Object.entries(groupedByCountry)
        .sort(([a], [b]) => {
          const order = ['Estados Unidos', 'Portugal', 'Brasil'];
          const aIndex = order.indexOf(a);
          const bIndex = order.indexOf(b);
          if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        })
        .map(([country, vistosList]) => (
        <div key={country} className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-dashboard'>
              {countryLabels[country as keyof typeof countryLabels] || country}
            </h2>
            <span className='text-sm text-dashboard-muted bg-[#FFBD1A]/10 text-[#FFBD1A] px-3 py-1 rounded-full font-medium'>
              {vistosList.length} visto{vistosList.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {vistosList.map((visto) => (
              <div
                key={visto.id}
                className='bg-dashboard-card rounded-lg border border-dashboard overflow-hidden hover:border-[#FFBD1A]/50 transition-all duration-200'
              >
                <div className='relative h-32 overflow-hidden'>
                  {visto.imageUrl ? (
                    <img
                      src={visto.imageUrl}
                      alt={visto.title}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'>
                      <span className='text-gray-400 text-sm'>Sem imagem</span>
                    </div>
                  )}
                  <div className='absolute top-2 right-2'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${visto.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {visto.status}
                    </span>
                  </div>
                </div>

                <div className='p-4'>
                  <h3 className='font-semibold text-dashboard mb-1 line-clamp-1 text-sm'>
                    {visto.title}
                  </h3>

                  <p className='text-xs text-dashboard-muted mb-2'>
                    {visto.country}
                  </p>

                  <p className='text-xs text-dashboard-muted mb-3 line-clamp-2'>
                    {visto.description}
                  </p>

                  <div className='pt-3 border-t border-dashboard'>
                    <YVButton
                      onClick={() => handleEditClick(visto.slug)}
                      loading={loadingEdit === visto.slug}
                      variant="text"
                      size="sm"
                      className="w-full !h-8 !px-3 !py-2 !rounded-lg bg-dashboard-hover hover:bg-dashboard-border hover:opacity-80 text-dashboard text-xs font-medium !transition-all !duration-150 active:scale-[0.97] !cursor-pointer"
                    >
                      Editar
                    </YVButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {vistos.length === 0 && (
        <div className='text-center py-12 bg-dashboard-card rounded-lg border border-dashboard'>
          <YVText className='text-dashboard-muted'>
            Nenhum visto encontrado
          </YVText>
        </div>
      )}
    </div>
  );
}
