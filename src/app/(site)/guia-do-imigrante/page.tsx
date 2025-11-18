import BeneficiosSection from '@/components/shared/BeneficiosSection';
import CTABanner from '@/components/shared/CTABanner';
import FaqSearchWrapper from '@/components/shared/FaqSearchWrapper';
import { getAllFaqGroups } from '@/lib/actions/faq';
import HeroGuiaDoImigrante from './components/HeroGuiaDoImigrante';
import SobreGuiaDoImigrante from './components/SobreGuiaDoImigrante';
import DicasENoticias from '@/components/shared/DicasENoticias';

export const metadata = {
  title: 'Guia do Imigrante | Perguntas frequentes e orientações',
  description:
    'Busque respostas sobre vistos e processos de imigração. Conteúdos organizados por tema para EUA e Portugal.',
};

export default async function GuiaDoImigrante() {
  // Buscar todos os grupos de FAQ, excluindo o 'guia-do-imigrante'
  const faqGroups = await getAllFaqGroups('guia-do-imigrante');

  return (
    <div>
      <HeroGuiaDoImigrante />
      <SobreGuiaDoImigrante />


      {/* Seções de FAQ com busca */}
      <FaqSearchWrapper faqGroups={faqGroups} />

      <CTABanner />
      <BeneficiosSection />
      <DicasENoticias />
    
    </div>
  );
}
