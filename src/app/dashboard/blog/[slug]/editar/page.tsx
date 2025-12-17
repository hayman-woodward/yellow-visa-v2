'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Eye } from 'lucide-react';
import { YVTitle, YVText } from '@/components/YV';
import { YVSkeletonForm } from '@/components/YV';
import { useBlogPost } from '@/hooks/useDashboardData';
import { DeletePanel } from '@/components/shared/DeletePanel';
import { useRouter } from 'next/navigation';
import BlogForm from '../../components/BlogForm';
import { generateSlug } from '@/utils/generateSlug';

interface EditPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = React.use(params);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteExpanded, setDeleteExpanded] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const router = useRouter();

  const { blogPost, loading, error } = useBlogPost(slug);

  const handleDelete = async (slug: string) => {
    if (!slug || slug.trim() === '') {
      console.error('❌ Slug vazio ou inválido:', slug);
      setMessage({ text: 'Erro: Slug inválido', success: false });
      return;
    }

    console.log('🗑️ Deleting post with slug:', slug);
    setIsDeleting(true);
    setMessage(null);
    
    try {
      const response = await fetch(`/api/dashboard/blog/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Post deleted successfully');
        setMessage({ text: 'Post deletado com sucesso!', success: true });
        setTimeout(() => router.push('/dashboard/blog'), 1500);
      } else {
        console.error('❌ Erro ao deletar post:', data);
        const errorMessage = data.message || data.error || 'Erro desconhecido';
        setMessage({ text: 'Erro ao deletar post: ' + errorMessage, success: false });
        setIsDeleting(false);
      }
    } catch (error) {
      console.error('❌ Erro ao deletar post:', error);
      setMessage({ 
        text: 'Erro ao deletar post: ' + (error instanceof Error ? error.message : 'Erro de conexão'), 
        success: false 
      });
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
      
        {/* Botão Visualizar - só aparece se o post estiver publicado */}
        <span className="hidden">{blogPost.status}</span>
        {blogPost.status?.toLowerCase() === 'published' && (
          <Link
            href={`/blog/${blogPost.category ? generateSlug(blogPost.category) : 'blog'}/${blogPost.slug}`}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 px-4 py-2 bg-[#FFBD1A] text-[#0F0005] rounded-lg hover:bg-[#FFBD1A]/90 transition-colors font-medium'
          >
            <Eye size={18} />
            Visualizar
          </Link>
        )}
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


        {/* Delete Panel */}
        {blogPost?.slug && (
          <DeletePanel
            expanded={deleteExpanded}
            onToggle={() => setDeleteExpanded(!deleteExpanded)}
            onDelete={handleDelete}
            itemName="post"
            itemSlug={blogPost.slug}
            isDeleting={isDeleting}
          />
        )}
      </div>
    </div>
  );
}
