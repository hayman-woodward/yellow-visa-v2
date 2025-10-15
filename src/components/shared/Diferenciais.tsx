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
  diferenciais = []
}: DiferenciaisProps) {
  // Se não há dados dos diferenciais, não renderiza nada
  if (!diferenciais || diferenciais.length === 0) {
    return null;
  }

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
          <div className='md:w-[320px] md:pr-7 xl:pr-0 xl:w-[400px] lg:flex-shrink-0'>
            <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
              <YVBreadcrumbs disabled items={[{ label: 'Diferenciais', href: '/vistos' }]} className='pb-4' />
            </div>
            <div data-aos="fade-right" data-aos-delay="400" data-aos-duration="800">
              <YVTitle className='mb-4 md:mb-6'>
                {diferenciaisTitle}
              </YVTitle>
            </div>
            {diferenciaisDescription && (
              <div data-aos="fade-right" data-aos-delay="600" data-aos-duration="800">
                <p className='text-gray-600 mb-6'>{diferenciaisDescription}</p>
              </div>
            )}
          </div>

          <div className='flex-1' data-aos="fade-left" data-aos-delay="500" data-aos-duration="800">
            <YVGallery
              items={diferenciais}
              variant='masonry'
              columns={1}
              gap='24px'
              showTitles={true}
              showDescriptions={true}
              aspectRatio='auto'
              imageClassName='w-full h-[200px] object-cover rounded-lg'
              className='w-full xl:columns-2'
            />
          </div>
        </div>
      </div>
    </YVSection>
  );
}
