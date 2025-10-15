import { YVBreadcrumbs, YVGallery, YVSection, YVTitle, YVButton, YVText, YVIcon } from "@/components/YV";

interface PrincipaisCidadesProps {
  cityTitle?: string;
  cityDescription?: string;
  cities: Array<{
    id: string;
    src: string;
    alt: string;
    title: string;
    description: string;
  }>;
}

export default function PrincipaisCidades({
  cityTitle,
  cityDescription,
  cities
}: PrincipaisCidadesProps) {
  // Se não há dados das cidades, não renderiza nada
  if (!cities || cities.length === 0) {
    return null;
  }

  return (
    <YVSection className='bg-white'>
      <div className='max-w-[1248px] mx-auto md:px-0 xl:px-0'>
        <div className='flex flex-col lg:flex-row md:gap-8 xl:gap-10'>
          <div className='md:w-[320px] md:pr-7 xl:pr-20 xl:w-[400px] lg:flex-shrink-0'>
            <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
              <YVTitle className='mb-4 md:mb-6'>
                {cityTitle || 'Principais cidades de destino'}
              </YVTitle>
            </div>
            <div data-aos="fade-right" data-aos-delay="400" data-aos-duration="800">
              <YVText className='mb-2 md:mb-4'>
                {cityDescription || 'Descrição das principais cidades de destino para este visto.'}
              </YVText>
            </div>
            <div data-aos="fade-right" data-aos-delay="600" data-aos-duration="800">
              <YVButton variant='outline' className='hidden md:flex' href='/destinos'>
                <YVIcon name='arrow-right' />
                Conheça todos os destinos
              </YVButton>
            </div>
          </div>

          <div className='flex-1' data-aos="fade-left" data-aos-delay="500" data-aos-duration="800">
            <YVGallery
              items={cities}
              variant='masonry'
              columns={1}
              gap='24px'
              showTitles={true}
              showDescriptions={true}
              aspectRatio='auto'
              imageClassName='lw-[391px] h-[200px] object-cover rounded-lg '
              className='w-full xl:columns-2 '
            />
          </div>
        </div>
      </div>
    </YVSection>
  );
}
