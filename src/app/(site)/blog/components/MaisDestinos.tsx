import VerMaisSection from '@/components/shared/VerMaisSection';

export default function MaisDestinos() {
  const destinosItems = [
    {
      id: '1',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Estados Unidos',
      title: 'Estados Unidos',
      description: 'Oportunidades profissionais e acadêmicas nos EUA',
      href: '/destinos/estados-unidos'
    },
    {
      id: '2',
      src: '/imgs/home/portugal.png',
      alt: 'Portugal',
      title: 'Portugal',
      description: 'Vida na Europa com facilidades para brasileiros',
      href: '/destinos/portugal'
    },
    {
      id: '3',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Canadá',
      title: 'Canadá',
      description: 'Programas de imigração e qualidade de vida',
      href: '/destinos/canada'
    }
  ];

  return (
    <VerMaisSection
      title='Destinos'
      description=''
      buttonText='Ver todos os destinos'
      buttonHref='/destinos'
      buttonVariant='outline-secondary'
      galleryItems={destinosItems}
      showDescriptions={true}
    />
  );
}
