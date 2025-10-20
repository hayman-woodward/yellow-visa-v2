import {
  YVBreadcrumbs,
  YVButton,
  YVCarousel,
  YVIcon,
  YVText,
  YVTitle
} from '@/components/YV';
import Image from 'next/image';

const galleryItems = [
  {
    id: '1',
    src: '/imgs/home/profissional.jpg',
    alt: 'Profissional',
    title: 'Profissional',
    description: ''
  },
  {
    id: '2',
    src: '/imgs/home/estudante.jpg',
    alt: 'Estudante',
    title: 'Estudante',
    description: ''
  },
  {
    id: '3',
    src: '/imgs/home/turista.jpg',
    alt: 'Turista',
    title: 'Turista',
    description: ''
  }
];

export default function Vistos() {
  return (
    <div className='bg-white'>
      <div className='pt-10 md:pt-20 pb-5 md:pb-10 relative'>
        <div className='absolute inset-0 top-20 z-0 rounded-3xl pointer-events-none md:hidden'>
          <Image
            src='/svgs/laco-vistos-vistos.svg'
            alt='Laço decorativo'
            width={1969}
            height={640}
            className='top-0 left-0'
            priority
          />
        </div>



        <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-0 xl:gap-15 items-start '>
          <div className='max-w-[624px] mx-auto px-4 sm:px-6 xl:px-0 md:pl-16 md:max-w-[90%] xl:max-w-[320px] xl:justify-end xl:mr-[280px]'>
            <YVBreadcrumbs
              className='pb-4 md:pb-5'
              items={[{ label: 'Vistos', href: '/vistos' }]}
            />
            <YVTitle
              variant='heading'
              title='A gente facilita a sua jornada sem fórmulas prontas'
              className='mb-6'
            />
            <YVText variant='body' className='mb-4 leading-relaxed lg:max-w-[560px]'>
              Descrição Phasellus netus natoque ante eget at condimentum eget
              Descrição
            </YVText>
          
          </div>

          {/* Carousel - Full width */}
          <div className='w-full pb-10 md:pb-0 relative z-10'>
            <YVCarousel
              items={galleryItems}
              showTitles
              darkMode
              imageClassName='object-cover w-[240px] h-[300px] sm:w-[300px] sm:h-[360px] md:w-[320px] md:h-[400px] xl:w-[400px] xl:h-[520px]'
            />
          </div>
        </div>
      </div>

    </div>
  );
}
