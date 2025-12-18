import VerMaisSection from '@/components/shared/VerMaisSection';
import { getPublishedHistorias } from '@/lib/actions/blog';
import { truncateText } from '@/utils/text';

export default async function MaisHistorias() {
  const historias = await getPublishedHistorias();
  
  if (historias.length === 0) {
    return null;
  }

  const limitedHistorias = historias.slice(0, 3);
  
  const historiasItems = limitedHistorias.map(h => ({
    id: h.id,
    src: h.imageUrl || '/imgs/home/estados-unidos.jpg',
    alt: h.title,
    title: h.title,
    description: truncateText(h.content.replace(/<[^>]*>/g, ''), 64),
    href: `/blog/historias/${h.slug}`
  }));

  return (
    <VerMaisSection
      title='Histórias'
      description='Conheça as trajetórias de quem transformou o sonho da imigração em realidade. Relatos reais de superação, planejamento e sucesso no exterior.'
      buttonText='Ver todas as histórias'
      buttonHref='/blog/historias'
      buttonVariant='outline-secondary'
      galleryItems={historiasItems}
      showDescriptions={true}
    />
  );
}
