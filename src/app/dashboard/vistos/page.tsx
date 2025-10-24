'use client';

import { YVText, YVButton } from '@/components/YV';
import DashboardHeader from '@/components/shared/DashboardHeader';
import { Tabs } from '@/components/shared/Tabs';
import DeleteItem from '@/components/shared/DeleteItem';
import { useVistos } from '@/hooks/useDashboardData';
import { FileText, Plus, Trash2, RotateCcw, X, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function VistosPage() {
  const { vistos, error, refetch } = useVistos();
  const [loadingEdit, setLoadingEdit] = useState<string | null>(null);
  const [loadingRestore, setLoadingRestore] = useState<string | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'published' | 'draft' | 'deleted'>('published');
  const router = useRouter();

  // Filtrar vistos baseado na aba ativa
  const publishedVistos = vistos.filter(visto => visto.status === 'published');
  const draftVistos = vistos.filter(visto => visto.status === 'draft');
  const deletedVistos = vistos.filter(visto => visto.status === 'deleted');
  
  const currentVistos = activeTab === 'published' ? publishedVistos : 
                       activeTab === 'draft' ? draftVistos : 
                       deletedVistos;

  // Configuração das abas
  const tabs = [
    {
      id: 'published',
      label: 'Publicados',
      icon: <Eye size={16} />,
      count: publishedVistos.length
    },
    {
      id: 'draft',
      label: 'Rascunhos',
      icon: <FileText size={16} />,
      count: draftVistos.length
    },
    {
      id: 'deleted',
      label: 'Lixeira',
      icon: <Trash2 size={16} />,
      count: deletedVistos.length
    }
  ];

  const handleEditClick = (slug: string) => {
    setLoadingEdit(slug);
    router.push(`/dashboard/vistos/${slug}/editar`);
  };


  const handleRestore = async (slug: string) => {
    setLoadingRestore(slug);
    try {
      const response = await fetch(`/api/dashboard/vistos/${slug}/restore`, {
        method: 'POST',
      });

      if (response.ok) {
        await refetch();
        setActiveTab('published');
      } else {
        const error = await response.json();
        toast.error('Erro ao restaurar visto: ' + error.message);
      }
    } catch (error) {
      toast.error('Erro ao restaurar visto');
    } finally {
      setLoadingRestore(null);
    }
  };

  const handlePermanentDelete = async (slug: string) => {
    if (!confirm('Tem certeza que deseja deletar permanentemente? Esta ação não pode ser desfeita.')) {
      return;
    }

    setLoadingDelete(slug);
    try {
      const response = await fetch(`/api/dashboard/vistos/${slug}/permanent`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await refetch();
        toast.success('Visto deletado permanentemente!');
      } else {
        const error = await response.json();
        toast.error('Erro ao deletar visto: ' + error.message);
      }
    } catch (error) {
      toast.error('Erro ao deletar visto');
    } finally {
      setLoadingDelete(null);
    }
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

  // Agrupar por país (usando vistos filtrados)
  const groupedByCountry = currentVistos.reduce((acc, visto) => {
    if (!acc[visto.country]) {
      acc[visto.country] = [];
    }
    acc[visto.country].push(visto);
    return acc;
  }, {} as Record<string, typeof currentVistos>);

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

      {/* Abas */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as 'published' | 'draft' | 'deleted')}
        className="mb-6"
      />

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
                    {activeTab === 'deleted' ? (
                      <div className='flex gap-2'>
                        <YVButton
                          onClick={() => handleRestore(visto.slug)}
                          loading={loadingRestore === visto.slug}
                          variant="text"
                          size="sm"
                          className="flex-1 !h-8 !px-3 !py-2 !rounded-lg bg-dashboard-hover hover:bg-dashboard-border hover:opacity-80 text-dashboard text-xs font-medium !transition-all !duration-150 active:scale-[0.97] !cursor-pointer"
                        >
                          <RotateCcw size={14} className='mr-1' />
                          Restaurar
                        </YVButton>
                        
                        <YVButton
                          onClick={() => handlePermanentDelete(visto.slug)}
                          loading={loadingDelete === visto.slug}
                          variant="outline"
                          size="sm"
                          className="!h-8 !px-3 !py-2 !rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 text-xs font-medium !transition-all !duration-150 active:scale-[0.97] !cursor-pointer"
                        >
                          <X size={14} />
                        </YVButton>
                      </div>
                    ) : (
                      <div className='flex gap-2'>
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
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {currentVistos.length === 0 && (
        <div className='text-center py-12 bg-dashboard-card rounded-lg border border-dashboard'>
          <YVText className='text-dashboard-muted'>
            {activeTab === 'published' ? 'Nenhum visto publicado encontrado' : 
             activeTab === 'draft' ? 'Nenhum rascunho encontrado' : 
             'Lixeira vazia'}
          </YVText>
        </div>
      )}
    </div>
  );
}
