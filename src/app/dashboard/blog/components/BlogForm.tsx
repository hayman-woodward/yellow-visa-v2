'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YVTextField, YVSelect, YVUploadImg } from '@/components/YV';
import { Label } from '@/components/ui/label';
import { blogPostSchema, updateBlogPostSchema } from '@/schemas/dashboard/blog';
import ClientEditorWrapper from '@/components/editor/ClientEditorWrapper';
import { SeoAnalysisPanel } from '@/components/shared/SeoAnalysisPanel';
import { BlogPreview } from '@/components/shared/BlogPreview';
import { useSeoAnalysis, SeoAnalysisData } from '@/hooks/useSeoAnalysis';
import { useUsuarios } from '@/hooks/useDashboardData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>;

type BlogFormProps = {
  defaultValues?: {
    id?: string;
    title?: string;
    slug?: string;
    content?: string;
    excerpt?: string | null;
    category?: string | null;
    tags?: string | null;
    featuredImage?: string | null;
    authorId?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: string | null;
    twitterTitle?: string | null;
    twitterDescription?: string | null;
    twitterImage?: string | null;
    status?: string;
    isFeatured?: boolean;
  };
  isEditing?: boolean;
};

export default function BlogForm({
  defaultValues,
  isEditing = false
}: BlogFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [seoActiveTab, setSeoActiveTab] = useState<'general' | 'social'>('general');
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();
  const { usuarios, loading: usuariosLoading } = useUsuarios();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(isEditing ? updateBlogPostSchema : blogPostSchema),
    mode: 'onChange' as const,
    defaultValues: {
      title: defaultValues?.title || '',
      slug: defaultValues?.slug || '',
      content: defaultValues?.content || '',
      excerpt: defaultValues?.excerpt || '',
      category: defaultValues?.category || '',
      tags: defaultValues?.tags || '',
      featuredImage: defaultValues?.featuredImage || '',
      authorId: defaultValues?.authorId || '',
      metaTitle: defaultValues?.metaTitle || '',
      metaDescription: defaultValues?.metaDescription || '',
      metaKeywords: defaultValues?.metaKeywords || '',
      ogTitle: defaultValues?.ogTitle || '',
      ogDescription: defaultValues?.ogDescription || '',
      ogImage: defaultValues?.ogImage || '',
      twitterTitle: defaultValues?.twitterTitle || '',
      twitterDescription: defaultValues?.twitterDescription || '',
      twitterImage: defaultValues?.twitterImage || '',
      status: (defaultValues?.status as 'draft' | 'published' | 'archived') || 'draft',
      isFeatured: defaultValues?.isFeatured || false
    }
  });

  const watchedFields = watch();

  // SEO Analysis
  const seoData: SeoAnalysisData = {
    title: watchedFields.title || '',
    content: watchedFields.content || '',
    metaDescription: watchedFields.metaDescription || '',
    metaKeywords: watchedFields.metaKeywords || ''
  };

  const seoAnalysis = useSeoAnalysis(seoData);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue('title', title);

    // Auto-generate slug from title
    if (!isEditing) {
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt || '',
        category: data.category || '',
        tags: data.tags || '',
        featuredImage: data.featuredImage || '',
        authorId: data.authorId || '',
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        metaKeywords: data.metaKeywords || '',
        ogTitle: data.ogTitle || '',
        ogDescription: data.ogDescription || '',
        ogImage: data.ogImage || '',
        twitterTitle: data.twitterTitle || '',
        twitterDescription: data.twitterDescription || '',
        twitterImage: data.twitterImage || '',
        status: data.status,
        isFeatured: data.isFeatured
      };

      const url = isEditing && defaultValues?.slug
        ? `/api/dashboard/blog/${defaultValues.slug}`
        : '/api/dashboard/blog';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        setServerSuccess(result.message || 'Post salvo com sucesso!');
        setTimeout(() => {
          router.push('/dashboard/blog');
        }, 500);
      } else {
        setServerError(result.message || 'Erro ao salvar post');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      setServerError('Erro interno do servidor');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Success Message */}
      {serverSuccess && (
        <div className='p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 flex items-start gap-3 shadow-sm'>
          <div className='w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5'>
            <span className='text-white text-xs font-bold'>✓</span>
          </div>
          <p className='text-sm text-green-800 flex-1 font-medium'>{serverSuccess}</p>
        </div>
      )}

      {/* Error Message */}
      {serverError && (
        <div className='p-4 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/60 flex items-start gap-3 shadow-sm'>
          <div className='w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5'>
            <span className='text-white text-xs font-bold'>!</span>
          </div>
          <p className='text-sm text-red-800 flex-1 font-medium'>{serverError}</p>
        </div>
      )}

      {/* Layout Moderno */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Área Principal - Conteúdo */}
        <div className="xl:col-span-8 space-y-8">
          {/* Título da Página - Card Moderno */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/5 overflow-hidden">
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="mb-3 text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Título do Post
                  </Label>
                  <YVTextField
                    id="title"
                    type="text"
                    placeholder="Ex: Como conseguir um visto de trabalho nos EUA"
                    {...register('title')}
                    onChange={handleTitleChange}
                    disabled={isSubmitting}
                    error={errors.title?.message as string}
                    showSuccess={touchedFields.title && !errors.title && !!watchedFields.title}
                    variant="modern"
                    size="lg"
                    className="text-3xl font-bold text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="slug" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Slug (URL amigável)
                  </Label>
                  <YVTextField
                    id="slug"
                    type="text"
                    placeholder="como-conseguir-visto-trabalho-eua"
                    {...register('slug')}
                    disabled={isSubmitting}
                    error={errors.slug?.message as string}
                    showSuccess={touchedFields.slug && !errors.slug && !!watchedFields.slug}
                    variant="modern"
                    size="lg"
                  />
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    URL final: <code className="bg-gray-100 px-2 py-1 rounded-md font-mono text-gray-700">/{watchedFields.slug || 'slug-do-post'}</code>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo - Card Moderno */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/5 overflow-hidden">
            <div className="p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <h3 className="text-lg font-semibold text-gray-900">Resumo do Post</h3>
                </div>
                <textarea
                  id="excerpt"
                  placeholder="Breve descrição do post..."
                  {...register('excerpt')}
                  disabled={isSubmitting}
                  rows={3}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white/50 hover:border-gray-300 focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors resize-none"
                />
                {errors.excerpt && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.excerpt.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Editor de Conteúdo - Card Moderno */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/5 overflow-hidden">
            <div className="p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <h3 className="text-lg font-semibold text-gray-900">Conteúdo do Post</h3>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <ClientEditorWrapper
                    content={watchedFields.content || ''}
                    onChange={(content) => {
                      console.log('BlogForm content changed:', content);
                      setValue('content', content);
                    }}
                    placeholder="Digite o conteúdo do post aqui..."
                  />
                </div>
                {errors.content && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.content.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Direita - Configurações Modernas */}
        <div className="xl:col-span-4 space-y-6">
          {/* Card de Publicação - Estilo Moderno */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/5 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <h3 className="text-lg font-bold text-gray-900">Publicar</h3>
              </div>

              <div className="space-y-5">
                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Status</Label>
                  <YVSelect
                    id="status"
                    {...register('status')}
                    disabled={isSubmitting}
                    variant="modern"
                    size="md"
                    showSuccess={touchedFields.status && !!watchedFields.status}
                    options={[
                      { value: 'draft', label: '📝 Rascunho' },
                      { value: 'published', label: '🚀 Publicado' },
                      { value: 'archived', label: '📦 Arquivado' }
                    ]}
                  />
                </div>

                {/* Autor */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Autor</Label>
                  {usuariosLoading ? (
                    <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse" />
                  ) : (
                    <YVSelect
                      id="authorId"
                      {...register('authorId')}
                      disabled={isSubmitting}
                      error={errors.authorId?.message as string}
                      variant="modern"
                      size="md"
                      showSuccess={touchedFields.authorId && !errors.authorId && !!watchedFields.authorId}
                      options={[
                        { value: "", label: "Selecione um autor..." },
                        ...usuarios.map((usuario) => ({
                          value: usuario.id,
                          label: usuario.name
                        }))
                      ]}
                    />
                  )}
                </div>

                {/* Preview do autor */}
                {watchedFields.authorId && (
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200/60">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {usuarios.find(u => u.id === watchedFields.authorId)?.name?.charAt(0) || 'A'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {usuarios.find(u => u.id === watchedFields.authorId)?.name}
                      </p>
                      <p className="text-xs text-gray-500">Autor selecionado</p>
                    </div>
                  </div>
                )}

                {/* Is Featured */}
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-yellow-50 rounded-xl border border-gray-200/60">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    {...register('isFeatured')}
                    disabled={isSubmitting}
                    className="w-4 h-4 text-[#FFBD1A] bg-background border-input rounded focus:ring-[#FFBD1A] focus:ring-2"
                  />
                  <Label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                    Post em Destaque
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Card de Categorização - Estilo Moderno */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/5 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <h3 className="text-lg font-bold text-gray-900">Categorização</h3>
              </div>

              <div className="space-y-5">
                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Categoria</Label>
                  <YVTextField
                    id="category"
                    type="text"
                    placeholder="Ex: Imigração, Vistos, Dicas"
                    {...register('category')}
                    disabled={isSubmitting}
                    error={errors.category?.message as string}
                    showSuccess={touchedFields.category && !errors.category && !!watchedFields.category}
                    variant="modern"
                    size="md"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Tags</Label>
                  <YVTextField
                    id="tags"
                    type="text"
                    placeholder="tag1, tag2, tag3 (separadas por vírgula)"
                    {...register('tags')}
                    disabled={isSubmitting}
                    error={errors.tags?.message as string}
                    showSuccess={touchedFields.tags && !errors.tags && !!watchedFields.tags}
                    variant="modern"
                    size="md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card de Mídia - Estilo Moderno */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/5 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <h3 className="text-lg font-bold text-gray-900">Mídia</h3>
              </div>

              <div className="space-y-5">
                {/* Featured Image */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Imagem Destacada</Label>
                  <YVUploadImg
                    value={watchedFields.featuredImage || ''}
                    onChange={(url: string) => setValue('featuredImage', url)}
                    placeholder="https://exemplo.com/imagem.jpg"
                    disabled={isSubmitting}
                    error={errors.featuredImage?.message as string}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botão Salvar - Estilo Moderno */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/5 overflow-hidden">
            <div className="p-6">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-full px-6 h-11 rounded-full bg-[#0F0005] text-[#FFBD1A] font-bold hover:bg-[#0F0005]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <div className='w-4 h-4 border-2 border-[#FFBD1A]/30 border-t-[#FFBD1A] rounded-full animate-spin inline-block mr-2' />
                    Salvando...
                  </>
                ) : (
                  <>
                    <span>{isEditing ? 'Atualizar Post' : 'Criar Post'}</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <a
                  href="/dashboard/blog"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium"
                >
                  ← Cancelar edição
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Section - Estilo Moderno */}
      <div className="flex justify-center items-center py-8">
        <div className="w-full">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/5 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <h3 className="text-lg font-bold text-gray-900">Otimização SEO</h3>
              </div>

              <SeoAnalysisPanel
                data={seoData}
                expanded={seoExpanded}
                onToggle={() => setSeoExpanded(!seoExpanded)}
                activeTab={seoActiveTab}
                onTabChange={setSeoActiveTab}
              >
                {seoActiveTab === 'general' && (
                  <div className="space-y-6">
                    {/* Meta Title - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-yellow-50 rounded-xl p-6 border border-gray-200/60">
                      <div className="flex items-center justify-between mb-4">
                        <Label htmlFor="metaTitle" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          Meta Título (SEO)
                        </Label>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${(watchedFields.metaTitle?.length || 0) === 0 ? 'bg-gray-300' :
                            (watchedFields.metaTitle?.length || 0) < 30 ? 'bg-red-500' :
                              (watchedFields.metaTitle?.length || 0) <= 60 ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                          <span className={`text-sm font-bold ${(watchedFields.metaTitle?.length || 0) === 0 ? 'text-gray-500' :
                            (watchedFields.metaTitle?.length || 0) < 30 ? 'text-red-600' :
                              (watchedFields.metaTitle?.length || 0) <= 60 ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {watchedFields.metaTitle?.length || 0}/60
                          </span>
                        </div>
                      </div>
                      <YVTextField
                        id="metaTitle"
                        type="text"
                        placeholder="Título otimizado para SEO (30-60 caracteres)"
                        {...register('metaTitle')}
                        disabled={isSubmitting}
                        error={errors.metaTitle?.message as string}
                        showSuccess={touchedFields.metaTitle && !errors.metaTitle && !!watchedFields.metaTitle}
                        variant="modern"
                        size="md"
                      />
                      <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {watchedFields.metaTitle?.length === 0 ? 'Adicione um meta título para melhorar o SEO' :
                          (watchedFields.metaTitle?.length || 0) < 30 ? 'Muito curto. Tente usar entre 30-60 caracteres' :
                            (watchedFields.metaTitle?.length || 0) <= 60 ? 'Tamanho ideal para SEO' : 'Muito longo. Reduza para 60 caracteres ou menos'}
                      </p>
                    </div>

                    {/* Meta Description - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200/60">
                      <div className="flex items-center justify-between mb-4">
                        <Label htmlFor="metaDescription" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Meta Description (SEO)
                        </Label>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${(watchedFields.metaDescription?.length || 0) === 0 ? 'bg-gray-300' :
                            (watchedFields.metaDescription?.length || 0) < 120 ? 'bg-red-500' :
                              (watchedFields.metaDescription?.length || 0) <= 160 ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                          <span className={`text-sm font-bold ${(watchedFields.metaDescription?.length || 0) === 0 ? 'text-gray-500' :
                            (watchedFields.metaDescription?.length || 0) < 120 ? 'text-red-600' :
                              (watchedFields.metaDescription?.length || 0) <= 160 ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {watchedFields.metaDescription?.length || 0}/160
                          </span>
                        </div>
                      </div>
                      <textarea
                        id="metaDescription"
                        placeholder="Descrição para resultados de busca (120-160 caracteres)"
                        {...register('metaDescription')}
                        disabled={isSubmitting}
                        rows={3}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white/50 hover:border-gray-300 focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors resize-none"
                      />
                      {errors.metaDescription && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.metaDescription.message as string}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {watchedFields.metaDescription?.length === 0 ? 'Adicione uma meta description para melhorar o SEO' :
                          (watchedFields.metaDescription?.length || 0) < 120 ? 'Muito curta. Tente usar entre 120-160 caracteres' :
                            (watchedFields.metaDescription?.length || 0) <= 160 ? 'Tamanho ideal para SEO' : 'Muito longa. Reduza para 160 caracteres ou menos'}
                      </p>
                    </div>

                    {/* Meta Keywords - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-6 border border-gray-200/60">
                      <Label htmlFor="metaKeywords" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Palavras-chave (SEO)
                      </Label>
                      <YVTextField
                        id="metaKeywords"
                        type="text"
                        placeholder="palavra1, palavra2, palavra3 (separadas por vírgula)"
                        {...register('metaKeywords')}
                        disabled={isSubmitting}
                        error={errors.metaKeywords?.message as string}
                        showSuccess={touchedFields.metaKeywords && !errors.metaKeywords && !!watchedFields.metaKeywords}
                        variant="modern"
                        size="md"
                      />
                      <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        Separe as palavras-chave com vírgulas. Foque em termos relevantes para seu post.
                      </p>
                    </div>
                  </div>
                )}

                {seoActiveTab === 'social' && (
                  <div className="space-y-6">
                    {/* Open Graph Title - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-pink-50 rounded-xl p-6 border border-gray-200/60">
                      <Label htmlFor="ogTitle" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        Título para Redes Sociais (Facebook)
                      </Label>
                      <YVTextField
                        id="ogTitle"
                        type="text"
                        placeholder="Título que aparecerá quando compartilhado no Facebook, LinkedIn, etc."
                        {...register('ogTitle')}
                        disabled={isSubmitting}
                        error={errors.ogTitle?.message as string}
                        showSuccess={touchedFields.ogTitle && !errors.ogTitle && !!watchedFields.ogTitle}
                        variant="modern"
                        size="md"
                      />
                    </div>

                    {/* Open Graph Description - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-6 border border-gray-200/60">
                      <Label htmlFor="ogDescription" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        Descrição para Redes Sociais (Facebook)
                      </Label>
                      <textarea
                        id="ogDescription"
                        placeholder="Descrição que aparecerá quando compartilhado nas redes sociais"
                        {...register('ogDescription')}
                        disabled={isSubmitting}
                        rows={3}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white/50 hover:border-gray-300 focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors resize-none"
                      />
                      {errors.ogDescription && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.ogDescription.message as string}
                        </p>
                      )}
                    </div>

                    {/* Open Graph Image - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-cyan-50 rounded-xl p-6 border border-gray-200/60">
                      <Label htmlFor="ogImage" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                        Imagem para Redes Sociais (URL)
                      </Label>
                      <YVUploadImg
                        value={watchedFields.ogImage || ''}
                        onChange={(url: string) => setValue('ogImage', url)}
                        placeholder="https://exemplo.com/imagem-og.jpg"
                        disabled={isSubmitting}
                        error={errors.ogImage?.message as string}
                      />
                      <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        Recomendado: 1200x630px para melhor visualização
                      </p>
                    </div>

                    {/* Twitter Card - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200/60">
                      <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Twitter Card
                      </h4>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="twitterTitle" className="text-sm font-semibold text-gray-700 mb-2 block">
                            Título do Twitter
                          </Label>
                          <YVTextField
                            id="twitterTitle"
                            type="text"
                            placeholder="Título para compartilhamento no Twitter"
                            {...register('twitterTitle')}
                            disabled={isSubmitting}
                            error={errors.twitterTitle?.message as string}
                            showSuccess={touchedFields.twitterTitle && !errors.twitterTitle && !!watchedFields.twitterTitle}
                            variant="modern"
                            size="md"
                          />
                        </div>

                        <div>
                          <Label htmlFor="twitterDescription" className="text-sm font-semibold text-gray-700 mb-2 block">
                            Descrição do Twitter
                          </Label>
                          <textarea
                            id="twitterDescription"
                            placeholder="Descrição para compartilhamento no Twitter"
                            {...register('twitterDescription')}
                            disabled={isSubmitting}
                            rows={3}
                            className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white/50 hover:border-gray-300 focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors resize-none"
                          />
                          {errors.twitterDescription && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                              {errors.twitterDescription.message as string}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="twitterImage" className="text-sm font-semibold text-gray-700 mb-2 block">
                            Imagem do Twitter
                          </Label>
                          <YVUploadImg
                            value={watchedFields.twitterImage || ''}
                            onChange={(url: string) => setValue('twitterImage', url)}
                            placeholder="https://... (URL da imagem para Twitter)"
                            disabled={isSubmitting}
                            error={errors.twitterImage?.message as string}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </SeoAnalysisPanel>
            </div>
          </div>
        </div>
      </div>

      {/* Card de Preview - Estilo Moderno */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/5 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <h3 className="text-lg font-bold text-gray-900">Preview do Post</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {showPreview ? 'Ocultar Preview' : 'Mostrar Preview'}
            </button>
          </div>

          {showPreview && (
            <BlogPreview
              title={watchedFields.title || ''}
              content={watchedFields.content || ''}
              excerpt={watchedFields.excerpt || ''}
              category={watchedFields.category || ''}
              tags={watchedFields.tags || ''}
              featuredImage={watchedFields.featuredImage || ''}
              metaTitle={watchedFields.metaTitle || ''}
              metaDescription={watchedFields.metaDescription || ''}
              status={watchedFields.status || 'draft'}
              isFeatured={watchedFields.isFeatured || false}
            />
          )}
        </div>
      </div>
    </form>
  );
}
