import { YVSection, YVText, YVTitle } from '@/components/YV';
import Link from 'next/link';

export default function SobreDestinos() {
  return (
    <YVSection className='bg-YV-secondary-gradient px-4 -mt-[88px] md:-mt-[120px]'>
      <div className='max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 pt-[93px] md:pt-[100px]'>
        <div className='pb-5 lg:pb-10'>
          <Link
            href='/blog'
            className='text-[14x] font-bold transition-all duration-200 py-[10px] md:py-[14px] hover:opacity-70 flex items-center gap-1'
          >
            ← Voltar para Dicas e Notícias
          </Link>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 lg:gap-20 items-start'>
          <div>
            <YVTitle tag="h1" variant='hero' title='Destinos' />
          </div>
          <div className='space-y-6 pt-6 md:pt-9 md:pl-6'>
            <YVText>
              Lorem ipsum dolor sit amet consectetur. Vulputate cursus quis
              commodo praesent blandit. Ac ultrices enim egestas molestie amet
              lobortis feugiat. Tellus ut vitae turpis malesuada eu. Risus morbi
              egestas consectetur suspendisse.
            </YVText>
            <YVText>
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
