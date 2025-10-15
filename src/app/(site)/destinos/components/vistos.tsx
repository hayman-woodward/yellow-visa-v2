import {
  YVBreadcrumbs,
  YVButton,
  YVCarousel,
  YVGallery,
  YVIcon,
  YVSection,
  YVText,
  YVTitle
} from '@/components/YV';

export default function vistos() {
  const galleryItems = [
    {
      id: '1',
      src: '/imgs/destinos/galeria-01.jpg',
      alt: 'Estados Unidos',
      title: 'Estados Unidos'
    },
    {
      id: '2',
      src: '/imgs/destinos/galeria-02.jpg',
      alt: 'Portugal',
      title: 'Portugal'
    }
  ];
  return (
    <YVSection>
      <div className='max-w-[1248px] px-4 sm:px-6 lg:px-8 xl:px-0 mx-auto'>
        <div className='flex flex-col lg:flex-row gap-6 items-start  justify-between'>
          <div className='space-y-8 flex-1'>
            <div className='max-w-[90%] pr-15'>
              <YVBreadcrumbs
                className='pb-4'
                items={[{ label: 'Vistos', href: '/vistos' }]}
              />
              <YVTitle
                title='A gente facilita a sua jornada sem fórmulas prontas'
                className='mb-6'
              />
              <YVText className='p-2 mb-4'>
                Descrição Phasellus netus natoque ante eget at condimentum
                eget.Descrição
              </YVText>
              <YVButton variant='outline' href='/vistos'>
                <YVIcon name='arrow-right' />
                Conheça nossos vistos
              </YVButton>
            </div>
          </div>

          <div className='flex-[2]'>
            <div className='w-full flex justify-end invisible md:visible'>
              <YVGallery
                items={galleryItems}
                showTitles={true}
                columns={2}
                imageClassName='aspect-[400/520] object-cover'
                showDescriptions={false}
              />
            </div>
            <div className='w-full flex justify-end visible md:invisible'>
              <YVCarousel
                items={galleryItems}
                showTitles={true}
                imageClassName='aspect-[400/520] object-cover'
                showDescriptions={false}
              />
            </div>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
