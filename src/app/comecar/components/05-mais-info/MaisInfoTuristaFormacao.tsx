'use client';

import { useState } from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { YVTitle, YVButton, YVIcon, YVBanner } from '@/components/YV';
import ProgressBar from '../ProgressBar';

interface StepperFormData {
  maisInfoProfissionalFormacao?: string;
}

interface MaisInfoTuristaFormacaoProps {
  register: UseFormRegister<StepperFormData>;
  errors: FieldErrors<StepperFormData>;
  watch: UseFormWatch<StepperFormData>;
  setValue: UseFormSetValue<StepperFormData>;
  onProximo: () => void;
  onVoltar: () => void;
  etapaAtual: number;
  totalEtapas: number;
}

export default function MaisInfoTuristaFormacao({
  register,
  errors,
  watch,
  setValue,
  onProximo,
  onVoltar,
  etapaAtual,
  totalEtapas
}: MaisInfoTuristaFormacaoProps) {
  const [selectedOpcao, setSelectedOpcao] = useState<string>('');

  const handleOpcaoSelect = (opcao: string) => {
    setSelectedOpcao(opcao);
    setValue('maisInfoProfissionalFormacao', opcao);
  };

  const opcoes = [
    {
      id: 'High School (Ensino Medio)',
      icon: 'study',
      title: 'Ensino Médio'
    },
    {
      id: 'Professional Certificates / Certificados Profissionais',
      icon: 'study',
      title: 'Certificados Profissionais'
    },
    {
      id: 'Technician / College (Nivel tecnico)',
      icon: 'study',
      title: 'Técnico/Profissionalizante'
    },
    {
      id: 'Baccalaureate Degree (Nivel Superior / Bacharelado)',
      icon: 'study',
      title: 'Superior/Bacharelado'
    },
    {
      id: 'Post Graduation (Pos Graduacao)',
      icon: 'study',
      title: 'Pós-graduação'
    },
    {
      id: 'Master Degree (Mestrado)',
      icon: 'study',
      title: 'Mestrado'
    },
    {
      id: 'Doctorate Degree (Doutorado)',
      icon: 'study',
      title: 'Doutorado'
    },
    {
      id: 'Post Doctorate (Pos Doutorado)',
      icon: 'study',
      title: 'Pós Doutorado'
    }
  ];

  const podeAvancar = selectedOpcao;

  return (
    <div className="w-full grid grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[1fr_2fr] lg:grid-rows-1 relative overflow-hidden min-h-screen ">

      {/* Coluna Esquerda - Imagem (33% da largura) */}
      <div className="row-start-1 px-0 md:px-0 relative md:overflow-hidden lg:col-start-1 lg:row-start-1 lg:order-1 h-auto md:h-full">
        <YVBanner
          src='/imgs/stepper-form/bg-etapa-05-turista-formacao.jpg'
          srcMobile='/imgs/stepper-form/bg-etapa-05-turista-formacao-mobile.jpg'
          alt='Hero Formação Turista'
          className='object-cover object-center max-h-[35vh] md:h-full md:min-h-[100vh]'
          priority
          
        />
      </div>

      {/* Coluna Direita - Conteúdo Laranja (67% da largura) */}
      <div className="row-start-2 bg-gradient-to-br bg-YV-secondary-gradient relative flex items-start md:items-center lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:h-screen order-1 lg:order-2 px-1 md:pl-[10%] -mt-0 py-0 pb-6 md:py-0 min-h-full">

        {/* Conteúdo central */}
        <div className="relative z-10 px-5 lg:px-8 md:max-w-3xl w-full pt-10 pb-6 md:pt-0 md:pb-0 md:mt-0">

          {/* ProgressBar */}
          <ProgressBar
            etapaAtual={etapaAtual}
            totalEtapas={totalEtapas}
            titulo="Formação"
          />

          {/* Título da pergunta */}
          <YVTitle className="mb-8">
            Qual é o seu nível de formação acadêmica?
          </YVTitle>

          {/* Opções de formação */}
          <div className="space-y-4 mb-8">
            {opcoes.map((opcao) => (
              <div key={opcao.id}>
                <div
                  className={`
                    md:p-4 rounded-lg cursor-pointer transition-all duration-300
                    ${selectedOpcao && selectedOpcao !== opcao.id
                      ? 'opacity-30'
                      : 'hover:bg-white/30'
                    }
                  `}
                  onClick={() => handleOpcaoSelect(opcao.id)}
                >
                  <div className="flex items-center gap-[6px] md:gap-[27px]">
                    <div className="w-10 h-8 flex items-center justify-center">
                      <YVIcon
                        name={opcao.icon}
                        width={48}
                        height={48}
                        className="w-5 h-5 md:w-10 md:h-10"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl leading-[22px] md:leading-[28px] font-semibold text-gray-900">
                        {opcao.title}
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
