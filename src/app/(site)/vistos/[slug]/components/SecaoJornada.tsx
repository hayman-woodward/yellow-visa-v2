import { YVSection } from "@/components/YV";

export default function SecaoJornada() {
  const steps = [
    { number: 1, title: 'Triagem de Elegibilidade Gratuita' },
    { number: 2, title: 'Estratégia de Caso Abrangente' },
    { number: 3, title: 'Gestão de Evidências' },
    { number: 4, title: 'Preparação e Envio da Aplicação' },
    { number: 5, title: 'Gerenciamento de interação USCIS/DOS' },
    { number: 6, title: 'Suporte para Entrevista' },
    { number: 7, title: 'Suporte e orientação contínuos' }
  ];

  return (
    <YVSection className='bg-[#f7f5f6] flex gap-[24px] md:pt-[140px] md:pb-[140px] justify-center items-center w-full'>
      <div className='max-w-[1248px] mx-auto flex justify-center gap-6'>
      {/* Coluna Esquerda - Texto Sticky */}
      <div className='flex flex-col gap-[24px] items-center pb-[80px] pl-0 shrink-0 sticky top-0 w-[400px] z-[2]'>
        <div className='flex flex-col items-start relative shrink-0 w-full'>
          <h2 className='text-[42px] leading-[48px] tracking-[-0.5px] font-normal text-[#0F0005] font-heading pb-2 pt-0 px-0'>
            Se tem chance, a gente vai tentar. E tentar de novo.
          </h2>
        </div>
        <div className='flex flex-col gap-[16px] items-start relative shrink-0 w-full'>
          <p className='text-[14px] leading-[20px] tracking-[0px] font-normal text-[#0F0005] pb-[8px] pt-0 px-0' style={{ fontFamily: 'var(--font-red-hat-text)' }}>
            Nossa jornada completa garante que cada detalhe do seu processo seja cuidado com atenção e expertise.
          </p>
        </div>
      </div>

      {/* Coluna Direita - Timeline */}
      <div className='flex flex-1 flex-col gap-[24px] items-start min-h-px min-w-px px-[178px] relative shrink-0 z-[1]'>
        {/* Linha Vertical com Gradiente */}
        <div
          className='absolute left-[187px] top-[-34px] bottom-[300px] h-[1061px] w-[22px] rounded-[999px] z-0'
          style={{
            background: 'linear-gradient(180deg, rgba(255, 189, 26, 1) 0%, rgba(255, 103, 0, 1) 100%)'
          }}
        />

        {/* Cards dos Steps */}
        {steps.map((step) => (
          <div
            key={step.number}
            className='flex gap-[40px] items-center px-0 relative rounded-2xl shrink-0 w-[522px] h-[120px]'
          >
            {/* Círculo com Número */}
            <div className='bg-[#0f0005] flex items-center justify-center relative rounded-full shrink-0 w-[40px] h-[40px] aspect-square'>
              <span className='font-semibold text-[#ffbd1a] text-[14px] leading-[20px] tracking-[0px] uppercase whitespace-nowrap' style={{ fontFamily: 'var(--font-red-hat-text)' }}>
                {step.number}
              </span>
            </div>

            {/* Título do Step */}
            <div className='flex flex-col justify-center items-start gap-0 flex-1 relative shrink-0' style={{ padding: '0' }}>
              <div className='flex flex-col items-start pb-[8px] pt-0 px-0 relative shrink-0 w-full'>
                <p className='text-[16px] leading-[22px] tracking-[0px] font-bold text-[#0F0005] whitespace-pre-wrap' style={{ fontFamily: 'var(--font-red-hat-text)' }}>
                  {step.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </YVSection>
  );
}

