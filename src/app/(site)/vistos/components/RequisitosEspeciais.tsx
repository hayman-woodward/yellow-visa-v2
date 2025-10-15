'use client';
import {
  YVBreadcrumbs,
  YVButton,
  YVCard,
  YVGrid,
  YVIcon,
  YVSection,
  YVText,
  YVTitle,
  YVCarousel
} from '@/components/YV';

export default function RequisitosEspeciais() {
  const requisitosCards = [
    {
      id: '1',
      icon: 'engineer',
      width: 33,
      height: 33,
      title: 'Engenheiros',
      description:
        'Profissionais qualificados para atuar em projetos globais, com experiência comprovada.'
    },
    {
      id: '2',
      icon: 'dev',
      width: 40,
      height: 40,
      title: 'Desenvolvedores e profissionais de tecnologia',
      description:
        'Especialistas em TI, programação e inovação, com habilidades valorizadas internacionalmente.'
    },
    {
      id: '3',
      icon: 'doctor',
      width: 40,
      height: 40,
      title: 'Médicos e pesquisadores da área da saúde',
      description:
        'Referências em prática clínica, pesquisa e inovação em saúde.'
    },
    {
      id: '4',
      icon: 'dentist',
      width: 40,
      height: 40,
      title: 'Dentistas com atuação sólida no Brasil',
      description:
        'Profissionais experientes em odontologia, com excelência técnica e reputação consolidada.'
    },
    {
      id: '5',
      icon: 'pilot',
      width: 40,
      height: 40,
      title: 'Pilotos com experiência internacional',
      description:
        'Comandantes e copilotos com histórico em voos comerciais e rotas globais.'
    },
    {
      id: '6',
      icon: 'lawyer',
      width: 40,
      height: 40,
      title: 'Advogados com formação avançada e atuação no Brasil ou exterior',
      description:
        'Juristas especializados, com conhecimento em direito local e internacional.'
    },
    {
      id: '7',
      icon: 'enterprenuer',
      width: 40,
      height: 40,
      title: 'Empreendedores em expansão no país de origem',
      description:
        'Líderes que buscam internacionalizar negócios e explorar novos mercados estratégicos.'
    }
  ];

  return (
    <YVSection className='bg-white'>
      <div className='max-w-[1248px] xl:px-0 mx-auto lg:py-[60px]'>
        <div className='flex flex-col lg:flex-row gap-6 md:gap-20 xl:gap-6 items-start justify-between'>
          <div className='space-y-8 flex-1'>
            <div className='max-w-[320px] xl:pr-7'>
              <YVBreadcrumbs
                disabled
                className='pb-4'
                items={[
                  {
                    label: 'Requisitos Especiais',
                    href: '/requisitos-especiais'
                  }
                ]}
              />
              <YVTitle
                className='mb-6'
              >
                A gente acredita em soluções que cabem na vida <br />real
              </YVTitle>
              <YVText className='mb-4'>
                Descrição Phasellus netus natoque ante eget at condimentum
                eget.Descrição
              </YVText>
              <YVButton variant='outline' className='hidden md:flex' href='/requisitos-especiais'>
                <YVIcon name='arrow-right' />
                Conheça todos os requisitos especiais
              </YVButton>
            </div>
          </div>
          {/* col 02 - Desktop Grid */}
          <YVGrid cols={1} mdCols={1} xlCols={2} gap={4} className='hidden lg:grid flex-[2]'>
            {requisitosCards.map((card) => (
              <YVCard
                key={card.id}
                variant='outline'
                hover='orange'
                className='lg:min-h-[296px] transition-all duration-300 hover:shadow-lg hover:scale-105'
              >
                <YVIcon
                  name={card.icon}
                  width={card.width}
                  height={card.height}
                  className='mb-2'
                />
                <YVTitle variant='subtitle' title={card.title} />
                <YVText className='pb-2'>{card.description}</YVText>
              </YVCard>
            ))}
          </YVGrid>

          {/* col 02 - Mobile/Tablet Carousel (YVCarousel padrão) */}
          <div className='lg:hidden w-full flex-[2]'>
            <YVCarousel
              items={requisitosCards.map((c) => ({ id: c.id, src: '', alt: c.title }))}
              className='w-full'
              imageClassName=''
              renderItem={(item) => {
                const card = requisitosCards.find((c) => c.id === item.id);
                if (!card) return null;
                return (
                  <YVCard variant='outline' hover='orange' className='h-[296px] p-5 transition-all duration-300 hover:shadow-lg hover:scale-105'>
                    <YVIcon
                      name={card.icon}
                      width={33}
                      height={33}
                      className='mb-2'
                    />
                    <YVTitle variant='subtitle' title={card.title} />
                    <YVText className='pb-2 text-[15px]'>{card.description}</YVText>
                  </YVCard>
                );
              }}
            />

            {/* CTA abaixo dos bullets (mobile only) */}
            <div className='mt-4'>
              <YVButton variant='outline' className='w-full' href='/requisitos-especiais'>
                <YVIcon name='arrow-right' />
                Conheça todos os requisitos especiais
              </YVButton>
            </div>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
