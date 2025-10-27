'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { useStepperTracking } from '@/hooks/tracks/useStepperTracking';

// Import dos componentes das etapas
import HeroInicio from './01-inicio/HeroInicio';
import DestinoOptions from './02-destino/DestinoOptions';
import ObjetivoOptions from './03-objetivo/ObjetivoOptions';
import EstudanteOptions from './04-tipo-de-visto/EstudanteOptions';
import TurismoOptions from './04-tipo-de-visto/TurismoOptions';
import ProfissionalOptions from './04-tipo-de-visto/ProfissionalOptions';
import MaisInfoEstudante from './05-mais-info/MaisInfoEstudante';
import MaisInfoProfissionalFormacao from './05-mais-info/MaisInfoProfissionalFormacao';
import MaisInfoProfissional from './05-mais-info/MaisInfoProfissional';
import MaisInfoTurista from './05-mais-info/MaisInfoTurista01';
import MaisInfoTurista02 from './05-mais-info/MaisInfoTurista02';
import MaisInfoTuristaFormacao from './05-mais-info/MaisInfoTuristaFormacao';

import RendaOptions from './06-renda/RendaOptions';

import ContatoForm01 from './07-contato/ContatoForm01';
import ContatoForm02 from './07-contato/ContatoForm02';
import ContatoForm03 from './07-contato/ContatoForm03';
import MaisInfoTurista03 from './05-mais-info/MaisInfoTurista03';
import ResultadoPage from './08-captura-lead/ResultadoPage';


// Schema de validação
const formSchema = z.object({
  // Etapa 2 - Destino
  destino: z.string().optional(),

  // Etapa 3 - Service (antigo objetivo)
  service: z.string().optional(),

  // Etapa 4 - Tipo de Visto
  estudanteOpcao: z.string().optional(),
  turismoOpcao: z.string().optional(),
  profissionalOpcao: z.string().optional(),

  // Etapa 5 - Mais Info
  maisInfoEstudante: z.string().optional(),
  maisInfoProfissional: z.string().optional(),
  maisInfoProfissionalFormacao: z.string().optional(),
  maisInfoTurista: z.string().optional(),
  quantasPessoas: z.string().optional(),
  quantoTempo: z.string().optional(),

  // Etapa 6 - Renda
  rendaAnual: z.string().optional(),
  tipoVisto: z.string().optional(),

  // Etapa 7 - Contato
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  sobrenome: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos').optional(),
  whatsapp: z.boolean().optional(),
  pais: z.string().min(2, 'País deve ter pelo menos 2 caracteres').optional(),
  language: z.string().min(1, 'Idioma é obrigatório').optional()
});

type StepperFormData = z.infer<typeof formSchema>;

export type { StepperFormData };

// Interface unificada para todos os componentes
export interface StepperFormDataInterface {
  // Etapa 1 - Início
  // (sem campos específicos)

  // Etapa 2 - Destino
  destino?: string;

  // Etapa 3 - Service (antigo objetivo)
  service?: string;

  // Etapa 4 - Tipo de Visto
  estudanteOpcao?: string;
  turismoOpcao?: string;
  profissionalOpcao?: string;

  // Etapa 5 - Mais Info
  maisInfoEstudante?: string;
  maisInfoProfissional?: string;
  maisInfoProfissionalFormacao?: string;
  maisInfoTurista?: string;
  quantasPessoas?: string;
  quantoTempo?: string;

  // Etapa 6 - Renda
  rendaAnual?: string;
  tipoVisto?: string;

  // Etapa 7 - Contato
  nome?: string;
  sobrenome?: string;
  email?: string;
  telefone?: string;
  whatsapp?: boolean;
  pais?: string;
  language?: string;
}

// Definição das etapas
const etapas = [
  { id: 1, title: 'Início', description: 'Bem-vindo', slug: 'inicio' },
  { id: 2, title: 'Destino', description: 'Seu sonho', slug: 'destino' },
  { id: 3, title: 'Objetivo', description: 'Sua motivação', slug: 'objetivo' },
  { id: 4, title: 'Tipo de Visto', description: 'Sua categoria', slug: 'tipo-visto' },
  { id: 5, title: 'Formação', description: 'Sua formação', slug: 'formacao' },
  { id: 6, title: 'Experiência', description: 'Sua experiência', slug: 'experiencia' },
  { id: 7, title: 'Renda', description: 'Sua renda', slug: 'renda' },
  { id: 8, title: 'Contato', description: 'Seus dados', slug: 'contato' },
  { id: 9, title: 'Captura Lead', description: 'Confirmação', slug: 'captura-lead' },
  { id: 10, title: 'Resultado', description: 'Sua jornada', slug: 'resultado' }
];

interface VistoStepperProps {
  etapaInicial: number;
}

