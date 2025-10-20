'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

// Import dos componentes das etapas
import HeroInicio from './01-inicio/HeroInicio';
import DestinoOptions from './02-destino/DestinoOptions';
import ObjetivoOptions from './03-objetivo/ObjetivoOptions';
import EstudanteOptions from './04-tipo-de-visto/EstudanteOptions';
import TurismoOptions from './04-tipo-de-visto/TurismoOptions';
import ProfissionalOptions from './04-tipo-de-visto/ProfissionalOptions';
import MaisInfoEstudante from './05-mais-info/MaisInfoEstudante';
import MaisInfoProfissional from './05-mais-info/MaisInfoProfissional';
import MaisInfoTurista from './05-mais-info/MaisInfoTurista01';
import MaisInfoTurista02 from './05-mais-info/MaisInfoTurista02';

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

  // Etapa 3 - Objetivo
  objetivo: z.string().optional(),

  // Etapa 4 - Tipo de Visto
  estudanteOpcao: z.string().optional(),
  turismoOpcao: z.string().optional(),
  profissionalOpcao: z.string().optional(),

  // Etapa 5 - Mais Info
  maisInfoEstudante: z.string().optional(),
  maisInfoProfissional: z.string().optional(),
  maisInfoTurista: z.string().optional(),
  quantasPessoas: z.string().optional(),
  quantoTempo: z.string().optional(),

  // Etapa 6 - Renda
  rendaAnual: z.string().optional(),
  tipoVisto: z.string().optional(),

  // Etapa 7 - Contato
  nomeCompleto: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .refine((nome) => {
      if (!nome) return true; // Permitir campo vazio se for opcional
      const partes = nome.trim().split(/\s+/);
      return partes.length >= 2;
    }, 'Digite seu nome completo (nome e sobrenome)')
    .optional(),
  email: z.string().email('Email inválido').optional(),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos').optional(),
  pais: z.string().min(2, 'País deve ter pelo menos 2 caracteres').optional(),
  idioma: z.string().min(1, 'Idioma é obrigatório').optional()
});

type StepperFormData = z.infer<typeof formSchema>;

export type { StepperFormData };

// Interface unificada para todos os componentes
export interface StepperFormDataInterface {
  // Etapa 1 - Início
  // (sem campos específicos)

  // Etapa 2 - Destino
  destino?: string;

  // Etapa 3 - Objetivo
  objetivo?: string;

  // Etapa 4 - Tipo de Visto
  estudanteOpcao?: string;
  turismoOpcao?: string;
  profissionalOpcao?: string;

  // Etapa 5 - Mais Info
  maisInfoEstudante?: string;
  maisInfoProfissional?: string;
  maisInfoTurista?: string;
  quantasPessoas?: string;
  quantoTempo?: string;

  // Etapa 6 - Renda
  rendaAnual?: string;
  tipoVisto?: string;

  // Etapa 7 - Contato
  nomeCompleto?: string;
  email?: string;
  telefone?: string;
  pais?: string;
  idioma?: string;
}

// Definição das 7 etapas
const etapas = [
  { id: 1, title: 'Início', description: 'Bem-vindo', slug: 'inicio' },
  { id: 2, title: 'Destino', description: 'Seu sonho', slug: 'destino' },
  { id: 3, title: 'Objetivo', description: 'Sua motivação', slug: 'objetivo' },
  { id: 4, title: 'Tipo de Visto', description: 'Sua categoria', slug: 'tipo-visto' },
  { id: 5, title: 'Mais Info', description: 'Mais informações', slug: 'mais-info' },
  { id: 6, title: 'Renda', description: 'Sua renda', slug: 'renda' },
  { id: 7, title: 'Contato', description: 'Seus dados', slug: 'contato' },
  { id: 8, title: 'Captura Lead', description: 'Confirmação', slug: 'captura-lead' },
  { id: 9, title: 'Resultado', description: 'Sua jornada', slug: 'resultado' }
];

interface VistoStepperProps {
  etapaInicial: number;
}

