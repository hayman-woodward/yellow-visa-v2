'use client';

import { YVBanner, YVButton, YVTitle, YVIcon } from '@/components/YV';
import { useState } from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import ProgressBar from '../ProgressBar';

interface FormData {
  nomeCompleto?: string;
  destino?: string;
  objetivo?: string;
  estudanteOpcao?: string;
  turismoOpcao?: string;
  profissionalOpcao?: string;
}

interface ProfissionalOptionsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  onProximo: () => void;
  onVoltar: () => void;
  etapaAtual: number;
  totalEtapas: number;
}

export default function ProfissionalOptions({
  register,
  errors,
  watch,
  setValue,
  onProximo,
  onVoltar,
  etapaAtual,
  totalEtapas
}: ProfissionalOptionsProps) {
  const [selectedOpcao, setSelectedOpcao] = useState<string>('');
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  const handleOpcaoSelect = (opcao: string) => {
    setSelectedOpcao(opcao);
    setValue('profissionalOpcao', opcao);
  };

  const handleInputChange = (opcaoId: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [opcaoId]: value
    }));
    setValue('profissionalOpcao', value);
  };

  const opcoes = [
    {
      id: 'profissional-tecnico',
      icon: 'la-tools',
      title: 'Um profissional técnico'
    },
    {
      id: 'especialista-conhecimento',
      icon: 'laptop',
      title: 'Um especialista da área do conhecimento'
    },
    {
      id: 'criativo-artistico',
      icon: 'drama',
      title: 'Alguém criativo/artístico com destaque'
    },
    {
      id: 'professor-pesquisador',
      icon: 'presentation',
      title: 'Professor, pesquisador ou cientista'
    },
    {
      id: 'outro-perfil',
      icon: 'puzzle',
      title: 'Outro perfil'
    }
  ];

  const podeAvancar = selectedOpcao && inputValues[selectedOpcao]?.trim();

  return (
    <div className="w-full grid grid-cols-1 grid-rows-[1.2fr_1.8fr] lg:grid-cols-[1fr_2fr] lg:grid-rows-1 relative overflow-hidden min-h-screen max-h-[90vh]">

      {/* Coluna Esquerda - Imagem (33% da largura) */}
      <div className="row-start-1 px-0 md:px-0 md:relative md:overflow-hidden lg:col-start-1 lg:row-start-1 lg:order-1">
        <YVBanner
          src='/imgs/stepper-form/bg-etapa-04-profissional.jpg'
          srcMobile='/imgs/stepper-form/bg-etapa-04-profissional-mobile.jpg'
          alt='Hero Profissional'
          className='object-cover object-center h-full md:min-h-[100vh]'
          priority
          quality={85}
        />
      </div>

      {/* Coluna Direita - Conteúdo Laranja (67% da largura) */}
      <div className="row-start-2 bg-gradient-to-br bg-YV-secondary-gradient relative flex items-center lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:h-screen order-1 lg:order-2 px-1 md:pl-[10%] -mt-0 py-40 md:py-0">

        {/* Conteúdo central */}
        <div className="relative z-10 px-5 lg:px-8 md:max-w-3xl w-full -mt-7 md:mt-0">

          {/* ProgressBar */}
          <ProgressBar
            etapaAtual={etapaAtual}
            totalEtapas={totalEtapas}
            titulo="Profissional"
          />

          {/* Título da pergunta */}
          <YVTitle className="mb-8">
            Me conta um pouco de você
          </YVTitle>

          {/* Opções de profissional */}
          <div className="space-y-4 mb-8">
            {opcoes.map((opcao) => (
              <div key={opcao.id}>
                <div
                  className={`
                    md:p-4 rounded-lg cursor-pointer transition-all duration-300
                    ${selectedOpcao && selectedOpcao !== opcao.id
                      ? 'opacity-50'
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
                    {/* Input do lado direito quando selecionado */}
                    {selectedOpcao === opcao.id && (
                      <div className="w-64">
                        <input
                          type="text"
                          placeholder="Especifique..."
                          value={inputValues[selectedOpcao] || ''}
                          onChange={(e) => handleInputChange(selectedOpcao, e.target.value)}
                          className="w-full px-3 py-2 rounded-md border border-black focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm text-black"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
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