export default function VistoStepper({ etapaInicial }: VistoStepperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [etapaAtual, setEtapaAtual] = useState(etapaInicial);
  const { trackFormStart, trackStepProgress, trackAbandonment } = useStepperTracking();
  const hasTrackedFormStart = useRef(false);

  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useForm<StepperFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });

  const watchedFields = watch();

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem('stepperData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Restaurar dados no formulário
        Object.keys(parsedData).forEach(key => {
          if (parsedData[key]) {
            setValue(key as keyof StepperFormData, parsedData[key]);
          }
        });
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    }
  }, [setValue]);

  // Form Start apenas uma vez quando montar o componente
  useEffect(() => {
    if (!hasTrackedFormStart.current) {
      hasTrackedFormStart.current = true;
      trackFormStart();
    }
  }, [trackFormStart]);

  // Tracking de abandono quando o usuário sai da página
  useEffect(() => {
    const handleBeforeUnload = () => {
      const etapa = etapas.find(e => e.id === etapaAtual);
      if (etapa) {
        trackAbandonment(etapaAtual, etapa.title);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [etapaAtual, trackAbandonment]);

  // Salvar dados automaticamente no localStorage
  useEffect(() => {
    try {
      // Criar um objeto limpo apenas com os valores dos campos
      const cleanData = {
        destino: watchedFields.destino || '',
        service: watchedFields.service || '',
        estudanteOpcao: watchedFields.estudanteOpcao || '',
        turismoOpcao: watchedFields.turismoOpcao || '',
        profissionalOpcao: watchedFields.profissionalOpcao || '',
        maisInfoEstudante: watchedFields.maisInfoEstudante || '',
        maisInfoProfissional: watchedFields.maisInfoProfissional || '',
        maisInfoProfissionalFormacao: watchedFields.maisInfoProfissionalFormacao || '',
        maisInfoTurista: watchedFields.maisInfoTurista || '',
        quantasPessoas: watchedFields.quantasPessoas || '',
        quantoTempo: watchedFields.quantoTempo || '',
        rendaAnual: watchedFields.rendaAnual || '',
        nome: watchedFields.nome || '',
        sobrenome: watchedFields.sobrenome || '',
        email: watchedFields.email || '',
        telefone: watchedFields.telefone || '',
        whatsapp: watchedFields.whatsapp || false,
        pais: watchedFields.pais || '',
        language: watchedFields.language || '',
        // Adicionar UTMs do localStorage
        utm_data: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('utm_data') || '{}') : {}
      };
      
      localStorage.setItem('stepperData', JSON.stringify(cleanData));
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  }, [watchedFields]);

  // Sincronizar com URL params e redirecionar se necessário
  useEffect(() => {
    const etapaFromUrl = searchParams.get('etapa');

    if (!etapaFromUrl) {
      // Se não há etapa na URL, redirecionar para a primeira
      const primeiraEtapa = etapas[0];
      const etapaFormatada = primeiraEtapa.id.toString().padStart(2, '0');
      router.replace(`/comecar?etapa=${etapaFormatada}-${primeiraEtapa.slug}`);
      return;
    }

    const etapa = parseInt(etapaFromUrl.split('-')[0]);
    if (etapa >= 1 && etapa <= etapas.length) {
      setEtapaAtual(etapa);
    }
  }, [searchParams, router]);

  // Navegação entre etapas
  const proximaEtapa = async () => {
    // Step Progress - trackear a etapa que foi completada
    const etapaAtualData = etapas.find(e => e.id === etapaAtual);
    if (etapaAtualData) {
      trackStepProgress(etapaAtual, etapaAtualData.title, watchedFields);
    }

    if (etapaAtual < etapas.length) {
      const novaEtapa = etapaAtual + 1;
      const etapa = etapas.find(e => e.id === novaEtapa);
      if (etapa) {
        const etapaFormatada = novaEtapa.toString().padStart(2, '0');

        // Lógica para etapa 4 - adicionar parâmetro de tipo de visto
        if (novaEtapa === 4) {
          const service = watch('service');
          if (service === 'Student Visa') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&visto=estudante`);
            return;
          } else if (service === 'Tourist Visa') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&visto=turista`);
            return;
          } else if (service === 'Immigrant Visa') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&visto=profissional`);
            return;
          }
        }

        // Lógica para etapa 5 - mais info
        if (novaEtapa === 5) {
          const service = watch('service');
          if (service === 'Student Visa') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=estudante`);
            return;
          } else if (service === 'Immigrant Visa') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=profissional`);
            return;
          } else if (service === 'Tourist Visa') {
            // Para turismo, primeiro vai para formação
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=turista&sub=formacao`);
            return;
          }
        }

        // Lógica para etapa 6 - experiência (só para profissional)
        if (novaEtapa === 6) {
          const service = watch('service');
          if (service === 'Immigrant Visa') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=profissional`);
            return;
          } else if (service === 'Tourist Visa') {
            // Para turismo, pular direto para renda
            router.push(`/comecar?etapa=07-${etapas.find(e => e.id === 7)?.slug}`);
            return;
          } else {
            // Para outros fluxos, pular direto para renda
            router.push(`/comecar?etapa=07-${etapas.find(e => e.id === 7)?.slug}`);
            return;
          }
        }

        // Lógica para etapa 5 - navegação do turista
        if (etapaAtual === 5) {
          const sub = searchParams.get('sub');
          const service = watch('service');
          const maisInfoTurista = watch('maisInfoTurista');

          if (service === 'Tourist Visa') {
            // Se está na etapa de formação, vai para quantas-pessoas
            if (sub === 'formacao') {
              router.push(`/comecar?etapa=05-mais-info&tipo=turista&sub=quantas-pessoas`);
              return;
            }
            // Se não tem sub, é a primeira vez na etapa 5
            else if (!sub) {
              if (maisInfoTurista === 'em-familia' || maisInfoTurista === 'com-amigos') {
                router.push(`/comecar?etapa=05-mais-info&tipo=turista&sub=quantas-pessoas`);
                return;
              } else if (maisInfoTurista === 'sozinho') {
                router.push(`/comecar?etapa=05-mais-info&tipo=turista&sub=quanto-tempo`);
                return;
              }
            }
            // Se tem sub=quantas-pessoas, vai para quanto-tempo
            else if (sub === 'quantas-pessoas') {
              router.push(`/comecar?etapa=05-mais-info&tipo=turista&sub=quanto-tempo`);
              return;
            }
            // Se tem sub=quanto-tempo, vai para próxima etapa
            else if (sub === 'quanto-tempo') {
              router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}`);
              return;
            }
          }
        }

        // Lógica especial para etapa 9 - redirecionar para /result
        if (novaEtapa === 9) {
          router.push('/result');
          return;
        }

        router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}`);
      }
    }
  };

  const etapaAnterior = () => {
    const sub = searchParams.get('sub');
    const tipo = searchParams.get('tipo');

    if (sub === 'quantas-pessoas') {
      router.push(`/comecar?etapa=05-mais-info&tipo=turista`);
      return;
    }

    if (sub === 'quanto-tempo') {
      router.push(`/comecar?etapa=05-mais-info&tipo=turista`);
      return;
    }

    if (etapaAtual > 1) {
      const novaEtapa = etapaAtual - 1;
      const etapa = etapas.find(e => e.id === novaEtapa);
      if (etapa) {
        const etapaFormatada = novaEtapa.toString().padStart(2, '0');

        if (etapaAtual === 5 && tipo === 'turista') {
          router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&visto=turista`);
          return;
        }

        // Lógica para etapa 6 (Renda) voltar para etapa 5 com tipo correto
        if (etapaAtual === 6) {
          const service = watch('service');
          if (service === 'Student Visa') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=estudante`);
            return;
          } else if (service === 'Immigrant Visa') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=profissional`);
            return;
          } else if (service === 'Tourist Visa') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=turista`);
            return;
          }
        }

        // Lógica para etapa 7 (Contato) com sub-etapas
        if (etapaAtual === 7) {
          const sub = searchParams.get('sub');
          if (sub === 'contato-02') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&sub=contato-01`);
            return;
          } else if (sub === 'contato-03') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&sub=contato-02`);
            return;
          } else {
            // Volta para etapa 6 (Renda)
            router.push(`/comecar?etapa=06-renda`);
            return;
          }
        }

        router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}`);
      }
    }
  };

  // Renderiza o componente da etapa atual
  const renderizarEtapa = () => {
    switch (etapaAtual) {
      case 1:
        return (
          <HeroInicio
            onIniciar={proximaEtapa}
          />
        );
      case 2:
        return (
          <DestinoOptions
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            onProximo={proximaEtapa}
            onVoltar={etapaAnterior}
            etapaAtual={etapaAtual}
            totalEtapas={etapas.length}
          />
        );
      case 3:
        return (
          <ObjetivoOptions
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            onProximo={proximaEtapa}
            onVoltar={etapaAnterior}
            etapaAtual={etapaAtual}
            totalEtapas={etapas.length}
          />
        );
      case 4:
        // Lógica condicional baseada no parâmetro da URL
        const tipoVisto = searchParams.get('visto');
        if (tipoVisto === 'estudante') {
          return (
            <EstudanteOptions
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onProximo={proximaEtapa}
              onVoltar={etapaAnterior}
              etapaAtual={etapaAtual}
              totalEtapas={etapas.length}
            />
          );
        } else if (tipoVisto === 'turista') {
          return (
            <TurismoOptions
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onProximo={proximaEtapa}
              onVoltar={etapaAnterior}
              etapaAtual={etapaAtual}
              totalEtapas={etapas.length}
            />
          );
        } else if (tipoVisto === 'profissional') {
          return (
            <ProfissionalOptions
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onProximo={proximaEtapa}
              onVoltar={etapaAnterior}
              etapaAtual={etapaAtual}
              totalEtapas={etapas.length}
            />
          );
        }
        return <div>Etapa 4 - Tipo de Visto (em breve)</div>;
      case 5:
        // Lógica condicional baseada no parâmetro da URL
        const tipoFormacao = searchParams.get('tipo');
        if (tipoFormacao === 'estudante') {
          return (
            <MaisInfoEstudante
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onProximo={proximaEtapa}
              onVoltar={etapaAnterior}
              etapaAtual={etapaAtual}
              totalEtapas={etapas.length}
            />
          );
        } else if (tipoFormacao === 'profissional') {
          return (
            <MaisInfoProfissionalFormacao
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onProximo={proximaEtapa}
              onVoltar={etapaAnterior}
              etapaAtual={etapaAtual}
              totalEtapas={etapas.length}
            />
          );
        } else if (tipoFormacao === 'turista') {
          const sub = searchParams.get('sub');
          if (sub === 'formacao') {
            return (
              <MaisInfoTuristaFormacao
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                onProximo={proximaEtapa}
                onVoltar={etapaAnterior}
                etapaAtual={etapaAtual}
                totalEtapas={etapas.length}
              />
            );
          } else if (sub === 'quantas-pessoas') {
            return (
              <MaisInfoTurista02
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                onProximo={proximaEtapa}
                onVoltar={etapaAnterior}
                etapaAtual={etapaAtual}
                totalEtapas={etapas.length}
              />
            );
          } else if (sub === 'quanto-tempo') {
            return (
              <MaisInfoTurista03
                setValue={setValue}
                onProximo={proximaEtapa}
                onVoltar={etapaAnterior}
                etapaAtual={etapaAtual}
                totalEtapas={etapas.length}
              />
            );
          } else {
            return (
              <MaisInfoTurista
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                onProximo={proximaEtapa}
                onVoltar={etapaAnterior}
                etapaAtual={etapaAtual}
                totalEtapas={etapas.length}
              />
            );
          }
        }
        return <div>Etapa 5 - Formação (em breve)</div>;
      case 6:
        // Lógica condicional baseada no parâmetro da URL
        const tipoExperiencia = searchParams.get('tipo');
        if (tipoExperiencia === 'profissional') {
          return (
            <MaisInfoProfissional
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onProximo={proximaEtapa}
              onVoltar={etapaAnterior}
              etapaAtual={etapaAtual}
              totalEtapas={etapas.length}
            />
          );
        }
        // Para outros fluxos, pular direto para a próxima etapa
        return (
          <RendaOptions
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            onProximo={proximaEtapa}
            onVoltar={etapaAnterior}
            etapaAtual={etapaAtual}
            totalEtapas={etapas.length}
          />
        );
      case 7:
        return (
          <RendaOptions
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            onProximo={proximaEtapa}
            onVoltar={etapaAnterior}
            etapaAtual={etapaAtual}
            totalEtapas={etapas.length}
          />
        );
      case 8:
        const contatoSub = searchParams.get('sub');
        if (contatoSub === 'contato-01') {
          return (
            <ContatoForm01
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onProximo={() => router.push('/comecar?etapa=08-contato&sub=contato-02')}
              onVoltar={etapaAnterior}
              etapaAtual={etapaAtual}
              totalEtapas={etapas.length}
            />
          );
        } else if (contatoSub === 'contato-02') {
          return (
            <ContatoForm02
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onProximo={() => router.push('/comecar?etapa=08-contato&sub=contato-03')}
              onVoltar={etapaAnterior}
              etapaAtual={etapaAtual}
              totalEtapas={etapas.length}
            />
          );
        } else if (contatoSub === 'contato-03') {
          return (
            <ContatoForm03
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onProximo={proximaEtapa}
              onVoltar={etapaAnterior}
              etapaAtual={etapaAtual}
              totalEtapas={etapas.length}
            />
          );
        } else {
          // Default: primeira sub-etapa
          return (
            <ContatoForm01
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onProximo={() => router.push('/comecar?etapa=08-contato&sub=contato-02')}
              onVoltar={etapaAnterior}
              etapaAtual={etapaAtual}
              totalEtapas={etapas.length}
            />
          );
        }
      case 9:
        return <ResultadoPage />;
      case 10:
        return <ResultadoPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {renderizarEtapa()}
    </div>
  );
}
