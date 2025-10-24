'use client';

import React, { useState } from 'react';
import { useVisto } from '@/hooks/useDashboardData';
import { YVText, YVButton } from '@/components/YV';
import { DeletePanel } from '@/components/shared/DeletePanel';
import { SeoAnalysisPanel } from '@/components/shared/SeoAnalysisPanel';
import { ArrowLeft, FileText, Eye, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import VistoForm from '../../components/VistoForm';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function EditarVistoPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ slug: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteExpanded, setDeleteExpanded] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [seoActiveTab, setSeoActiveTab] = useState<'general' | 'social'>('general');
  const router = useRouter();

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const { visto, loading, error } = useVisto(resolvedParams?.slug || '');

  const handleDelete = async (slug: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/dashboard/vistos/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Visto movido para lixeira!');
        router.push('/dashboard/vistos');
      } else {
        const error = await response.json();
        toast.error('Erro ao deletar visto: ' + error.message);
      }
    } catch (error) {
      toast.error('Erro ao deletar visto');
    } finally {
      setIsDeleting(false);
    }
  };

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
            href='/dashboard/vistos'
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

  if (!visto) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Link
            href='/dashboard/vistos'
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
          >
            <ArrowLeft size={20} className='text-dashboard-muted' />
          </Link>
          <div>
            <h1 className='text-2xl font-normal text-dashboard'>Visto não encontrado</h1>
          </div>
        </div>
        <div className='text-center py-12'>
          <YVText className='text-dashboard-muted'>
            O visto solicitado não foi encontrado
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
            href='/dashboard/vistos'
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
          >
            <ArrowLeft size={20} className='text-dashboard-muted' />
          </Link>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <FileText size={28} className='text-[#FFBD1A]' />
              <h1 className='text-2xl font-normal text-dashboard'>Editar Visto</h1>
            </div>
            <YVText variant='small' className='text-dashboard-muted'>
              Edite as informações do visto
            </YVText>
          </div>
        </div>

        {/* Botão Visualizar */}
        <Link
          href={`/vistos/${visto.slug}`}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 px-4 py-2 bg-[#FFBD1A] text-[#0F0005] rounded-lg hover:bg-[#FFBD1A]/90 transition-colors font-medium'
        >
          <Eye size={18} />
          Visualizar
        </Link>
      </div>


      {/* Formulário de Edição */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <VistoForm
          defaultValues={{
            id: visto.id,
            title: visto.title,
            slug: visto.slug || '',
            description: visto.description,
            imageUrl: visto.imageUrl || '',
            country: visto.country,
            vistoType: visto.vistoType,
            status: visto.status,
            excerpt: visto.excerpt || '',
            content: visto.content || '',
            bannerTitle: visto.bannerTitle || '',
            // Campos do banner dinâmico
            bannerEnabled: visto.bannerEnabled || false,
            bannerDescription: visto.bannerDescription || '',
            bannerButtonText: visto.bannerButtonText || '',
            bannerButtonUrl: visto.bannerButtonUrl || '',
            // Campos do CTA dinâmico
            ctaTitle: visto.ctaTitle || '',
            ctaDescription: visto.ctaDescription || '',
            ctaButtonText: visto.ctaButtonText || '',
            ctaButtonUrl: visto.ctaButtonUrl || '',
            videoUrl: visto.videoUrl || '',
            // Campos das principais cidades
            cityEnabled: visto.cityEnabled || false,
            cityTitle: visto.cityTitle || '',
            cityDescription: visto.cityDescription || '',
            city1Title: visto.city1Title || '',
            city1Description: visto.city1Description || '',
            city1Image: visto.city1Image || '',
            city2Title: visto.city2Title || '',
            city2Description: visto.city2Description || '',
            city2Image: visto.city2Image || '',
            city3Title: visto.city3Title || '',
            city3Description: visto.city3Description || '',
            city3Image: visto.city3Image || '',
            city4Title: visto.city4Title || '',
            city4Description: visto.city4Description || '',
            city4Image: visto.city4Image || '',
            // Campos do FAQ
            faqEnabled: visto.faqEnabled || false,
            faqTitle: visto.faqTitle || '',
            faqDescription: visto.faqDescription || '',
            faq1Question: visto.faq1Question || '',
            faq1Answer: visto.faq1Answer || '',
            faq2Question: visto.faq2Question || '',
            faq2Answer: visto.faq2Answer || '',
            faq3Question: visto.faq3Question || '',
            faq3Answer: visto.faq3Answer || '',
            faq4Question: visto.faq4Question || '',
            faq4Answer: visto.faq4Answer || '',
            faq5Question: visto.faq5Question || '',
            faq5Answer: visto.faq5Answer || '',
            faq6Question: visto.faq6Question || '',
            faq6Answer: visto.faq6Answer || '',
            // Campos dos diferenciais
            diferenciaisEnabled: visto.diferenciaisEnabled || false,
            diferenciaisTitle: visto.diferenciaisTitle || '',
            diferenciaisDescription: visto.diferenciaisDescription || '',
            diferencial1Title: visto.diferencial1Title || '',
            diferencial1Description: visto.diferencial1Description || '',
            diferencial1Image: visto.diferencial1Image || '',
            diferencial2Title: visto.diferencial2Title || '',
            diferencial2Description: visto.diferencial2Description || '',
            diferencial2Image: visto.diferencial2Image || '',
            diferencial3Title: visto.diferencial3Title || '',
            diferencial3Description: visto.diferencial3Description || '',
            diferencial3Image: visto.diferencial3Image || '',
            diferencial4Title: visto.diferencial4Title || '',
            diferencial4Description: visto.diferencial4Description || '',
            diferencial4Image: visto.diferencial4Image || '',
            // Campos dos benefícios
            beneficiosEnabled: visto.beneficiosEnabled || false,
            beneficio1Title: visto.beneficio1Title || '',
            beneficio1Description: visto.beneficio1Description || '',
            beneficio1Icon: visto.beneficio1Icon || '',
            beneficio2Title: visto.beneficio2Title || '',
            beneficio2Description: visto.beneficio2Description || '',
            beneficio2Icon: visto.beneficio2Icon || '',
            beneficio3Title: visto.beneficio3Title || '',
            beneficio3Description: visto.beneficio3Description || '',
            beneficio3Icon: visto.beneficio3Icon || '',
            // Campos dos requisitos especiais
            requisitosEnabled: visto.requisitosEnabled || false,
            requisitosTitle: visto.requisitosTitle || '',
            requisitosDescription: visto.requisitosDescription || '',
            requisitosBreadcrumb: visto.requisitosBreadcrumb || '',
            requisitosButtonText: visto.requisitosButtonText || '',
            requisitosButtonUrl: visto.requisitosButtonUrl || '',
            requisito1Title: visto.requisito1Title || '',
            requisito1Description: visto.requisito1Description || '',
            requisito1Icon: visto.requisito1Icon || '',
            requisito2Title: visto.requisito2Title || '',
            requisito2Description: visto.requisito2Description || '',
            requisito2Icon: visto.requisito2Icon || '',
            requisito3Title: visto.requisito3Title || '',
            requisito3Description: visto.requisito3Description || '',
            requisito3Icon: visto.requisito3Icon || '',
            requisito4Title: visto.requisito4Title || '',
            requisito4Description: visto.requisito4Description || '',
            requisito4Icon: visto.requisito4Icon || '',
            requisito5Title: visto.requisito5Title || '',
            requisito5Description: visto.requisito5Description || '',
            requisito5Icon: visto.requisito5Icon || '',
            requisito6Title: visto.requisito6Title || '',
            requisito6Description: visto.requisito6Description || '',
            requisito6Icon: visto.requisito6Icon || '',
            requisito7Title: visto.requisito7Title || '',
            requisito7Description: visto.requisito7Description || '',
            requisito7Icon: visto.requisito7Icon || '',
            requisito8Title: visto.requisito8Title || '',
            requisito8Description: visto.requisito8Description || '',
            requisito8Icon: visto.requisito8Icon || '',
            metaTitle: visto.metaTitle || '',
            metaDescription: visto.metaDescription || '',
            metaKeywords: visto.metaKeywords || '',
            ogTitle: visto.ogTitle || '',
            ogDescription: visto.ogDescription || '',
            ogImage: visto.ogImage || '',
            twitterTitle: visto.twitterTitle || '',
            twitterDescription: visto.twitterDescription || '',
            twitterImage: visto.twitterImage || ''
          }}
          isEditing={true}
        />
      </div>

      {/* Painéis SEO e Delete - FORA do formulário */}
      <div className="space-y-4">
        {/* SEO Panel */}
        <SeoAnalysisPanel
          data={{
            title: visto.title,
            description: visto.description,
            metaTitle: visto.metaTitle || '',
            metaDescription: visto.metaDescription || '',
            metaKeywords: visto.metaKeywords || '',
            ogTitle: visto.ogTitle || '',
            ogDescription: visto.ogDescription || '',
            ogImage: visto.ogImage || '',
            twitterTitle: visto.twitterTitle || '',
            twitterDescription: visto.twitterDescription || '',
            twitterImage: visto.twitterImage || ''
          }}
          expanded={seoExpanded}
          onToggle={() => setSeoExpanded(!seoExpanded)}
          activeTab={seoActiveTab}
          onTabChange={setSeoActiveTab}
        >
          {seoActiveTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Meta Title</label>
                <input
                  type="text"
                  placeholder="Título para SEO..."
                  defaultValue={visto.metaTitle || ''}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Meta Description</label>
                <textarea
                  placeholder="Descrição para SEO..."
                  defaultValue={visto.metaDescription || ''}
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Meta Keywords</label>
                <input
                  type="text"
                  placeholder="palavra-chave1, palavra-chave2..."
                  defaultValue={visto.metaKeywords || ''}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}
          {seoActiveTab === 'social' && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">OG Title</label>
                <input
                  type="text"
                  placeholder="Título para redes sociais..."
                  defaultValue={visto.ogTitle || ''}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">OG Description</label>
                <textarea
                  placeholder="Descrição para redes sociais..."
                  defaultValue={visto.ogDescription || ''}
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">OG Image</label>
                <input
                  type="text"
                  placeholder="URL da imagem para redes sociais..."
                  defaultValue={visto.ogImage || ''}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}
        </SeoAnalysisPanel>

        {/* Delete Panel */}
        <DeletePanel
          expanded={deleteExpanded}
          onToggle={() => setDeleteExpanded(!deleteExpanded)}
          onDelete={handleDelete}
          itemName="visto"
          itemSlug={visto.slug}
          isDeleting={isDeleting}
        />
      </div>

    </div>
  );
}

