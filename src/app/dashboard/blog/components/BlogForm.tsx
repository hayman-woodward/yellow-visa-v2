'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YVTextField, YVSelect, YVUploadImg } from '@/components/YV';
import { Label } from '@/components/ui/label';
import { blogPostSchema, updateBlogPostSchema } from '@/schemas/dashboard/blog';
import ClientEditorWrapper from '@/components/editor/ClientEditorWrapper';
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
  const router = useRouter();
  const { usuarios, loading: usuariosLoading } = useUsuarios();
  
  // Guardar o slug original para usar na URL da API quando estiver editando
  const originalSlugRef = useRef<string | undefined>(defaultValues?.slug);
  
  // Atualizar o ref quando defaultValues mudar
  useEffect(() => {
    if (defaultValues?.slug) {
      originalSlugRef.current = defaultValues.slug;
    }
  }, [defaultValues?.slug]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: zodResolver(isEditing ? updateBlogPostSchema : blogPostSchema),
    mode: 'onChange' as const,
    defaultValues: {
      title: defaultValues?.title || '',
      slug: defaultValues?.slug || '',
      content: defaultValues?.content || '',
      excerpt: defaultValues?.excerpt || '',
      category: defaultValues?.category || '',
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

  // Resetar o formulário quando defaultValues mudarem (dados chegarem do servidor)
  useEffect(() => {
    if (defaultValues && defaultValues.title && isEditing) {
      reset({
        title: defaultValues.title || '',
        slug: defaultValues.slug || '',
        content: defaultValues.content || '',
        excerpt: defaultValues.excerpt || '',
        category: defaultValues.category || '',
        featuredImage: defaultValues.featuredImage || '',
        authorId: defaultValues.authorId || '',
        metaTitle: defaultValues.metaTitle || '',
        metaDescription: defaultValues.metaDescription || '',
        metaKeywords: defaultValues.metaKeywords || '',
        ogTitle: defaultValues.ogTitle || '',
        ogDescription: defaultValues.ogDescription || '',
        ogImage: defaultValues.ogImage || '',
        twitterTitle: defaultValues.twitterTitle || '',
        twitterDescription: defaultValues.twitterDescription || '',
        twitterImage: defaultValues.twitterImage || '',
        status: (defaultValues.status as 'draft' | 'published' | 'archived') || 'draft',
        isFeatured: defaultValues.isFeatured || false
      }, { keepDefaultValues: false });
    }
  }, [defaultValues?.id, defaultValues?.title, defaultValues?.slug, isEditing, reset]);

  const watchedFields = watch();

  // Auto-gerar slug baseado no título (igual ao FAQ)
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue('title', title);

    // Auto-gerar slug baseado no título
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    setValue('slug', slug);
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
        featuredImage: data.featuredImage || '',
        authorId: data.authorId || null,
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

      // Usar o slug original (do ref) para construir a URL quando estiver editando
      const slugForUrl = originalSlugRef.current || defaultValues?.slug || data.slug;
      const url = isEditing && slugForUrl
        ? `/api/dashboard/blog/${slugForUrl}`
        : '/api/dashboard/blog';

      console.log('📤 Enviando requisição:', { url, method: isEditing ? 'PUT' : 'POST', isEditing, slugForUrl });
      console.log('📤 Payload completo:', payload);
      console.log('📤 authorId no payload:', payload.authorId);

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro na resposta:', response.status, errorText);
        throw new Error(`Erro ${response.status}: ${errorText || 'Erro desconhecido'}`);
      }

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Conteúdo */}
          <div className="lg:col-span-2 space-y-6">
      {/* Success Message */}
      {serverSuccess && (
              <div className='p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3'>
                <div className='w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <span className='text-green-600 text-xs font-bold'>✓</span>
          </div>
                <p className='text-sm text-green-800 flex-1'>{serverSuccess}</p>
        </div>
      )}

      {/* Error Message */}
      {serverError && (
              <div className='p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3'>
                <div className='w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <span className='text-red-600 text-xs font-bold'>!</span>
          </div>
                <p className='text-sm text-red-800 flex-1'>{serverError}</p>
        </div>
      )}

            {/* Title */}
                <div>
              <Label htmlFor='title' className='mb-2 block'>
                    Título do Post
                  </Label>
                  <YVTextField
                id='title'
                type='text'
                placeholder='Ex: Como conseguir um visto de trabalho nos EUA'
                    {...register('title')}
                    onChange={handleTitleChange}
                    disabled={isSubmitting}
                    error={errors.title?.message as string}
                showSuccess={
                  touchedFields.title && !errors.title && !!watchedFields.title
                }
                variant='modern'
                size='md'
                  />
                </div>

            {/* Slug */}
            <div>
              <Label htmlFor='slug' className='mb-2 block'>
                    Slug (URL amigável)
                  </Label>
                  <YVTextField
                id='slug'
                type='text'
                placeholder='como-conseguir-visto-trabalho-eua'
                    {...register('slug')}
                    disabled={isSubmitting}
                    error={errors.slug?.message as string}
                showSuccess={
                  touchedFields.slug && !errors.slug && !!watchedFields.slug
                }
                variant='modern'
                size='md'
              />
          </div>

            {/* Excerpt - Resumo com limite de caracteres */}
            <div>
              <Label htmlFor='excerpt' className='mb-2 block'>
                Resumo (máximo 500 caracteres)
              </Label>
                <textarea
                id='excerpt'
                placeholder='Breve descrição do post...'
                  {...register('excerpt')}
                  disabled={isSubmitting}
                  rows={3}
                maxLength={500}
                className='w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                />
              <div className='flex justify-between items-center mt-1'>
                {errors.excerpt && (
                  <p className='text-sm text-red-600'>
                    {errors.excerpt.message as string}
                  </p>
                )}
                <p className='text-xs text-dashboard-muted ml-auto'>
                  {watchedFields.excerpt?.length || 0}/500 caracteres
                </p>
            </div>
          </div>

            {/* Content Editor */}
            <div>
              <Label htmlFor='content' className='mb-2 block'>
                Conteúdo do Post
              </Label>
                  <ClientEditorWrapper
                    key={defaultValues?.id || 'new-post'}
                    content={watchedFields.content || ''}
                onChange={(content: string) => setValue('content', content)}
                disabled={isSubmitting}
                placeholder='Digite o conteúdo do post aqui...'
              />
                {errors.content && (
                <p className='text-sm text-red-600 mt-1.5'>
                    {errors.content.message as string}
                  </p>
                )}
            </div>
          </div>

          {/* Coluna Lateral - Configurações */}
        <div className="space-y-6">
          {/* Configurações */}
          <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
            <h3 className='text-lg font-semibold text-dashboard mb-4'>Configurações</h3>

            {/* Featured Image */}
            <div className='mb-4'>
              <Label htmlFor='featuredImage' className='mb-2 block'>
                Imagem Destacada
              </Label>
              <YVUploadImg
                value={watchedFields.featuredImage || ''}
                onChange={(url) => setValue('featuredImage', url)}
                disabled={isSubmitting}
                error={errors.featuredImage?.message as string}
                placeholder='https://exemplo.com/imagem.jpg'
              />
            </div>

            {/* Category */}
            <div className='mb-4'>
              <Label htmlFor='category' className='mb-2 block'>
                Categoria
              </Label>
              <YVSelect
                id='category'
                {...register('category')}
                disabled={isSubmitting}
                error={errors.category?.message as string}
                variant='modern'
                size='md'
                showSuccess={touchedFields.category && !errors.category && !!watchedFields.category}
                options={[
                  { value: '', label: 'Selecione uma categoria...' },
                  { value: 'Imigração', label: 'Imigração' },
                  { value: 'Vistos', label: 'Vistos' },
                  { value: 'Dicas', label: 'Dicas' },
                  { value: 'Notícias', label: 'Notícias' },
                  { value: 'Guia do Imigrante', label: 'Guia do Imigrante' }
                ]}
              />
            </div>

            {/* Author */}
            <div className='mb-4'>
              <Label htmlFor='authorId' className='mb-2 block'>
                Autor
              </Label>
                  {usuariosLoading ? (
                <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />
                  ) : (
                    <YVSelect
                  id='authorId'
                      {...register('authorId')}
                      disabled={isSubmitting}
                      error={errors.authorId?.message as string}
                  variant='modern'
                  size='md'
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

            {/* Status */}
            <div className='mb-4'>
              <Label htmlFor='status' className='mb-2 block'>
                Status
              </Label>
              <YVSelect
                id='status'
                {...register('status')}
                disabled={isSubmitting}
                variant='modern'
                size='md'
                showSuccess={touchedFields.status && !!watchedFields.status}
                options={[
                  { value: 'draft', label: 'Rascunho' },
                  { value: 'published', label: 'Publicado' },
                  { value: 'archived', label: 'Arquivado' }
                ]}
              />
                  </div>

                {/* Is Featured */}
            <div className='mb-6 flex items-center gap-3'>
                  <input
                    type="checkbox"
                    id="isFeatured"
                    {...register('isFeatured')}
                    disabled={isSubmitting}
                    className="w-4 h-4 text-[#FFBD1A] bg-background border-input rounded focus:ring-[#FFBD1A] focus:ring-2"
                  />
              <Label htmlFor="isFeatured" className="text-sm font-medium text-dashboard">
                    Post em Destaque
                  </Label>
          </div>

            {/* Divider */}
            <div className='border-t border-dashboard pt-4' />

            {/* Buttons */}
            <div className='space-y-3'>
              <button
                type='submit'
                disabled={isSubmitting || !isValid}
                className='w-full px-6 h-11 rounded-full bg-[#0F0005] text-[#FFBD1A] font-bold hover:bg-[#0F0005]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95'
                onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting ? (
                  <>
                    <div className='w-4 h-4 border-2 border-[#FFBD1A]/30 border-t-[#FFBD1A] rounded-full animate-spin inline-block mr-2' />
                    Salvando...
                  </>
                ) : (
                  isEditing ? 'Atualizar Post' : 'Criar Post'
                )}
              </button>

              {!isValid && Object.keys(touchedFields).length > 0 && (
                <p className='text-xs text-dashboard-muted text-center'>
                  Preencha todos os campos corretamente
                </p>
              )}

              <a
                href='/dashboard/blog'
                className='w-full px-6 h-11 rounded-full text-sm font-medium text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover transition-colors flex items-center justify-center'
              >
                Cancelar
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </form>
  );
}
