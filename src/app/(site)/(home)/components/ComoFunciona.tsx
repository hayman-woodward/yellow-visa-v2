'use client';

import {
  YVBreadcrumbs,
  YVIcon,
  YVSection,
  YVText,
  YVTitle
} from '@/components/YV';

const steps = [
  {
    number: 1,
    title: 'Cadastro e avaliação de perfil',
    description: 'Você escolhe o destino',
    icon: 'communication-user'
  },
  {
    number: 2,
    title: 'Planejamento e sugestões',
    description: 'Juntos, montamos a estratégia personalizada pro seu visto, com base na sua realidade e estilo de vida',
    icon: 'navegation-map'
  },
  {
    number: 3,
    title: 'Acompanhamento',
    description: 'Você acompanha tudo em tempo real e celebra cada conquista.',
    icon: 'prancheta'
  },
];

export default function ComoFunciona() {
  return (
    <YVSection className='bg-white px-6 md:px-20 relative'>
      <div className='max-w-[1248px] mx-auto relative'>
        {/* Title Area - Fixed position relative to viewport or section */}
        <div className='pt-24 mb-12 text-center relative z-40 bg-white'>
          <div className='flex justify-center' data-aos="fade-up" data-aos-delay="0">
            <YVBreadcrumbs
              disabled
              className='pb-4 md:pb-5'
              items={[{ label: 'Como Funciona', href: '/como-funciona' }]}
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="60">
            <YVTitle
              variant='heading'
              className='max-w-[320px] md:max-w-[600px] mx-auto'
              title='Imigrar não precisa ser um bicho de sete cabeças.'
            />
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden relative z-10 pb-20">
          <ComoFuncionaMobile />
        </div>

        {/* Desktop View - Com Barra Sticky "Parada" */}
        <div className="hidden lg:block relative z-10">
          <ComoFuncionaDesktop />
        </div>
      </div>
    </YVSection>
  );
}

function ComoFuncionaMobile() {
  return (
    <div className='relative flex'>
      <div
        className='absolute left-0 top-0 w-20 h-full rounded-full'
        style={{
          background: 'linear-gradient(180deg, #FFBD1A 0%, #FF6700 100%)',
          borderRadius: '999px'
        }}
        data-aos="fade-up"
        data-aos-delay="120"
      />

      <div className='ml-[120px] py-[50px] space-y-32 '>
        {steps.map((step, index) => {
          const delays = [180, 240, 300];
          return (
            <div
              key={step.number}
              className='flex items-start gap-6 pt-[120px]'
              data-aos="fade-up"
              data-aos-delay={delays[index]}
            >
              <div className='flex-shrink-0 w-8 h-8 flex items-center justify-center text-black -ml-24 z-20'>
                <YVIcon name={step.icon} width={24} height={24} className='text-black' />
              </div>

              <div className='flex-1 pl-[20px] -mt-[28px] pb-[50px] max-w-[220px]'>
                <YVText className='bg-[#0F0005] w-fit text-[#FFBD1A] text-[15px] px-3.5 py-1 rounded-full font-medium mb-1'>
                  / PASSO {step.number}
                </YVText>
                <h3 className='text-[24px] leading-[28px] tracking-[-0.5px] font-semibold mb-1'>
                  {step.title}
                </h3>
                <YVText className='text-[15px] leading-[20px] font-normal'>
                  {step.description}
                </YVText>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ComoFuncionaDesktop() {
  const iconSizes = [
    { width: 53.33, height: 60 },
    { width: 73.33, height: 60 },
    { width: 53.33, height: 70 },
  ];

  return (
    <div className='relative max-w-[1248px] mx-auto pb-40'>
      
      {/* Coluna Central ESTÁTICA - Agora toda laranja */}
      <div className='absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[160px] pointer-events-none'>
        {/* Barra Laranja Contínua com altura reduzida */}
        <div
          className='w-full mx-auto'
          style={{
            height: '1550px', // Reduzido ligeiramente
            background: 'linear-gradient(180deg, #FFBD1A 0%, #FF6700 100%)',
            borderRadius: '999px',
          }}
        />
      </div>

      {/* Conteúdo (Passos e Ícones) */}
      <div className='relative z-20'>
        {steps.map((step, index) => {
          const delays = [180, 240, 300];
          const size = iconSizes[index] || { width: 40, height: 40 };
          return (
            <div
              key={step.number}
              className='grid grid-cols-[1fr_160px_1fr] items-center gap-12 py-40 min-h-[500px]'
              data-aos="fade-up"
              data-aos-delay={delays[index]}
            >
              {/* Lado Esquerdo: Tag do Passo */}
              <div className='flex justify-end'>
                <div 
                  className='bg-[#0F0005] flex items-center justify-center rounded-full shadow-md'
                  style={{ width: '107px', height: '30px' }}
                >
                  <span 
                    className='text-[#FFBD1A] uppercase'
                    style={{ 
                      fontFamily: '"Red Hat Text", sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: '20px'
                    }}
                  >
                    / PASSO {step.number}
                  </span>
                </div>
              </div>

              {/* Centro: Ícone na Barra */}
              <div className='flex justify-center relative z-20'>
                <YVIcon
                  name={step.icon}
                  width={size.width}
                  height={size.height}
                  className='text-black'
                />
              </div>

              {/* Lado Direito: Conteúdo */}
              <div className='flex flex-col'>
                <div className='max-w-[300px]'>
                  <h3 
                    className='text-[#0F0005] mb-2'
                    style={{ 
                      fontFamily: '"Red Hat Display", sans-serif',
                      fontSize: '32px',
                      fontWeight: 600,
                      lineHeight: '40px',
                      letterSpacing: '-0.5px'
                    }}
                  >
                    {step.title}
                  </h3>
                  <YVText className='text-[#0F0005] font-normal opacity-80 text-[16px] leading-[22px]'>
                    {step.description}
                  </YVText>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}




