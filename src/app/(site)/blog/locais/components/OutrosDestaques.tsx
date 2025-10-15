import { YVGallery, YVSection, YVText, YVTitle } from '@/components/YV';

export default function OutrosDestaques() {
  const outrosDestaquesItems = [
    {
      id: '1',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'EB-2 NIW',
      title: 'EB-2 NIW',
      description: 'Seu Passaporte para Contribuir com o Futuro dos EUA',
      href: '/destinos/eb-2-niw'
    },
    {
      id: '2',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Grupo é Alvo da PF',
      title: 'Grupo é Alvo da PF',
      description:
        'Grupo Lucra R$ 59 Milhões com Envio de Brasileiros aos EUA e é Alvo da PF',
      href: '/destinos/grupo-alvo-pf'
    },
    {
      id: '3',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Portugal Sem Imigração',
      title: 'Portugal Sem Imigração',
      description: 'Impactos e Necessidade de Políticas Claras',
      href: '/destinos/portugal-sem-imigracao'
    }
  ];

  return (
    <YVSection className='bg-[#0F0005]'>
      <div className='max-w-[1248px] md:px-8 xl:px-0 mx-auto'>
        <div className='flex flex-col lg:flex-row gap-4 md:gap-6 items-start justify-between'>
          <div className='space-y-8 w-full lg:w-[294px] lg:flex-shrink-0'>
            <div className='pr-20'>
              <YVTitle
                variant='heading'
                title='Outros destaques'
                className='mb-4 md:mb-6 text-white'
              />
              <YVText className='pb-1 md:pb-2 md:mb-4 text-white text-[16px]'>
                Descrição Phasellus netus natoque ante eget at condimentum
                eget.Descrição
              </YVText>
            </div>
          </div>

          <div className='w-full lg:flex-1'>
            <div className='w-full flex justify-end'>
              <YVGallery
                items={outrosDestaquesItems}
                showTitles={true}
                columns={3}
                imageClassName='aspect-[294/400] object-cover'
                showDescriptions={true}
                darkMode={true}
              />
            </div>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
