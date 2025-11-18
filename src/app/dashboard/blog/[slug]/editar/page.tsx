'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Eye } from 'lucide-react';
import { YVTitle, YVText } from '@/components/YV';
import { YVSkeletonForm } from '@/components/YV';
import { useBlogPost } from '@/hooks/useDashboardData';
import { DeletePanel } from '@/components/shared/DeletePanel';
import { SeoAnalysisPanel } from '@/components/shared/SeoAnalysisPanel';
import { useRouter } from 'next/navigation';
import BlogForm from '../../components/BlogForm';

interface EditPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const [slug, setSlug] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteExpanded, setDeleteExpanded] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [seoActiveTab, setSeoActiveTab] = useState<'general' | 'social'>('general');
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then(({ slug: resolvedSlug }) => {
      setSlug(resolvedSlug);
    });
  }, [params]);

  const { blogPost, loading, error } = useBlogPost(slug);

  const handleDelete = async (slug: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/dashboard/blog/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ text: 'Post movido para lixeira!', success: true });
        setTimeout(() => router.push('/dashboard/blog'), 1500);
      } else {
        const error = await response.json();
        setMessage({ text: 'Erro ao deletar post: ' + error.message, success: false });
      }
    } catch (error) {
      setMessage({ text: 'Erro ao deletar post', success: false });
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <YVSkeletonForm />;
  }

  if (error || !blogPost) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <YVTitle variant='heading' className='text-red-500'>Erro ao carregar post</YVTitle>
        <YVText>{error || 'Post não encontrado'}</YVText>
        <Link href='/dashboard/blog' className='mt-4 text-[#FFBD1A] hover:underline'>
          Voltar para o blog
        </Link>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Link
            href='/dashboard/blog'
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
          >
            <svg width={20} height={20} className='text-dashboard-muted' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
          </Link>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <BookOpen size={28} className='text-[#FFBD1A]' />
              <h1 className='text-2xl font-normal text-dashboard'>Editar Post</h1>
            </div>
            <YVText variant='small' className='text-dashboard-muted'>
              Edite as informações do post
            </YVText>
          </div>
        </div>

        {/* Botão Visualizar */}
        <Link
          href={`/guia-do-imigrante/${blogPost.slug}`}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 px-4 py-2 bg-[#FFBD1A] text-[#0F0005] rounded-lg hover:bg-[#FFBD1A]/90 transition-colors font-medium'
        >
          <Eye size={18} />
          Visualizar
        </Link>
      </div>

      {/* Mensagem de sucesso/erro */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-md text-sm text-center ${
            message.success
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <BlogForm
          defaultValues={blogPost}
          isEditing={true}
        />
      </div>

      {/* Painéis SEO e Delete - FORA do formulário */}
      <div className="space-y-4">
        {/* SEO Panel */}
        <SeoAnalysisPanel
          data={{
            title: blogPost.title || '',
            content: blogPost.excerpt || '',
            metaDescription: blogPost.metaDescription || '',
            metaKeywords: blogPost.metaKeywords || '',
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
                  defaultValue={blogPost.metaTitle || ''}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Meta Description</label>
                <textarea
                  placeholder="Descrição para SEO..."
                  defaultValue={blogPost.metaDescription || ''}
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Meta Keywords</label>
                <input
                  type="text"
                  placeholder="palavra-chave1, palavra-chave2..."
                  defaultValue={blogPost.metaKeywords || ''}
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
                  defaultValue={blogPost.ogTitle || ''}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">OG Description</label>
                <textarea
                  placeholder="Descrição para redes sociais..."
                  defaultValue={blogPost.ogDescription || ''}
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">OG Image</label>
                <input
                  type="text"
                  placeholder="URL da imagem para redes sociais..."
                  defaultValue={blogPost.ogImage || ''}
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
          itemName="post"
          itemSlug={blogPost.slug}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}
