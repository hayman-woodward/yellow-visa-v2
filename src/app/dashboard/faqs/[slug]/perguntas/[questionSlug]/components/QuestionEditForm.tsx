'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YVTextField, YVAvatar, YVSelect, YVUploadImg } from '@/components/YV';
import { Label } from '@/components/ui/label';
import { useUsuarios } from '@/hooks/useDashboardData';
import { SeoAnalysisPanel } from '@/components/shared/SeoAnalysisPanel';
import ClientEditorWrapper from '@/components/editor/ClientEditorWrapper';
import { z } from 'zod';

const questionEditSchema = z.object({
  question: z.string().min(1, 'Pergunta é obrigatória'),
  content: z.string().optional(),
  link: z.string().min(1, 'URL é obrigatória').refine(
    (val) => {
      const suffix = val.replace('/guia-do-imigrante/', '').replace(/^\/+/, '').replace(/\/+$/, '');
      return suffix.length > 0;
    },
    { message: 'URL deve ter pelo menos 1 caractere válido após o prefixo' }
  ),
  order: z.number().min(0, 'Ordem deve ser maior ou igual a 0'),
  status: z.enum(['draft', 'published']),
  authorId: z.string().optional(),
  videoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  metaDescription: z.string().optional(),
  ogDescription: z.string().optional()
});

type QuestionEditFormProps = {
  faqSlug: string;
  questionId: string;
  questionSlug: string;
  defaultValues: {
    question: string;
    content?: string;
    link?: string;
    order?: number;
    status: string;
    authorId?: string;
    videoUrl?: string;
    imageUrl?: string;
    metaDescription?: string;
    ogDescription?: string;
  };
};

type FormValues = z.infer<typeof questionEditSchema>;

