import { YVGallery, YVSection } from '@/components/YV';

const destinosData = [
  {
    id: 'coimbra-1',
    src: '/imgs/destinos/galeria-01.jpg',
    alt: 'Coimbra - A cidade universitária',
    title: 'Coimbra: A cidade universitária',
    description: 'Vibe jovem, cultura pulsante e aluguéis mais acessíveis.',
    href: '/destinos/coimbra'
  },
  {
    id: 'braga-1',
    src: '/imgs/destinos/galeria-02.jpg',
    alt: 'Braga - A Roma Portuguesa',
    title: 'Braga: A "Roma Portuguesa"',
    description:
      'História, tecnologia e custo de vida até 30% menor que Lisboa.',
    href: '/destinos/braga'
  },
  {
    id: 'aveiro-1',
    src: '/imgs/destinos/galeria-01.jpg',
    alt: 'Aveiro - A Veneza Portuguesa',
    title: 'Aveiro: A "Veneza Portuguesa"',
    description:
      'Qualidade de vida, praias próximas e um polo de inovação crescente.',
    href: '/destinos/aveiro'
  },
  {
    id: 'coimbra-2',
    src: '/imgs/destinos/galeria-02.jpg',
    alt: 'Coimbra - A cidade universitária',
    title: 'Coimbra: A cidade universitária',
    description: 'Vibe jovem, cultura pulsante e aluguéis mais acessíveis.',
    href: '/destinos/coimbra'
  },
  {
    id: 'braga-2',
    src: '/imgs/destinos/galeria-01.jpg',
    alt: 'Braga - A Roma Portuguesa',
    title: 'Braga: A "Roma Portuguesa"',
    description:
      'História, tecnologia e custo de vida até 30% menor que Lisboa.',
    href: '/destinos/braga'
  },
  {
    id: 'aveiro-2',
    src: '/imgs/destinos/galeria-02.jpg',
    alt: 'Aveiro - A Veneza Portuguesa',
    title: 'Aveiro: A "Veneza Portuguesa"',
    description:
      'Qualidade de vida, praias próximas e um polo de inovação crescente.',
    href: '/destinos/aveiro'
  },
  {
    id: 'coimbra-3',
    src: '/imgs/destinos/galeria-01.jpg',
    alt: 'Coimbra - A cidade universitária',
    title: 'Coimbra: A cidade universitária',
    description: 'Vibe jovem, cultura pulsante e aluguéis mais acessíveis.',
    href: '/destinos/coimbra'
  },
  {
    id: 'braga-3',
    src: '/imgs/destinos/galeria-02.jpg',
    alt: 'Braga - A Roma Portuguesa',
    title: 'Braga: A "Roma Portuguesa"',
    description:
      'História, tecnologia e custo de vida até 30% menor que Lisboa.',
    href: '/destinos/braga'
  },
  {
    id: 'aveiro-3',
    src: '/imgs/destinos/galeria-02.jpg',
    alt: 'Aveiro - A Veneza Portuguesa',
    title: 'Aveiro: A "Veneza Portuguesa"',
    description:
      'Qualidade de vida, praias próximas e um polo de inovação crescente.',
    href: '/destinos/aveiro'
  },
  {
    id: 'coimbra-4',
    src: '/imgs/destinos/galeria-01.jpg',
    alt: 'Coimbra - A cidade universitária',
    title: 'Coimbra: A cidade universitária',
    description: 'Vibe jovem, cultura pulsante e aluguéis mais acessíveis.',
    href: '/destinos/coimbra'
  },
  {
    id: 'braga-4',
    src: '/imgs/destinos/galeria-02.jpg',
    alt: 'Braga - A Roma Portuguesa',
    title: 'Braga: A "Roma Portuguesa"',
    description:
      'História, tecnologia e custo de vida até 30% menor que Lisboa.',
    href: '/destinos/braga'
  },
  {
    id: 'aveiro-4',
    src: '/imgs/destinos/galeria-02.jpg',
    alt: 'Aveiro - A Veneza Portuguesa',
    title: 'Aveiro: A "Veneza Portuguesa"',
    description:
      'Qualidade de vida, praias próximas e um polo de inovação crescente.',
    href: '/destinos/aveiro'
  }
];

export default function CardsDestinos() {
  return (
    <YVSection className='bg-white px-4'>
      <div className='max-w-[1248px] mx-auto'>
        <YVGallery
          items={destinosData}
          variant='grid'
          columns={4}
          gap='custom'
          showTitles={true}
          showDescriptions={true}
          aspectRatio='auto'
          imageClassName='aspect-[294/400] object-cover max-h-[400px] md:max-h-full'
          className='[&>*]:!gap-x-6 [&>*]:!gap-y-12'
        />
      </div>
    </YVSection>
  );
}
