import { YVBreadcrumbs, YVSection, YVText, YVTitle } from '@/components/YV';

export default function SobreBlog() {
  return (
    <YVSection className='bg-YV-secondary-gradient px-4'>
      <div className='max-w-[1248px] mx-auto sm:px-6 lg:px-8 xl:px-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-[70px] items-start'>
          <div data-aos="fade-up" data-aos-delay="0">
            <YVBreadcrumbs
              disabled
              className='pb-4 text-[#0F0005]'
              items={[{ label: 'Dicas e noticias', href: '/blog' }]}
            />
            <YVTitle
              tag="h1"
              variant='hero'
              title='Imigração não precisa ser complicada, só bem orientada'
            />
          </div>
          <div className='space-y-6 pt-9 md:pl-6' data-aos="fade-up" data-aos-delay="150">
            <YVText>
              O Blog da Yellow Visa é o seu portal definitivo para entender o mundo da 
              imigração e mobilidade global. Aqui, compartilhamos orientações práticas 
              sobre vistos para os EUA e Portugal, dicas essenciais para a sua 
              transição de carreira no exterior e histórias reais de quem já alcançou 
              o sonho de morar fora.
            </YVText>
            <YVText>
              Explore nossas categorias exclusivas, desde notícias atualizadas sobre 
              legislação migratória até guias detalhados sobre custo de vida e as 
              melhores regiões para se viver. Nosso objetivo é transformar a 
              complexidade burocrática em um caminho claro e seguro para você e sua família.
            </YVText>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
