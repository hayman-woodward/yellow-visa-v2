'use client';
import { YVBreadcrumbs, YVButton, YVText, YVTitle, YVCard, YVGrid, YVSection, YVIcon, YVCarousel } from '@/components/YV';

interface Requisito {
  icon?: string;
  title: string;
  description: string;
}

interface VistoRequisitosProps {
  requisitos: Requisito[];
  requisitosTitle?: string;
  requisitosDescription?: string;
  requisitosBreadcrumb?: string;
  requisitosButtonText?: string;
  requisitosButtonUrl?: string;
}

export default function VistoRequisitos({ 
  requisitos, 
  requisitosTitle = "A gente acredita em soluções que cabem na vida real",
  requisitosDescription,
  requisitosBreadcrumb = "ESPECIAIS",
  requisitosButtonText = "Conheça todos os requisitos especiais",
  requisitosButtonUrl = "/requisitos"
}: VistoRequisitosProps) {
  // Filtrar apenas os requisitos que têm título e descrição
  const requisitosValidos = requisitos.filter(r => r.title && r.description);

  // Normalizar URL do botão
  const normalizedButtonUrl = requisitosButtonUrl 
    ? requisitosButtonUrl.startsWith('http') || requisitosButtonUrl.startsWith('/')
      ? requisitosButtonUrl
      : `/${requisitosButtonUrl}`
    : '/requisitos';

  if (requisitosValidos.length === 0) {
    return null;
  }

  return (
    <YVSection className='bg-white'>
      <div className='max-w-[1248px] xl:px-0 mx-auto lg:py-[60px]'>
        <div className='flex flex-col lg:flex-row gap-6 md:gap-20 xl:gap-6 items-start justify-between'>
          <div className='space-y-8 flex-1'>
            <div className='max-w-[320px] xl:pr-7'>
              <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
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
              </div>
              <div data-aos="fade-right" data-aos-delay="400" data-aos-duration="800">
                <YVTitle className='mb-6'>
                  {requisitosTitle}
                </YVTitle>
              </div>
              {requisitosDescription && (
                <div data-aos="fade-right" data-aos-delay="600" data-aos-duration="800">
                  <YVText className='mb-4'>
                    {requisitosDescription}
                  </YVText>
                </div>
              )}
              <div data-aos="fade-right" data-aos-delay="800" data-aos-duration="800">
                <YVButton variant='outline' className='hidden md:flex' href={normalizedButtonUrl}>
                  <YVIcon name='arrow-right' />
                  {requisitosButtonText}
                </YVButton>
              </div>
            </div>
          </div>
          {/* col 02 - Desktop Grid */}
          <YVGrid cols={1} mdCols={1} xlCols={2} gap={4} className='hidden lg:grid flex-[2]' >
            {requisitosValidos.map((requisito, index) => {
              const delays = [600, 700, 800, 900];
              
              return (
                <YVCard
                  key={index}
                  variant='outline'
                  hover='orange'
                  className='lg:min-h-[296px] '
                  data-aos="fade-up"
                  data-aos-delay={delays[index]}
                  data-aos-duration="800"
                >
                  {requisito.icon && (
                    <div 
                      className='mb-2'
                      dangerouslySetInnerHTML={{ __html: requisito.icon }}
                    />
                  )}
                  <YVTitle variant='subtitle' title={requisito.title} />
                  <YVText className='pb-2'>{requisito.description}</YVText>
                </YVCard>
              );
            })}
          </YVGrid>

          {/* col 02 - Mobile/Tablet Carousel (YVCarousel padrão) */}
          <div className='lg:hidden w-full flex-[2]'>
            <YVCarousel
              items={requisitosValidos.map((r, index) => ({ id: index.toString(), src: '', alt: r.title }))}
              className='w-full'
              imageClassName=''
              renderItem={(item) => {
                const requisito = requisitosValidos[parseInt(item.id || '0')];
                if (!requisito) return null;
                return (
                  <YVCard 
                    variant='outline' 
                    hover='orange' 
                    className='h-[296px] p-5 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1'
                    data-aos="fade-up"
                    data-aos-delay="600"
                    data-aos-duration="800"
                  >
                    {requisito.icon && (
                      <div 
                        className='mb-2'
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
            <div className='mt-4'>
              <YVButton variant='outline' className='w-full' href={normalizedButtonUrl}>
                <YVIcon name='arrow-right' />
                {requisitosButtonText}
              </YVButton>
            </div>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
