import { YVBreadcrumbs, YVText, YVTitle } from '@/components/YV';

export default function HeroVistos() {
  return (
    <div className='bg-YV max-h-[600px] h-[90vh] -mt-[88px] relative w-full overflow-hidden'>
      <div className='max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 pt-[120px] pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-[70px] items-start' data-aos="fade-up" data-aos-duration="1000">
          <div>
            <YVBreadcrumbs
              disabled
              className='pb-4 text-[#0F0005]'
              items={[{ label: 'Vistos', href: '/vistos' }]}
            />
            <YVTitle
              tag="h1"
              variant='hero'
              title='A gente facilita a sua jornada sem fórmulas prontas'
            />
          </div>
          <div className='space-y-6 md:pt-9 md:pl-6'>
            <YVText>
              Descubra os vistos ideais para seu perfil e realize seu sonho de viver no exterior. 
              Estados Unidos e Portugal oferecem diversas opções para brasileiros que buscam 
              uma nova vida com qualidade e oportunidades.
            </YVText>
            <YVText className='mb-2 md:mb-0'>
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
