import {
  YVButton,
  YVGallery,
  YVIcon,
  YVSection,
  YVText,
  YVTitle
} from '@/components/YV';

export default function SimplificamosSeuVisto() {
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
    <YVSection className='bg-white'>
      <div className='max-w-[1248px] px-4 sm:px-6 lg:px-8 xl:px-0 mx-auto'>
        <div className='flex flex-col lg:flex-row gap-6 items-start  justify-between'>
          <div className='space-y-8 flex-1'>
            <div className='max-w-[90%] pr-15'>
              <YVTitle
                title='Simplificamos seu visto imigratório de forma personalizada'
                className='mb-6'
              />
              <YVText className='p-2 mb-4'>
                Descrição Phasellus netus natoque ante eget at condimentum
                eget.Descrição
              </YVText>
              <YVButton variant='outline' href='/destinos'>
                <YVIcon name='arrow-right' />
                Conheça todos os destinos
              </YVButton>
            </div>
          </div>

          <div className='flex-[2]'>
            <div className='w-full flex justify-end'>
              <YVGallery
                items={galleryItems}
                showTitles={true}
                columns={2}
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
