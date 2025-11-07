'use client';

import { YVBanner, YVButton, YVTitle } from '@/components/YV';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import ProgressBar from '../ProgressBar';
import { useState, useEffect, useRef } from 'react';

interface FormData {
  contactChannel?: string;
}

interface ContatoForm04Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  onProximo: () => void;
  onVoltar: () => void;
  etapaAtual: number;
  totalEtapas: number;
}

const contactChannelOptions = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
  { value: 'telefone', label: 'Telefone' }
];

export default function ContatoForm04({
  register,
  errors,
  watch,
  setValue,
  onProximo,
  onVoltar,
  etapaAtual,
  totalEtapas
}: ContatoForm04Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const contactChannel = watch('contactChannel');
  const selectedOption = contactChannelOptions.find(opt => opt.value === contactChannel);

  const handleSelect = (value: string) => {
    setValue('contactChannel', value);
    setIsOpen(false);
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const podeAvancar = contactChannel?.trim();

  return (
    <div className="w-full grid grid-cols-1 grid-rows-[1.2fr_1.8fr] lg:grid-cols-[1fr_2fr] lg:grid-rows-1 relative overflow-hidden min-h-screen ">
      <div className="row-start-1 px-0 md:px-0 relative md:overflow-hidden lg:col-start-1 lg:row-start-1 lg:order-1">
        <YVBanner
          src='/imgs/stepper-form/bg-etapa-07.jpg'
          src2x='/imgs/stepper-form/bg-etapa-07-2x.jpg'
          srcMobile='/imgs/stepper-form/bg-etapa-07-mobile.jpg'
          alt='Hero Contato'
          className='object-cover object-center h-full md:min-h-[100vh]'
          priority
        />
      </div>
      <div className="row-start-2 bg-gradient-to-br bg-YV-secondary-gradient relative flex items-start md:items-center lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:h-screen order-1 lg:order-2 px-1 md:pl-[10%] -mt-0 py-0 pb-6 md:py-0 min-h-full">
        <div className="relative z-10 px-5 lg:px-8 md:max-w-3xl w-full pt-10 pb-6 md:pt-0 md:pb-0 md:mt-0">
          <ProgressBar
            etapaAtual={etapaAtual}
            totalEtapas={totalEtapas}
            titulo="Contato"
          />
          <YVTitle className="mb-8">
            Melhor contato por
          </YVTitle>
          <div className="space-y-6 mb-8 max-w-[400px]">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-0 pl-4 text-gray-900 text-base border-0 border-b border-black focus:border-black active:border-black outline-none transition-colors duration-300 rounded-none bg-transparent focus:outline-none active:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{
                  outline: 'none !important',
                  boxShadow: 'none !important',
                  borderColor: 'transparent !important',
                  borderBottomColor: '#000 !important',
                  backgroundColor: 'transparent !important',
                  borderTop: 'none !important',
                  borderLeft: 'none !important',
                  borderRight: 'none !important',
                  borderBottom: '1px solid #000 !important'
                }}
              >
                <span className="flex justify-between items-center w-full">
                  <span className="flex-1">{selectedOption ? selectedOption.label : 'Selecione'}</span>
                  <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
                  <div className="max-h-48 overflow-y-auto">
                    {contactChannelOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelect(option.value)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-base"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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

