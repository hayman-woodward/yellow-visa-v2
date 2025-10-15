import Image from 'next/image';
import { YVButton, YVText, YVTitle } from '@/components/YV';

export default function HeroSection() {
  return (
    <section className='relative bg-yellow-400 min-h-screen flex items-center overflow-hidden'>
      {/* SVG Background */}
      <div className='absolute inset-0 pointer-events-none'>
        <Image
          src='/svgs/hero-curve.svg'
          alt=''
          width={1440}
          height={758}
          className='w-full h-full object-cover'
          priority
        />
      </div>

      {/* Conteúdo do Hero */}
      <div className='relative z-10 max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen py-20'>
          {/* Texto à esquerda */}
          <div className='space-y-6'>
            <YVTitle
              title='Imigração não precisa ser complicada, só bem orientada'
              className='text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight'
            />
            <YVText
              variant='body'
              className='text-lg lg:text-xl text-gray-700 max-w-lg'
            >
              Descrição Phasellus netus natoque ante eget at condimentum eget
            </YVText>
            <div className='pt-4'>
              <YVButton
                variant='primary'
                className='bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg font-semibold'
              >
                Comece agora
              </YVButton>
            </div>
          </div>

          {/* Imagem à direita */}
          <div className='relative'>
            <div className='w-full h-[500px] lg:h-[600px] bg-gray-200 rounded-lg overflow-hidden'>
              {/* Placeholder para a imagem da mulher */}
              <div className='w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center'>
                <YVText className='text-gray-500 text-lg'>
                  Imagem da mulher aqui
                </YVText>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10'>
        <div className='flex flex-col items-center space-y-2'>
          <YVText className='text-gray-600 text-sm'>Scroll Down</YVText>
          <div className='w-6 h-6 border-2 border-gray-600 rounded-full flex items-center justify-center'>
            <svg
              className='w-3 h-3 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
