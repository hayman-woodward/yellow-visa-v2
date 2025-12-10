import { YVBreadcrumbs, YVSection, YVText, YVTitle } from '@/components/YV';

export default function SobreGuiaDoImigrante() {
  return (
    <YVSection className='bg-YV-secondary-gradient px-4'>
      <div className='max-w-[1248px] mx-auto sm:px-6 lg:px-8 xl:px-0 '>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-[70px] items-start'>
          <div>
            <YVBreadcrumbs
              disabled
              className='pb-4 text-[#0F0005]'
              items={[{ label: 'Guia do Imigrante', href: '/guia' }]}
            />
            <YVTitle
              tag="h1"
              variant='hero'
              title='Imigração não precisa ser complicada, só bem orientada'
            />
          </div>
          <div className='space-y-6 md:pt-9 md:pl-6'>
            <YVText>
              Navegar pelo processo de imigração pode parecer desafiador, mas com as informações certas e orientação adequada, você descobre que existem caminhos claros para realizar seu sonho. Aqui você encontra respostas para as principais dúvidas sobre vistos, documentação e processos para EUA e Portugal.
            </YVText>
            <YVText>
              Organizamos todo o conteúdo por temas para facilitar sua busca. Seja para trabalho, estudo, investimento ou reunificação familiar, você encontra orientações práticas e atualizadas para tomar decisões informadas sobre seu futuro.
            </YVText>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
