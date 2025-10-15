import VerMaisSection from '@/components/shared/VerMaisSection';

export default function MaisNoticias() {
  const noticiasItems = [
    {
      id: '1',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'EB-2 NIW',
      title: 'EB-2 NIW',
      description: 'Seu Passaporte para Contribuir com o Futuro dos EUA',
      href: '/blog/eb-2-niw'
    },
    {
      id: '2',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Grupo é Alvo da PF',
      title: 'Grupo é Alvo da PF',
      description:
        'Grupo Lucra R$ 59 Milhões com Envio de Brasileiros aos EUA e é Alvo da PF',
      href: '/blog/grupo-alvo-pf'
    },
    {
      id: '3',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Portugal Sem Imigração',
      title: 'Portugal Sem Imigração',
      description: 'Impactos e Necessidade de Políticas Claras',
      href: '/blog/portugal-sem-imigracao'
    }
  ];

  return (
    <VerMaisSection
      title='Notícias'
      description='Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição'
      buttonText='Ver todas as notícias'
      buttonHref='/noticias'
      buttonVariant='outline-secondary'
      galleryItems={noticiasItems}
      showDescriptions={true}
    />
  );
}
