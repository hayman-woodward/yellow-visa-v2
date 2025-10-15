'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YVTextField, YVSelect } from '@/components/YV';
import { Label } from '@/components/ui/label';
import { pageSchema, updatePageSchema } from '@/schemas/dashboard/page';
import ClientEditorWrapper from '@/components/editor/ClientEditorWrapper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>;

type PageFormProps = {
  defaultValues?: {
    id?: string;
    title?: string;
    slug?: string;
    content?: string;
    excerpt?: string | null;
    featuredImage?: string | null;
    status?: string;
    isHomepage?: boolean;
  };
  isEditing?: boolean;
};

export default function PageForm({
  defaultValues,
  isEditing = false
}: PageFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(isEditing ? updatePageSchema : pageSchema),
    mode: 'onChange' as const,
    defaultValues: {
      title: defaultValues?.title || '',
      slug: defaultValues?.slug || '',
      content: defaultValues?.content || '',
      excerpt: defaultValues?.excerpt || '',
      featuredImage: defaultValues?.featuredImage || '',
      status: (defaultValues?.status as 'draft' | 'published' | 'archived') || 'draft',
      isHomepage: defaultValues?.isHomepage || false
    }
  });

  const watchedFields = watch();

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
        featuredImage: data.featuredImage || '',
        status: data.status,
        isHomepage: data.isHomepage
      };

      const url = isEditing && defaultValues?.slug
        ? `/api/dashboard/pages/${defaultValues.slug}`
        : '/api/dashboard/pages';

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
        setServerSuccess(result.message || 'Página salva com sucesso!');
        setTimeout(() => {
          router.push('/dashboard/pages');
        }, 500);
      } else {
        setServerError(result.message || 'Erro ao salvar página');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error saving page:', error);
      setServerError('Erro interno do servidor');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
          Título da Página
        </Label>
        <YVTextField
          id='title'
          type='text'
          placeholder='Ex: Sobre Nós'
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
          placeholder='sobre-nos'
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

      {/* Excerpt */}
      <div>
        <Label htmlFor='excerpt' className='mb-2 block'>
          Resumo da Página
        </Label>
        <textarea
          id='excerpt'
          placeholder='Breve descrição da página...'
          {...register('excerpt')}
          disabled={isSubmitting}
          rows={3}
          className='w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
        />
        {errors.excerpt && (
          <p className='text-sm text-red-600 mt-1.5'>
            {errors.excerpt.message as string}
          </p>
        )}
      </div>

      {/* Content */}
      <div>
        <Label htmlFor='content' className='mb-2 block'>
          Conteúdo da Página (HTML)
        </Label>
        <div className='border border-input rounded-md'>
          <ClientEditorWrapper
            content={watchedFields.content || ''}
            onChange={(content) => setValue('content', content)}
            placeholder='Digite o conteúdo da página aqui...'
          />
        </div>
        {errors.content && (
          <p className='text-sm text-red-600 mt-1.5'>
            {errors.content.message as string}
          </p>
        )}
        <p className='text-xs text-dashboard-muted mt-1'>
          Use HTML para formatar o conteúdo. Ex: &lt;h2&gt;Título&lt;/h2&gt;, &lt;p&gt;Parágrafo&lt;/p&gt;
        </p>
      </div>

      {/* Featured Image */}
      <div>
        <Label htmlFor='featuredImage' className='mb-2 block'>
          URL da Imagem Destacada (opcional)
        </Label>
        <YVTextField
          id='featuredImage'
          type='text'
          placeholder='https://...'
          {...register('featuredImage')}
          disabled={isSubmitting}
          error={errors.featuredImage?.message as string}
          variant='modern'
          size='md'
        />
      </div>

      {/* Grid 2 colunas */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Status */}
        <div>
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

        {/* Is Homepage */}
        <div className='flex items-center gap-3 pt-6'>
          <input
            type='checkbox'
            id='isHomepage'
            {...register('isHomepage')}
            disabled={isSubmitting}
            className='w-4 h-4 text-[#FFBD1A] bg-background border-input rounded focus:ring-[#FFBD1A] focus:ring-2'
          />
          <Label htmlFor='isHomepage' className='text-sm font-medium'>
            Página Inicial
          </Label>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-dashboard pt-4' />

      {/* Buttons */}
      <div className='flex items-center gap-3'>
        <button
          type='submit'
          disabled={isSubmitting || !isValid}
          className='px-6 h-11 rounded-full bg-[#0F0005] text-[#FFBD1A] font-bold hover:bg-[#0F0005]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95'
        >
          {isSubmitting ? (
            <>
              <div className='w-4 h-4 border-2 border-[#FFBD1A]/30 border-t-[#FFBD1A] rounded-full animate-spin inline-block mr-2' />
              Salvando...
            </>
          ) : (
            isEditing ? 'Atualizar Página' : 'Criar Página'
          )}
        </button>

        {!isValid && Object.keys(touchedFields).length > 0 && (
          <p className='text-xs text-dashboard-muted'>
            Preencha todos os campos corretamente
          </p>
        )}

        <a
          href='/dashboard/pages'
          className='px-6 h-11 rounded-full text-sm font-medium text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover transition-colors flex items-center'
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
