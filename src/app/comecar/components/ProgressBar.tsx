'use client';

interface ProgressBarProps {
  etapaAtual: number;
  totalEtapas: number;
  titulo: string;
}

// Labels para as 4 etapas visuais do Figma
const labels = ['Destino', 'Objetivo', 'Detalhes', 'Pessoal'];

// Mapeia as 10 etapas do formulário para 4 etapas visuais
const mapToSimplified = (etapa: number) => {
  if (etapa <= 2) return 1;      // Início, Destino
  if (etapa <= 4) return 2;      // Objetivo, Tipo de Visto
  if (etapa <= 7) return 3;      // Formação, Experiência, Rendas
  if (etapa <= 9) return 4;       // Contato, Captura Lead
  return 4;
};

export default function ProgressBar({ etapaAtual, totalEtapas, titulo }: ProgressBarProps) {
  const etapaSimplificada = mapToSimplified(etapaAtual);
  // Calcula progresso: 0% (etapa 1), 33% (etapa 2), 67% (etapa 3), 100% (etapa 4)
  const progresso = ((etapaSimplificada - 1) / 3) * 100;
  
  return (
    <div className="mb-6 md:mb-8">
      <div className="relative md:h-[100px] h-[80px]">
        {/* Labels no topo */}
        <div className="flex justify-between absolute top-0 left-0 right-0 px-3">
          {labels.map((label, index) => (
            <div key={index} className="text-center">
              <span className="text-xs font-medium text-black">{label}</span>
            </div>
          ))}
        </div>

        {/* Track de fundo - passa pelos centros dos círculos */}
        <div 
          className="absolute left-0 right-0 bg-gray-200 rounded-full"
          style={{ 
            top: '50%', 
            height: '11px',
            left: '16px',
            right: '16px',
            transform: 'translateY(-50%)'
          }}
        ></div>

        {/* Track de progresso */}
        <div 
          className="absolute bg-gradient-to-r from-[#C04] via-pink-500 to-[#4FA3CC] rounded-full transition-all duration-500"
          style={{ 
            top: '50%', 
            height: '11px',
            width: `${progresso}%`,
            left: '16px',
            transform: 'translateY(-50%)',
            zIndex: 10
          }}
        ></div>

        {/* Círculos */}
        <div className="flex justify-between absolute top-1/2 left-0 right-0 px-3 -translate-y-1/2" style={{ zIndex: 30 }}>
          {[1, 2, 3, 4].map((stepNumber) => {
            const isCompleted = stepNumber < etapaSimplificada;
            const isCurrent = stepNumber === etapaSimplificada;
            
            return (
              <div key={stepNumber} className="relative" style={{ zIndex: stepNumber === 1 ? 30 : 20 }}>
                <div 
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center
                    ${isCompleted || isCurrent ? 'bg-black' : 'bg-gray-300'}
                    transition-all duration-300
                  `}
                >
                  <span className={`text-sm font-bold ${isCompleted || isCurrent ? 'text-[#FFBD1A]' : 'text-gray-400'}`}>
                    {stepNumber}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
