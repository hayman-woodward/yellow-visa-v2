'use client';

import Image from 'next/image';
import { YVBreadcrumbs, YVText, YVTitle } from "@/components/YV";
import ScrollButton from "../../../(home)/components/ScrollButton";

interface HeroVistosProps {
  title: string;
  slug: string;
  bannerTitle?: string;
  imageUrl?: string;
}

export default function HeroVistos({
  title,
  slug,
  bannerTitle,
  imageUrl
}: HeroVistosProps) {
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

      {/* Texto sobreposto na imagem com 2 colunas */}
      <div className='absolute inset-0 z-10'>
        <div className='max-w-[1248px] mx-auto px-5 sm:px-6 lg:px-8 xl:px-0 w-full h-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
            {/* Coluna 1 - Vazia apenas no desktop para alinhar com a imagem */}
            <div className='hidden md:flex items-center justify-center' />

            {/* Coluna 2 - Conteúdo */}
            <div className='flex flex-col justify-end items-start mb-8 md:mb-20 pb-24 md:pb-[80px] pt-20 md:pt-0'>
              <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="1200">
                <YVBreadcrumbs items={[{ label: slug, href: slug }]} disabled className="pb-4 md:pb-5" />
              </div>

              <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="1400">
                <YVTitle
                  tag="h1"
                  title={bannerTitle || title}
                  variant="hero"
                  className='text-4xl lg:text-5xl xl:text-6xl font-bold text-white lg:text-gray-900 leading-tight max-w-full md:max-w-[400px]'
                />
              </div>
            </div>
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
