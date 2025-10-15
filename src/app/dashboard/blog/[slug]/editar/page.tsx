'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { YVTitle, YVText } from '@/components/YV';
import { YVSkeletonForm } from '@/components/YV';
import { useBlogPost } from '@/hooks/useDashboardData';
import EditPageHeader from '@/components/shared/EditPageHeader';
import BlogForm from '../../components/BlogForm';

interface EditPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    params.then(({ slug: resolvedSlug }) => {
      setSlug(resolvedSlug);
    });
  }, [params]);

  const { blogPost, loading, error } = useBlogPost(slug);

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
      <EditPageHeader
        title="Editar Post"
        subtitle={blogPost.title}
        icon={BookOpen}
        backHref="/dashboard/blog"
        backLabel="Voltar para o blog"
      />

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <BlogForm
          defaultValues={blogPost}
          isEditing={true}
        />
      </div>
    </div>
  );
}
