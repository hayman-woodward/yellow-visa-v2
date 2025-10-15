'use client';
import {
  YVButton,
  YVSection,
  YVText,
  YVTitle
} from '@/components/YV';
import Image from 'next/image';
import Link from 'next/link';

// Apenas as imagens para rotação
const bannerImages = [
  {
    src: '/imgs/cta/desktop/banner-img-01.jpg',
    srcMobile: '/imgs/cta/mobile/cta-vistos-mobile.jpg',
    alt: 'Descubra o melhor caminho para viver fora'
  },
  {
    src: '/imgs/cta/desktop/cta-banner-04.jpg',
    srcMobile: '/imgs/cta-banner-04.jpg',
    alt: 'Descubra o melhor caminho para viver fora'
  },
  {
    src: '/imgs/cta/desktop/cta-destinos-banner.jpg',
    srcMobile: '/imgs/cta/mobile/cta-visto-mobile.jpg',
    alt: 'Descubra o melhor caminho para viver fora'
  },
  {
    src: '/imgs/cta/desktop/cta-home.jpg',
    srcMobile: '/imgs/cta/mobile/cta-home-mobile.jpg',
    alt: 'Descubra o melhor caminho para viver fora'
  }
];

interface CTABannerProps {
  titulo?: string;
  texto?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CTABanner({
  titulo = 'Descubra o melhor caminho para viver fora',
  texto = 'Leva menos de 2 minutos. Sem compromisso. Totalmente gratuito e personalizado para você.',
  buttonText = 'Comece agora',
  buttonLink = '/comecar'
}: CTABannerProps) {
  // Seleção aleatória de imagem a cada render (F5)
  const randomImage =
    bannerImages[Math.floor(Math.random() * bannerImages.length)];
  return (
    <YVSection className='bg-white pt-10 pb-0 md:pb-10 px-0 md:py-[40px] md:px-20 xl:px-0'>
      <div className='max-w-[1248px] px-4 md:px-0 w-full mx-auto'>
        <div 
          className='relative w-full h-[400px] md:h-[520px] rounded-[20px] md:rounded-[40px] overflow-hidden'
          data-aos="fade-in"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          {/* Imagem de fundo - Desktop */}
          <Image
            src={randomImage.src}
            alt={randomImage.alt}
            fill
            className='object-cover hidden md:block'
            priority
          />

          {/* Imagem de fundo - Mobile */}
          <Image
            src={randomImage.srcMobile}
            alt={randomImage.alt}
            fill
            className='object-cover block md:hidden'
            priority
          />

          {/* Overlay escuro - exatamente como no Figma */}
          <div
            className='absolute inset-0 w-1/2'
            style={{
              background:
                'linear-gradient(90deg, rgba(15, 0, 5, 0.70) 46.75%, rgba(15, 0, 5, 0.00) 100%)'
            }}
          />

          {/* Conteúdo */}
          <div className='relative z-10 h-full flex pb-4 md:pb-0 items-end md:items-center'>
            <div className='max-w-[275px] md:max-w-[580px] px-4 lg:px-24 md:px-12'>
              <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
                <YVTitle variant='heading' className='text-white leading-tight'>
                  {titulo}
                </YVTitle>
              </div>

              <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="800">
                <YVText className='text-[#F7F5F6] pb-2 md:pb-7 !text-[16px] md:text-xl'>
                  {texto}
                </YVText>
              </div>

              <div data-aos="fade-up" data-aos-delay="800" data-aos-duration="800">
                <Link href={buttonLink}>
                  <YVButton
                    variant='secondary'
                    className='w-fit'
                  >
                    {buttonText}
                  </YVButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
