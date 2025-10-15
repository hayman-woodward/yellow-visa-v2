'use client';

import React from 'react';
import { useFaq } from '@/hooks/useDashboardData';
import { YVText } from '@/components/YV';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import QuestionEditForm from '../components/QuestionEditForm';

type PageProps = {
  params: Promise<{ slug: string; questionSlug: string }>;
};

export default function EditarPerguntaPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ slug: string; questionSlug: string } | null>(null);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const { faq, loading, error } = useFaq(resolvedParams?.slug || '');

  if (loading) {
    return (
      <div className='space-y-6'>
        {/* Header Skeleton */}
        <div className='flex items-center gap-4'>
          <div className='p-2 rounded-lg bg-gray-200 animate-pulse w-10 h-10' />
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-7 h-7 bg-gray-200 rounded animate-pulse' />
              <div className='h-8 w-32 bg-gray-200 rounded animate-pulse' />
            </div>
            <div className='h-4 w-48 bg-gray-200 rounded animate-pulse' />
          </div>
        </div>

        {/* Layout em 2 colunas Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-6">
                {/* Título */}
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                </div>
                {/* URL */}
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                </div>
                {/* Conteúdo */}
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-48 w-full bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-6">
                {/* Autor */}
                <div className="space-y-2">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                </div>
                {/* Status */}
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                </div>
                {/* Imagem */}
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-32 w-full bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Section Skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-11 w-32 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-11 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Link
            href={`/dashboard/faqs/${resolvedParams?.slug}/editar`}
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors cursor-pointer'
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

  if (!faq) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Link
            href={`/dashboard/faqs/${resolvedParams?.slug}/editar`}
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors cursor-pointer'
          >
            <ArrowLeft size={20} className='text-dashboard-muted' />
          </Link>
          <div>
            <h1 className='text-2xl font-normal text-dashboard'>FAQ não encontrado</h1>
          </div>
        </div>
        <div className='text-center py-12'>
          <YVText className='text-dashboard-muted'>
            O FAQ solicitado não foi encontrado
          </YVText>
        </div>
      </div>
    );
  }

  // Encontrar a pergunta específica pelo slug
  const questionSlug = resolvedParams?.questionSlug;
  const question = faq.questions?.find(q => {
    const cleanLink = q.link?.replace('/guia-do-imigrante/', '').replace('/', '');
    return cleanLink === questionSlug;
  });

  if (!question) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Link
            href={`/dashboard/faqs/${resolvedParams?.slug}/editar`}
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors cursor-pointer'
          >
            <ArrowLeft size={20} className='text-dashboard-muted' />
          </Link>
          <div>
            <h1 className='text-2xl font-normal text-dashboard'>Pergunta não encontrada</h1>
          </div>
        </div>
        <div className='text-center py-12'>
          <YVText className='text-dashboard-muted'>
            A pergunta solicitada não foi encontrada
          </YVText>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header - Padrão da Aplicação */}
      <div className='flex items-center gap-4'>
        <Link
          href={`/dashboard/faqs/${resolvedParams?.slug}/editar`}
          className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors cursor-pointer'
        >
          <ArrowLeft size={20} className='text-dashboard-muted' />
        </Link>
        <div>
          <div className='flex items-center gap-3 mb-2'>
            <FileText size={28} className='text-[#FFBD1A]' />
            <h1 className='text-2xl font-normal text-dashboard'>Editar Pergunta</h1>
          </div>
          <YVText variant='small' className='text-dashboard-muted'>
            Edite o conteúdo da pergunta: <strong>{question.question}</strong>
          </YVText>
        </div>
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <QuestionEditForm
          faqSlug={resolvedParams?.slug || ''}
          questionId={question.id}
          questionSlug={questionSlug || ''}
          defaultValues={{
            question: question.question,
            content: question.content || '',
            link: question.link || '',
            order: question.order || 0,
            status: question.status,
            authorId: question.authorId || '',
            videoUrl: question.videoUrl || '',
            imageUrl: question.imageurl || '',
            metaDescription: question.metadescription || '',
            ogDescription: question.ogdescription || ''
          }}
        />
      </div>
    </div>
  );
}
