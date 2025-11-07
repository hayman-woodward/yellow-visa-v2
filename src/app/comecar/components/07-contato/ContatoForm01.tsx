'use client';

import { YVBanner, YVButton, YVTitle, YVIcon, YVTextField } from '@/components/YV';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import ProgressBar from '../ProgressBar';

interface FormData {
  nome?: string;
  sobrenome?: string;
  email?: string;
  telefone?: string;
  pais?: string;
  language?: string;
}

interface ContatoForm01Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  onProximo: () => void;
  onVoltar: () => void;
  etapaAtual: number;
  totalEtapas: number;
}

export default function ContatoForm01({
  register,
  errors,
  watch,
  setValue,
  onProximo,
  onVoltar,
  etapaAtual,
  totalEtapas
}: ContatoForm01Props) {
  const nome = watch('nome')?.trim();
  const sobrenome = watch('sobrenome')?.trim();
  const podeAvancar = nome && sobrenome && nome.length >= 2 && sobrenome.length >= 2;

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
        <div className="relative z-10 px-5 lg:px-8 md:max-w-3xl w-full pt-5 pb-6 md:pt-0 md:pb-0 md:mt-0">
          <ProgressBar
            etapaAtual={etapaAtual}
            totalEtapas={totalEtapas}
            titulo="Contato"
          />
          <YVTitle className="mb-4 md:mb-8">
            Como devo te chamar?
          </YVTitle>
          <div className="space-y-6 mb-8 max-w-[400px]">
            <YVTextField
              {...register('nome')}
              placeholder="Escreva seu nome"
              variant="underline"
              className="text-gray-900 text-xl placeholder:text-gray-900"
              error={errors.nome?.message}
            />
            <YVTextField
              {...register('sobrenome')}
              placeholder="Escreva seu Sobrenome"
              variant="underline"
              className="text-gray-900 text-xl placeholder:text-gray-900"
              error={errors.sobrenome?.message}
            />
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
