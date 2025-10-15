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
      city4Image: defaultValues?.city4Image || ''
    }
  });

  const watchedFields = watch();

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
        city4Image: data.city4Image || ''
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
