'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YVTextField, YVSelect } from '@/components/YV';
import { Label } from '@/components/ui/label';
import { faqGroupSchema, updateFaqGroupSchema } from '@/schemas/dashboard/faq';
import { Plus, Trash2, Pencil } from 'lucide-react';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>;

type FaqFormProps = {
  defaultValues?: {
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    imageUrl?: string;
    order?: number;
    status?: string;
    sectionTitle?: string;
    questions?: Array<{
      id?: string;
      question: string;
      link: string;
      order: number;
      status: string;
    }>;
  };
  isEditing?: boolean;
};

export default function FaqForm({
  defaultValues,
  isEditing = false
}: FaqFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const schema = isEditing ? updateFaqGroupSchema : faqGroupSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    setValue,
    control
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange' as const,
    defaultValues: {
      title: defaultValues?.title || '',
      slug: defaultValues?.slug || '',
      description: defaultValues?.description || '',
      imageUrl: defaultValues?.imageUrl || '',
      order: defaultValues?.order || 0,
      status: (defaultValues?.status as 'draft' | 'published') || 'draft',
      sectionTitle: defaultValues?.sectionTitle || '',
      questions: (defaultValues?.questions || []).map(q => ({
        ...q,
        status: (q.status === 'draft' || q.status === 'published') ? q.status : 'draft'
      })) as any // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const watchedFields = watch();

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

  // Função para gerar slug baseado na pergunta
  const generateQuestionSlug = (question: string): string => {
    if (!question || question.trim() === '') return '';
    
    return question
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens duplicados
      .replace(/^-+|-+$/g, '') // Remove hífens do início e fim
      .trim()
      .substring(0, 100); // Limita a 100 caracteres
  };

  // Função para lidar com mudanças na pergunta
  const handleQuestionChange = (index: number, question: string) => {
    setValue(`questions.${index}.question`, question);
    
    // Auto-gerar link baseado na pergunta
    const slug = generateQuestionSlug(question);
    const link = `/guia-do-imigrante/${slug}`;
    setValue(`questions.${index}.link`, link);
  };

  const addQuestion = () => {
    append({
      question: '',
      link: '',
      order: fields.length,
      status: 'draft'
    });
  };

  const removeQuestion = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        imageUrl: data.imageUrl && data.imageUrl.trim() !== '' ? data.imageUrl : null,
        order: Number(data.order) || 0,
        status: data.status,
        sectionTitle: data.sectionTitle && data.sectionTitle.trim() !== '' ? data.sectionTitle : null,
        questions: data.questions || []
      };

      const url = isEditing && defaultValues?.slug
        ? `/api/dashboard/faqs/${defaultValues.slug}`
        : '/api/dashboard/faqs';

      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing
        ? { ...payload, newSlug: payload.slug }
        : payload;

      console.log('Enviando requisição:', { url, method, body });
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      console.log('Resposta recebida:', { status: response.status, ok: response.ok });

      const result = await response.json();

      if (response.ok) {
        setServerSuccess(result.message || 'FAQ salvo com sucesso!');
        setTimeout(() => {
          router.push('/dashboard/faqs');
        }, 500);
      } else {
        const errorMessage = result.message || result.error || 'Erro ao salvar FAQ';
        const errorDetails = result.errors ? `\nDetalhes: ${JSON.stringify(result.errors, null, 2)}` : '';
        setServerError(errorMessage + errorDetails);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setServerError('Erro interno do servidor');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome do FAQ */}
        <div className="md:col-span-2">
          <Label htmlFor="title" className="mb-2 block">
            Nome do FAQ
          </Label>
          <YVTextField
            id="title"
            type="text"
            placeholder="Ex: Guia do Imigrante"
            {...register('title')}
            onChange={handleTitleChange}
            disabled={isSubmitting}
            error={errors.title?.message as string}
            showSuccess={touchedFields.title && !errors.title && !!watchedFields.title}
            variant="modern"
            size="md"
          />
        </div>

        {/* Slug */}
        <div>
          <Label htmlFor="slug" className="mb-2 block">
            Slug
          </Label>
          <YVTextField
            id="slug"
            type="text"
            placeholder="como-funciona-processo-visto"
            {...register('slug')}
            disabled={isSubmitting}
            error={errors.slug?.message as string}
            showSuccess={touchedFields.slug && !errors.slug && !!watchedFields.slug}
            variant="modern"
            size="md"
          />
        </div>

        {/* Descrição */}
        <div>
          <Label htmlFor="description" className="mb-2 block">
            Descrição
          </Label>
          <YVTextField
            id="description"
            type="text"
            placeholder="Ex: Perguntas frequentes sobre imigração"
            {...register('description')}
            disabled={isSubmitting}
            error={errors.description?.message as string}
            showSuccess={touchedFields.description && !errors.description && !!watchedFields.description}
            variant="modern"
            size="md"
          />
        </div>

        {/* Título */}
        <div>
          <Label htmlFor="sectionTitle" className="mb-2 block">
            Título <span className="text-gray-400">(opcional)</span>
          </Label>
          <YVTextField
            id="sectionTitle"
            type="text"
            placeholder="Ex: Perguntas frequentes sobre o destino"
            {...register('sectionTitle')}
            disabled={isSubmitting}
            error={errors.sectionTitle?.message as string}
            showSuccess={touchedFields.sectionTitle && !errors.sectionTitle && !!watchedFields.sectionTitle}
            variant="modern"
            size="md"
          />
        </div>

        {/* Imagem URL */}
        <div>
          <Label htmlFor="imageUrl" className="mb-2 block">
            Imagem (URL) <span className="text-gray-400">(opcional)</span>
          </Label>
          <YVTextField
            id="imageUrl"
            type="text"
            placeholder="https://exemplo.com/imagem.jpg (opcional)"
            {...register('imageUrl')}
            disabled={isSubmitting}
            error={errors.imageUrl?.message as string}
            showSuccess={touchedFields.imageUrl && !errors.imageUrl && !!watchedFields.imageUrl}
            variant="modern"
            size="md"
          />
        </div>

        {/* Ordem */}
        <div>
          <Label htmlFor="order" className="mb-2 block">
            Ordem
          </Label>
          <YVTextField
            id="order"
            type="number"
            placeholder="0"
            {...register('order', { valueAsNumber: true })}
            disabled={isSubmitting}
            error={errors.order?.message as string}
            showSuccess={touchedFields.order && !errors.order && watchedFields.order !== undefined}
            variant="modern"
            size="md"
          />
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status" className="mb-2 block">
            Status
          </Label>
          <YVSelect
            id="status"
            {...register('status')}
            disabled={isSubmitting}
            variant="modern"
            size="md"
            showSuccess={touchedFields.status && !!watchedFields.status}
            options={[
              { value: 'draft', label: 'Rascunho' },
              { value: 'published', label: 'Publicado' }
            ]}
          />
        </div>
      </div>

      {/* Perguntas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dashboard">Perguntas do FAQ</h3>
          <button
            type="button"
            onClick={addQuestion}
            className="px-4 py-2 rounded-lg bg-[#FFBD1A] text-black font-medium hover:bg-[#FFBD1A]/90 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Adicionar Pergunta
          </button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-dashboard">Pergunta {index + 1}</h4>
              <div className="flex items-center gap-2">
                <Link href={`/dashboard/faqs/${defaultValues?.slug}/perguntas/${field.link?.replace('/guia-do-imigrante/', '').replace('/', '') || field.id || index}/editar`}>
                  <button
                    type="button"
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-all duration-150 active:scale-[0.97]"
                    title="Editar detalhes da pergunta"
                  >
                    <Pencil size={16} />
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remover pergunta"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Pergunta */}
              <div>
                <Label htmlFor={`questions.${index}.question`} className="mb-2 block">
                  Pergunta
                </Label>
                <YVTextField
                  id={`questions.${index}.question`}
                  type="text"
                  placeholder="Ex: Como funciona o processo de visto?"
                  {...register(`questions.${index}.question`)}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  disabled={isSubmitting}
                  error={errors.questions?.[index]?.question?.message as string}
                  variant="modern"
                  size="md"
                />
              </div>

              {/* Link */}
              <div>
                <Label htmlFor={`questions.${index}.link`} className="mb-2 block">
                  Link da Página <span className="text-gray-400">(gerado automaticamente)</span>
                </Label>
                <YVTextField
                  id={`questions.${index}.link`}
                  type="text"
                  placeholder="Ex: /guia-do-imigrante/como-funciona-processo-visto"
                  {...register(`questions.${index}.link`)}
                  disabled={isSubmitting}
                  error={errors.questions?.[index]?.link?.message as string}
                  variant="modern"
                  size="md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 O link é gerado automaticamente baseado na pergunta
                  {watchedFields.questions?.[index]?.question && (
                    <span className="block mt-1">
                      <strong>Exemplo:</strong> &ldquo;{watchedFields.questions[index].question}&rdquo; →
                      <code className="bg-gray-100 px-1 rounded text-xs">
                        /guia-do-imigrante/{generateQuestionSlug(watchedFields.questions[index].question)}
                      </code>
                    </span>
                  )}
                </p>
              </div>

              {/* Ordem e Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`questions.${index}.order`} className="mb-2 block">
                    Ordem
                  </Label>
                  <YVTextField
                    id={`questions.${index}.order`}
                    type="number"
                    placeholder="0"
                    {...register(`questions.${index}.order`, { valueAsNumber: true })}
                    disabled={isSubmitting}
                    error={errors.questions?.[index]?.order?.message as string}
                    variant="modern"
                    size="md"
                  />
                </div>

                <div>
                  <Label htmlFor={`questions.${index}.status`} className="mb-2 block">
                    Status
                  </Label>
                  <YVSelect
                    id={`questions.${index}.status`}
                    {...register(`questions.${index}.status`)}
                    disabled={isSubmitting}
                    variant="modern"
                    size="md"
                    options={[
                      { value: 'draft', label: 'Rascunho' },
                      { value: 'published', label: 'Publicado' }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">Nenhuma pergunta adicionada ainda</p>
            <button
              type="button"
              onClick={addQuestion}
              className="px-4 py-2 rounded-lg bg-[#FFBD1A] text-black font-medium hover:bg-[#FFBD1A]/90 transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus size={16} />
              Adicionar Primeira Pergunta
            </button>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-dashboard pt-4" />

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="px-6 h-11 rounded-full bg-[#0F0005] text-[#FFBD1A] font-bold hover:bg-[#0F0005]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-[#FFBD1A]/30 border-t-[#FFBD1A] rounded-full animate-spin inline-block mr-2" />
              Salvando...
            </>
          ) : (
            isEditing ? 'Atualizar FAQ' : 'Criar FAQ'
          )}
        </button>

        {!isValid && Object.keys(touchedFields).length > 0 && (
          <p className="text-xs text-dashboard-muted">
            Preencha todos os campos corretamente
          </p>
        )}

        <a
          href="/dashboard/faqs"
          className="px-6 h-11 rounded-full text-sm font-medium text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover transition-colors flex items-center"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
