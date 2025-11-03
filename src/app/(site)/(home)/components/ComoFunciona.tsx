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
    icon: 'clipboard-text'
  },
];

export default function ComoFunciona() {
  return (
    <YVSection className='bg-white  md:px-20'>
      <div className='max-w-[1248px] mx-auto'>
        <div>
          <div className='mb-5 text-center'>
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

          <div className='relative flex'>
            {/* Barra gradiente */}
            <div
              className='absolute left-0 top-0 w-20 h-full rounded-full z-10'
              style={{
                background: 'linear-gradient(180deg, #FFBD1A 0%, #FF6700 100%)',
                borderRadius: '999px'
              }}
              data-aos="fade-up"
              data-aos-delay="120"
            />

            {/* Passos */}
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
                    {/* Ícone posicionado sobre a barra */}
                    <div 
                      className='flex-shrink-0 w-8 h-8 flex items-center justify-center text-black -ml-24 z-10'
                    >
                      <YVIcon
                        name={step.icon}
                        width={24}
                        height={24}
                        className='text-black'
                      />
                    </div>

                    {/* Conteúdo do passo */}
                    <div className='flex-1 pl-[20px] -mt-[28px]  pb-[50px] max-w-[220px]'>
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
        </div>
      </div>
    </YVSection>
  );
}
