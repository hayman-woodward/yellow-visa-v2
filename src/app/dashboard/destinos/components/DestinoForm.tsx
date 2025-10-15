'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YVTextField, YVSelect, YVUploadImg, YVSwitch } from '@/components/YV';
import YVTinyMCEEditor from '@/components/editor/YVTinyMCEEditor';
import { Label } from '@/components/ui/label';
import { MapPin, Globe, Tag, Image as ImageIcon, Star, Building2 } from 'lucide-react';
import { destinoSchema } from '@/schemas/dashboard/destino';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>;

type DestinoFormProps = {
  defaultValues?: {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    content?: string;
    bannerTitle?: string;
    imageUrl?: string;
    country?: string;
    continent?: string;
    highlights?: string;
    status?: string;
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
    // Campos do CTA
    ctaEnabled?: boolean;
    ctaTitle?: string;
    ctaDescription?: string;
    ctaButtonText?: string;
    ctaButtonUrl?: string;
  };
  isEditing?: boolean;
};

export default function DestinoForm({
  defaultValues,
  isEditing = false
}: DestinoFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cidadesExpanded, setCidadesExpanded] = useState(false);
  const [diferenciaisExpanded, setDiferenciaisExpanded] = useState(false);
  const [beneficiosExpanded, setBeneficiosExpanded] = useState(false);
  const [requisitosExpanded, setRequisitosExpanded] = useState(false);
  const [requisitosCount, setRequisitosCount] = useState(1);
  const [ctaExpanded, setCtaExpanded] = useState(false);
  const router = useRouter();

  // Helper function to get city field name with proper typing
  const getCityFieldName = (cityNum: number, field: 'Title' | 'Description' | 'Image'): 
    'city1Title' | 'city1Description' | 'city1Image' | 
    'city2Title' | 'city2Description' | 'city2Image' | 
    'city3Title' | 'city3Description' | 'city3Image' | 
    'city4Title' | 'city4Description' | 'city4Image' => {
    return `city${cityNum}${field}` as 'city1Title' | 'city1Description' | 'city1Image' | 
    'city2Title' | 'city2Description' | 'city2Image' | 
    'city3Title' | 'city3Description' | 'city3Image' | 
    'city4Title' | 'city4Description' | 'city4Image';
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(destinoSchema),
    mode: 'onChange' as const,
    defaultValues: {
      name: defaultValues?.name || '',
      slug: defaultValues?.slug || '',
      description: defaultValues?.description || '',
      content: defaultValues?.content || '',
      bannerTitle: defaultValues?.bannerTitle || '',
      imageUrl: defaultValues?.imageUrl || '',
      country: defaultValues?.country || '',
      continent: (defaultValues?.continent as 'América do Norte' | 'América do Sul' | 'Europa' | 'Ásia' | 'África' | 'Oceania') || 'Europa',
      highlights: defaultValues?.highlights || '',
      status: (defaultValues?.status as 'draft' | 'published') || 'draft',
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
      requisitosTitle: defaultValues?.requisitosTitle || '',
      requisitosDescription: defaultValues?.requisitosDescription || '',
      requisitosBreadcrumb: defaultValues?.requisitosBreadcrumb || '',
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
      // Campos do CTA
      ctaEnabled: defaultValues?.ctaEnabled || false,
      ctaTitle: defaultValues?.ctaTitle || '',
      ctaDescription: defaultValues?.ctaDescription || '',
      ctaButtonText: defaultValues?.ctaButtonText || '',
      ctaButtonUrl: defaultValues?.ctaButtonUrl || ''
    }
  });

  const watchedFields = watch();
  
  // Debug: Verificar se os campos de benefícios estão sendo observados
  console.log('Campos observados - Benefícios:', {
    beneficiosEnabled: watchedFields.beneficiosEnabled,
    beneficio1Title: watchedFields.beneficio1Title,
    beneficio1Description: watchedFields.beneficio1Description,
    beneficio1Icon: watchedFields.beneficio1Icon,
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    setServerSuccess(null);


    try {

      const payload = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        content: data.content || '',
        bannerTitle: data.bannerTitle || '',
        imageUrl: data.imageUrl || '',
        country: data.country,
        continent: data.continent,
        highlights: data.highlights || '',
        status: data.status,
        // Campos das principais cidades
        cityEnabled: data.cityEnabled || false,
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
        diferenciaisEnabled: data.diferenciaisEnabled || false,
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
        // Campos dos benefícios
        beneficiosEnabled: data.beneficiosEnabled || false,
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
        // Campos do CTA
        ctaEnabled: data.ctaEnabled || false,
        ctaTitle: data.ctaTitle || '',
        ctaDescription: data.ctaDescription || '',
        ctaButtonText: data.ctaButtonText || '',
        ctaButtonUrl: data.ctaButtonUrl || ''
      };

      const url = isEditing && defaultValues?.slug 
        ? `/api/dashboard/destinos/${defaultValues.slug}`
        : '/api/dashboard/destinos';
      
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
        setServerSuccess(result.message || 'Destino salvo com sucesso!');
        setTimeout(() => {
          router.push('/dashboard/destinos');
        }, 500);
      } else {
        setServerError(result.message || 'Erro ao salvar destino');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error saving destino:', error);
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

            {/* Name */}
            <div>
              <Label htmlFor='name' className='mb-2 block'>
                Nome do Destino
              </Label>
              <YVTextField
                id='name'
                type='text'
                placeholder='Ex: Lisboa'
                {...register('name')}
                disabled={isSubmitting}
                error={errors.name?.message as string}
                showSuccess={
                  touchedFields.name && !errors.name && !!watchedFields.name
                }
                variant='modern'
                size='md'
              />
            </div>

            {/* Banner Title */}
            <div>
              <Label htmlFor='bannerTitle' className='mb-2 block'>
                Título do Banner (opcional)
              </Label>
              <YVTextField
                id='bannerTitle'
                type='text'
                placeholder='Ex: Descubra a magia de Lisboa'
                {...register('bannerTitle')}
                disabled={isSubmitting}
                error={errors.bannerTitle?.message as string}
                showSuccess={
                  touchedFields.bannerTitle && !errors.bannerTitle && !!watchedFields.bannerTitle
                }
                variant='modern'
                size='md'
              />
              <p className='text-xs text-gray-500 mt-1'>
                💡 Se não preenchido, será usado o nome do destino
              </p>
            </div>

            {/* Slug */}
            <div>
              <Label htmlFor='slug' className='mb-2 block'>
                Slug (URL amigável)
              </Label>
              <YVTextField
                id='slug'
                type='text'
                placeholder='lisboa'
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

            {/* Description */}
            <div>
              <Label htmlFor='description' className='mb-2 block'>
                Descrição
              </Label>
              <textarea
                id='description'
                placeholder='Descreva o destino...'
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

            {/* Content */}
            <div>
              <Label htmlFor='content' className='mb-2 block'>
                Conteúdo Detalhado
              </Label>
              <YVTinyMCEEditor
                content={watchedFields.content || ''}
                onChange={(content) => setValue('content', content)}
                placeholder='Conteúdo detalhado do destino...'
                disabled={isSubmitting}
                className='min-h-[200px]'
              />
              {errors.content && (
                <p className='text-sm text-red-600 mt-1.5'>
                  {errors.content.message as string}
                </p>
              )}
            </div>

            {/* Highlights */}
            <div>
              <Label htmlFor='highlights' className='mb-2 block'>
                Principais Atrativos (opcional)
              </Label>
              <YVTextField
                id='highlights'
                type='text'
                placeholder='Ex: Torre de Belém, Cristo Rei, Castelo de São Jorge'
                {...register('highlights')}
                disabled={isSubmitting}
                error={errors.highlights?.message as string}
                variant='modern'
                size='md'
              />
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
                    <p className='text-sm text-gray-500'>Configure os diferenciais do destino</p>
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
                        placeholder='Ex: Por que escolher este destino?'
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
                              {...register(`diferencial${diferencialNum}Title` as any)}
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
                              {...register(`diferencial${diferencialNum}Description` as any)}
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
                              onChange={(url: string) => setValue(`diferencial${diferencialNum}Image` as any, url)}
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
                    <p className='text-sm text-gray-500'>Configure as cidades de destino</p>
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
                        placeholder='Ex: Principais cidades de destino'
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
                              {...register(getCityFieldName(cityNum, 'Title'))}
                              disabled={isSubmitting}
                              error={errors[getCityFieldName(cityNum, 'Title')]?.message as string}
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
                              {...register(getCityFieldName(cityNum, 'Description'))}
                              disabled={isSubmitting}
                              rows={2}
                              className='w-full px-2 py-1 text-xs rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-1 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                            />
                            {errors[getCityFieldName(cityNum, 'Description')] && (
                              <p className='text-xs text-red-600 mt-1'>
                                {errors[getCityFieldName(cityNum, 'Description')]?.message as string}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor={`city${cityNum}Image`} className='mb-1 block text-xs font-medium'>
                              Imagem
                            </Label>
                            <YVUploadImg
                              value={watchedFields[getCityFieldName(cityNum, 'Image')] as string || ''}
                              onChange={(url: string) => setValue(getCityFieldName(cityNum, 'Image'), url)}
                              disabled={isSubmitting}
                              error={errors[getCityFieldName(cityNum, 'Image')]?.message as string}
                              placeholder={`https://exemplo.com/cidade${cityNum}.jpg`}
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
                    <p className='text-sm text-gray-500'>Configure os requisitos especiais do destino</p>
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
                              {...register(`requisito${requisitoNum}Icon` as any)}
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
                              {...register(`requisito${requisitoNum}Title` as any)}
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
                              {...register(`requisito${requisitoNum}Description` as any)}
                              disabled={isSubmitting}
                              rows={2}
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
                    )})}
                  </div>
                </div>
              )}
            </div>
   {/* Seção CTA */}
   <div className='border-t pt-6'>
              <button
                type='button'
                onClick={() => setCtaExpanded(!ctaExpanded)}
                className='flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
              >
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
                    checked={watchedFields.ctaEnabled || false}
                    onCheckedChange={(checked) => setValue('ctaEnabled', checked)}
                    label="Exibir na página"
                    size="sm"
                    variant="primary"
                  />
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      ctaExpanded ? 'rotate-180' : ''
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </div>
              </button>

              {ctaExpanded && (
                <div className='mt-4 space-y-6 p-4 bg-white border border-gray-200 rounded-lg'>
                  {/* Título e Descrição */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='ctaTitle' className='mb-2 block'>
                        Título do CTA
                      </Label>
                      <YVTextField
                        id='ctaTitle'
                        type='text'
                        placeholder='Ex: Pronto para começar sua jornada?'
                        {...register('ctaTitle')}
                        disabled={isSubmitting}
                        error={errors.ctaTitle?.message as string}
                        variant='modern'
                        size='md'
                      />
                    </div>

                    <div>
                      <Label htmlFor='ctaDescription' className='mb-2 block'>
                        Descrição do CTA
                      </Label>
                      <textarea
                        id='ctaDescription'
                        placeholder='Ex: Descrição do CTA...'
                        {...register('ctaDescription')}
                        disabled={isSubmitting}
                        rows={3}
                        className='w-full px-3 py-2 text-sm rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-2 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                      />
                      {errors.ctaDescription && (
                        <p className='text-sm text-red-600 mt-1.5'>
                          {errors.ctaDescription.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Botão */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='ctaButtonText' className='mb-2 block'>
                        Texto do Botão
                      </Label>
                      <YVTextField
                        id='ctaButtonText'
                        type='text'
                        placeholder='Ex: Começar agora'
                        {...register('ctaButtonText')}
                        disabled={isSubmitting}
                        error={errors.ctaButtonText?.message as string}
                        variant='modern'
                        size='md'
                      />
                    </div>

                    <div>
                      <Label htmlFor='ctaButtonUrl' className='mb-2 block'>
                        URL do Botão
                      </Label>
                      <YVTextField
                        id='ctaButtonUrl'
                        type='text'
                        placeholder='Ex: /comecar'
                        {...register('ctaButtonUrl')}
                        disabled={isSubmitting}
                        error={errors.ctaButtonUrl?.message as string}
                        variant='modern'
                        size='md'
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Seção Benefícios - ÚLTIMA SEÇÃO */}
            <div className='mb-6 mt-4'>
              <div className='flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg'>
                <div className='flex items-center space-x-3'>
                  <svg className='w-6 h-6 text-[#FFBD1A]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  <div className='text-left'>
                    <h3 className='text-lg font-semibold text-dashboard'>Benefícios</h3>
                    <p className='text-sm text-gray-500'>Configure os benefícios deste destino</p>
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
                  {/* Benefícios - Layout 2 colunas */}
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {[1, 2, 3].map((beneficioNum) => (
                      <div key={beneficioNum} className='border border-gray-200 rounded-lg p-3 bg-gray-50'>
                        <h4 className='text-sm font-medium text-gray-900 mb-3 flex items-center'>
                          <span className='w-6 h-6 bg-[#FFBD1A] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2'>
                            {beneficioNum}
                          </span>
                          Benefício {beneficioNum}
                        </h4>

                        <div className='space-y-3'>
                          <div>
                            <Label htmlFor={`beneficio${beneficioNum}Icon`} className='mb-1 block text-xs font-medium'>
                              Ícone SVG (opcional)
                            </Label>
                            <textarea
                              id={`beneficio${beneficioNum}Icon`}
                              placeholder={`Cole o código SVG do ícone...`}
                              {...register(`beneficio${beneficioNum}Icon` as any)}
                              disabled={isSubmitting}
                              rows={4}
                              className='w-full px-2 py-1 text-xs rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-1 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors font-mono'
                            />
                            {errors[`beneficio${beneficioNum}Icon` as keyof typeof errors] && (
                              <p className='text-xs text-red-600 mt-1'>
                                {errors[`beneficio${beneficioNum}Icon` as keyof typeof errors]?.message as string}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor={`beneficio${beneficioNum}Title`} className='mb-1 block text-xs font-medium'>
                              Título
                            </Label>
                            <YVTextField
                              id={`beneficio${beneficioNum}Title`}
                              type='text'
                              placeholder={`Ex: Título do benefício ${beneficioNum}...`}
                              {...register(`beneficio${beneficioNum}Title` as any)}
                              disabled={isSubmitting}
                              error={errors[`beneficio${beneficioNum}Title` as keyof typeof errors]?.message as string}
                              variant='modern'
                              size='sm'
                            />
                          </div>

                          <div>
                            <Label htmlFor={`beneficio${beneficioNum}Description`} className='mb-1 block text-xs font-medium'>
                              Descrição
                            </Label>
                            <textarea
                              id={`beneficio${beneficioNum}Description`}
                              placeholder={`Ex: Descrição do benefício ${beneficioNum}...`}
                              {...register(`beneficio${beneficioNum}Description` as any)}
                              disabled={isSubmitting}
                              rows={2}
                              className='w-full px-2 py-1 text-xs rounded-md border border-input bg-background hover:border-dashboard focus:border-[#FFBD1A] focus:ring-1 focus:ring-[#FFBD1A]/20 focus:outline-none transition-colors'
                            />
                            {errors[`beneficio${beneficioNum}Description` as keyof typeof errors] && (
                              <p className='text-xs text-red-600 mt-1'>
                                {errors[`beneficio${beneficioNum}Description` as keyof typeof errors]?.message as string}
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
                Imagem do Destino
              </Label>
              <YVUploadImg
                value={watchedFields.imageUrl || ''}
                onChange={(url) => setValue('imageUrl', url)}
                disabled={isSubmitting}
                error={errors.imageUrl?.message as string}
                placeholder='https://exemplo.com/imagem-destino.jpg'
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

              {/* Continent */}
              <div>
                <Label htmlFor='continent' className='mb-2 block'>
                  Continente
                </Label>
                <YVSelect
                  id='continent'
                  {...register('continent')}
                  disabled={isSubmitting}
                  variant='modern'
                  size='md'
                  showSuccess={touchedFields.continent && !!watchedFields.continent}
                  options={[
                    { value: 'América do Norte', label: '🌎 América do Norte' },
                    { value: 'América do Sul', label: '🌎 América do Sul' },
                    { value: 'Europa', label: '🇪🇺 Europa' },
                    { value: 'Ásia', label: '🌏 Ásia' },
                    { value: 'África', label: '🌍 África' },
                    { value: 'Oceania', label: '🌏 Oceania' }
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
                  isEditing ? 'Atualizar Destino' : 'Criar Destino'
                )}
              </button>

              {!isValid && Object.keys(touchedFields).length > 0 && (
                <p className='text-xs text-dashboard-muted text-center'>
                  Preencha todos os campos corretamente
                </p>
              )}

              <a
                href='/dashboard/destinos'
                className='w-full px-6 h-11 rounded-full text-sm font-medium text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover transition-colors flex items-center justify-center'
              >
                Cancelar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
