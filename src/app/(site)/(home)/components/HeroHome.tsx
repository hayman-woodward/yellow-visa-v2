import Image from 'next/image';
import {  YVButton, YVText, YVTitle } from '@/components/YV';

export default function HeroHome() {
  return (
    <div className='bg-YV max-h-[600px] md:max-h-[800px] h-[90vh] -mt-[88px] relative w-full overflow-hidden'>
      {/* SVG Background - Desktop */}
      <div className='absolute inset-0 pointer-events-none hidden lg:block' data-aos="fade-in" data-aos-duration="2000">
        <Image
          src='/svgs/hero-home-laco.svg'
          alt=''
          width={1440}
          height={758}
          className='w-full h-full object-cover'
          priority
        />
      </div>

      {/* Imagem Mobile Background */}
      <div className='absolute inset-0 pointer-events-none lg:hidden' data-aos="fade-in" data-aos-duration="2000">
        <Image
          src='/imgs/home/yellow-visa-hero-mobile.png'
          alt='Mulher com cabelo colorido - Mobile'
          width={400}
          height={500}
          className='w-full h-full object-cover object-center'
          style={{ objectPosition: 'center top' }}
          priority
        />
        {/* Overlay escuro para melhorar legibilidade do texto */}
        <div
          className='absolute bottom-0 left-0 right-0 h-5/5'
          style={{
            background:
              'linear-gradient(180deg, var(--overlay-0, rgba(15, 0, 5, 0.00)) 40.06%, var(--overlay-36, rgba(15, 0, 5, 0.50)) 50%)'
          }}
        />
      </div>

      {/* Conteúdo do Hero */}
      <div className='relative z-10 w-full max-w-[1248px]  m-auto px-5 sm:px-6 lg:px-8 xl:px-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 max-h-[600px] md:max-h-[800px] h-[90vh] py-0'>
          {/* Coluna Esquerda - Texto */}
          <div className='flex flex-col lg:ml-20 max-w-[520px] md:pr-20 justify-end md:justify-center pb-[15%] md:pb-[80px] md:mt-20 relative z-20 '>
           
            <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="1400" className='md:mt-15'>
              <YVTitle
                tag="h1"
                variant='hero'
                className='text-4xl lg:text-5xl xl:text-6xl font-bold text-white md:text-gray-900 leading-tight mb-2'
              >
               Imigração não precisa ser complicada, só bem orientada
              </YVTitle>
            </div>
            <div data-aos="fade-up" data-aos-delay="700" data-aos-duration="1400">
              <YVText className='text-white md:text-gray-700 max-w-lg mb-6'>
              
             Preço justo, parcelamento acessível e uma equipe parceira que joga junto com você. Do Brasil para os EUA e/ou Portugal, com confiança e velocidade. Podemos te ajudar a voar.
              </YVText>
            </div>
            <div className='pt-0' data-aos="fade-up" data-aos-delay="900" data-aos-duration="1200">
              <YVButton
                variant='secondary'
                className=' text-white px-8 py-4 text-lg font-semibold w-full md:w-fit'
                href='/comecar'
              >
                Comece agora
              </YVButton>
            </div>
          </div>

          {/* Coluna Direita - Imagem Desktop */}
          <div className='relative -ml-20 flex-col justify-end hidden lg:flex'>
            <div className='w-full lg:h-[750px] relative overflow-visible' data-aos="fade-left" data-aos-delay="400" data-aos-duration="1600">
              <Image
                src='/imgs/home/hero-woman.png'
                alt='Mulher com cabelo colorido - Desktop'
                width={600}
                height={750}
                className='w-full h-full object-cover object-bottom absolute bottom-0 right-0 lg:-ml-12 xl:-ml-16'
                style={{ objectPosition: 'center bottom' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
