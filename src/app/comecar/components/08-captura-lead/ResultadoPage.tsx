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
  maisInfoProfissionalFormacao?: string;
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
  academicBackground?: string;
  contactChannel?: string;
  utm_data?: {
    utm_campaign?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_term?: string;
    utm_referrer?: string;
  };
}

const serviceMapping: { [key: string]: string } = {
  "crescer-profissionalmente": "Visto Temporario de Trabalho",
  "empreender-investir": "Visto de Investimento",
  "estudar-fora": "Student Visa (Visto de Estudante)",
  "conhecer-mundo": "Tourist Visa (Visto de Turista)",
  // Adicionando outras opções que podem aparecer
  "green-card": "Green card ou outro Visto de Residência Permantente",
  "familia": "Pedido de Visto por Relação Familiar",
  "corporativo": "Vistos Corporativos",
  "europeu": "Vistos para País Europeu",
  "asilo": "Asilo"
};

// Mapeamentos de respostas do stepper para Salesforce
const academicBackgroundMapping: { [key: string]: string } = {
  "High School (Ensino Medio)": "High School (Ensino Medio)",
  "Professional Certificates / Certificados Profissionais": "Professional Certificates / Certificados Profissionais",
  "Technician / College (Nivel tecnico)": "Technician / College (Nivel tecnico)", 
  "Baccalaureate Degree (Nivel Superior / Bacharelado)": "Baccalaureate Degree (Nivel Superior / Bacharelado)",
  "Post Graduation (Pos Graduacao)": "Post Graduation (Pos Graduacao)",
  "Master Degree (Mestrado)": "Master Degree (Mestrado)",
  "Doctorate Degree (Doutorado)": "Doctorate Degree (Doutorado)",
  "Post Doctorate (Pos Doutorado)": "Post Doctorate (Pos Doutorado)"
};

const dependantsMapping: { [key: string]: string } = {
  "0": "0",
  "1": "1", 
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "MoreThan5": "Mais que 5"
};

const incomeMapping: { [key: string]: string } = {
  "Less than $50,000": "Less than $50,000",
  "$50,000 to $199,999": "$50,000 to $199,999", 
  "$200,000 to $499,999": "$200,000 to $499,999",
  "$500,000 to $999,999": "$500,000 to $999,999",
  "$1,000,000 +": "$1,000,000+",
  "50k-199k": "$50,000 to $199,999"
};

const languageMapping: { [key: string]: string } = {
  "Portuguese - Português": "Portuguese - Portugues",
  "Spanish - Espanhol": "Spanish - Espanhol", 
  "English - Inglês": "English - Ingles",
  "Turkish - Turco": "Turkish - Turco",
  "Mandarin Chinese - Mandarin": "Mandarin Chinese - Mandarin",
  "Inglês": "English - Ingles"
};

const experienceTimeMapping: { [key: string]: string } = {
  "menos-5-anos": "Less than 5 years",
  "5-a-10-anos": "From 5 to 10 years", 
  "mais-de-10-anos": "Over 10 years"
};

// Mapeamento de países (apenas Portugal e Estados Unidos no step 1)
const countryMapping: { [key: string]: string } = {
  "Portugal": "Portugal",
  "United States": "USA",
  "United States of America (USA)": "USA",
  "estados-unidos": "USA",
  "portugal": "Portugal"
};

