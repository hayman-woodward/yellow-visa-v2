import { YVBreadcrumbs, YVSection, YVText, YVTitle } from '@/components/YV';

export default function SobreNos() {
  return (
    <YVSection className='px-4'>
      <div className='max-w-[1248px] mx-auto sm:px-6 lg:px-8 xl:px-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-[70px] items-start'>
          <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
            <div data-aos="fade-right" data-aos-delay="300" data-aos-duration="700">
              <YVBreadcrumbs
                disabled
                className='pb-4 text-[#0F0005]'
                items={[{ label: 'Sobre Nós', href: '/sobre' }]}
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
              <YVTitle
                tag="h1"
                variant='hero'
                title='O mundo visto por você'
              />
            </div>
          </div>
          <div className='space-y-6 pt-2 lg:pt-9 md:pl-6' data-aos="fade-left" data-aos-delay="500" data-aos-duration="800">

            <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="700">
              <YVText>
              A Yellow Visa é mais do que uma consultoria de imigração. É uma ponte entre o que você vive hoje e o que você quer viver amanhã. Entre o sonho e o planejamento. Entre o medo e a coragem.      
              </YVText>
            </div>
            <div data-aos="fade-up" data-aos-delay="700" data-aos-duration="700">
              <YVText>
              A gente sabe que mudar de país não é só sobre documentos, formulários e prazos. É sobre reconstruir. É sobre recomeçar. E cada escolha importa.
              </YVText>
            </div>
            <div data-aos="fade-up" data-aos-delay="800" data-aos-duration="700">
              <YVText>
               Por isso, nosso trabalho é mostrar que existe um jeito mais leve, mais seguro e mais humano de viver esse processo. Sem promessas mirabolantes. Sem termos complicados. Só o que realmente funciona. No seu ritmo. Do seu jeito.
              </YVText>
            </div>
            <div data-aos="fade-up" data-aos-delay="900" data-aos-duration="700">
              <YVText>
              É assim que a gente vê o mundo. E é assim que vamos ajudar você a realizar seus sonhos.
              </YVText>
            </div>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
