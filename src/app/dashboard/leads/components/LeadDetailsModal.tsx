'use client';

import { YVModal, YVButton, YVTable, YVTableRow, YVTableCell } from '@/components/YV';
import { Briefcase, Clock, DollarSign, Globe, GraduationCap, MapPin, MessageSquare, Plane, Target, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StepperData {
  destino?: string;
  objetivo?: string;
  tipoVisto?: string;
  rendaAnual?: string;
  maisInfoEstudante?: string;
  maisInfoProfissional?: string;
  maisInfoTurista?: string;
  quantasPessoas?: string;
  quantoTempo?: string;
  estudanteOpcao?: string;
  turismoOpcao?: string;
  profissionalOpcao?: string;
  pais?: string;
  idioma?: string;
  utm_data?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    refer?: string;
    client_id?: string;
  };
}

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: {
    id: string;
    name?: string;
    email: string;
    phone?: string;
    source: string;
    status: string;
    notes?: string;
    createdAt: string;
  } | null;
}

export default function LeadDetailsModal({ isOpen, onClose, lead }: LeadDetailsModalProps) {
  const [stepperData, setStepperData] = useState<StepperData | null>(null);

  useEffect(() => {
    if (lead?.notes) {
      try {
        const parsed = JSON.parse(lead.notes);
        setStepperData(parsed);
      } catch (error) {
        console.error('Erro ao parsear notes:', error);
        setStepperData(null);
      }
    }
  }, [lead]);

  const getDestinoLabel = (destino: string) => {
    const destinos: { [key: string]: string } = {
      'estados-unidos': 'Estados Unidos',
      'canada': 'Canadá',
      'australia': 'Austrália',
      'reino-unido': 'Reino Unido',
      'portugal': 'Portugal',
      'espanha': 'Espanha',
      'franca': 'França',
      'alemanha': 'Alemanha',
      'italia': 'Itália',
      'japao': 'Japão',
      'coreia-sul': 'Coreia do Sul',
      'singapura': 'Singapura',
      'nova-zelandia': 'Nova Zelândia'
    };
    return destinos[destino] || destino;
  };

  const getObjetivoLabel = (objetivo: string) => {
    const objetivos: { [key: string]: string } = {
      'estudar-fora': 'Estudar no Exterior',
      'crescer-profissionalmente': 'Crescer Profissionalmente',
      'empreender-investir': 'Empreender/Investir',
      'conhecer-mundo': 'Conhecer o Mundo'
    };
    return objetivos[objetivo] || objetivo;
  };

  const getTipoVistoLabel = (tipoVisto: string) => {
    const tipos: { [key: string]: string } = {
      'f1': 'F-1 (Estudante)',
      'b1': 'B-1 (Negócios)',
      'b2': 'B-2 (Turismo)',
      'h1b': 'H-1B (Trabalho)',
      'eb1': 'EB-1 (Talentos Extraordinários)',
      'eb2': 'EB-2 (Profissionais)',
      'eb3': 'EB-3 (Trabalhadores)',
      'eb5': 'EB-5 (Investidores)'
    };
    return tipos[tipoVisto] || tipoVisto;
  };

  const getRendaLabel = (renda: string) => {
    const rendas: { [key: string]: string } = {
      'menos-50k': 'Menos de $50.000',
      '50k-199k': '$50.000 a $199.999',
      '200k-499k': '$200.000 a $499.999',
      'acima-500k': 'Acima de $500.000'
    };
    return rendas[renda] || renda;
  };

  const getMaisInfoEstudanteLabel = (info: string) => {
    const infos: { [key: string]: string } = {
      'graduacao': 'Graduação',
      'pos-graduacao': 'Pós-graduação',
      'mestrado': 'Mestrado',
      'doutorado': 'Doutorado',
      'curso-ingles': 'Curso de Inglês',
      'intercambio': 'Intercâmbio'
    };
    return infos[info] || info;
  };

  const getMaisInfoProfissionalLabel = (info: string) => {
    const infos: { [key: string]: string } = {
      'trabalhar-empresa': 'Trabalhar em Empresa',
      'empreender': 'Empreender',
      'investir': 'Investir',
      'transferencia-empresa': 'Transferência de Empresa',
      'freelancer': 'Freelancer/Consultor'
    };
    return infos[info] || info;
  };

  const getMaisInfoTuristaLabel = (info: string) => {
    const infos: { [key: string]: string } = {
      'vou-sozinho': 'Vou sozinho',
      'em-familia': 'Com a família',
      'com-amigos': 'Com meus amigos'
    };
    return infos[info] || info;
  };

  const getQuantasPessoasLabel = (pessoas: string) => {
    const pessoasMap: { [key: string]: string } = {
      '2-pessoas': '2 pessoas',
      '3-4-pessoas': '3-4 pessoas',
      '5-6-pessoas': '5-6 pessoas',
      'mais-6-pessoas': 'Mais de 6 pessoas'
    };
    return pessoasMap[pessoas] || pessoas;
  };

  const getQuantoTempoLabel = (tempo: string) => {
    const tempos: { [key: string]: string } = {
      'menos-15-dias': 'Menos de 15 dias',
      '15-a-30-dias': '15 a 30 dias',
      'mais-de-1-mes': 'Mais de 1 mês'
    };
    return tempos[tempo] || tempo;
  };

  const getIdiomaLabel = (idioma: string) => {
    const idiomas: { [key: string]: string } = {
      'portugues': 'Português',
      'ingles': 'English',
      'espanhol': 'Español',
      'frances': 'Français',
      'alemao': 'Deutsch',
      'italiano': 'Italiano',
      'japones': '日本語',
      'chines-mandarim': '中文 (Mandarim)',
      'coreano': '한국어'
    };
    return idiomas[idioma] || idioma;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'contacted': return 'Contatado';
      case 'qualified': return 'Qualificado';
      case 'converted': return 'Convertido';
      case 'lost': return 'Perdido';
      default: return status;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'website': return 'Website';
      case 'social': return 'Redes Sociais';
      case 'referral': return 'Indicação';
      case 'ads': return 'Anúncios';
      case 'stepper': return 'Stepper';
      case 'newsletter': return 'Newsletter';
      default: return source;
    }
  };

  if (!lead) return null;

  return (
    <YVModal
      open={isOpen}
      onOpenChange={onClose}
      
      title="Detalhes do Lead"
      description={`${lead.name || 'Sem nome'} • ${lead.email}`}
      className="lg:!w-[800px] !max-w-none"
    >
      <div className="space-y-4">
        {/* Header compacto com cores Yellow Visa */}
        <div className="bg-amber-400 rounded-lg p-4 bg-gradient">
          <div className="flex items-center justify-between text-whit">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-white rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-black">
                  {lead.name ? lead.name.charAt(0).toUpperCase() : '?'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold t">{lead.name || 'Lead sem nome'}</h3>
                <p className="text-sm text-black/80">{lead.email}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs bg-black text-white k px-2 py-1 rounded-full">
                    {getStatusLabel(lead.status)}
                  </span>
                  <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                    {getSourceLabel(lead.source)}
                  </span>
                  <span className="text-xs text-black/70">
                    {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
            {lead.phone && (
              <div className="text-right">
                <p className="text-xs text-black/70">Telefone</p>
                <p className="text-sm font-bold text-black">{lead.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Lista compacta com todas as informações */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-semibold text-base mb-3 text-gray-800 flex items-center gap-2">
            <Target size={16} className="text-[#FF6700]" />
            Informações do Lead
          </h4>
          
          <div className="space-y-2">
            {/* Dados do Stepper */}
            {stepperData?.destino && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF6700]" />
                  <span className="text-sm text-gray-600">Destino:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{getDestinoLabel(stepperData.destino)}</span>
              </div>
            )}
            
            {stepperData?.objetivo && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#FF6700]" />
                  <span className="text-sm text-gray-600">Objetivo:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{getObjetivoLabel(stepperData.objetivo)}</span>
              </div>
            )}
            
            {stepperData?.tipoVisto && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#FF6700]" />
                  <span className="text-sm text-gray-600">Tipo de Visto:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{getTipoVistoLabel(stepperData.tipoVisto)}</span>
              </div>
            )}
            
            {stepperData?.rendaAnual && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#FF6700]" />
                  <span className="text-sm text-gray-600">Renda Anual:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{getRendaLabel(stepperData.rendaAnual)}</span>
              </div>
            )}
            
            {stepperData?.maisInfoProfissional && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#FF6700]" />
                  <span className="text-sm text-gray-600">Experiência:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{getMaisInfoProfissionalLabel(stepperData.maisInfoProfissional)}</span>
              </div>
            )}
            
            {stepperData?.pais && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#FF6700]" />
                  <span className="text-sm text-gray-600">País:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{stepperData.pais}</span>
              </div>
            )}
            
            {stepperData?.idioma && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#FF6700]" />
                  <span className="text-sm text-gray-600">Idioma:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{getIdiomaLabel(stepperData.idioma)}</span>
              </div>
            )}

            {/* Dados de Rastreamento */}
            {stepperData?.utm_data?.utm_source && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#FF6700]" />
                  <span className="text-sm text-gray-600">Fonte UTM:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{stepperData.utm_data.utm_source}</span>
              </div>
            )}
            
            {stepperData?.utm_data?.utm_medium && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#FF6700]" />
                  <span className="text-sm text-gray-600">Mídia UTM:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{stepperData.utm_data.utm_medium}</span>
              </div>
            )}
            
            {stepperData?.utm_data?.utm_campaign && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#FF6700]" />
                  <span className="text-sm text-gray-600">Campanha UTM:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{stepperData.utm_data.utm_campaign}</span>
              </div>
            )}
            
            {stepperData?.utm_data?.refer && (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#FF6700]" />
                  <span className="text-sm text-gray-600">Referência:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{stepperData.utm_data.refer}</span>
              </div>
            )}
          </div>
        </div>


        {/* Dados Raw (para debug) */}
        {stepperData && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Dados Completos (JSON)</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-xs text-gray-600 overflow-x-auto">
                {JSON.stringify(stepperData, null, 2)}
              </pre>
            </div>
          </div>
        )}

      </div>
    </YVModal>
  );
}