export default function QuestionEditForm({
  faqSlug,
  questionId,
  defaultValues
}: QuestionEditFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [seoActiveTab, setSeoActiveTab] = useState<'general' | 'social'>('general');
  const router = useRouter();
  const { usuarios, loading: usuariosLoading } = useUsuarios();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    setValue
  } = useForm<FormValues>({
    resolver: zodResolver(questionEditSchema),
    mode: 'onChange' as const,
    defaultValues: {
      question: defaultValues.question,
      content: defaultValues.content || '',
      link: defaultValues.link || '',
      order: defaultValues.order || 0,
      status: (defaultValues.status as 'draft' | 'published') || 'draft',
      authorId: defaultValues.authorId || '',
      videoUrl: defaultValues.videoUrl || '',
      imageUrl: defaultValues.imageUrl || '',
      metaDescription: defaultValues.metaDescription || '',
      ogDescription: defaultValues.ogDescription || ''
    }
  });

  const watchedFields = watch();

  const PREFIX = '/guia-do-imigrante/';

  // Função para extrair apenas a parte final do slug (sem o prefixo)
  const extractSlugSuffix = (fullLink: string): string => {
    if (!fullLink) return '';
    return fullLink.replace(PREFIX, '').replace(/^\/+/, '').replace(/\/+$/, '');
  };

  // Função para limpar apenas a parte final do slug
  const cleanSlugSuffix = (value: string): string => {
    return value
      .replace(/^\/+/, '') // Remove barras do início
      .replace(/\/+$/, '') // Remove barras do final
      .replace(/\/+/g, '/') // Substitui múltiplas barras por uma única
      .toLowerCase()
      .trim();
  };

  // Função para lidar com mudanças no campo link (apenas a parte final)
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedSuffix = cleanSlugSuffix(e.target.value);
    const fullLink = PREFIX + cleanedSuffix;
    setValue('link', fullLink);
  };

  // Dados para análise SEO
  const seoData = {
    title: watchedFields.question || '',
    content: watchedFields.content || '',
    metaDescription: watchedFields.metaDescription || '',
    metaKeywords: ''
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const response = await fetch(`/api/dashboard/faqs/${faqSlug}/questions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: data.question,
          content: data.content || '',
          link: data.link || PREFIX,
          order: data.order || 0,
          status: data.status,
          authorId: data.authorId || '',
          videoUrl: data.videoUrl || '',
          imageUrl: data.imageUrl || '',
          metaDescription: data.metaDescription || '',
          ogDescription: data.ogDescription || ''
        })
      });

      const result = await response.json();

      if (response.ok) {
        setServerSuccess(result.message || 'Pergunta atualizada com sucesso!');
        setTimeout(() => {
          router.push(`/dashboard/faqs/${faqSlug}/editar`);
        }, 1000);
      } else {
        const errorMessage = result.error || 'Erro ao atualizar pergunta';
        const errorDetails = result.details ? `\nDetalhes: ${result.details}` : '';
        setServerError(errorMessage + errorDetails);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error updating question:', error);
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
                    Título da Página
                  </Label>
                  <YVTextField
                    id="title"
                    type="text"
                    placeholder="Digite o título da página aqui..."
                    {...register('question')}
                    disabled={isSubmitting}
                    error={errors.question?.message as string}
                    showSuccess={touchedFields.question && !errors.question && !!watchedFields.question}
                    variant="modern"
                    size="lg"
                    className="text-3xl font-bold text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="breadcrumb" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    URL da Página
                  </Label>
                  <div className="flex items-stretch">
                    {/* Prefixo fixo */}
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-l-xl text-sm font-mono text-gray-600 border-r-0 flex items-center whitespace-nowrap min-w-[190px]">
                      {PREFIX}
                    </div>

                    {/* Campo editável */}
                    <YVTextField
                      id="breadcrumb"
                      type="text"
                      placeholder="seguranca-online"
                      value={extractSlugSuffix(watchedFields.link || '')}
                      onChange={handleLinkChange}
                      disabled={isSubmitting}
                      error={errors.link?.message as string}
                      showSuccess={touchedFields.link && !errors.link && !!watchedFields.link}
                      variant="modern"
                      size="lg"
                      className="rounded-r-xl rounded-l-none flex-1"
                    />
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    URL final: <code className="bg-gray-100 px-2 py-1 rounded-md font-mono text-gray-700">{watchedFields.link || PREFIX + 'slug-da-pagina'}</code>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Editor de Conteúdo - Card Moderno */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/5 overflow-hidden">
            <div className="p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <h3 className="text-lg font-semibold text-gray-900">Conteúdo</h3>
                </div>
                <ClientEditorWrapper
                  content={watchedFields.content || ''}
                  onChange={(content: string) => {
                    console.log('FAQ Editor content changed:', content);
                    setValue('content', content);
                  }}
                  placeholder="Digite o conteúdo da página aqui..."
                  disabled={isSubmitting}
                />
                {errors.content && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.content.message}
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
                    options={[
                      { value: "draft", label: "📝 Rascunho" },
                      { value: "published", label: "🚀 Publicado" }
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
                    <YVAvatar
                      name={usuarios.find(u => u.id === watchedFields.authorId)?.name || 'Autor'}
                      size="md"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {usuarios.find(u => u.id === watchedFields.authorId)?.name || 'Autor'}
                      </p>
                      <p className="text-xs text-gray-500">Autor selecionado</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card de Mídia - Estilo Moderno */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/5 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <h3 className="text-lg font-bold text-gray-900">Mídia</h3>
              </div>

              <div className="space-y-5">
                {/* Imagem Destacada */}
                <YVUploadImg
                  value={watchedFields.imageUrl || ''}
                  onChange={(url: string) => setValue('imageUrl', url)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  disabled={isSubmitting}
                  error={errors.imageUrl?.message as string}
                />

                {/* Vídeo do YouTube */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Vídeo do YouTube</Label>
                  <YVTextField
                    id="videoUrl"
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                    {...register('videoUrl')}
                    disabled={isSubmitting}
                    variant="modern"
                    size="md"
                  />
                  {watchedFields.videoUrl && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">
                        Link: {watchedFields.videoUrl}
                      </p>
                    </div>
                  )}
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
                  'Atualizar Pergunta'
                )}
              </button>

              <div className="mt-4 text-center">
                <a
                  href={`/dashboard/faqs/${faqSlug}/editar`}
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
                    {/* Meta Description - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200/60">
                      <div className="flex items-center justify-between mb-4">
                        <Label htmlFor="metaDescription" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Meta Description
                        </Label>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${(watchedFields.question?.length || 0) === 0 ? 'bg-gray-300' :
                            (watchedFields.question?.length || 0) < 120 ? 'bg-red-500' :
                              (watchedFields.question?.length || 0) <= 160 ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                          <span className={`text-sm font-bold ${(watchedFields.question?.length || 0) === 0 ? 'text-gray-500' :
                            (watchedFields.question?.length || 0) < 120 ? 'text-red-600' :
                              (watchedFields.question?.length || 0) <= 160 ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {watchedFields.question?.length || 0}/160
                          </span>
                        </div>
                      </div>
                      <YVTextField
                        id="metaDescription"
                        type="text"
                        placeholder="Digite uma descrição atrativa para os resultados de busca..."
                        {...register('metaDescription')}
                        disabled={isSubmitting}
                        error={errors.metaDescription?.message as string}
                        showSuccess={touchedFields.metaDescription && !errors.metaDescription && !!watchedFields.metaDescription}
                        variant="modern"
                        size="md"
                      />
                      <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {watchedFields.question?.length === 0 ? 'Adicione uma pergunta para melhorar o SEO' :
                          (watchedFields.question?.length || 0) < 120 ? 'Muito curta. Tente usar entre 120-160 caracteres' :
                            (watchedFields.question?.length || 0) <= 160 ? 'Tamanho ideal para SEO' : 'Muito longa. Reduza para 160 caracteres ou menos'}
                      </p>
                    </div>

                    {/* Palavras-chave - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-6 border border-gray-200/60">
                      <Label htmlFor="metaKeywords" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Palavras-chave
                      </Label>
                      <YVTextField
                        id="metaKeywords"
                        type="text"
                        placeholder="visto americano, imigração, green card, trabalho nos EUA"
                        {...register('link')}
                        disabled={isSubmitting}
                        error={errors.link?.message as string}
                        showSuccess={touchedFields.link && !errors.link && !!watchedFields.link}
                        variant="modern"
                        size="md"
                      />
                      <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        Separe as palavras-chave com vírgulas. Foque em termos relevantes para sua página.
                      </p>
                    </div>

                    {/* Canonical URL - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-6 border border-gray-200/60">
                      <Label htmlFor="canonicalUrl" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Canonical URL
                      </Label>
                      <YVTextField
                        id="canonicalUrl"
                        type="text"
                        placeholder="https://exemplo.com/pagina-canonica"
                        {...register('order')}
                        disabled={isSubmitting}
                        error={errors.order?.message as string}
                        showSuccess={touchedFields.order && !errors.order && !!watchedFields.order}
                        variant="modern"
                        size="md"
                      />
                      <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        URL canônica para evitar conteúdo duplicado
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
                        Título para Redes Sociais
                      </Label>
                      <YVTextField
                        id="ogTitle"
                        type="text"
                        placeholder="Título que aparecerá quando compartilhado no Facebook, LinkedIn, etc."
                        {...register('status')}
                        disabled={isSubmitting}
                        error={errors.status?.message as string}
                        showSuccess={touchedFields.status && !errors.status && !!watchedFields.status}
                        variant="modern"
                        size="md"
                      />
                    </div>

                    {/* Open Graph Description - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-6 border border-gray-200/60">
                      <Label htmlFor="ogDescription" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        Descrição para Redes Sociais
                      </Label>
                      <YVTextField
                        id="ogDescription"
                        type="text"
                        placeholder="Descrição que aparecerá quando compartilhado nas redes sociais"
                        {...register('ogDescription')}
                        disabled={isSubmitting}
                        error={errors.ogDescription?.message as string}
                        showSuccess={touchedFields.ogDescription && !errors.ogDescription && !!watchedFields.ogDescription}
                        variant="modern"
                        size="md"
                      />
                    </div>

                    {/* Open Graph Image - Estilo Moderno */}
                    <div className="bg-gradient-to-r from-gray-50 to-cyan-50 rounded-xl p-6 border border-gray-200/60">
                      <Label htmlFor="ogImage" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                        Imagem para Redes Sociais (URL)
                      </Label>
                      <YVTextField
                        id="ogImage"
                        type="text"
                        placeholder="https://exemplo.com/imagem-og.jpg"
                        {...register('link')}
                        disabled={isSubmitting}
                        error={errors.link?.message as string}
                        showSuccess={touchedFields.link && !errors.link && !!watchedFields.link}
                        variant="modern"
                        size="md"
                      />
                      <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        Recomendado: 1200x630px para melhor visualização
                      </p>
                      {watchedFields.link && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600">
                            Link: {watchedFields.link}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </SeoAnalysisPanel>
            </div>
          </div>
        </div>
      </div>


    </form>
  );
}
