import HeroVistos from './components/HeroVistos';
import Banner from './components/banner';

import RequisitosEspeciais from './components/RequisitosEspeciais';
import BeneficiosSection from '@/components/shared/BeneficiosSection';
import DicasENoticias from '@/components/shared/DicasENoticias';
import PerguntasFrequentes from '@/components/shared/PerguntasFrequentes';
import CTABanner from '@/components/shared/CTABanner';
import Vistos from './components/Vistos';
import Contadores from '../sobre/components/contadores';
import SimplificamosSeuVisto from './components/SimplicaficamosSeuVisto';

export const metadata = {
  title: 'Vistos para EUA e Portugal | Tipos e orientações',
  description:
    'Conheça os principais tipos de visto para Estados Unidos e Portugal e entenda qual caminho combina com seu objetivo.',
};

export default function Sobre() {
  return (
    <div>
      <HeroVistos />
      <Banner />
      <Vistos />
      <SimplificamosSeuVisto />
      <RequisitosEspeciais />
      <Contadores />
      <PerguntasFrequentes slug='guia-do-imigrante' />
      <CTABanner />
      <BeneficiosSection />
      <DicasENoticias />
    </div>
  );
}
