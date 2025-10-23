import { YVBanner, YVBreadcrumbs, YVText, YVTitle } from '@/components/YV';

const missaoData = [
  {
    id: 1,
    breadcrumb: 'Nossa Missão',
    title: 'Realizar sonhos com responsabilidade.',
    image: '/imgs/sobre/desktop/nossa-missao.jpg',
    imageMobile: '/imgs/sobre/mobile/nossa-missao.jpg',
    imageAlt: 'Homem sorrindo com camisa amarela',
    texts: [
      'Ajudar pessoas e famílias que querem viver em outro país a transformarem essa vontade em um plano concreto. Oferecemos soluções seguras, personalizadas e feitas com cuidado. Do primeiro atendimento até a aprovação final, o que guia a gente é o que move você.'     
    ]
  },
  {
    id: 2,
    breadcrumb: 'Nossa Visão',
    title: 'Queremos ser referência internacional em imigração.',
    image: '/imgs/sobre/desktop/nossa-missao-02.jpg',
    imageMobile: '/imgs/sobre/mobile/nossa-missao-02.jpg',
    imageAlt: 'Homem com fones de ouvido',
    texts: [
      'Mas mais do que isso, queremos ser lembrados por quem passou por aqui. Pelo respeito. Pela escuta. Pela forma como cada cliente foi tratado. Porque mais importante do que ajudar alguém a mudar de país, é ajudar essa pessoa a se sentir confiante para mudar de vida.',
      

    ]
  },
  {
    id: 3,
    breadcrumb: 'Nossos Valores',
    title: 'Cuidamos de pessoas acima de tudo',
    image: '/imgs/sobre/desktop/nossa-missao-03.jpg',
    imageMobile: '/imgs/sobre/mobile/nossa-missao-03.jpg',
    imageAlt: 'Pai e filha sorrindo',
    texts: [
      'Trabalhamos com amor e empatia',
      'Atuamos com ética e transparência', 
      'Buscamos resultados reais',
      'Evoluímos sempre para oferecer o melhor'
    ]
  }
];

const valoresData = [
  { title: "Cuidamos de pessoas acima de tudo", text: "Não trabalhamos com números. A gente trabalha com histórias reais." },
  { title: "Trabalhamos com amor e empatia", text: "Imigrar não é leve. Por isso, o processo precisa ser." },
  { title: "Atuamos com ética e transparência", text: "Você merece saber exatamente o que esperar. Sempre." },
  { title: "Buscamos resultados reais", text: "Nossa entrega é concreta. Nosso compromisso é com a verdade." },
  { title: "Evoluímos sempre para oferecer o melhor", text: "O mundo muda. E a Yellow Visa muda com ele - e com você." }
];

export default function NossaMissao() {
  return (
    <section className='bg-white'>
      <div className='max-w-[1248px] mx-auto'>
        {missaoData.map((item, index) => (
          <div
            key={item.id}
            className={`py-5 md:py-20 lg:px-8 px-4 sm:px-6 xl:px-0 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center ${
              index > 0 ? 'md:mt-20' : ''
            }`}
            data-aos="fade-up"
            data-aos-delay={200 + (index * 200)}
            data-aos-duration="800"
          >
            {/* Texto */}
            <div
              className={`order-2 ${
                index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
              } max-w-[400px] mx-auto`}
            >
              <div data-aos="fade-right" data-aos-delay={300 + (index * 200)} data-aos-duration="600">
                <YVBreadcrumbs
                  disabled
                  className='pb-2 md:pb-5'
                  items={[{ label: item.breadcrumb, href: '/sobre' }]}
                />
              </div>
              {item.id !== 3 && (
                <div data-aos="fade-up" data-aos-delay={400 + (index * 200)} data-aos-duration="700">
                  <YVTitle title={item.title} />
                </div>
              )}
              {item.id === 3 ? (
                // Valores hardcoded
                <div className='space-y-4 mt-6'>
                  {valoresData.map((item, index) => (
                    <div key={index}>
                      <h3 className="text-md lg:text-[22px] lg:leading-[28px] font-semibold md:mb-4">{item.title}</h3>
                      <YVText>{item.text}</YVText>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='space-y-6'>
                  {item.texts.map((text, textIndex) => (
                    <YVText key={textIndex}>{text}</YVText>
                  ))}
                </div>
              )}
            </div>

            {/* Imagem */}
            <div
              className={`relative order-1 ${
                index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
              }`}
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              data-aos-delay={500 + (index * 200)}
              data-aos-duration="700"
            >
              <div className='relative w-full aspect-[611/640] rounded-xl max-h-[200px] md:max-h-full overflow-hidden'>
                <YVBanner
                  src={item.image}
                  srcMobile={item.imageMobile}
                  alt={item.imageAlt}
                  className='object-cover max-h-[200px] md:max-h-full'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
