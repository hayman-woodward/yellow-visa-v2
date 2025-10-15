'use client';

import { useDestinos } from '@/hooks/useDashboardData';
import { YVText } from '@/components/YV';
import Link from 'next/link';
import { MapPin, Plus } from 'lucide-react';
import DashboardHeader from '@/components/shared/DashboardHeader';

export default function DestinosPage() {
  const { destinos, loading, error } = useDestinos();

  if (loading) {
    return (
      <div className='space-y-6'>
        {/* Header Skeleton */}
        <div className='flex items-center justify-between'>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-7 h-7 bg-gray-200 rounded animate-pulse' />
              <div className='h-8 w-24 bg-gray-200 rounded animate-pulse' />
            </div>
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

  if (error) {
    return (
      <div className='text-center py-12'>
        <YVText className='text-red-500'>
          Erro ao carregar destinos: {error}
        </YVText>
      </div>
    );
  }

  // Agrupar por continente
  const groupedByContinent = destinos.reduce((acc, destino) => {
    if (!acc[destino.continent]) {
      acc[destino.continent] = [];
    }
    acc[destino.continent].push(destino);
    return acc;
  }, {} as Record<string, typeof destinos>);

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardHeader
        title="Destinos"
        icon={MapPin}
        count={destinos.length}
        countLabel="destinos"
        buttonText="Novo Destino"
        buttonVariant='outline'
        buttonIcon={Plus}
        buttonHref="/dashboard/destinos/novo"
      />

      <YVText variant='small' className='text-dashboard-muted mb-6'>
        Gerencie os destinos disponíveis
      </YVText>

      {/* Por Continente */}
      {Object.entries(groupedByContinent).map(([continent, destinosList]) => (
        <div key={continent} className='space-y-4'>
          <h2 className='text-lg font-semibold text-dashboard'>{continent}</h2>

          {/* Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {destinosList.map((destino) => (
              <div
                key={destino.id}
                className='bg-dashboard-card rounded-lg border border-dashboard overflow-hidden hover:border-[#FFBD1A]/50 transition-all duration-200'
              >
                <div className='relative h-32 overflow-hidden'>
                  {destino.imageUrl ? (
                    <img
                      src={destino.imageUrl}
                      alt={destino.name}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'>
                      <span className='text-gray-400 text-sm'>Sem imagem</span>
                    </div>
                  )}
                  <div className='absolute top-2 right-2'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${destino.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {destino.status}
                    </span>
                  </div>
                </div>

                <div className='p-4'>
                  <h3 className='font-semibold text-dashboard mb-1 line-clamp-1 text-sm'>
                    {destino.name}
                  </h3>

                  <p className='text-xs text-dashboard-muted mb-2'>
                    {destino.country}
                  </p>

                  <p className='text-xs text-dashboard-muted mb-3 line-clamp-2'>
                    {destino.description}
                  </p>

                  {destino.highlights && (
                    <p className='text-xs text-dashboard-muted mb-3'>
                      <span className='font-medium'>Destaques:</span>{' '}
                      <span className='line-clamp-1'>{destino.highlights}</span>
                    </p>
                  )}

                  <div className='pt-3 border-t border-dashboard'>
                    <Link
                      href={`/dashboard/destinos/${destino.slug}/editar`}
                      className='block'
                    >
                      <button className='w-full px-3 py-2 rounded-lg bg-dashboard-hover hover:bg-dashboard-border hover:opacity-80 text-dashboard text-xs font-medium transition-all duration-150 active:scale-[0.97]'>
                        Editar
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {destinos.length === 0 && (
        <div className='text-center py-12 bg-dashboard-card rounded-lg border border-dashboard'>
          <YVText className='text-dashboard-muted'>
            Nenhum destino encontrado
          </YVText>
        </div>
      )}
    </div>
  );
}
