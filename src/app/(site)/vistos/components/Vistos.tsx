import {
  YVBreadcrumbs,
  YVButton,
  YVCarousel,
  YVContainer,
  YVIcon,
  YVText,
  YVTitle
} from '@/components/YV';
import Image from 'next/image';

interface Visto {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
}

interface VistosProps {
  vistos: Visto[];
}

export default function Vistos({ vistos }: VistosProps) {
  const galleryItems = vistos.map((visto: Visto) => ({
    id: visto.id,
    src: visto.imageUrl || '/imgs/home/profissional.jpg', // Fallback image
    alt: visto.title,
    title: visto.title,
    description: visto.description,
    href: `/vistos/${visto.slug}`
  }));

  return (
    <div className='bg-white overflow-hidden'>
      <div className='pt-10 md:pt-20 pb-10 md:pb-20 relative'>
        {/* Decorative background for mobile */}
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

        {/* Main Content Container using project standard 1248px */}
        <YVContainer>
          <div className='relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center'>
            
            {/* Text Content Column - Occupies 4 columns (smaller as requested) */}
            <div className='lg:col-span-4 md:max-w-[96%] xl:max-w-[92%] pr-12'>
              <YVBreadcrumbs
                className='pb-4 md:pb-6'
                items={[{ label: 'Vistos', href: '/vistos' }]}
              />
              <YVTitle
                variant='heading'
                title='A gente facilita a sua jornada sem fórmulas prontas'
                className='mb-6'
              />
              <YVText variant='body' className='mb-8 leading-relaxed text-gray-600'>
                Explore as diversas opções de vistos para os Estados Unidos e Portugal. 
                Cada caminho é único, e estamos aqui para orientar você em cada etapa 
                da sua jornada de imigração.
              </YVText>
            </div>

            {/* Carousel Column - Occupies 8 columns */}
            <div className='lg:col-span-8 w-full relative z-10'>
              <YVCarousel
                items={galleryItems}
                showTitles
                imageClassName='object-cover w-[240px] h-[300px] sm:w-[300px] sm:h-[360px] md:w-[320px] md:h-[400px] xl:w-[400px] xl:h-[520px]'
              />
            </div>

          </div>
        </YVContainer>
      </div>
    </div>
  );
}
