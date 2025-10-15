import { YVBreadcrumbs, YVGallery, YVSection, YVTitle } from "@/components/YV";

interface DiferenciaisProps {
  diferenciaisTitle?: string;
  diferenciaisDescription?: string;
  diferenciais: Array<{
    id: string;
    src: string;
    alt: string;
    title: string;
    description: string;
  }>;
}

export default function Diferenciais({ 
  diferenciaisTitle = "Todo mundo promete o mesmo. A gente entrega diferente",
  diferenciaisDescription,
  diferenciais = [
    {
      id: '01',
      src: '/imgs/vistos/visto/visto-01.jpg',
      alt: 'Nunca sinta perdido no processo',
      title: 'Nunca sinta perdido no processo',
      description: 'Obtenha informações claras, sem jargões jurídicos e a tranquilidade de ter profissionais cuidando do seu caso.',
    },
    {
      id: '02',
      src: '/imgs/vistos/visto/visto-02.jpg',
      alt: 'Prontos para prosperar',
      title: 'Prontos para prosperar',
      description: 'Suporte 100% digital, com planejamento rápido e objetivo',
    },
  ]
}: DiferenciaisProps) {
  return (
    <YVSection className='bg-white'>
      <div className='max-w-[1248px] mx-auto px-4 md:px-8 xl:px-0'>

        {/* Mobile Layout - Carousel */}
        <div className='block lg:hidden'>
          <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
            <YVBreadcrumbs disabled items={[{ label: 'Diferenciais', href: '/vistos' }]} className='pb-4' />
          </div>
          <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
            <YVTitle className='text-2xl mb-6'>
              {diferenciaisTitle}
            </YVTitle>
          </div>
          {diferenciaisDescription && (
            <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="800">
              <p className='text-gray-600 mb-6'>{diferenciaisDescription}</p>
            </div>
          )}
          
          <div data-aos="fade-up" data-aos-delay="800" data-aos-duration="800">
            <YVGallery
              items={diferenciais}
              showTitles={true}
              showDescriptions={true}
              isMobileCarousel={true}
              imageClassName='aspect-[4/3] h-[200px]'
              enableAnimations={true}
            />
          </div>
        </div>

        {/* Desktop Layout - Original Grid */}
        <div className='hidden lg:flex flex-col lg:flex-row md:gap-10 xl:gap-15'>
          <div className='md:w-[320px] md:pr-7 xl:pr-0 xl:w-[400px] lg:flex-shrink-0' data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
            <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
              <YVBreadcrumbs disabled items={[{ label: 'Diferenciais', href: '/vistos' }]} className='pb-4 md:pb-5' />
            </div>
            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
              <YVTitle>
                {diferenciaisTitle}
              </YVTitle>
            </div>
            {diferenciaisDescription && (
              <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="800">
                <p className='text-gray-600 mt-2'>{diferenciaisDescription}</p>
              </div>
            )}
          </div>

          <div className='flex-1' data-aos="fade-left" data-aos-delay="600" data-aos-duration="800">
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
              {diferenciais.map((diferencial, index) => (
                <div 
                  key={diferencial.id} 
                  className='flex flex-col'
                  data-aos="fade-up"
                  data-aos-delay={700 + (index * 100)}
                  data-aos-duration="600"
                >
                  <div className='relative mb-4'>
                    <img
                      src={diferencial.src}
                      alt={diferencial.alt}
                      className='w-full h-[200px] object-cover rounded-lg'
                    />
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    {diferencial.title}
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {diferencial.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </YVSection>
  );
}