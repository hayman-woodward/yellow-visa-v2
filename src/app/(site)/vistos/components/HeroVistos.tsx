import { YVBreadcrumbs, YVSection, YVText, YVTitle } from '@/components/YV';

export default function HeroVistos() {
  return (
    <YVSection className='bg-YV-secondary-gradient px-4 md:px-20 xl:px-0'>
      <div className='max-w-[1248px] mx-auto sm:px-6 lg:px-8 xl:px-0 pt-[88px]'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-[70px] items-start'>
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
              Lorem ipsum dolor sit amet consectetur. Vulputate cursus quis
              commodo praesent blandit. Ac ultrices enim egestas molestie amet
              lobortis feugiat. Tellus ut vitae turpis malesuada eu. Risus morbi
              egestas consectetur suspendisse.
            </YVText>
            <YVText className='mb-2 md:mb-0'>
              Egestas proin at blandit facilisi facilisis fames at turpis. Urna
              sollicitudin et in pretium cursus morbi a fermentum augue. Mauris
              sed amet dui ut pretium fermentum gravida pulvinar arcu. Elementum
              orna
            </YVText>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
