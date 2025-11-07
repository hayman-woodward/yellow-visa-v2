'use client';

import { YVBanner, YVButton, YVTitle, YVIcon } from '@/components/YV';
import { useState } from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import ProgressBar from '../ProgressBar';
import { StepperFormData } from '../VistoStepper';

interface DestinoOptionsProps {
  register: UseFormRegister<StepperFormData>;
  errors: FieldErrors<StepperFormData>;
  watch: UseFormWatch<StepperFormData>;
  setValue: UseFormSetValue<StepperFormData>;
  onProximo: () => void;
  onVoltar: () => void;
  etapaAtual: number;
  totalEtapas: number;
}

export default function DestinoOptions({
  register,
  errors,
  watch,
  setValue,
  onProximo,
  onVoltar,
  etapaAtual,
  totalEtapas
}: DestinoOptionsProps) {
  const [selectedDestino, setSelectedDestino] = useState<string>('');

  const handleDestinoSelect = (destino: string) => {
    setSelectedDestino(destino);
    setValue('destino', destino);
  };

  const destinos = [
    {
      id: 'estados-unidos',
      icon: 'us-icon',
      title: 'Quero viver meu sonho americano',
      description: 'Estados Unidos - Oportunidades e experiências únicas',
      color: 'from-blue-500 to-red-500'
    },
    {
      id: 'portugal',
      icon: 'portugal-icon',
      title: 'Quero começar uma nova história em Portugal',
      description: 'Portugal - Cultura, história e qualidade de vida',
      color: 'from-green-500 to-red-500'
    }
  ];

  const podeAvancar = selectedDestino;

  return (
    <div className="w-full grid grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[1fr_2fr] lg:grid-rows-1 relative overflow-hidden min-h-screen">

      {/* Coluna Esquerda - Imagem (33% da largura) */}
      <div className="row-start-1 px-0 md:px-0 relative md:overflow-hidden lg:col-start-1 lg:row-start-1 lg:order-1 h-auto md:h-full">
        <YVBanner
          src='/imgs/stepper-form/bg-etapa-02.jpg'
          srcMobile='/imgs/stepper-form/bg-etapa-02-mobile.jpg'
          alt='Hero Destino'
          className='object-cover object-center max-h-[27vh] md:h-full md:min-h-[100vh]'
          priority
        />
      </div>

      {/* Coluna Direita - Conteúdo Laranja (67% da largura) */}
      <div className="row-start-2 bg-gradient-to-br bg-YV-secondary-gradient relative flex items-start md:items-center lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:h-screen order-1 lg:order-2 px-1 md:pl-[10%] -mt-0 py-0 pb-6 md:py-0 min-h-full">

        {/* Conteúdo central */}
        <div className="relative z-10 px-4 lg:px-8 md:max-w-2xl w-full pt-5 pb-6 md:pt-0 md:pb-0 md:mt-0">

          {/* ProgressBar */}
          <ProgressBar
            etapaAtual={etapaAtual}
            totalEtapas={totalEtapas}
            titulo="Destino"
          />

          {/* Título da pergunta */}
          <YVTitle className="mb-3 md:mb-8">
            Qual é seu sonho de destino?
          </YVTitle>

          {/* Opções de destino */}
          <div className="space-y-4 mb-6 md:mb-8">
            {destinos.map((destino) => (
              <div key={destino.id}>
                <div
                  className={`
                    md:p-4 rounded-lg cursor-pointer transition-all duration-300
                    ${selectedDestino && selectedDestino !== destino.id
                      ? 'opacity-30'
                      : 'hover:bg-white/30'
                    }
                  `}
                  onClick={() => handleDestinoSelect(destino.id)}
                >
                  <div className="flex items-center gap-[6px] md:gap-[27px]">
                    <div className="w-10 h-8 flex items-center justify-center">
                      <YVIcon
                        name={destino.icon}
                        width={48}
                        height={48}
                        className="w-5 h-5 md:w-10 md:h-10"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl leading-[22px] md:leading-[28px] font-semibold text-gray-900">
                        {destino.title}
                      </h3>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            <YVButton
              onClick={onVoltar}
              variant="outline-secondary"
              className="px-6 py-3 bg-transparent"
            >
              Voltar
            </YVButton>

            <YVButton
              onClick={onProximo}
              disabled={!podeAvancar}
              variant="secondary"
              className="px-6 py-3"
            >
              Próximo →
            </YVButton>
          </div>

        </div>
      </div>
    </div>
  );
}
