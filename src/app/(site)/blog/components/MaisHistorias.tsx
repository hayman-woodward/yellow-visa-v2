import VerMaisSection from '@/components/shared/VerMaisSection';

export default function MaisHistorias() {
  const historiasItems = [
    {
      id: '1',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Carlos e Marcia',
      title: 'Carlos e Marcia',
      description:
        'Quando Carlos e Marcia se conheceram, Marcia estava com visto de estudante nos Estados Unidos.',
      href: '/blog/carlos-e-marcia'
    },
    {
      id: '2',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Silvio Nascimento',
      title: 'Silvio Nascimento',
      description:
        'Descrição Phasellus netus natoque ante eget at condimentum eget.',
      href: '/blog/silvio-nascimento'
    },
    {
      id: '3',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Otávio, Rosana, Lila e Paçoca',
      title: 'Otávio, Rosana, Lila e Paçoca',
      description:
        'Descrição Phasellus netus natoque ante eget at condimentum eget.',
      href: '/blog/otavio-rosana-lila-pacoca'
    }
  ];

  return (
    <VerMaisSection
      title='Histórias'
      description='Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição'
      buttonText='Ver todas as histórias'
      buttonHref='/historias'
      buttonVariant='outline-secondary'
      galleryItems={historiasItems}
      showDescriptions={true}
    />
  );
}
