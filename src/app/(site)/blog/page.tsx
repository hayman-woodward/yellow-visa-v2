import BeneficiosSection from '@/components/shared/BeneficiosSection';
import CTABanner from '@/components/shared/CTABanner';
import SobreBlog from './components/SobreBlog';
import MaisNoticias from './components/MaisNoticias';
import MaisHistorias from './components/MaisHistorias';
import MaisDestinos from './components/MaisDestinos';
import HeroBlog from './components/HeroBlog';

export const metadata = {
  title: 'Dicas e Notícias | Blog Yellow Visa',
  description:
    'Conteúdos sobre imigração, vistos, vida nos EUA e Portugal, e histórias reais para te ajudar a planejar seu próximo passo.',
};

export default function BlogPage() {
  return (
    <div>
      <HeroBlog />
      <SobreBlog />
      <MaisNoticias />
      <MaisHistorias />
      <MaisDestinos />
      <CTABanner />
      <BeneficiosSection />
      <div className='h-[80px] bg-[#0F0005]'></div>
    </div>
  );
}
