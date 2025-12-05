'use client';

import { YVBanner, YVButton, YVTitle, YVIcon, YVTextField, YVPhoneInput, YVText } from '@/components/YV';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import type { Value } from 'react-phone-number-input';
import ProgressBar from '../ProgressBar';
import { Switch } from '@/components/ui/switch';
import { isValidPhone, getPhoneErrorMessage } from '@/lib/utils';
import { useState } from 'react';

interface FormData {
  nome?: string;
  sobrenome?: string;
  email?: string;
  telefone?: string;
  whatsapp?: boolean;
  pais?: string;
  language?: string;
}

interface ContatoForm02Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  onProximo: () => void;
  onVoltar: () => void;
  etapaAtual: number;
  totalEtapas: number;
}

export default function ContatoForm02({
  register,
  errors,
  watch,
  setValue,
  onProximo,
  onVoltar,
  etapaAtual,
  totalEtapas
}: ContatoForm02Props) {
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handlePhoneChange = (value?: Value) => {
    const phoneValue = value || '';
    setValue('telefone', phoneValue);
    
    // Validação em tempo real
    const error = getPhoneErrorMessage(phoneValue);
    setPhoneError(error);
    
    // Limpar erro do react-hook-form se telefone ficar válido
    if (!error && errors.telefone) {
      setValue('telefone', phoneValue, { shouldValidate: true });
    }
  };

  const handleWhatsAppToggle = (value: boolean) => {
    setValue('whatsapp', value);
  };

  const telefone = watch('telefone');
  const email = watch('email');
  
  // Validar se email e telefone são válidos antes de permitir avançar
  const podeAvancar = email?.trim() && telefone && isValidPhone(telefone);
  
  // Usar erro em tempo real ou erro do form
  const telefoneError = phoneError || errors.telefone?.message;

  return (
    <div className="w-full grid grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[1fr_2fr] lg:grid-rows-1 relative overflow-hidden min-h-screen ">
      <div className="row-start-1 px-0 md:px-0 relative md:overflow-hidden lg:col-start-1 lg:row-start-1 lg:order-1 h-auto md:h-full">
        <YVBanner
          src='/imgs/stepper-form/bg-etapa-07.jpg'
          src2x='/imgs/stepper-form/bg-etapa-07-2x.jpg'
          srcMobile='/imgs/stepper-form/bg-etapa-07-mobile.jpg'
          alt='Hero Contato'
          className='object-cover object-center max-h-[27vh] md:h-full md:min-h-[100vh]'
          priority
          
        />
      </div>
      <div className="row-start-2 bg-gradient-to-br bg-YV-secondary-gradient relative flex items-start md:items-center lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:h-screen order-1 lg:order-2 px-1 md:pl-[10%] -mt-0 py-0 pb-6 md:py-0 min-h-full">
        <div className="relative z-10 px-4 lg:px-8 md:max-w-3xl w-full pt-5 pb-6 md:pt-0 md:pb-0 md:mt-0">
          <ProgressBar
            etapaAtual={etapaAtual}
            totalEtapas={totalEtapas}
            titulo="Contato"
          />
          <YVTitle className="mb-3 md:mb-8">
            Ótimo. Seu e-mail e telefone de contato?
          </YVTitle>
          <div className="space-y-6 mb-6 md:mb-8">
            <div className="max-w-[400px]">
              <YVTextField
                {...register('email')}
                type="email"
                placeholder="Escreva seu e-mail"
                variant="underline"
                className="text-gray-900 text-xl placeholder:text-gray-900"
                error={errors.email?.message}
              />
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="max-w-[400px] w-full md:flex-1">
                <YVPhoneInput
                  value={watch('telefone') as Value}
                  onChange={handlePhoneChange}
                  placeholder="Telefone"
                  error={!!telefoneError}
                  className="w-full"
                />
                {telefoneError && (
                  <p className="text-red-500 text-sm mt-1">{telefoneError}</p>
                )}
              </div>
              {/* Toggle WhatsApp - ao lado direito no desktop, abaixo no mobile */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <YVText variant="small" className="pt-2 text-base whitespace-nowrap">É WhatsApp?</YVText>
                <Switch
                  checked={watch('whatsapp') || false}
                  onCheckedChange={handleWhatsAppToggle}
                />
              </div>
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
