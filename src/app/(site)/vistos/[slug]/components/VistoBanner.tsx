'use client';

import Image from 'next/image';
import { YVBreadcrumbs, YVText, YVTitle, YVButton } from "@/components/YV";
import ScrollButton from "../../../(home)/components/ScrollButton";

interface VistoBannerProps {
  title: string;
  slug: string;
  bannerTitle?: string;
  bannerDescription?: string;
  bannerButtonText?: string;
  bannerButtonUrl?: string;
  imageUrl?: string;
}

export default function VistoBanner({
  title,
  slug,
  bannerTitle,
  bannerDescription,
  bannerButtonText,
  bannerButtonUrl,
  imageUrl
}: VistoBannerProps) {
  // Fallback para imagem padrão se não houver imageUrl
  const heroImage = imageUrl || '/imgs/vistos/visto/vistos-slug.jpg';
  const heroImage2x = imageUrl || '/imgs/vistos/hero-vistos-2x.jpg';
  const heroImageMobile = imageUrl || '/imgs/vistos/hero-vistos-mobile.jpg';

  return (
    <div className='lg:max-h-none h-[calc(100vh+10px)] lg:h-screen max-h-[calc(100vh+10px)] hero-max-height -mt-[88px] relative w-full overflow-hidden'>
      {/* Imagem Desktop */}
      <div className='absolute inset-0 pointer-events-none hidden lg:block' data-aos="fade-in" data-aos-duration="2000">
        <Image
          src={heroImage2x || heroImage}
          alt={`${title} - ${slug}`}
          fill
          className='w-full h-full object-cover'
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
        />
        {/* Overlay escuro para melhorar legibilidade do texto - Pixel Perfect Figma */}
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(15, 0, 5, 0.1) 40%, rgba(15, 0, 5, 0.5) 100%), linear-gradient(90deg, rgba(15, 0, 5, 0.1) 0%, rgba(15, 0, 5, 0.1) 100%)'
          }}
        />
        {/* Overlay amarelo com mix-blend-soft-light - Pixel Perfect Figma */}
        <div className='absolute inset-0 bg-[#FFBD1A] mix-blend-soft-light opacity-20' />
      </div>

      {/* Imagem Mobile/iPad */}
      <div className='absolute inset-0 pointer-events-none lg:hidden' data-aos="fade-in" data-aos-duration="2000">
        <Image
          src={heroImageMobile || heroImage}
          alt={`${title} - ${slug}`}
          fill
          className='w-full h-full object-cover object-center'
          style={{ objectPosition: 'center top' }}
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
        />
        {/* Overlay escuro para melhorar legibilidade do texto - Pixel Perfect Figma */}
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(15, 0, 5, 0.1) 40%, rgba(15, 0, 5, 0.5) 100%), linear-gradient(90deg, rgba(15, 0, 5, 0.1) 0%, rgba(15, 0, 5, 0.1) 100%)'
          }}
        />
        {/* Overlay amarelo com mix-blend-soft-light - Pixel Perfect Figma */}
        <div className='absolute inset-0 bg-[#FFBD1A] mix-blend-soft-light opacity-20' />
      </div>

      {/* Overlay no topo para dar contraste ao menu no mobile */}
      <div className='absolute inset-0 pointer-events-none z-[1]'>
        <div className='h-[120px] w-full bg-gradient-to-b from-black/50 to-transparent' />
      </div>

      {/* Conteúdo do Hero */}
      <div className='relative z-10 w-full max-w-[1248px] m-auto px-5 sm:px-6 lg:px-8 xl:px-0 h-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:max-h-none h-full hero-max-height py-0'>
          {/* Coluna Esquerda - Vazia apenas no desktop para alinhar com a imagem */}
          <div className='hidden lg:flex items-center justify-center' />

          {/* Coluna Direita - Conteúdo */}
          <div className='flex flex-col lg:ml-20 max-w-[300px] md:max-w-[520px] md:pr-20 justify-end pb-24 md:pb-[120px] lg:pb-[140px] pt-20 md:pt-0 relative z-20'>
            <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="1200">
              <YVBreadcrumbs items={[{ label: slug, href: slug }]} disabled className="pb-5 text-[#FFBD1A]" />
            </div>

            <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="1400">
              <YVTitle
                tag="h1"
                title={bannerTitle || title}
                variant="hero"
                className='text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-2 max-w-full md:max-w-[400px]'
              />
            </div>

            {bannerDescription && (
              <div data-aos="fade-up" data-aos-delay="700" data-aos-duration="1400">
                <YVText className='text-white/90 mt-4 max-w-full md:max-w-[400px]'>
                  {bannerDescription}
                </YVText>
              </div>
            )}

            {bannerButtonText && bannerButtonUrl && (
              <div className='mt-6' data-aos="fade-up" data-aos-delay="900" data-aos-duration="1200">
                <YVButton
                  variant="primary"
                  size="lg"
                  href={bannerButtonUrl}
                  className="bg-[#FFBD1A] hover:bg-[#FFBD1A]/90 text-black font-semibold"
                >
                  {bannerButtonText}
                </YVButton>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Button */}
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20'>
        <ScrollButton />
      </div>
    </div>
  );
}