export default function ResultadoPage() {
  const [formData, setFormData] = useState<StepperFormDataInterface>({});


  // Função para filtrar campos vazios antes de enviar para Salesforce
  const filterEmptyFields = (data: Record<string, unknown>) => {
    const filtered: Record<string, unknown> = {};
    Object.keys(data).forEach(key => {
      if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
        filtered[key] = data[key];
      }
    });
    return filtered;
  };

  // Função para mapear dados do stepper para Salesforce
  const mapDataForSalesforce = (data: StepperFormDataInterface) => {
    return {
      firstName: data.nomeCompleto?.split(' ')[0] || '',
      lastName: data.nomeCompleto?.split(' ').slice(1).join(' ') || '',
      email: data.email || '',
      country: data.destino ? countryMapping[data.destino] || 'USA' : 'USA',
      nationality: data.pais ? countryMapping[data.pais] || 'USA' : 'USA',
      phone: data.telefone || '',
      service: data.objetivo ? serviceMapping[data.objetivo] || 'Visto Temporario de Trabalho' : 'Visto Temporario de Trabalho',
      subSource: 'AI Form',
      academicBackground: data.maisInfoProfissionalFormacao ? academicBackgroundMapping[data.maisInfoProfissionalFormacao] || 'Baccalaureate Degree (Nivel Superior / Bacharelado)' : 'Baccalaureate Degree (Nivel Superior / Bacharelado)',
      leadSource: 'Website',
      migrateTo: data.destino ? countryMapping[data.destino] || 'USA' : 'USA',
      occupation: data.profissionalOpcao || 'Professional',
      language: data.idioma ? languageMapping[data.idioma] || 'English - Ingles' : 'English - Ingles',
      timeExperience: data.quantoTempo ? experienceTimeMapping[data.quantoTempo] || 'From 5 to 10 years' : 'From 5 to 10 years',
      contactChannel: 'Contact by email',
      additionalInfo: data.quantasPessoas ? dependantsMapping[data.quantasPessoas] || 'Adultos' : 'Adultos',
      whatsapp: Boolean(data.telefone),
      annualIncome: data.rendaAnual ? incomeMapping[data.rendaAnual] || '$50,000 to $199,999' : '$50,000 to $199,999',
      utm: typeof window !== 'undefined' ? localStorage.getItem('utm') || '' : '',
      source: typeof window !== 'undefined' ? localStorage.getItem('source') || '' : '',
      medium: typeof window !== 'undefined' ? localStorage.getItem('medium') || '' : '',
      term: typeof window !== 'undefined' ? localStorage.getItem('term') || '' : '',
      refer: typeof window !== 'undefined' ? localStorage.getItem('refer') || '' : '',
      campaign: typeof window !== 'undefined' ? localStorage.getItem('utm') || '' : '',
      sellerId: typeof window !== 'undefined' ? localStorage.getItem('seller') || '005UJ0000089qqnYAA' : '005UJ0000089qqnYAA'
    };
  };

  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window === 'undefined') return;
    
    // Capturar dados do localStorage
    const savedData = localStorage.getItem('stepperData');
    
    // Se não há dados salvos, não fazer nada
    if (!savedData) {
      return;
    }

    let parsedData;
    try {
      parsedData = JSON.parse(savedData);
    } catch {
      return;
    }
    
    setFormData(parsedData);

    // Mapear dados para Salesforce
    const salesforceData = mapDataForSalesforce(parsedData);
    
    // Filtrar campos vazios
    const filteredData = filterEmptyFields(salesforceData);

      const fetchData = async () => {
        try {
          const response = await fetch("/api/usa-ai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(filteredData),
          });

          if (response.status === 200 || response.status === 201) {
            const data = await response.json();

            const leadOwner = data?.user?.leadOwner;
            if (!leadOwner) throw new Error("leadOwner não encontrado!");

            const sellerIdToUse = localStorage.getItem('seller') || leadOwner;

            const sellerResponse = await fetch(
              `https://api.yellowvisa.com/api/get-seller/${sellerIdToUse}`
            );

            if (!sellerResponse.ok) {
              throw new Error(
                `Erro na segunda requisição: ${sellerResponse.statusText}`
              );
            }

            const sellerData = await sellerResponse.json();

            localStorage.setItem("seller_phone", sellerData.phone);
          } else {
            throw new Error(`API Error: ${response.statusText}`);
          }
        } catch {
          // Erro silencioso
        }
      };

      fetchData();
      
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

  // const vistosRecomendados = getRecommendedVistos();

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
