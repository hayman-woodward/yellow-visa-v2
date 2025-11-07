'use client';

import { YVBanner, YVButton, YVTitle } from '@/components/YV';
import Image from 'next/image';

interface HeroInicioProps {
  onIniciar: () => void;
}

export default function HeroInicio({ onIniciar }: HeroInicioProps) {
  return (
    <div className="w-full grid grid-cols-1 grid-rows-[1.2fr_1.8fr] lg:grid-cols-[1fr_2fr] lg:grid-rows-1 relative overflow-hidden min-h-screen max-h-[100vh]">

      {/* Coluna Esquerda - Imagem (33% da largura) */}
      <div className="row-start-1 px-0 relative md:overflow-hidden lg:col-start-1 lg:row-start-1">
        <YVBanner
          src='/imgs/stepper-form/bg-etapa-01.jpg'
          srcMobile='/imgs/stepper-form/bg-etapa-01-mobile.jpg'
          alt='Hero Inicio'
          className='object-cover object-center h-full md:min-h-[100vh]'
          priority
          
        />
      </div>

      {/* Coluna Direita - Conteúdo Laranja (67% da largura) */}
      <div className="row-start-2 bg-gradient-to-br bg-YV-secondary-gradient relative flex items-center lg:col-start-2 lg:col-span-1 lg:row-start-1 px-1 md:pl-[10%] -mt-0 py-40 md:py-0">

        {/* Conteúdo central */}
        <div className="relative z-10 px-4 lg:px-8 md:max-w-2xl -mt-[25%] md:mt-0">
          <YVTitle tag="h1" variant="hero" className='mb-4 lg:mb-6 pr-5 md:pr-0'>
            Vamos imaginar sua nova vida em outro país?
          </YVTitle>

          <YVButton
            onClick={onIniciar}
            variant="secondary"
            className='w-fit px-7 cursor-pointer'

          >
            Começar →
          </YVButton>
        </div>
      </div>
    </div>
  );
}
