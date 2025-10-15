import { YVCard, YVGrid, YVSection, YVText, YVTitle, YVIcon } from '@/components/YV';
import Image from 'next/image';

export default function PortugalHighlight() {
  const beneficios = [
    {
      icon: 'euro',
      title: 'Custo de Vida Acessível',
      description: 'Portugal oferece uma das melhores relações qualidade-preço da Europa, com custos até 40% menores que outros países europeus.',
      highlight: '40% mais barato'
    },
    {
      icon: 'shield',
      title: 'Segurança e Estabilidade',
      description: 'Um dos países mais seguros do mundo, com baixíssima criminalidade e excelente sistema de saúde público.',
      highlight: '3º mais seguro'
    },
    {
      icon: 'sun',
      title: 'Clima Mediterrâneo',
      description: 'Mais de 300 dias de sol por ano, praias deslumbrantes e um clima que convida a viver ao ar livre.',
      highlight: '300+ dias de sol'
    },
    {
      icon: 'graduation-cap',
      title: 'Educação de Qualidade',
      description: 'Sistema educacional reconhecido mundialmente, com universidades públicas gratuitas e ensino bilíngue.',
      highlight: 'Educação gratuita'
    },
    {
      icon: 'heart',
      title: 'Qualidade de Vida',
      description: 'Ritmo de vida mais tranquilo, excelente gastronomia e uma cultura acolhedora que abraça estrangeiros.',
      highlight: 'Top 10 mundial'
    },
    {
      icon: 'globe',
      title: 'Porta de Entrada Europeia',
      description: 'Com passaporte português, você tem acesso livre a todos os 27 países da União Europeia.',
      highlight: '27 países livres'
    }
  ];

  const cidades = [
    {
      name: 'Lisboa',
      image: '/imgs/destinos/galeria-02.jpg',
      description: 'Capital vibrante com história, modernidade e o melhor da vida urbana portuguesa.',
      highlights: ['Capital', 'Histórica', 'Cosmopolita']
    },
    {
      name: 'Porto',
      image: '/imgs/destinos/galeria-01.jpg', 
      description: 'Cidade do vinho do Porto, arquitetura única e uma das cidades mais charmosas da Europa.',
      highlights: ['Vinho do Porto', 'Arquitetura', 'Charmosa']
    },
    {
      name: 'Coimbra',
      image: '/imgs/destinos/galeria-01.jpg',
      description: 'Cidade universitária milenar, berço da cultura portuguesa e centro de inovação.',
      highlights: ['Universitária', 'Histórica', 'Inovação']
    }
  ];

  const estatisticas = [
    { numero: '10.3M', label: 'Habitantes' },
    { numero: '92.2k', label: 'km² de área' },
    { numero: '€1,200', label: 'Salário mínimo' },
    { numero: '€600', label: 'Custo médio aluguel' }
  ];

  return (
    <YVSection className='bg-white'>
      <div className='max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0'>
        
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 bg-[#FFBD1A]/10 px-4 py-2 rounded-full mb-6'>
            <YVIcon name='flag' className='w-4 h-4 text-[#C04]' />
            <span className='text-sm font-semibold text-[#C04]'>DESTINO DESTAQUE</span>
          </div>
          
          <YVTitle 
            variant='hero' 
            className='mb-6'
            title='Por que Portugal é o destino ideal para brasileiros?'
          />
          
          <YVText className='max-w-3xl mx-auto text-lg text-gray-600'>
            Descubra os motivos que fazem de Portugal o destino número 1 para brasileiros 
            que buscam uma nova vida na Europa com qualidade, segurança e oportunidades.
          </YVText>
        </div>

        {/* Estatísticas */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-16'>
          {estatisticas.map((stat, index) => (
            <div key={index} className='text-center p-6 bg-gradient-to-br from-[#FFBD1A]/5 to-[#C04]/5 rounded-xl'>
              <div className='text-3xl font-black text-[#C04] mb-2'>{stat.numero}</div>
              <div className='text-sm font-medium text-gray-600'>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefícios */}
        <div className='mb-16'>
          <YVTitle 
            variant='subtitle' 
            className='text-center mb-12'
            title='Vantagens únicas de viver em Portugal'
          />
          
          <YVGrid cols={1} mdCols={2} xlCols={3} gap={6}>
            {beneficios.map((beneficio, index) => (
              <YVCard 
                key={index}
                variant='outline' 
                hover='orange'
                className='p-6 h-full'
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-12 h-12 bg-[#FFBD1A]/10 rounded-lg flex items-center justify-center'>
                    <YVIcon name={beneficio.icon as any} className='w-6 h-6 text-[#C04]' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between mb-2'>
                      <YVTitle variant='subtitle' className='text-lg'>
                        {beneficio.title}
                      </YVTitle>
                      <span className='text-xs font-bold text-[#C04] bg-[#FFBD1A]/20 px-2 py-1 rounded-full'>
                        {beneficio.highlight}
                      </span>
                    </div>
                    <YVText className='text-gray-600 text-sm'>
                      {beneficio.description}
                    </YVText>
                  </div>
                </div>
              </YVCard>
            ))}
          </YVGrid>
        </div>

        {/* Cidades Principais */}
        <div className='mb-16'>
          <YVTitle 
            variant='subtitle' 
            className='text-center mb-12'
            title='Principais cidades para viver'
          />
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {cidades.map((cidade, index) => (
              <div 
                key={index}
                className='group cursor-pointer'
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className='relative overflow-hidden rounded-xl mb-4'>
                  <Image
                    src={cidade.image}
                    alt={cidade.name}
                    width={400}
                    height={250}
                    className='w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                  <div className='absolute bottom-4 left-4'>
                    <h3 className='text-2xl font-bold text-white mb-2'>{cidade.name}</h3>
                    <div className='flex gap-2'>
                      {cidade.highlights.map((highlight, idx) => (
                        <span 
                          key={idx}
                          className='text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm'
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <YVText className='text-gray-600'>
                  {cidade.description}
                </YVText>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className='text-center bg-gradient-to-r from-[#FFBD1A]/10 via-[#C04]/10 to-[#FFBD1A]/10 rounded-2xl p-8'>
          <YVTitle 
            variant='subtitle' 
            className='mb-4'
            title='Pronto para começar sua jornada em Portugal?'
          />
          <YVText className='mb-6 text-gray-600'>
            Nossa equipe especializada te guia através de todo o processo, 
            desde a escolha do visto ideal até sua chegada no país.
          </YVText>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-[#C04] hover:bg-[#C04]/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors'>
              Ver vistos para Portugal
            </button>
            <button className='border-2 border-[#C04] text-[#C04] hover:bg-[#C04] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors'>
              Falar com especialista
            </button>
          </div>
        </div>

      </div>
    </YVSection>
  );
}
