import { YVBreadcrumbs, YVSection, YVText, YVTitle } from '@/components/YV';

export default function HeroDestinos() {
  return (
    <div className='bg-YV max-h-[600px] h-[90vh] -mt-[88px] relative w-full overflow-hidden'>
      <div className='max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 pt-[120px] pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-[70px] items-start'>
          <div>
            <YVBreadcrumbs
              disabled
              className='pb-4 text-[#0F0005]'
              items={[{ label: 'Destinos', href: '/destinos' }]}
            />
            <YVTitle
              tag="h1"
              variant='hero'
              title='Imigração não precisa ser complicada, só bem orientada'
            />
          </div>
          <div className='space-y-6 md:pt-9 md:pl-6'>
            <YVText>
              Descubra os melhores destinos para viver, estudar e trabalhar no exterior. 
              Estados Unidos e Portugal oferecem oportunidades únicas para brasileiros 
              que buscam uma nova vida com qualidade e segurança.
            </YVText>
            <YVText>
              Nossa equipe especializada te guia através de todo o processo, desde a 
              escolha do visto ideal até a chegada no seu novo país. Transforme seu 
              sonho de imigração em realidade com orientação profissional e personalizada.
            </YVText>
          </div> 
        </div>
      </div>
    </div>
  );
}