export default function VistoStepper({ etapaInicial }: VistoStepperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [etapaAtual, setEtapaAtual] = useState(etapaInicial);

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

  // Salvar dados automaticamente no localStorage
  useEffect(() => {
    try {
      // Criar um objeto limpo apenas com os valores dos campos
      const cleanData = {
        destino: watchedFields.destino || '',
        objetivo: watchedFields.objetivo || '',
        estudanteOpcao: watchedFields.estudanteOpcao || '',
        turismoOpcao: watchedFields.turismoOpcao || '',
        profissionalOpcao: watchedFields.profissionalOpcao || '',
        maisInfoEstudante: watchedFields.maisInfoEstudante || '',
        maisInfoProfissional: watchedFields.maisInfoProfissional || '',
        maisInfoTurista: watchedFields.maisInfoTurista || '',
        quantasPessoas: watchedFields.quantasPessoas || '',
        quantoTempo: watchedFields.quantoTempo || '',
        rendaAnual: watchedFields.rendaAnual || '',
        nomeCompleto: watchedFields.nomeCompleto || '',
        email: watchedFields.email || '',
        telefone: watchedFields.telefone || '',
        pais: watchedFields.pais || '',
        idioma: watchedFields.idioma || ''
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
    if (etapaAtual < etapas.length) {
      const novaEtapa = etapaAtual + 1;
      const etapa = etapas.find(e => e.id === novaEtapa);
      if (etapa) {
        const etapaFormatada = novaEtapa.toString().padStart(2, '0');

        // Lógica para etapa 4 - adicionar parâmetro de tipo de visto
        if (novaEtapa === 4) {
          const objetivo = watch('objetivo');
          if (objetivo === 'estudar-fora') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&visto=estudante`);
            return;
          } else if (objetivo === 'conhecer-mundo') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&visto=turista`);
            return;
          } else if (objetivo === 'crescer-profissionalmente' || objetivo === 'empreender-investir') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&visto=profissional`);
            return;
          }
        }

        // Lógica para etapa 5 - mais info
        if (novaEtapa === 5) {
          const objetivo = watch('objetivo');
          if (objetivo === 'estudar-fora') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=estudante`);
            return;
          } else if (objetivo === 'crescer-profissionalmente' || objetivo === 'empreender-investir') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=profissional`);
            return;
          } else if (objetivo === 'conhecer-mundo') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=turista`);
            return;
          }
        }

        // Lógica para etapa 5 - navegação do turista
        if (etapaAtual === 5) {
          const sub = searchParams.get('sub');
          const objetivo = watch('objetivo');
          const maisInfoTurista = watch('maisInfoTurista');

          if (objetivo === 'conhecer-mundo') {
            // Se não tem sub, é a primeira vez na etapa 5
            if (!sub) {
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

        // Lógica especial para etapa 8 - redirecionar para /result
        if (novaEtapa === 8) {
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
          const objetivo = watch('objetivo');
          if (objetivo === 'estudar-fora') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=estudante`);
            return;
          } else if (objetivo === 'crescer-profissionalmente' || objetivo === 'empreender-investir') {
            router.push(`/comecar?etapa=${etapaFormatada}-${etapa.slug}&tipo=profissional`);
            return;
          } else if (objetivo === 'conhecer-mundo') {
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
        const tipo = searchParams.get('tipo');
        if (tipo === 'estudante') {
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
        } else if (tipo === 'profissional') {
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
        } else if (tipo === 'turista') {
          const sub = searchParams.get('sub');
          if (sub === 'quantas-pessoas') {
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
        return <div>Etapa 5 - Renda (em breve)</div>;
      case 6:
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
        const contatoSub = searchParams.get('sub');
        if (contatoSub === 'contato-01') {
          return (
            <ContatoForm01
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onProximo={() => router.push('/comecar?etapa=07-contato&sub=contato-02')}
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
              onProximo={() => router.push('/comecar?etapa=07-contato&sub=contato-03')}
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
              onProximo={() => router.push('/comecar?etapa=07-contato&sub=contato-02')}
              onVoltar={etapaAnterior}
              etapaAtual={etapaAtual}
              totalEtapas={etapas.length}
            />
          );
        }
      case 8:
        return <ResultadoPage />;
      case 9:
        return <div>Etapa 9 - Resultado (em breve)</div>;
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
