'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YVTextField, YVSelect, YVUploadImg, YVSwitch } from '@/components/YV';
import { Label } from '@/components/ui/label';
import { blogPostSchema, updateBlogPostSchema } from '@/schemas/dashboard/blog';
import ClientEditorWrapper from '@/components/editor/ClientEditorWrapper';
import { useUsuarios } from '@/hooks/useDashboardData';
import { generateSlug } from '@/utils/generateSlug';

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
    relatedLinksEnabled?: boolean;
    relatedLinks?: string | null;
  };
  isEditing?: boolean;
};

interface FaqQuestionOption {
  id: string;
  question: string;
  link: string;
  groupTitle: string;
}

export default function BlogForm({
  defaultValues,
  isEditing = false
}: BlogFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [relatedLinksExpanded, setRelatedLinksExpanded] = useState(false);
  const [faqQuestions, setFaqQuestions] = useState<FaqQuestionOption[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
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
      isFeatured: defaultValues?.isFeatured || false,
      relatedLinksEnabled: defaultValues?.relatedLinksEnabled || false,
      relatedLinks: defaultValues?.relatedLinks || ''
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
        isFeatured: defaultValues.isFeatured || false,
        relatedLinksEnabled: defaultValues.relatedLinksEnabled || false,
        relatedLinks: defaultValues.relatedLinks || ''
      }, { keepDefaultValues: false });
    }
  }, [defaultValues?.id, defaultValues?.title, defaultValues?.slug, isEditing, reset]);

  const watchedFields = watch();

  // Buscar FAQs ao carregar
  useEffect(() => {
    const fetchFaqQuestions = async () => {
      try {
        const response = await fetch('/api/dashboard/faqs/questions');
        if (response.ok) {
          const data = await response.json();
          setFaqQuestions(data.map((q: { id: string; question: string; link: string; group?: { title: string } }) => ({
            id: q.id,
            question: q.question,
            link: q.link,
            groupTitle: q.group?.title || ''
          })));
        }
      } catch (error) {
        console.error('Error fetching FAQ questions:', error);
      } finally {
        setLoadingFaqs(false);
      }
    };
    fetchFaqQuestions();
  }, []);

  // Expandir seção de Links Relacionados se houver links salvos
  useEffect(() => {
    if (defaultValues?.relatedLinks && defaultValues.relatedLinks.trim() !== '') {
      try {
        const parsed = JSON.parse(defaultValues.relatedLinks);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRelatedLinksExpanded(true);
        }
      } catch {
        // Ignora erros de parsing
      }
    }
  }, [defaultValues?.relatedLinks]);

  // Parse related links from JSON string (array de IDs)
  const getSelectedFaqIds = (): string[] => {
    try {
      const linksStr = watchedFields.relatedLinks || '';
      if (!linksStr) return [];
      const parsed = JSON.parse(linksStr);
      // Se for array de objetos {title, link}, converter para array de IDs
      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object' && 'id' in parsed[0]) {
        return parsed.map((item: any) => item.id);
      }
      // Se já for array de IDs
      if (Array.isArray(parsed) && parsed.every((item: any) => typeof item === 'string')) {
        return parsed;
      }
      return [];
    } catch {
      return [];
    }
  };

  // Atualizar FAQs selecionadas
  const updateSelectedFaqs = (faqIds: string[]) => {
    setValue('relatedLinks', JSON.stringify(faqIds));
  };

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
      // Converter relatedLinks: se vazio, string vazia ou array vazio, enviar null
      let relatedLinksValue = null;
      if (data.relatedLinks && data.relatedLinks.trim() !== '') {
        try {
          const parsed = JSON.parse(data.relatedLinks);
          // Se for array vazio, enviar null
          if (Array.isArray(parsed) && parsed.length === 0) {
            relatedLinksValue = null;
          } else {
            relatedLinksValue = data.relatedLinks;
          }
        } catch {
          // Se não for JSON válido, enviar null
          relatedLinksValue = null;
        }
      }

      // Normalizar slug antes de enviar
      const normalizedSlug = generateSlug(data.slug);

      const payload = {
        title: data.title,
        slug: normalizedSlug,
        content: data.content,
        excerpt: data.excerpt || '',
        category: data.category || null,
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
        isFeatured: data.isFeatured,
        relatedLinksEnabled: data.relatedLinksEnabled || false,
        relatedLinks: relatedLinksValue
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
        setIsSubmitting(false);
        
        // Se for criação de novo post, redirecionar para a lista
        // Se for edição, manter na página para permitir salvar várias vezes
        if (!isEditing) {
          setTimeout(() => {
            router.push('/dashboard/blog');
          }, 1500);
        } else {
          // Atualizar o slug original caso tenha mudado
          if (result.slug && result.slug !== originalSlugRef.current) {
            originalSlugRef.current = result.slug;
            // Atualizar a URL sem recarregar a página
            window.history.replaceState({}, '', `/dashboard/blog/${result.slug}/editar`);
          }
        }
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

            {/* Links Relacionados */}
            <div className='mb-6 mt-4'>
              <div className='flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg'>
                <div className='flex items-center space-x-3'>
                  <svg className='w-6 h-6 text-[#FFBD1A]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' />
                  </svg>
                  <div className='text-left'>
                    <h3 className='text-lg font-semibold text-dashboard'>Links Relacionados</h3>
                    <p className='text-sm text-gray-500'>Adicione links relacionados ao post</p>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <YVSwitch
                    checked={watchedFields.relatedLinksEnabled || false}
                    onCheckedChange={(checked) => setValue('relatedLinksEnabled', checked)}
                    label="Exibir na página"
                    size="sm"
                    variant="primary"
                  />
                  <button
                    type='button'
                    onClick={() => setRelatedLinksExpanded(!relatedLinksExpanded)}
                    className='text-gray-600 hover:text-gray-900 transition-colors'
                  >
                    <svg className={`w-5 h-5 transition-transform ${relatedLinksExpanded ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </button>
                </div>
              </div>

              {relatedLinksExpanded && (
                <div className='mt-4 space-y-4 p-4 bg-white border border-gray-200 rounded-lg'>
                  <div>
                    <Label htmlFor='relatedFaqs'>As perguntas</Label>
                    {loadingFaqs ? (
                      <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse mt-2" />
                    ) : (
                      <select
                        id='relatedFaqs'
                        multiple
                        value={getSelectedFaqIds()}
                        onChange={(e) => {
                          const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
                          updateSelectedFaqs(selectedIds);
                        }}
                        disabled={isSubmitting}
                        className='w-full mt-2 px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors min-h-[200px]'
                      >
                        {faqQuestions.map((faq) => (
                          <option key={faq.id} value={faq.id}>
                            {faq.question} {faq.groupTitle ? `(${faq.groupTitle})` : ''}
                          </option>
                        ))}
                      </select>
                    )}
                    <p className='text-xs text-gray-500 mt-2'>
                      Segure Ctrl (ou Cmd no Mac) para selecionar múltiplas FAQs
                    </p>
                    {getSelectedFaqIds().length > 0 && (
                      <div className='mt-4 space-y-2'>
                        <p className='text-sm font-medium text-dashboard'>FAQs selecionadas:</p>
                        <ul className='space-y-1'>
                          {getSelectedFaqIds().map((faqId) => {
                            const faq = faqQuestions.find(q => q.id === faqId);
                            return faq ? (
                              <li key={faqId} className='text-sm text-gray-600 flex items-center justify-between p-2 bg-gray-50 rounded'>
                                <span>{faq.question}</span>
                                <button
                                  type='button'
                                  onClick={() => {
                                    const currentIds = getSelectedFaqIds();
                                    updateSelectedFaqs(currentIds.filter(id => id !== faqId));
                                  }}
                                  className='text-red-600 hover:text-red-800 text-xs'
                                >
                                  Remover
                                </button>
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
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
