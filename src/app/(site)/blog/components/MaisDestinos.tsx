import VerMaisSection from '@/components/shared/VerMaisSection';
import { truncateText } from '@/utils/text';

export default function MaisDestinos() {
  const destinosItems = [
    {
      id: 'usa',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Estados Unidos',
      title: 'Estados Unidos',
      description: truncateText('Oportunidades profissionais e acadêmicas para brasileiros nos Estados Unidos.', 64),
      href: '/destinos/estados-unidos'
    },
    {
      id: 'portugal',
      src: '/imgs/home/portugal.jpg',
      alt: 'Portugal',
      title: 'Portugal',
      description: truncateText('Vida na Europa com facilidades de imigração para cidadãos da CPLP.', 64),
      href: '/destinos/portugal'
    }
  ];

  return (
    <VerMaisSection
      title='Destinos'
      description='Explore guias detalhados sobre os melhores lugares para viver, estudar e trabalhar no exterior.'
      buttonText='Ver todos os destinos'
      buttonHref='/destinos'
      buttonVariant='outline-secondary'
      galleryItems={destinosItems}
      showDescriptions={true}
    />
  );
}
