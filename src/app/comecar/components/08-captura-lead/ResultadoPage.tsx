'use client';

import { YVText, YVTitle } from '@/components/YV';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ResultadoProvisorio from './ResultadoProvisorio';
import { useStepperTracking } from '@/hooks/tracks/useStepperTracking';
import { normalizePhone } from '@/lib/utils';

interface StepperFormDataInterface {
  destino?: string;
  service?: string;
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
  nome?: string;
  sobrenome?: string;
  nomeCompleto?: string; // Compatibilidade com dados antigos
  email?: string;
  telefone?: string;
  whatsapp?: boolean;
  pais?: string;
  language?: string;
  academicBackground?: string;
  contactChannel?: string;
  howDidYouFindUs?: string;
  additionalInfoText?: string;
  utm_data?: {
    utm_campaign?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_term?: string;
    utm_referrer?: string;
  };
}


// Mapeamentos de respostas do stepper para Salesforce
const academicBackgroundMapping: { [key: string]: string } = {
  "High School (Ensino Medio)": "High School (Ensino Medio)",
  "Professional Certificates / Certificados Profissionais": "Professional Certificates / Certificados Profissionais",
  "Technician / College (Nivel tecnico)": "Technician / College (Nivel tecnico)", 
  "Baccalaureate Degree (Nivel Superior / Bacharelado)": "Baccalaureate Degree (Nivel Superior / Bacharelado)",
  "Post Graduation (Pos Graduacao)": "Post Graduation (Pos Graduacao)",
  "Master Degree (Mestrado)": "Master Degree (Mestrado)",
  "Doctorate Degree (Doutorado)": "Doctorate Degree (Doutorado)",
  "Post Doctorate (Pos Doutorado)": "Post Doctorate (Pos Doutorado)",
  // Mapeamento para estudante
  "ja-tenho-graduacao": "Baccalaureate Degree (Nivel Superior / Bacharelado)",
  "formacao-tecnica": "Technician / College (Nivel tecnico)",
  "construindo-trajetoria": "High School (Ensino Medio)",
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

const turismoMapping: { [key: string]: string } = {
  "sozinho": "Sozinho",
  "em-familia": "Com a família",
  "com-amigos": "Com amigos",
  "momentos-inesqueciveis": "Momentos inesquecíveis com quem amo",
  "explorar-encontrar-amor": "Explorar novos lugares, sabores e culturas",
  "respiro-reconectar": "Preciso de um respiro, me reconectar"
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
  "Português": "Portuguese - Português",
  "Espanhol": "Spanish - Espanhol",
  "Inglês": "English - Inglês",
  "Turco": "Turkish - Turco",
  "Chinês (Mandarim)": "Mandarin Chinese - Mandarin"
};

const experienceTimeMapping: { [key: string]: string } = {
  "menos-5-anos": "Less than 5 years",
  "5-a-10-anos": "From 5 to 10 years", 
  "mais-de-10-anos": "Over 10 years"
};

const contactChannelMapping: { [key: string]: string } = {
  "whatsapp": "Contact via WhatsApp",
  "email": "Contact via Email",
  "telefone": "Contact via Phone"
};

const howDidYouFindUsMapping: { [key: string]: string } = {
  "direct": "Digitei o site direto ou já conhecia",
  "google": "Busquei no Google e encontrei vocês",
  "instagram": "Vi no Instagram ou TikTok",
  "facebook": "Vi no Facebook ou LinkedIn",
  "referral": "Alguém me indicou",
  "influencer": "Vi através de um influenciador",
  "email": "Recebi por e-mail ou WhatsApp",
  "youtube": "Vi um vídeo no YouTube",
  "other": "Outro caminho"
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
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<StepperFormDataInterface>({});
  const { trackConversion } = useStepperTracking();
  
  // Capturar parâmetros da URL para distribuição de leads
  const sellerId = searchParams.get('seller');
  const championId = searchParams.get('champion');

  // Função para filtrar campos vazios antes de enviar para Salesforce
  const filterEmptyFields = (data: Record<string, unknown>) => {
    const filtered: Record<string, unknown> = {};
    Object.keys(data).forEach(key => {
      // Não filtrar campos UTM (sempre enviar, mesmo se vazios)
      if (key === 'utm' || key === 'source' || key === 'medium' || key === 'term' || key === 'refer' || key === 'campaign' || key === 'event') {
        filtered[key] = data[key];
      } else if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
        filtered[key] = data[key];
      }
    });
    return filtered;
  };

  // Função helper para combinar howDidYouFindUs e additionalInfoText
  const buildMoreInfo = (howDidYouFindUs?: string, additionalInfoText?: string): string => {
    const parts = [];
    if (howDidYouFindUs) {
      const mapped = howDidYouFindUsMapping[howDidYouFindUs] || howDidYouFindUs;
      parts.push(`Como chegou: ${mapped}`);
    }
    if (additionalInfoText) {
      parts.push(`Info adicional: ${additionalInfoText}`);
    }
    return parts.length > 0 ? parts.join(' | ') : '';
  };

  // Função para mapear dados do stepper para Salesforce
  const mapDataForSalesforce = (data: StepperFormDataInterface) => {
    // API externa (USA-AI) espera firstName e lastName SEPARADOS
    let firstName = data.nome || '';
    let lastName = data.sobrenome || '';
    
    // Se tem nomeCompleto antigo mas não tem nome/sobrenome, fazer split
    if (data.nomeCompleto && !firstName && !lastName) {
      const partes = data.nomeCompleto.trim().split(/\s+/);
      firstName = partes[0] || '';
      lastName = partes.slice(1).join(' ') || '';
    }
    
    // Validar telefone - só enviar se tiver pelo menos 10 dígitos
    const telefoneValido = normalizePhone(data.telefone) || '';
    
    return {
      firstName,
      lastName,
      email: data.email || '',
      country: data.destino ? countryMapping[data.destino] || 'USA' : 'USA',
      nationality: data.pais ? countryMapping[data.pais] || 'USA' : 'USA',
      phone: telefoneValido,
      service: data.service || 'Immigrant Visa',
      subSource: 'AI Form',
      academicBackground: data.maisInfoProfissionalFormacao ? academicBackgroundMapping[data.maisInfoProfissionalFormacao] : 
                          data.maisInfoEstudante ? academicBackgroundMapping[data.maisInfoEstudante] : 
                          'Baccalaureate Degree (Nivel Superior / Bacharelado)',
      leadSource: 'Website',
      migrateTo: data.destino ? countryMapping[data.destino] || 'USA' : 'USA',
      occupation: data.profissionalOpcao || data.estudanteOpcao || 'Tourist',
      language: data.language ? languageMapping[data.language] || 'English - Inglês' : 'English - Inglês',
      timeExperience: data.quantoTempo ? experienceTimeMapping[data.quantoTempo] || 'From 5 to 10 years' : 'From 5 to 10 years',
      contactChannel: data.contactChannel ? contactChannelMapping[data.contactChannel] || 'Contact by email' : 'Contact by email',
      additionalInfo: buildMoreInfo(data.howDidYouFindUs, data.additionalInfoText) || 
                      (data.quantasPessoas ? dependantsMapping[data.quantasPessoas] : 
                      data.maisInfoTurista ? turismoMapping[data.maisInfoTurista] : 
                      data.turismoOpcao ? turismoMapping[data.turismoOpcao] : 'Adultos'),
      whatsapp: Boolean(data.whatsapp),
      annualIncome: data.rendaAnual ? incomeMapping[data.rendaAnual] || '$50,000 to $199,999' : '$50,000 to $199,999',
      utm: data.utm_data?.utm_campaign || '',
      source: data.utm_data?.utm_source || '',
      medium: data.utm_data?.utm_medium || '',
      term: data.utm_data?.utm_term || '',
      refer: championId || data.utm_data?.utm_referrer || '', // Champion tem prioridade sobre UTM referrer
      campaign: data.utm_data?.utm_campaign || '',
      event: null, // Campo event sempre null por enquanto
      // sellerId e championId serão enviados se existirem na URL
      sellerId: sellerId || undefined,
      championId: championId || undefined
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

    let parsedData: StepperFormDataInterface;
    try {
      parsedData = JSON.parse(savedData);
    } catch {
      return;
    }

    // Carregar UTMs do localStorage
    const utmData = localStorage.getItem('utm_data');
    if (utmData) {
      try {
        parsedData.utm_data = JSON.parse(utmData);
        console.log('🔍 UTMs carregados:', parsedData.utm_data);
      } catch (error) {
        console.error('Erro ao carregar UTMs:', error);
      }
    } else {
      console.log('⚠️ Nenhum UTM encontrado no localStorage');
    }
    
    setFormData(parsedData);

    // Mapear dados para Salesforce
    const salesforceData = mapDataForSalesforce(parsedData);
    console.log('🔍 Dados mapeados para Salesforce:', salesforceData);
    
    // Filtrar campos vazios
    const filteredData = filterEmptyFields(salesforceData);
    console.log('🔍 Dados filtrados:', filteredData);

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

            // sellerPhone já vem na resposta da API usa-ai
            if (data.sellerPhone) {
              localStorage.setItem("seller_phone", data.sellerPhone);
            }
          } else {
            throw new Error(`API Error: ${response.statusText}`);
          }
        } catch {
          // Erro silencioso
        }
      };

      fetchData();
      
      // Salvar no banco local também
      const saveToLocalDatabase = async () => {
        try {
          // Validar telefone antes de salvar
          const telefoneValidado = normalizePhone(parsedData.telefone);
          
          const leadData = {
            nome: parsedData.nome,
            sobrenome: parsedData.sobrenome,
            email: parsedData.email,
            telefone: telefoneValidado,
            whatsapp: parsedData.whatsapp || false,
            pais: parsedData.pais,
            idioma: parsedData.language, // Mapear language para idioma no banco
            destino: parsedData.destino,
            objetivo: parsedData.service, // Mapear service para objetivo no banco
            tipoVisto: parsedData.tipoVisto,
            rendaAnual: parsedData.rendaAnual,
            maisInfoEstudante: parsedData.maisInfoEstudante,
            maisInfoProfissional: parsedData.maisInfoProfissional,
            maisInfoTurista: parsedData.maisInfoTurista,
            quantasPessoas: parsedData.quantasPessoas,
            quantoTempo: parsedData.quantoTempo,
            estudanteOpcao: parsedData.estudanteOpcao,
            turismoOpcao: parsedData.turismoOpcao,
            profissionalOpcao: parsedData.profissionalOpcao,
            contactChannel: parsedData.contactChannel,
            howDidYouFindUs: parsedData.howDidYouFindUs,
            additionalInfoText: parsedData.additionalInfoText,
            // Campo combinado para compatibilidade e consulta rápida
            additionalInfo: buildMoreInfo(parsedData.howDidYouFindUs, parsedData.additionalInfoText),
            source: 'stepper',
            utm_data: parsedData.utm_data
          };

          const response = await fetch('/api/leads', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData),
          });

          if (response.ok) {
            // Disparar evento de conversão
            trackConversion({
              lead_id: response.headers.get('lead-id'),
              form_data: parsedData,
              timestamp: new Date().toISOString()
            });
          }
        } catch (error) {
          console.error('Erro ao salvar lead no banco local:', error);
        }
      };

      saveToLocalDatabase();
      
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
            {formData.nome || 'Usuário'}, já demos o primeiro passo!
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
