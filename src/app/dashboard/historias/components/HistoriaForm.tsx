'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YVTextField, YVSelect } from '@/components/YV';
import { Label } from '@/components/ui/label';
import { Heart, User, Globe, Tag, Image as ImageIcon } from 'lucide-react';
import { historiaSchema } from '@/schemas/dashboard/historia';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>;

type HistoriaFormProps = {
  defaultValues?: {
    id?: string;
    title?: string;
    slug?: string;
    content?: string;
    imageUrl?: string;
    authorName?: string;
    country?: string;
    status?: string;
  };
  isEditing?: boolean;
};

export default function HistoriaForm({
  defaultValues,
  isEditing = false
}: HistoriaFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch
  } = useForm({
    resolver: zodResolver(historiaSchema),
    mode: 'onChange' as const,
    defaultValues: {
      title: defaultValues?.title || '',
      slug: defaultValues?.slug || '',
      content: defaultValues?.content || '',
      imageUrl: defaultValues?.imageUrl || '',
      authorName: defaultValues?.authorName || '',
      country: defaultValues?.country || '',
      status: (defaultValues?.status as 'draft' | 'published') || 'draft'
    }
  });

  const watchedFields = watch();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        imageUrl: data.imageUrl || '',
        authorName: data.authorName,
        country: data.country,
        status: data.status
      };

      const url = isEditing && defaultValues?.slug 
        ? `/api/dashboard/historias/${defaultValues.slug}`
        : '/api/dashboard/historias';
      
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
        setServerSuccess(result.message || 'História salva com sucesso!');
        setTimeout(() => {
          router.push('/dashboard/historias');
        }, 500);
      } else {
        setServerError(result.message || 'Erro ao salvar história');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error saving historia:', error);
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
        <Label htmlFor='title' className='flex items-center gap-2 mb-2'>
          <Heart size={16} className='text-dashboard-muted' />
          Título da História
        </Label>
        <YVTextField
          id='title'
          type='text'
          placeholder='Ex: Minha jornada para Portugal'
          {...register('title')}
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
        <Label htmlFor='slug' className='flex items-center gap-2 mb-2'>
          <Tag size={16} className='text-dashboard-muted' />
          Slug (URL amigável)
        </Label>
        <YVTextField
          id='slug'
          type='text'
          placeholder='minha-jornada-portugal'
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

      {/* Content */}
      <div>
        <Label htmlFor='content' className='flex items-center gap-2 mb-2'>
          <Heart size={16} className='text-dashboard-muted' />
          História Completa
        </Label>
        <textarea
          id='content'
          placeholder='Conte a história completa...'
          {...register('content')}
          disabled={isSubmitting}
          rows={6}
          className='w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
        />
        {errors.content && (
          <p className='text-sm text-red-600 mt-1.5'>
            {errors.content.message as string}
          </p>
        )}
      </div>

      {/* Grid 2 colunas */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Author Name */}
        <div>
          <Label htmlFor='authorName' className='flex items-center gap-2 mb-2'>
            <User size={16} className='text-dashboard-muted' />
            Nome do Autor
          </Label>
          <YVTextField
            id='authorName'
            type='text'
            placeholder='Ex: Maria Silva'
            {...register('authorName')}
            disabled={isSubmitting}
            error={errors.authorName?.message as string}
            showSuccess={
              touchedFields.authorName &&
              !errors.authorName &&
              !!watchedFields.authorName
            }
            variant='modern'
            size='md'
          />
        </div>

        {/* Country */}
        <div>
          <Label htmlFor='country' className='flex items-center gap-2 mb-2'>
            <Globe size={16} className='text-dashboard-muted' />
            País
          </Label>
          <YVTextField
            id='country'
            type='text'
            placeholder='Ex: Portugal'
            {...register('country')}
            disabled={isSubmitting}
            error={errors.country?.message as string}
            showSuccess={
              touchedFields.country &&
              !errors.country &&
              !!watchedFields.country
            }
            variant='modern'
            size='md'
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <Label htmlFor='imageUrl' className='flex items-center gap-2 mb-2'>
          <ImageIcon size={16} className='text-dashboard-muted' />
          URL da Foto do Autor (opcional)
        </Label>
        <YVTextField
          id='imageUrl'
          type='text'
          placeholder='https://...'
          {...register('imageUrl')}
          disabled={isSubmitting}
          error={errors.imageUrl?.message as string}
          variant='modern'
          size='md'
        />
      </div>

      {/* Status */}
      <div>
        <Label htmlFor='status' className='flex items-center gap-2 mb-2'>
          <Tag size={16} className='text-dashboard-muted' />
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
            { value: 'draft', label: '📝 Rascunho' },
            { value: 'published', label: '✅ Publicado' }
          ]}
        />
      </div>

      {/* Divider */}
      <div className='border-t border-dashboard pt-4' />

      {/* Buttons */}
      <div className='flex items-center gap-3'>
        <button
          type='submit'
          disabled={isSubmitting || !isValid}
          className='px-6 h-11 rounded-full bg-[#0F0005] text-[#FFBD1A] font-bold hover:bg-[#0F0005]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-2'
        >
          {isSubmitting ? (
            <>
              <div className='w-4 h-4 border-2 border-[#FFBD1A]/30 border-t-[#FFBD1A] rounded-full animate-spin' />
              Salvando...
            </>
          ) : (
            <>
              <Heart size={16} />
              {isEditing ? 'Atualizar História' : 'Criar História'}
            </>
          )}
        </button>

        {!isValid && Object.keys(touchedFields).length > 0 && (
          <p className='text-xs text-dashboard-muted'>
            Preencha todos os campos corretamente
          </p>
        )}

        <a
          href='/dashboard/historias'
          className='px-6 h-11 rounded-full text-sm font-medium text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover transition-colors flex items-center'
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
