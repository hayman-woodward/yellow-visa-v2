'use client';
import {
  YVBreadcrumbs,
  YVButton,
  YVCard,
  YVGrid,
  YVIcon,
  YVSection,
  YVText,
  YVTitle,
  YVCarousel
} from '@/components/YV';

interface RequisitosEspeciaisProps {
  requisitosTitle?: string;
  requisitosDescription?: string;
  requisitosBreadcrumb?: string;
  requisitosButtonText?: string;
  requisitosButtonUrl?: string;
  requisitos: Array<{
    id: string;
    icon?: string;
    title: string;
    description: string;
  }>;
  showButton?: boolean;
}

export default function RequisitosEspeciais({ 
  requisitosTitle = "A gente acredita em soluções que cabem na vida real",
  requisitosDescription,
  requisitosBreadcrumb = "ESPECIAIS",
  requisitosButtonText = "Conheça todos os requisitos especiais",
  requisitosButtonUrl = "",
  requisitos = [],
  showButton = true
}: RequisitosEspeciaisProps) {
  // Se não há dados dos requisitos, não renderiza nada
  if (!requisitos || requisitos.length === 0) {
    return null;
  }

  // Se não há URL do botão, não mostra o botão
  const shouldShowButton = showButton && requisitosButtonUrl && requisitosButtonUrl.trim() !== '';

  return (
    <YVSection className='bg-white'>
      <div className='max-w-[1248px] xl:px-0 mx-auto lg:py-[60px]'>
        <div className='flex flex-col lg:flex-row gap-6 md:gap-20 xl:gap-6 items-start justify-between'>
          <div className='space-y-8 flex-1'>
            <div className='max-w-[320px] xl:pr-7'>
              <YVBreadcrumbs
                disabled
                className='pb-4'
                items={[
                  {
                    label: requisitosBreadcrumb,
                    href: requisitosButtonUrl
                  }
                ]}
              />
              <YVTitle
                className='mb-6'
              >
                {requisitosTitle}
              </YVTitle>
              {requisitosDescription && (
                <YVText className='mb-4'>
                  {requisitosDescription}
                </YVText>
              )}
              {shouldShowButton && (
                <YVButton variant='outline' className='hidden md:flex' href={requisitosButtonUrl}>
                  <YVIcon name='arrow-right' />
                  {requisitosButtonText}
                </YVButton>
              )}
            </div>
          </div>
          {/* col 02 - Desktop Grid */}
          <YVGrid cols={1} mdCols={1} xlCols={2} gap={4} className='hidden lg:grid flex-[2]'>
            {requisitos.map((requisito) => (
              <YVCard
                key={requisito.id}
                variant='outline'
                hover='orange'
                className='lg:min-h-[296px] transition-all duration-300 hover:shadow-lg'
              >
                {requisito.icon && (
                  <div 
                    className='mb-2 w-[33px] h-[33px]'
                    dangerouslySetInnerHTML={{ __html: requisito.icon }}
                  />
                )}
                <YVTitle variant='subtitle' title={requisito.title} />
                <YVText className='pb-2'>{requisito.description}</YVText>
              </YVCard>
            ))}
          </YVGrid>

          {/* col 02 - Mobile/Tablet Carousel (YVCarousel padrão) */}
          <div className='lg:hidden w-full flex-[2]'>
            <YVCarousel
              items={requisitos.map((r) => ({ id: r.id, src: '', alt: r.title }))}
              className='w-full'
              imageClassName=''
              renderItem={(item) => {
                const requisito = requisitos.find((r) => r.id === item.id);
                if (!requisito) return null;
                return (
                  <YVCard variant='outline' hover='orange' className='h-[296px] p-5 transition-all duration-300 hover:shadow-lg hover:scale-105'>
                    {requisito.icon && (
                      <div 
                        className='mb-2 w-[33px] h-[33px]'
                        dangerouslySetInnerHTML={{ __html: requisito.icon }}
                      />
                    )}
                    <YVTitle variant='subtitle' title={requisito.title} />
                    <YVText className='pb-2 text-[15px]'>{requisito.description}</YVText>
                  </YVCard>
                );
              }}
            />

            {/* CTA abaixo dos bullets (mobile only) */}
            {shouldShowButton && (
              <div className='mt-4'>
                <YVButton variant='outline' className='w-full' href={requisitosButtonUrl}>
                  <YVIcon name='arrow-right' />
                  {requisitosButtonText}
                </YVButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </YVSection>
  );
}
