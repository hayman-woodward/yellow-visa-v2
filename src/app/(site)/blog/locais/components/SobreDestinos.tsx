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
              Explorar um novo país é o primeiro passo para transformar sua vida. Na Yellow Visa, 
              selecionamos cuidadosamente os destinos que oferecem as melhores oportunidades 
              de carreira, estudo e qualidade de vida para brasileiros.
            </YVText>
            <YVText>
              Nossos guias detalhados sobre os Estados Unidos e Portugal ajudam você a entender 
              o custo de vida, as principais cidades e os caminhos legais para fixar residência 
              com segurança e planejamento.
            </YVText>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
