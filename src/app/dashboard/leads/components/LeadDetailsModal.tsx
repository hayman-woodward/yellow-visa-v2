'use client';

import { YVModal, YVButton } from '@/components/YV';
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

  if (!lead) return null;

  return (
    <YVModal
      open={isOpen}
      onOpenChange={onClose}
      size="7xl"
      title="Detalhes do Lead"
      description={`${lead.name || 'Sem nome'} • ${lead.email}`}
    >
      <div className="space-y-6">
        {/* Informações Básicas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-base">
              <MessageSquare className="w-4 h-4" />
              Informações Básicas
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Nome:</span>
                <span className="font-semibold text-gray-900">{lead.name || 'Não informado'}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="font-semibold text-gray-900">{lead.email}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Telefone:</span>
                <span className="font-semibold text-gray-900">{lead.phone || 'Não informado'}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Fonte:</span>
                <span className="font-semibold text-gray-900 capitalize">{lead.source}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Status:</span>
                <span className="font-semibold text-gray-900 capitalize">{lead.status}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-medium">Criado em:</span>
                <span className="font-semibold text-gray-900">
                  {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          {/* Dados do Stepper */}
          {stepperData && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-base">
                <Target className="w-4 h-4" />
                Dados do Stepper
              </h4>
              <div className="space-y-3">
                {stepperData.destino && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Destino:
                    </span>
                    <span className="font-semibold text-gray-900">{getDestinoLabel(stepperData.destino)}</span>
                  </div>
                )}

                {stepperData.objetivo && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Objetivo:
                    </span>
                    <span className="font-semibold text-gray-900">{getObjetivoLabel(stepperData.objetivo)}</span>
                  </div>
                )}

                {stepperData.tipoVisto && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Tipo de Visto:
                    </span>
                    <span className="font-semibold text-gray-900">{getTipoVistoLabel(stepperData.tipoVisto)}</span>
                  </div>
                )}

                {stepperData.rendaAnual && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Renda Anual:
                    </span>
                    <span className="font-semibold text-gray-900">{getRendaLabel(stepperData.rendaAnual)}</span>
                  </div>
                )}

                {stepperData.maisInfoEstudante && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Nível de Estudo:
                    </span>
                    <span className="font-semibold text-gray-900">{getMaisInfoEstudanteLabel(stepperData.maisInfoEstudante)}</span>
                  </div>
                )}

                {stepperData.maisInfoProfissional && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Área Profissional:
                    </span>
                    <span className="font-semibold text-gray-900">{getMaisInfoProfissionalLabel(stepperData.maisInfoProfissional)}</span>
                  </div>
                )}

                {stepperData.maisInfoTurista && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <Plane className="w-4 h-4" />
                      Acompanhamento:
                    </span>
                    <span className="font-semibold text-gray-900">{getMaisInfoTuristaLabel(stepperData.maisInfoTurista)}</span>
                  </div>
                )}

                {stepperData.quantasPessoas && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Quantas Pessoas:
                    </span>
                    <span className="font-semibold text-gray-900">{getQuantasPessoasLabel(stepperData.quantasPessoas)}</span>
                  </div>
                )}

                {stepperData.quantoTempo && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Tempo de Permanência:
                    </span>
                    <span className="font-semibold text-gray-900">{getQuantoTempoLabel(stepperData.quantoTempo)}</span>
                  </div>
                )}

                {stepperData.pais && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      País:
                    </span>
                    <span className="font-semibold text-gray-900">{stepperData.pais}</span>
                  </div>
                )}

                {stepperData.idioma && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Idioma:
                    </span>
                    <span className="font-semibold text-gray-900">{getIdiomaLabel(stepperData.idioma)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
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

        {/* Botão Salesforce (placeholder) */}
        <div className="pt-3 border-t border-gray-200">
          <YVButton
            onClick={() => {
              console.log('Lead para Salesforce:', lead);
              alert('Funcionalidade do Salesforce será implementada em breve!');
            }}
            variant="outline-secondary"
            size="sm"
            className="w-full"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Enviar para Salesforce (em breve)
          </YVButton>
        </div>
      </div>
    </YVModal>
  );
}
