'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YVTextField, YVSelect, YVUploadImg, YVSwitch } from '@/components/YV';
import { Label } from '@/components/ui/label';
import { vistoSchema } from '@/schemas/dashboard/visto';
import ClientEditorWrapper from '@/components/editor/ClientEditorWrapper';
import { SeoAnalysisPanel } from '@/components/shared/SeoAnalysisPanel';
import { SeoAnalysisData } from '@/hooks/useSeoAnalysis';
import { Building2 } from 'lucide-react';

type FormValues = {
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  country: string;
  vistoType: string;
  status: string;
  excerpt?: string;
  content?: string;
  bannerTitle?: string;
  // Campos do banner dinâmico
  bannerEnabled: boolean;
  bannerDescription?: string;
  bannerButtonText?: string;
  bannerButtonUrl?: string;
  // Campos do CTA dinâmico
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  videoUrl?: string;
  // Campos das principais cidades
  cityEnabled: boolean;
  cityTitle?: string;
  cityDescription?: string;
  city1Title?: string;
  city1Description?: string;
  city1Image?: string;
  city2Title?: string;
  city2Description?: string;
  city2Image?: string;
  city3Title?: string;
  city3Description?: string;
  city3Image?: string;
  city4Title?: string;
  city4Description?: string;
  city4Image?: string;
  // Campos do FAQ
  faqEnabled: boolean;
  faqTitle?: string;
  faqDescription?: string;
  faq1Question?: string;
  faq1Answer?: string;
  faq2Question?: string;
  faq2Answer?: string;
  faq3Question?: string;
  faq3Answer?: string;
  faq4Question?: string;
  faq4Answer?: string;
  faq5Question?: string;
  faq5Answer?: string;
  faq6Question?: string;
  faq6Answer?: string;
  // Campos dos diferenciais
  diferenciaisEnabled: boolean;
  diferenciaisTitle?: string;
  diferenciaisDescription?: string;
  diferencial1Title?: string;
  diferencial1Description?: string;
  diferencial1Image?: string;
  diferencial2Title?: string;
  diferencial2Description?: string;
  diferencial2Image?: string;
  diferencial3Title?: string;
  diferencial3Description?: string;
  diferencial3Image?: string;
  diferencial4Title?: string;
  diferencial4Description?: string;
  diferencial4Image?: string;
  // Campos dos benefícios
  beneficiosEnabled: boolean;
  beneficio1Title?: string;
  beneficio1Description?: string;
  beneficio1Icon?: string;
  beneficio2Title?: string;
  beneficio2Description?: string;
  beneficio2Icon?: string;
  beneficio3Title?: string;
  beneficio3Description?: string;
  beneficio3Icon?: string;
  // Campos dos requisitos especiais
  requisitosEnabled: boolean;
  requisitosTitle?: string;
  requisitosDescription?: string;
  requisitosBreadcrumb?: string;
  requisitosButtonText?: string;
  requisitosButtonUrl?: string;
  requisito1Title?: string;
  requisito1Description?: string;
  requisito1Icon?: string;
  requisito2Title?: string;
  requisito2Description?: string;
  requisito2Icon?: string;
  requisito3Title?: string;
  requisito3Description?: string;
  requisito3Icon?: string;
  requisito4Title?: string;
  requisito4Description?: string;
  requisito4Icon?: string;
  requisito5Title?: string;
  requisito5Description?: string;
  requisito5Icon?: string;
  requisito6Title?: string;
  requisito6Description?: string;
  requisito6Icon?: string;
  requisito7Title?: string;
  requisito7Description?: string;
  requisito7Icon?: string;
  requisito8Title?: string;
  requisito8Description?: string;
  requisito8Icon?: string;
  authorId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

type VistoFormProps = {
  defaultValues?: {
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    imageUrl?: string;
    country?: string;
    vistoType?: string;
    status?: string;
    excerpt?: string;
    content?: string;
    bannerTitle?: string;
    // Campos do banner dinâmico
    bannerEnabled?: boolean;
    bannerDescription?: string;
    bannerButtonText?: string;
    bannerButtonUrl?: string;
    // Campos do CTA dinâmico
    ctaTitle?: string;
    ctaDescription?: string;
    ctaButtonText?: string;
    ctaButtonUrl?: string;
    videoUrl?: string;
    // Campos das principais cidades
    cityEnabled?: boolean;
    cityTitle?: string;
    cityDescription?: string;
    city1Title?: string;
    city1Description?: string;
    city1Image?: string;
    city2Title?: string;
    city2Description?: string;
    city2Image?: string;
    city3Title?: string;
    city3Description?: string;
    city3Image?: string;
    city4Title?: string;
    city4Description?: string;
    city4Image?: string;
    // Campos do FAQ
    faqEnabled?: boolean;
    faqTitle?: string;
    faqDescription?: string;
    faq1Question?: string;
    faq1Answer?: string;
    faq2Question?: string;
    faq2Answer?: string;
    faq3Question?: string;
    faq3Answer?: string;
    faq4Question?: string;
    faq4Answer?: string;
    faq5Question?: string;
    faq5Answer?: string;
  faq6Question?: string;
  faq6Answer?: string;
    // Campos dos diferenciais
    diferenciaisEnabled?: boolean;
    diferenciaisTitle?: string;
    diferenciaisDescription?: string;
    diferencial1Title?: string;
    diferencial1Description?: string;
    diferencial1Image?: string;
    diferencial2Title?: string;
    diferencial2Description?: string;
    diferencial2Image?: string;
    diferencial3Title?: string;
    diferencial3Description?: string;
    diferencial3Image?: string;
    diferencial4Title?: string;
    diferencial4Description?: string;
    diferencial4Image?: string;
    // Campos dos benefícios
    beneficiosEnabled?: boolean;
    beneficio1Title?: string;
    beneficio1Description?: string;
    beneficio1Icon?: string;
    beneficio2Title?: string;
    beneficio2Description?: string;
    beneficio2Icon?: string;
    beneficio3Title?: string;
    beneficio3Description?: string;
    beneficio3Icon?: string;
    // Campos dos requisitos especiais
    requisitosEnabled?: boolean;
    requisitosTitle?: string;
    requisitosDescription?: string;
    requisitosBreadcrumb?: string;
    requisitosButtonText?: string;
    requisitosButtonUrl?: string;
    requisito1Title?: string;
    requisito1Description?: string;
    requisito1Icon?: string;
    requisito2Title?: string;
    requisito2Description?: string;
    requisito2Icon?: string;
    requisito3Title?: string;
    requisito3Description?: string;
    requisito3Icon?: string;
    requisito4Title?: string;
    requisito4Description?: string;
    requisito4Icon?: string;
    requisito5Title?: string;
    requisito5Description?: string;
    requisito5Icon?: string;
    requisito6Title?: string;
    requisito6Description?: string;
    requisito6Icon?: string;
    requisito7Title?: string;
    requisito7Description?: string;
    requisito7Icon?: string;
    requisito8Title?: string;
    requisito8Description?: string;
    requisito8Icon?: string;
    authorId?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };
  isEditing?: boolean;
};

export default function VistoForm({
  defaultValues,
  isEditing = false
}: VistoFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [seoActiveTab, setSeoActiveTab] = useState<'general' | 'social'>('general');
  const [cidadesExpanded, setCidadesExpanded] = useState(false);
  const [diferenciaisExpanded, setDiferenciaisExpanded] = useState(false);
  const [faqExpanded, setFaqExpanded] = useState(false);
  const [beneficiosExpanded, setBeneficiosExpanded] = useState(false);
  const [requisitosExpanded, setRequisitosExpanded] = useState(false);
  const [requisitosCount, setRequisitosCount] = useState(1);
  const [bannerExpanded, setBannerExpanded] = useState(false);
  const router = useRouter();

  // Calcular quantos requisitos têm dados preenchidos
  React.useEffect(() => {
    if (defaultValues) {
      let count = 0;
      for (let i = 1; i <= 8; i++) {
        const title = defaultValues[`requisito${i}Title` as keyof typeof defaultValues] as string;
        const description = defaultValues[`requisito${i}Description` as keyof typeof defaultValues] as string;
        if (title && description) {
          count++;
        }
      }
      setRequisitosCount(Math.max(1, count));
    }
  }, [defaultValues]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(vistoSchema),
    mode: 'onChange' as const,
    defaultValues: {
      title: defaultValues?.title || '',
      slug: defaultValues?.slug || '',
      description: defaultValues?.description || '',
      imageUrl: defaultValues?.imageUrl || '',
      country: defaultValues?.country || '',
      vistoType: (defaultValues?.vistoType as 'turismo' | 'trabalho' | 'estudo' | 'investidor') || 'turismo',
      status: (defaultValues?.status as 'draft' | 'published') || 'draft',
      excerpt: defaultValues?.excerpt || '',
      content: defaultValues?.content || '',
      bannerTitle: defaultValues?.bannerTitle || '',
      // Campos do banner dinâmico
      bannerEnabled: defaultValues?.bannerEnabled || false,
      bannerDescription: defaultValues?.bannerDescription || '',
      bannerButtonText: defaultValues?.bannerButtonText || '',
      bannerButtonUrl: defaultValues?.bannerButtonUrl || '',
      // Campos do CTA dinâmico
      ctaTitle: defaultValues?.ctaTitle || '',
      ctaDescription: defaultValues?.ctaDescription || '',
      ctaButtonText: defaultValues?.ctaButtonText || '',
      ctaButtonUrl: defaultValues?.ctaButtonUrl || '',
      videoUrl: defaultValues?.videoUrl || '',
      // Campos das principais cidades
      cityEnabled: defaultValues?.cityEnabled || false,
      cityTitle: defaultValues?.cityTitle || '',
      cityDescription: defaultValues?.cityDescription || '',
      city1Title: defaultValues?.city1Title || '',
      city1Description: defaultValues?.city1Description || '',
      city1Image: defaultValues?.city1Image || '',
      city2Title: defaultValues?.city2Title || '',
      city2Description: defaultValues?.city2Description || '',
      city2Image: defaultValues?.city2Image || '',
      city3Title: defaultValues?.city3Title || '',
      city3Description: defaultValues?.city3Description || '',
      city3Image: defaultValues?.city3Image || '',
      city4Title: defaultValues?.city4Title || '',
      city4Description: defaultValues?.city4Description || '',
      city4Image: defaultValues?.city4Image || '',
      // Campos dos diferenciais
      diferenciaisEnabled: defaultValues?.diferenciaisEnabled || false,
      diferenciaisTitle: defaultValues?.diferenciaisTitle || '',
      diferenciaisDescription: defaultValues?.diferenciaisDescription || '',
      diferencial1Title: defaultValues?.diferencial1Title || '',
      diferencial1Description: defaultValues?.diferencial1Description || '',
      diferencial1Image: defaultValues?.diferencial1Image || '',
      diferencial2Title: defaultValues?.diferencial2Title || '',
      diferencial2Description: defaultValues?.diferencial2Description || '',
      diferencial2Image: defaultValues?.diferencial2Image || '',
      diferencial3Title: defaultValues?.diferencial3Title || '',
      diferencial3Description: defaultValues?.diferencial3Description || '',
      diferencial3Image: defaultValues?.diferencial3Image || '',
      diferencial4Title: defaultValues?.diferencial4Title || '',
      diferencial4Description: defaultValues?.diferencial4Description || '',
      diferencial4Image: defaultValues?.diferencial4Image || '',
      // Campos do FAQ
      faqEnabled: defaultValues?.faqEnabled || false,
      faqTitle: defaultValues?.faqTitle || '',
      faqDescription: defaultValues?.faqDescription || '',
      faq1Question: defaultValues?.faq1Question || '',
      faq1Answer: defaultValues?.faq1Answer || '',
      faq2Question: defaultValues?.faq2Question || '',
      faq2Answer: defaultValues?.faq2Answer || '',
      faq3Question: defaultValues?.faq3Question || '',
      faq3Answer: defaultValues?.faq3Answer || '',
      faq4Question: defaultValues?.faq4Question || '',
      faq4Answer: defaultValues?.faq4Answer || '',
      faq5Question: defaultValues?.faq5Question || '',
      faq5Answer: defaultValues?.faq5Answer || '',
      faq6Question: defaultValues?.faq6Question || '',
      faq6Answer: defaultValues?.faq6Answer || '',
      // Campos dos benefícios
      beneficiosEnabled: defaultValues?.beneficiosEnabled || false,
      beneficio1Title: defaultValues?.beneficio1Title || '',
      beneficio1Description: defaultValues?.beneficio1Description || '',
      beneficio1Icon: defaultValues?.beneficio1Icon || '',
      beneficio2Title: defaultValues?.beneficio2Title || '',
      beneficio2Description: defaultValues?.beneficio2Description || '',
      beneficio2Icon: defaultValues?.beneficio2Icon || '',
      beneficio3Title: defaultValues?.beneficio3Title || '',
      beneficio3Description: defaultValues?.beneficio3Description || '',
      beneficio3Icon: defaultValues?.beneficio3Icon || '',
      // Campos dos requisitos especiais
      requisitosEnabled: defaultValues?.requisitosEnabled || false,
      requisitosBreadcrumb: defaultValues?.requisitosBreadcrumb || '',
      requisitosTitle: defaultValues?.requisitosTitle || '',
      requisitosDescription: defaultValues?.requisitosDescription || '',
      requisitosButtonText: defaultValues?.requisitosButtonText || '',
      requisitosButtonUrl: defaultValues?.requisitosButtonUrl || '',
      requisito1Title: defaultValues?.requisito1Title || '',
      requisito1Description: defaultValues?.requisito1Description || '',
      requisito1Icon: defaultValues?.requisito1Icon || '',
      requisito2Title: defaultValues?.requisito2Title || '',
      requisito2Description: defaultValues?.requisito2Description || '',
      requisito2Icon: defaultValues?.requisito2Icon || '',
      requisito3Title: defaultValues?.requisito3Title || '',
      requisito3Description: defaultValues?.requisito3Description || '',
      requisito3Icon: defaultValues?.requisito3Icon || '',
      requisito4Title: defaultValues?.requisito4Title || '',
      requisito4Description: defaultValues?.requisito4Description || '',
      requisito4Icon: defaultValues?.requisito4Icon || '',
      requisito5Title: defaultValues?.requisito5Title || '',
      requisito5Description: defaultValues?.requisito5Description || '',
      requisito5Icon: defaultValues?.requisito5Icon || '',
      requisito6Title: defaultValues?.requisito6Title || '',
      requisito6Description: defaultValues?.requisito6Description || '',
      requisito6Icon: defaultValues?.requisito6Icon || '',
      requisito7Title: defaultValues?.requisito7Title || '',
      requisito7Description: defaultValues?.requisito7Description || '',
      requisito7Icon: defaultValues?.requisito7Icon || '',
      requisito8Title: defaultValues?.requisito8Title || '',
      requisito8Description: defaultValues?.requisito8Description || '',
      requisito8Icon: defaultValues?.requisito8Icon || '',
      authorId: defaultValues?.authorId || '',
      metaTitle: defaultValues?.metaTitle || '',
      metaDescription: defaultValues?.metaDescription || '',
      metaKeywords: defaultValues?.metaKeywords || '',
      ogTitle: defaultValues?.ogTitle || '',
      ogDescription: defaultValues?.ogDescription || '',
      ogImage: defaultValues?.ogImage || '',
      twitterTitle: defaultValues?.twitterTitle || '',
      twitterDescription: defaultValues?.twitterDescription || '',
      twitterImage: defaultValues?.twitterImage || ''
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


  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        description: data.description,
        imageUrl: data.imageUrl || '',
        country: data.country,
        vistoType: data.vistoType,
        status: data.status,
        excerpt: data.excerpt || '',
        content: data.content || '',
        bannerTitle: data.bannerTitle || '',
        // Campos do banner dinâmico
        bannerEnabled: data.bannerEnabled,
        bannerDescription: data.bannerDescription || '',
        bannerButtonText: data.bannerButtonText || '',
        bannerButtonUrl: data.bannerButtonUrl || '',
        // Campos do CTA dinâmico
        ctaTitle: data.ctaTitle || '',
        ctaDescription: data.ctaDescription || '',
        ctaButtonText: data.ctaButtonText || '',
        ctaButtonUrl: data.ctaButtonUrl || '',
        videoUrl: data.videoUrl || '',
        // Campos das principais cidades
        cityEnabled: data.cityEnabled,
        cityTitle: data.cityTitle || '',
        cityDescription: data.cityDescription || '',
        city1Title: data.city1Title || '',
        city1Description: data.city1Description || '',
        city1Image: data.city1Image || '',
        city2Title: data.city2Title || '',
        city2Description: data.city2Description || '',
        city2Image: data.city2Image || '',
        city3Title: data.city3Title || '',
        city3Description: data.city3Description || '',
        city3Image: data.city3Image || '',
        city4Title: data.city4Title || '',
        city4Description: data.city4Description || '',
        city4Image: data.city4Image || '',
        // Campos dos diferenciais
        diferenciaisEnabled: data.diferenciaisEnabled,
        diferenciaisTitle: data.diferenciaisTitle || '',
        diferenciaisDescription: data.diferenciaisDescription || '',
        diferencial1Title: data.diferencial1Title || '',
        diferencial1Description: data.diferencial1Description || '',
        diferencial1Image: data.diferencial1Image || '',
        diferencial2Title: data.diferencial2Title || '',
        diferencial2Description: data.diferencial2Description || '',
        diferencial2Image: data.diferencial2Image || '',
        diferencial3Title: data.diferencial3Title || '',
        diferencial3Description: data.diferencial3Description || '',
        diferencial3Image: data.diferencial3Image || '',
        diferencial4Title: data.diferencial4Title || '',
        diferencial4Description: data.diferencial4Description || '',
        diferencial4Image: data.diferencial4Image || '',
        // Campos do FAQ
        faqEnabled: data.faqEnabled,
        faqTitle: data.faqTitle || '',
        faqDescription: data.faqDescription || '',
        faq1Question: data.faq1Question || '',
        faq1Answer: data.faq1Answer || '',
        faq2Question: data.faq2Question || '',
        faq2Answer: data.faq2Answer || '',
        faq3Question: data.faq3Question || '',
        faq3Answer: data.faq3Answer || '',
        faq4Question: data.faq4Question || '',
        faq4Answer: data.faq4Answer || '',
        faq5Question: data.faq5Question || '',
        faq5Answer: data.faq5Answer || '',
        faq6Question: data.faq6Question || '',
        faq6Answer: data.faq6Answer || '',
        // Campos dos benefícios
        beneficiosEnabled: data.beneficiosEnabled,
        beneficio1Title: data.beneficio1Title || '',
        beneficio1Description: data.beneficio1Description || '',
        beneficio1Icon: data.beneficio1Icon || '',
        beneficio2Title: data.beneficio2Title || '',
        beneficio2Description: data.beneficio2Description || '',
        beneficio2Icon: data.beneficio2Icon || '',
        beneficio3Title: data.beneficio3Title || '',
        beneficio3Description: data.beneficio3Description || '',
        beneficio3Icon: data.beneficio3Icon || '',
        // Campos dos requisitos especiais
        requisitosEnabled: data.requisitosEnabled || false,
        requisitosTitle: data.requisitosTitle || '',
        requisitosDescription: data.requisitosDescription || '',
        requisitosBreadcrumb: data.requisitosBreadcrumb || '',
        requisitosButtonText: data.requisitosButtonText || '',
        requisitosButtonUrl: data.requisitosButtonUrl || '',
        requisito1Title: data.requisito1Title || '',
        requisito1Description: data.requisito1Description || '',
        requisito1Icon: data.requisito1Icon || '',
        requisito2Title: data.requisito2Title || '',
        requisito2Description: data.requisito2Description || '',
        requisito2Icon: data.requisito2Icon || '',
        requisito3Title: data.requisito3Title || '',
        requisito3Description: data.requisito3Description || '',
        requisito3Icon: data.requisito3Icon || '',
        requisito4Title: data.requisito4Title || '',
        requisito4Description: data.requisito4Description || '',
        requisito4Icon: data.requisito4Icon || '',
        requisito5Title: data.requisito5Title || '',
        requisito5Description: data.requisito5Description || '',
        requisito5Icon: data.requisito5Icon || '',
        requisito6Title: data.requisito6Title || '',
        requisito6Description: data.requisito6Description || '',
        requisito6Icon: data.requisito6Icon || '',
        requisito7Title: data.requisito7Title || '',
        requisito7Description: data.requisito7Description || '',
        requisito7Icon: data.requisito7Icon || '',
        requisito8Title: data.requisito8Title || '',
        requisito8Description: data.requisito8Description || '',
        requisito8Icon: data.requisito8Icon || '',
        authorId: data.authorId || '',
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        metaKeywords: data.metaKeywords || '',
        ogTitle: data.ogTitle || '',
        ogDescription: data.ogDescription || '',
        ogImage: data.ogImage || '',
        twitterTitle: data.twitterTitle || '',
        twitterDescription: data.twitterDescription || '',
        twitterImage: data.twitterImage || ''
      };

      const url = isEditing && defaultValues?.slug
        ? `/api/dashboard/vistos/${defaultValues.slug}`
        : '/api/dashboard/vistos';

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
        setServerSuccess(result.message || 'Visto salvo com sucesso!');
        setTimeout(() => {
          router.push('/dashboard/vistos');
        }, 500);
      } else {
        setServerError(result.message || 'Erro ao salvar visto');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error saving visto:', error);
      setServerError('Erro interno do servidor');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal - Conteúdo */}
        <div className="lg:col-span-2 space-y-6">
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
                Título do Visto
              </Label>
              <YVTextField
                id='title'
                type='text'
                placeholder='Ex: Visto de Turismo para Portugal'
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

            {/* Banner Title */}
            <div>
              <Label htmlFor='bannerTitle' className='mb-2 block'>
                Título do Banner
              </Label>
              <YVTextField
                id='bannerTitle'
                type='text'
                placeholder='Ex: Seu talento merece chegar mais longe'
                {...register('bannerTitle')}
                disabled={isSubmitting}
                error={errors.bannerTitle?.message as string}
                showSuccess={
                  touchedFields.bannerTitle && !errors.bannerTitle && !!watchedFields.bannerTitle
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
                placeholder='visto-turismo-portugal'
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
                placeholder='Resumo breve sobre o visto...'
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

            {/* Description */}
            <div>
              <Label htmlFor='description' className='mb-2 block'>
                Descrição
              </Label>
              <textarea
                id='description'
                placeholder='Descreva o visto...'
                {...register('description')}
                disabled={isSubmitting}
                rows={4}
                className='w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
              />
              {errors.description && (
                <p className='text-sm text-red-600 mt-1.5'>
                  {errors.description.message as string}
                </p>
              )}
            </div>

            {/* Content Editor */}
            <div>
              <Label htmlFor='content' className='mb-2 block'>
                Conteúdo Principal
              </Label>
              <ClientEditorWrapper
                content={watchedFields.content || ''}
                onChange={(content: string) => setValue('content', content)}
                disabled={isSubmitting}
                placeholder='Digite o conteúdo principal sobre o visto...'
              />
              {errors.content && (
                <p className='text-sm text-red-600 mt-1.5'>
                  {errors.content.message as string}
                </p>
              )}
            </div>

            {/* Seção Diferenciais */}
            <div className='border-t pt-6'>
              <button
                type='button'
                onClick={() => setDiferenciaisExpanded(!diferenciaisExpanded)}
                className='flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
              >
                <div className='flex items-center space-x-3'>
                  <Building2 className='w-6 h-6 text-[#FFBD1A]' />
                  <div className='text-left'>
                    <h3 className='text-lg font-semibold text-dashboard'>Diferenciais</h3>
                    <p className='text-sm text-gray-500'>Configure os diferenciais do visto</p>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <YVSwitch
                    checked={watchedFields.diferenciaisEnabled || false}
                    onCheckedChange={(checked) => setValue('diferenciaisEnabled', checked)}
                    label="Exibir na página"
                    size="sm"
                    variant="primary"
                  />
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      diferenciaisExpanded ? 'rotate-180' : ''
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </div>
              </button>

              {diferenciaisExpanded && (
                <div className='mt-4 space-y-6 p-4 bg-white border border-gray-200 rounded-lg'>
                  {/* Título e Descrição da Seção */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='diferenciaisTitle' className='mb-2 block'>
                        Título da Seção
                      </Label>
                      <YVTextField
                        id='diferenciaisTitle'
                        type='text'
                        placeholder='Ex: Todo mundo promete o mesmo. A gente entrega diferente'
                        {...register('diferenciaisTitle')}
                        disabled={isSubmitting}
                        error={errors.diferenciaisTitle?.message as string}
                        variant='modern'
                        size='md'
                      />
                    </div>

                    <div>
                      <Label htmlFor='diferenciaisDescription' className='mb-2 block'>
                        Descrição da Seção
                      </Label>
                      <textarea
                        id='diferenciaisDescription'
                        placeholder='Ex: Descrição dos diferenciais...'
                        {...register('diferenciaisDescription')}
                        disabled={isSubmitting}
                        rows={3}
                        className='w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                      />
                      {errors.diferenciaisDescription && (
                        <p className='text-sm text-red-600 mt-1.5'>
                          {errors.diferenciaisDescription.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Diferenciais - Layout 2 colunas */}
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {[1, 2, 3, 4].map((diferencialNum) => (
                      <div key={diferencialNum} className='border border-gray-200 rounded-lg p-3 bg-gray-50'>
                        <h4 className='text-sm font-medium text-gray-900 mb-3 flex items-center'>
                          <span className='w-6 h-6 bg-[#FFBD1A] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2'>
                            {diferencialNum}
                          </span>
                          Diferencial {diferencialNum}
                        </h4>

                        <div className='space-y-3'>
                          <div>
                            <Label htmlFor={`diferencial${diferencialNum}Title`} className='mb-1 block text-xs font-medium'>
                              Título
                            </Label>
                            <YVTextField
                              id={`diferencial${diferencialNum}Title`}
                              type='text'
                              placeholder={`Ex: Diferencial ${diferencialNum}`}
                              {...register(`diferencial${diferencialNum}Title` as keyof FormValues)}
                              disabled={isSubmitting}
                              error={errors[`diferencial${diferencialNum}Title` as keyof typeof errors]?.message as string}
                              variant='modern'
                              size='sm'
                            />
                          </div>

                          <div>
                            <Label htmlFor={`diferencial${diferencialNum}Description`} className='mb-1 block text-xs font-medium'>
                              Descrição
                            </Label>
                            <textarea
                              id={`diferencial${diferencialNum}Description`}
                              placeholder={`Ex: Descrição do diferencial ${diferencialNum}...`}
                              {...register(`diferencial${diferencialNum}Description` as keyof FormValues)}
                              disabled={isSubmitting}
                              rows={2}
                              className='w-full px-2 py-1 text-xs rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-1 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                            />
                            {errors[`diferencial${diferencialNum}Description` as keyof typeof errors] && (
                              <p className='text-xs text-red-600 mt-1'>
                                {errors[`diferencial${diferencialNum}Description` as keyof typeof errors]?.message as string}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor={`diferencial${diferencialNum}Image`} className='mb-1 block text-xs font-medium'>
                              Imagem
                            </Label>
                            <YVUploadImg
                              value={watchedFields[`diferencial${diferencialNum}Image` as keyof typeof watchedFields] as string || ''}
                              onChange={(url: string) => setValue(`diferencial${diferencialNum}Image` as keyof FormValues, url)}
                              disabled={isSubmitting}
                              error={errors[`diferencial${diferencialNum}Image` as keyof typeof errors]?.message as string}
                              placeholder={`https://exemplo.com/diferencial${diferencialNum}.jpg`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Seção Requisitos Especiais */}
            <div className='border-t pt-6'>
              <button
                type='button'
                onClick={() => setRequisitosExpanded(!requisitosExpanded)}
                className='flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
              >
                <div className='flex items-center space-x-3'>
                  <svg className='w-6 h-6 text-[#FFBD1A]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  <div className='text-left'>
                    <h3 className='text-lg font-semibold text-dashboard'>Requisitos Especiais</h3>
                    <p className='text-sm text-gray-500'>Configure os requisitos especiais do visto</p>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <YVSwitch
                    checked={watchedFields.requisitosEnabled || false}
                    onCheckedChange={(checked) => setValue('requisitosEnabled', checked)}
                    label="Exibir na página"
                    size="sm"
                    variant="primary"
                  />
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      requisitosExpanded ? 'rotate-180' : ''
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </div>
              </button>

              {requisitosExpanded && (
                <div className='mt-4 space-y-6 p-4 bg-white border border-gray-200 rounded-lg'>
                  {/* Título e Descrição da Seção */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='requisitosTitle' className='mb-2 block'>
                        Título da Seção
                      </Label>
                      <YVTextField
                        id='requisitosTitle'
                        type='text'
                        placeholder='Ex: A gente acredita em soluções que cabem na vida real'
                        {...register('requisitosTitle')}
                        disabled={isSubmitting}
                        error={errors.requisitosTitle?.message as string}
                        variant='modern'
                        size='md'
                      />
                    </div>

                    <div>
                      <Label htmlFor='requisitosDescription' className='mb-2 block'>
                        Descrição da Seção
                      </Label>
                      <textarea
                        id='requisitosDescription'
                        placeholder='Ex: Descrição da seção de requisitos especiais...'
                        {...register('requisitosDescription')}
                        disabled={isSubmitting}
                        rows={3}
                        className='w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                      />
                      {errors.requisitosDescription && (
                        <p className='text-sm text-red-600 mt-1.5'>
                          {errors.requisitosDescription.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Breadcrumb e Botão */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='requisitosBreadcrumb' className='mb-2 block'>
                        Breadcrumb
                      </Label>
                      <YVTextField
                        id='requisitosBreadcrumb'
                        type='text'
                        placeholder='Ex: ESPECIAIS'
                        {...register('requisitosBreadcrumb')}
                        disabled={isSubmitting}
                        error={errors.requisitosBreadcrumb?.message as string}
                        variant='modern'
                        size='md'
                      />
                    </div>

                    <div>
                      <Label htmlFor='requisitosButtonText' className='mb-2 block'>
                        Texto do Botão
                      </Label>
                      <YVTextField
                        id='requisitosButtonText'
                        type='text'
                        placeholder='Ex: Conheça todos os requisitos especiais'
                        {...register('requisitosButtonText')}
                        disabled={isSubmitting}
                        error={errors.requisitosButtonText?.message as string}
                        variant='modern'
                        size='md'
                      />
                    </div>
                  </div>

                  {/* URL do Botão */}
                  <div>
                    <Label htmlFor='requisitosButtonUrl' className='mb-2 block'>
                      URL do Botão
                    </Label>
                    <YVTextField
                      id='requisitosButtonUrl'
                      type='text'
                      placeholder='Ex: /requisitos'
                      {...register('requisitosButtonUrl')}
                      disabled={isSubmitting}
                      error={errors.requisitosButtonUrl?.message as string}
                      variant='modern'
                      size='md'
                    />
                  </div>

                  {/* Controles de Adicionar/Remover */}
                  <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200'>
                    <div className='flex items-center space-x-4'>
                      <span className='text-sm font-medium text-gray-700'>
                        {requisitosCount === 1 ? 'Requisito' : 'Requisitos'} ({requisitosCount})
                      </span>
                      <div className='flex items-center space-x-2'>
                        <button
                          type='button'
                          onClick={() => setRequisitosCount(Math.max(1, requisitosCount - 1))}
                          disabled={requisitosCount <= 1}
                          className='px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        >
                          - Remover
                        </button>
                        <button
                          type='button'
                          onClick={() => setRequisitosCount(Math.min(8, requisitosCount + 1))}
                          disabled={requisitosCount >= 8}
                          className='px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        >
                          + Adicionar
                        </button>
                      </div>
                    </div>
                    <span className='text-xs text-gray-500'>
                      {requisitosCount === 1 ? 'Adicione mais requisitos conforme necessário' : 'Máximo 8 requisitos'}
                    </span>
                  </div>

                  {/* Requisitos - Layout 2 colunas */}
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {Array.from({ length: requisitosCount }, (_, index) => {
                      const requisitoNum = index + 1;
                      return (
                      <div key={requisitoNum} className='border border-gray-200 rounded-lg p-3 bg-gray-50'>
                        <h4 className='text-sm font-medium text-gray-900 mb-3 flex items-center'>
                          <span className='w-6 h-6 bg-[#FFBD1A] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2'>
                            {requisitoNum}
                          </span>
                          Requisito {requisitoNum}
                        </h4>

                        <div className='space-y-3'>
                          <div>
                            <Label htmlFor={`requisito${requisitoNum}Icon`} className='mb-1 block text-xs font-medium'>
                              Ícone SVG (opcional)
                            </Label>
                            <textarea
                              id={`requisito${requisitoNum}Icon`}
                              placeholder={`Cole o código SVG do ícone...`}
                              {...register(`requisito${requisitoNum}Icon` as keyof FormValues)}
                              disabled={isSubmitting}
                              rows={4}
                              className='w-full px-2 py-1 text-xs rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-1 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors font-mono'
                            />
                          </div>

                          <div>
                            <Label htmlFor={`requisito${requisitoNum}Title`} className='mb-1 block text-xs font-medium'>
                              Título
                            </Label>
                            <YVTextField
                              id={`requisito${requisitoNum}Title`}
                              type='text'
                              placeholder={`Ex: Título do requisito ${requisitoNum}...`}
                              {...register(`requisito${requisitoNum}Title` as keyof FormValues)}
                              disabled={isSubmitting}
                              error={errors[`requisito${requisitoNum}Title` as keyof typeof errors]?.message as string}
                              variant='modern'
                              size='sm'
                            />
                          </div>

                          <div>
                            <Label htmlFor={`requisito${requisitoNum}Description`} className='mb-1 block text-xs font-medium'>
                              Descrição
                            </Label>
                            <textarea
                              id={`requisito${requisitoNum}Description`}
                              placeholder={`Ex: Descrição do requisito ${requisitoNum}...`}
                              {...register(`requisito${requisitoNum}Description` as keyof FormValues)}
                              disabled={isSubmitting}
                              rows={3}
                              className='w-full px-2 py-1 text-xs rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-1 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                            />
                            {errors[`requisito${requisitoNum}Description` as keyof typeof errors] && (
                              <p className='text-xs text-red-600 mt-1'>
                                {errors[`requisito${requisitoNum}Description` as keyof typeof errors]?.message as string}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Principais Cidades - Accordion */}
            <div className='border-t pt-6'>
              <button
                type='button'
                onClick={() => setCidadesExpanded(!cidadesExpanded)}
                className='flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
              >
                <div className='flex items-center space-x-3'>
                  <Building2 className='w-6 h-6 text-[#FFBD1A]' />
                  <div className='text-left'>
                    <h3 className='text-lg font-semibold text-dashboard'>Principais Cidades</h3>
                    <p className='text-sm text-gray-500'>Configure as cidades de destino do visto</p>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <YVSwitch
                    checked={watchedFields.cityEnabled || false}
                    onCheckedChange={(checked) => setValue('cityEnabled', checked)}
                    label="Exibir na página"
                    size="sm"
                    variant="primary"
                  />
                  <div className={`transform transition-transform ${cidadesExpanded ? 'rotate-180' : ''}`}>
                    <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                </div>
              </button>

              {cidadesExpanded && (
                <div className='mt-4 space-y-6 p-4 bg-white border border-gray-200 rounded-lg'>
                  {/* Título e Descrição da Seção */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='cityTitle' className='mb-2 block'>
                        Título da Seção
                      </Label>
                      <YVTextField
                        id='cityTitle'
                        type='text'
                        placeholder='Ex: Principais cidades de destino do visto EB2-NIW'
                        {...register('cityTitle')}
                        disabled={isSubmitting}
                        error={errors.cityTitle?.message as string}
                        variant='modern'
                        size='md'
                      />
                    </div>

                    <div>
                      <Label htmlFor='cityDescription' className='mb-2 block'>
                        Descrição da Seção
                      </Label>
                      <textarea
                        id='cityDescription'
                        placeholder='Ex: Descrição Phasellus netus natoque ante eget at condimentum eget.'
                        {...register('cityDescription')}
                        disabled={isSubmitting}
                        rows={3}
                        className='w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                      />
                      {errors.cityDescription && (
                        <p className='text-sm text-red-600 mt-1.5'>
                          {errors.cityDescription.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Cidades - Layout 2 colunas */}
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {[1, 2, 3, 4].map((cityNum) => (
                      <div key={cityNum} className='border border-gray-200 rounded-lg p-3 bg-gray-50'>
                        <h4 className='text-sm font-medium text-gray-900 mb-3 flex items-center'>
                          <span className='w-6 h-6 bg-[#FFBD1A] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2'>
                            {cityNum}
                          </span>
                          Cidade {cityNum}
                        </h4>

                        <div className='space-y-3'>
                          <div>
                            <Label htmlFor={`city${cityNum}Title`} className='mb-1 block text-xs font-medium'>
                              Título
                            </Label>
                            <YVTextField
                              id={`city${cityNum}Title`}
                              type='text'
                              placeholder={`Ex: Cidade ${cityNum}`}
                              {...register(`city${cityNum}Title` as keyof FormValues)}
                              disabled={isSubmitting}
                              error={errors[`city${cityNum}Title` as keyof typeof errors]?.message as string}
                              variant='modern'
                              size='sm'
                            />
                          </div>

                          <div>
                            <Label htmlFor={`city${cityNum}Description`} className='mb-1 block text-xs font-medium'>
                              Descrição
                            </Label>
                            <textarea
                              id={`city${cityNum}Description`}
                              placeholder={`Ex: Descrição da cidade ${cityNum}...`}
                              {...register(`city${cityNum}Description` as keyof FormValues)}
                              disabled={isSubmitting}
                              rows={2}
                              className='w-full px-2 py-1 text-xs rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-1 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                            />
                            {errors[`city${cityNum}Description` as keyof typeof errors] && (
                              <p className='text-xs text-red-600 mt-1'>
                                {errors[`city${cityNum}Description` as keyof typeof errors]?.message as string}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor={`city${cityNum}Image`} className='mb-1 block text-xs font-medium'>
                              Imagem
                            </Label>
                            <YVUploadImg
                              value={watchedFields[`city${cityNum}Image` as keyof typeof watchedFields] as string || ''}
                              onChange={(url: string) => setValue(`city${cityNum}Image` as keyof FormValues, url)}
                              disabled={isSubmitting}
                              error={errors[`city${cityNum}Image` as keyof typeof errors]?.message as string}
                              placeholder={`https://exemplo.com/cidade${cityNum}.jpg`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Seção FAQ */}
              <div className='mb-6 mt-4'>
                <button
                  type='button'
                  onClick={() => setFaqExpanded(!faqExpanded)}
                  className='flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                >
                  <div className='flex items-center space-x-3'>
                    <svg className='w-6 h-6 text-[#FFBD1A]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <div className='text-left'>
                      <h3 className='text-lg font-semibold text-dashboard'>Perguntas Frequentes</h3>
                      <p className='text-sm text-gray-500'>Configure as perguntas e respostas do FAQ</p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <YVSwitch
                      checked={watchedFields.faqEnabled || false}
                      onCheckedChange={(checked) => setValue('faqEnabled', checked)}
                      label="Exibir na página"
                      size="sm"
                      variant="primary"
                    />
                    <div className={`transform transition-transform ${faqExpanded ? 'rotate-180' : ''}`}>
                      <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                    </div>
                  </div>
                </button>

                {faqExpanded && (
                  <div className='mt-4 space-y-6 p-4 bg-white border border-gray-200 rounded-lg'>
                    {/* Título e Descrição da Seção FAQ */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <Label htmlFor='faqTitle' className='mb-2 block'>
                          Título da Seção FAQ
                        </Label>
                        <YVTextField
                          id='faqTitle'
                          type='text'
                          placeholder='Ex: Perguntas frequentes sobre o visto EB2-NIW'
                          {...register('faqTitle')}
                          disabled={isSubmitting}
                          error={errors.faqTitle?.message as string}
                          variant='modern'
                          size='md'
                        />
                      </div>

                      <div>
                        <Label htmlFor='faqDescription' className='mb-2 block'>
                          Descrição da Seção FAQ
                        </Label>
                        <textarea
                          id='faqDescription'
                          placeholder='Ex: Descrição Phasellus netus natoque ante eget at condimentum eget.'
                          {...register('faqDescription')}
                          disabled={isSubmitting}
                          rows={3}
                          className='w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                        />
                        {errors.faqDescription && (
                          <p className='text-sm text-red-600 mt-1.5'>
                            {errors.faqDescription.message as string}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Perguntas e Respostas - Layout 2 colunas */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                      {[1, 2, 3, 4, 5, 6].map((faqNum) => (
                        <div key={faqNum} className='border border-gray-200 rounded-lg p-3 bg-gray-50'>
                          <h4 className='text-sm font-medium text-gray-900 mb-3 flex items-center'>
                            <span className='w-6 h-6 bg-[#FFBD1A] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2'>
                              {faqNum}
                            </span>
                            FAQ {faqNum}
                          </h4>

                          <div className='space-y-3'>
                            <div>
                              <Label htmlFor={`faq${faqNum}Question`} className='mb-1 block text-xs font-medium'>
                                Pergunta
                              </Label>
                              <YVTextField
                                id={`faq${faqNum}Question`}
                                type='text'
                                placeholder={`Ex: Pergunta ${faqNum}...`}
                                {...register(`faq${faqNum}Question` as keyof FormValues)}
                                disabled={isSubmitting}
                                error={errors[`faq${faqNum}Question` as keyof typeof errors]?.message as string}
                                variant='modern'
                                size='sm'
                              />
                            </div>

                            <div>
                              <Label htmlFor={`faq${faqNum}Answer`} className='mb-1 block text-xs font-medium'>
                                Resposta
                              </Label>
                              <textarea
                                id={`faq${faqNum}Answer`}
                                placeholder={`Ex: Resposta ${faqNum}...`}
                                {...register(`faq${faqNum}Answer` as keyof FormValues)}
                                disabled={isSubmitting}
                                rows={3}
                                className='w-full px-2 py-1 text-xs rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-1 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                              />
                              {errors[`faq${faqNum}Answer` as keyof typeof errors] && (
                                <p className='text-xs text-red-600 mt-1'>
                                  {errors[`faq${faqNum}Answer` as keyof typeof errors]?.message as string}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Seção Banner */}
              <div className='mb-6 mt-4'>
                <div className='flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg'>
                  <div className='flex items-center space-x-3'>
                    <svg className='w-6 h-6 text-[#FFBD1A]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                    <div className='text-left'>
                      <h3 className='text-lg font-semibold text-dashboard'>CTA</h3>
                      <p className='text-sm text-gray-500'>Configure o CTA personalizado</p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <YVSwitch
                      checked={watchedFields.bannerEnabled}
                      onCheckedChange={(checked) => setValue('bannerEnabled', checked)}
                      label="Exibir na página"
                      size="sm"
                      variant="primary"
                    />
                    <button
                      type='button'
                      onClick={() => setBannerExpanded(!bannerExpanded)}
                      className='text-gray-600 hover:text-gray-900 transition-colors'
                    >
                      <svg className={`w-5 h-5 transition-transform ${bannerExpanded ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                    </button>
                  </div>
                </div>

                {bannerExpanded && (
                  <div className='mt-4 space-y-4 p-4 bg-white border border-gray-200 rounded-lg'>
                    <div>
                      <Label htmlFor='ctaTitle'>
                        Título do CTA
                      </Label>
                      <YVTextField
                        id='ctaTitle'
                        type='text'
                        placeholder='Ex: Descubra o melhor caminho para viver fora...'
                        {...register('ctaTitle')}
                        disabled={isSubmitting}
                        error={errors.ctaTitle?.message as string}
                        variant='modern'
                        size='sm'
                      />
                    </div>

                    <div>
                      <Label htmlFor='ctaDescription'>
                        Descrição do CTA
                      </Label>
                      <textarea
                        id='ctaDescription'
                        placeholder='Ex: Leva menos de 2 minutos. Sem compromisso...'
                        {...register('ctaDescription')}
                        disabled={isSubmitting}
                        rows={3}
                        className='w-full px-2 py-1 text-xs rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-1 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                      />
                      {errors.ctaDescription && (
                        <p className='text-xs text-red-500 mt-1'>
                          {errors.ctaDescription.message as string}
                        </p>
                      )}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <Label htmlFor='ctaButtonText'>
                          Texto do Button
                        </Label>
                        <YVTextField
                          id='ctaButtonText'
                          type='text'
                          placeholder='Ex: Comece agora...'
                          {...register('ctaButtonText')}
                          disabled={isSubmitting}
                          error={errors.ctaButtonText?.message as string}
                          variant='modern'
                          size='sm'
                        />
                      </div>

                      <div>
                        <Label htmlFor='ctaButtonUrl'>
                          URL do Button
                        </Label>
                        <YVTextField
                          id='ctaButtonUrl'
                          type='url'
                          placeholder='Ex: https://exemplo.com...'
                          {...register('ctaButtonUrl')}
                          disabled={isSubmitting}
                          error={errors.ctaButtonUrl?.message as string}
                          variant='modern'
                          size='sm'
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Seção Benefícios */}
              <div className='mb-6 mt-4'>
                <div className='flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg'>
                  <div className='flex items-center space-x-3'>
                    <svg className='w-6 h-6 text-[#FFBD1A]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                    <div className='text-left'>
                      <h3 className='text-lg font-semibold text-dashboard'>Benefícios</h3>
                      <p className='text-sm text-gray-500'>Configure os benefícios deste visto</p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <YVSwitch
                      checked={watchedFields.beneficiosEnabled}
                      onCheckedChange={(checked) => setValue('beneficiosEnabled', checked)}
                      label="Exibir na página"
                      size="sm"
                      variant="primary"
                    />
                    <button
                      type='button'
                      onClick={() => setBeneficiosExpanded(!beneficiosExpanded)}
                      className='text-gray-600 hover:text-gray-900 transition-colors'
                    >
                      <svg className={`w-5 h-5 transition-transform ${beneficiosExpanded ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                    </button>
                  </div>
                </div>

                {beneficiosExpanded && (
                  <div className='mt-4 space-y-6 p-4 bg-white border border-gray-200 rounded-lg'>
                    {[1, 2, 3].map((beneficioNum) => (
                      <div key={beneficioNum} className='p-4 bg-gray-50 rounded-lg'>
                        <h4 className='text-sm font-medium text-gray-900 mb-3 flex items-center'>
                          <span className='w-6 h-6 bg-[#FFBD1A] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2'>
                            {beneficioNum}
                          </span>
                          Benefício {beneficioNum}
                        </h4>

                        <div className='space-y-3'>
                          <div>
                            <Label htmlFor={`beneficio${beneficioNum}Icon`}>
                              Ícone SVG (opcional)
                            </Label>
                            <textarea
                              id={`beneficio${beneficioNum}Icon`}
                              placeholder={`Cole o código SVG do ícone...`}
                              {...register(`beneficio${beneficioNum}Icon` as keyof FormValues)}
                              disabled={isSubmitting}
                              rows={4}
                              className='w-full px-2 py-1 text-xs rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-1 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors font-mono'
                            />
                          </div>

                          <div>
                            <Label htmlFor={`beneficio${beneficioNum}Title`}>
                              Título
                            </Label>
                            <YVTextField
                              id={`beneficio${beneficioNum}Title`}
                              type='text'
                              placeholder={`Ex: Título do benefício ${beneficioNum}...`}
                              {...register(`beneficio${beneficioNum}Title` as keyof FormValues)}
                              disabled={isSubmitting}
                              error={errors[`beneficio${beneficioNum}Title` as keyof typeof errors]?.message as string}
                              variant='modern'
                              size='sm'
                            />
                          </div>

                          <div>
                            <Label htmlFor={`beneficio${beneficioNum}Description`}>
                              Descrição
                            </Label>
                            <textarea
                              id={`beneficio${beneficioNum}Description`}
                              placeholder={`Ex: Descrição do benefício ${beneficioNum}...`}
                              {...register(`beneficio${beneficioNum}Description` as keyof FormValues)}
                              disabled={isSubmitting}
                              rows={3}
                              className='w-full px-2 py-1 text-xs rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-1 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                            />
                            {errors[`beneficio${beneficioNum}Description` as keyof typeof errors] && (
                              <p className='text-xs text-red-500 mt-1'>
                                {errors[`beneficio${beneficioNum}Description` as keyof typeof errors]?.message as string}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </form>
        </div>

        {/* Coluna Lateral - Configurações */}
        <div className="space-y-6">
          {/* Configurações */}
          <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
            <h3 className='text-lg font-semibold text-dashboard mb-4'>Configurações</h3>

            {/* Image Upload */}
            <div className='mb-4'>
              <Label htmlFor='imageUrl' className='mb-2 block'>
                Imagem do Visto
              </Label>
              <YVUploadImg
                value={watchedFields.imageUrl || ''}
                onChange={(url) => setValue('imageUrl', url)}
                disabled={isSubmitting}
                error={errors.imageUrl?.message as string}
                placeholder='https://exemplo.com/imagem-visto.jpg'
              />
              <p className='text-xs text-gray-500 mt-1'>
                💡 Dica: Use imagens com dimensões de 1440x600 pixels para melhor qualidade
              </p>
            </div>

            {/* Grid 2 colunas */}
            <div className='grid grid-cols-1 gap-4 mb-4'>
              {/* Country */}
              <div>
                <Label htmlFor='country' className='mb-2 block'>
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

              {/* Visto Type */}
              <div>
                <Label htmlFor='vistoType' className='mb-2 block'>
                  Tipo de Visto
                </Label>
                <YVSelect
                  id='vistoType'
                  {...register('vistoType')}
                  disabled={isSubmitting}
                  variant='modern'
                  size='md'
                  showSuccess={touchedFields.vistoType && !!watchedFields.vistoType}
                  options={[
                    { value: 'turismo', label: 'Turismo' },
                    { value: 'trabalho', label: 'Trabalho' },
                    { value: 'estudo', label: 'Estudo' },
                    { value: 'investidor', label: 'Investidor' }
                  ]}
                />
              </div>
            </div>

            {/* Status */}
            <div className='mb-6'>
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
                  { value: 'published', label: 'Publicado' }
                ]}
              />
            </div>

            {/* Video URL */}
            <div className='mb-6'>
              <Label htmlFor='videoUrl' className='mb-2 block'>
                URL do Vídeo (YouTube)
              </Label>
              <YVTextField
                id='videoUrl'
                type='url'
                placeholder='https://www.youtube.com/watch?v=...'
                {...register('videoUrl')}
                disabled={isSubmitting}
                error={errors.videoUrl?.message as string}
                showSuccess={
                  touchedFields.videoUrl &&
                  !errors.videoUrl &&
                  !!watchedFields.videoUrl
                }
                variant='modern'
                size='md'
              />
              <p className='text-xs text-dashboard-muted mt-1'>
                Cole aqui a URL completa do vídeo do YouTube
              </p>
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
                  isEditing ? 'Atualizar Visto' : 'Criar Visto'
                )}
              </button>

              {!isValid && Object.keys(touchedFields).length > 0 && (
                <p className='text-xs text-dashboard-muted text-center'>
                  Preencha todos os campos corretamente
                </p>
              )}

              <a
                href='/dashboard/vistos'
                className='w-full px-6 h-11 rounded-full text-sm font-medium text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover transition-colors flex items-center justify-center'
              >
                Cancelar
              </a>
            </div>
          </div>
        </div>

        {/* SEO Analysis Panel - Full Width */}
        <div className="mt-8 col-span-full">
          <SeoAnalysisPanel
            data={seoData}
            expanded={seoExpanded}
            onToggle={() => setSeoExpanded(!seoExpanded)}
            activeTab={seoActiveTab}
            onTabChange={setSeoActiveTab}
          >
            {seoActiveTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2">Meta Title</Label>
                  <YVTextField
                    type="text"
                    placeholder="Título para SEO..."
                    value={watchedFields.metaTitle || ''}
                    onChange={(e) => setValue('metaTitle', e.target.value)}
                    variant="modern"
                    size="md"
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2">Meta Description</Label>
                  <textarea
                    placeholder="Descrição para SEO..."
                    value={watchedFields.metaDescription || ''}
                    onChange={(e) => setValue('metaDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2">Meta Keywords</Label>
                  <YVTextField
                    type="text"
                    placeholder="palavra-chave1, palavra-chave2..."
                    value={watchedFields.metaKeywords || ''}
                    onChange={(e) => setValue('metaKeywords', e.target.value)}
                    variant="modern"
                    size="md"
                  />
                </div>
              </div>
            )}

            {seoActiveTab === 'social' && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2">OG Title</Label>
                  <YVTextField
                    type="text"
                    placeholder="Título para redes sociais..."
                    value={watchedFields.ogTitle || ''}
                    onChange={(e) => setValue('ogTitle', e.target.value)}
                    variant="modern"
                    size="md"
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2">OG Description</Label>
                  <textarea
                    placeholder="Descrição para redes sociais..."
                    value={watchedFields.ogDescription || ''}
                    onChange={(e) => setValue('ogDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2">OG Image</Label>
                  <YVTextField
                    type="text"
                    placeholder="URL da imagem para redes sociais..."
                    value={watchedFields.ogImage || ''}
                    onChange={(e) => setValue('ogImage', e.target.value)}
                    variant="modern"
                    size="md"
                  />
                </div>
              </div>
            )}
          </SeoAnalysisPanel>
        </div>
      </div>
    </div>
  );
}