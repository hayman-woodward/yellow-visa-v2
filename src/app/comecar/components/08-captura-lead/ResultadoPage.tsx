'use client';

import { YVText, YVTitle } from '@/components/YV';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResultadoProvisorio from './ResultadoProvisorio';

interface StepperFormDataInterface {
  destino?: string;
  objetivo?: string;
  estudanteOpcao?: string;
  turismoOpcao?: string;
  profissionalOpcao?: string;
  maisInfoEstudante?: string;
  maisInfoProfissional?: string;
  maisInfoTurista?: string;
  quantasPessoas?: string;
  quantoTempo?: string;
  rendaAnual?: string;
  tipoVisto?: string;
  nomeCompleto?: string;
  email?: string;
  telefone?: string;
  pais?: string;
  idioma?: string;
}

export default function ResultadoPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<StepperFormDataInterface>({});

  useEffect(() => {
    // Capturar dados do localStorage
    const savedData = localStorage.getItem('stepperData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);

      // Pegar UTMs do localStorage
      const utmData = localStorage.getItem('utm_data');
      
      // Salvar lead via API Route
      fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...parsedData,
          utm_data: utmData ? JSON.parse(utmData) : null
        }),
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            console.log('Lead salvo com sucesso:', result.lead);
          } else {
            console.error('Erro ao salvar lead:', result.error);
          }
        })
        .catch(error => {
          console.error('Erro ao salvar lead:', error);
        });
    }

    // Limpar localStorage após capturar (processo finalizado)
    localStorage.removeItem('stepperData');
  }, []);

  // Lógica para determinar vistos recomendados (será definida pelo cliente)
  const getRecommendedVistos = () => {
    // Placeholder - será implementado com as regras do cliente
    return [
      {
        id: 'eb-1a',
        title: 'EB-1A',
        description: 'Para pessoas em uma área profissional ou acadêmica específica ou com especialização específica, que possuam diploma universitário ou superior, ou experiência profissional equivalente. O período inicial de permanência é de 3 anos, mas você pode solicitar uma extensão.',
        link: '/vistos/eb-1a'
      },
      {
        id: 'eb-1b',
        title: 'EB-1B',
        description: 'Para pessoas em uma área profissional ou acadêmica específica ou com especialização específica, que possuam diploma universitário ou superior, ou experiência profissional equivalente. O período inicial de permanência é de 3 anos, mas você pode solicitar uma extensão.',
        link: '/vistos/eb-1b'
      },
      {
        id: 'eb-3',
        title: 'EB-3',
        description: 'Para pessoas em uma área profissional ou acadêmica específica ou com especialização específica, que possuam diploma universitário ou superior, ou experiência profissional equivalente. O período inicial de permanência é de 3 anos, mas você pode solicitar uma extensão.',
        link: '/vistos/eb-3'
      }
    ];
  };
  const cidadesData = [
    {
      id: '01',
      src: '/imgs/vistos/visto/visto-01.jpg',
      alt: 'Cidade de Nova Iorque, NY',
      title: 'Cidade de Nova Iorque, NY',
      description: 'Oportunidades Profissionais: Sendo o centro financeiro do país, a Cidade de Nova York oferece inúmeras oportunidades profissionais, especialmente em finanças, mídia e tecnologia.',
    },
    {
      id: '02',
      src: '/imgs/vistos/visto/visto-01.jpg',
      alt: 'São Francisco, CA',
      title: 'São Francisco, CA',
      description: 'Inovação e Tecnologia: Como um polo tecnológico, São Francisco atrai profissionais de tecnologia devido à presença de empresas renomadas no Vale do Silício.',
    },
    {
      id: '03',
      src: '/imgs/vistos/visto/visto-01.jpg',
      alt: 'Austin, TX',
      title: 'Austin, TX',
      description: 'Crescimento Econômico: Austin tem experimentado um rápido crescimento econômico impulsionado pela presença de empresas de tecnologia e uma cultura empreendedora vibrante.',
    },
    {
      id: '04',
      src: '/imgs/vistos/visto/visto-01.jpg',
      alt: 'Denver, CO',
      title: 'Denver, CO',
      description: 'Qualidade de Vida: Denver é frequentemente elogiada por sua alta qualidade de vida, com fácil acesso às Montanhas Rochosas para atividades ao ar livre durante todo o ano.',
    }
  ];

  const vistosRecomendados = getRecommendedVistos();

  return (
    <div className="w-full min-h-screen bg-white">


      {/* Seção principal - Fundo amarelo */}
      <div className="bg-[#FFBD1A] pt-20 pb-5">
        <div className="max-w-4xl mx-auto px-4 pt-20 sm:px-6 lg:px-8 lg:pr-15">
          <YVTitle variant="hero">
            {formData.nomeCompleto || 'Usuário'}, já demos o primeiro passo!
          </YVTitle>

          <YVText className='max-w-2xl pb-1 md:pb-2'>
            Agora que você respondeu nosso quiz, temos um caminho inicial pensado especialmente para o seu perfil. Vamos te explicar o que pode funcionar melhor pra você, e o que fazer a seguir.
            Lembre-se: imigração não é só um processo, é um plano de vida, e a gente tá aqui pra construir isso junto com você. 💛
          </YVText>
          {/* <div className='py-[12px]'>
            <Link
              href="/comecar"
              className="text-[#CC0044] hover:text-orange-700  text-xs font-bold "
            >
              Refazer o teste
            </Link>
          </div> */}
        </div>
      </div>
      <ResultadoProvisorio />

      {/* Seção de recomendações */}
      {/* <div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <YVTitle variant='subtitle' className='mt-5 mb-4'>
            Com seu histórico profissional e tempo de experiência, você pode ser um ótimo candidato para processos como:
          </YVTitle>

          <div className="bg-[#CCC2C5] rounded-2xl py-10 px-10 lg:px-20">
            <div>
              {vistosRecomendados.map((visto) => (
                <div key={visto.id} className="last:border-b-0">
                  <YVTitle variant='subtitle'>
                    {visto.title}
                  </YVTitle>
                  <YVText className="text-gray-700 pb-2 lg:pr-5">
                    {visto.description}
                  </YVText>
                  <div className='py-5 mb-6'>
                    <Link
                      href={visto.link}
                      className="text-[#CC0044] hover:text-red-800 font-bold text-xs"
                    >
                      → Mais detalhes do visto {visto.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* <YVText className='py-4'>
            Nos próximos passos, vamos analisar seus detalhes mais a fundo e indicar o melhor
            caminho com base no seu potencial real de elegibilidade.
          </YVText> */}


          {/* Pessoas com seu perfil foram para: */}
          {/* <div className='bg-white py-10  max-w-4xl mx-auto'>

            <div className='flex flex-col'>
              <div className='md:pr-7 xl:pr-20'>

                <YVTitle>
                  Pessoas com seu perfil foram para:
                </YVTitle>
              </div>

              <div className='flex-1'>
                <YVGallery
                  items={cidadesData}
                  variant='masonry'
                  columns={1}
                  gap='24px'
                  showTitles={true}
                  showDescriptions={true}
                  aspectRatio='auto'
                  imageClassName='lw-[391px] h-[200px] object-cover rounded-lg '
                  className='w-full xl:columns-2 '
                />
              </div>
            </div>

          </div>
        </div> */}
      {/* </div> */}      
    </div>
  );
}
