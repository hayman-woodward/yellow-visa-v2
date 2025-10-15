import SimplificamosSeuVisto from '@/components/shared/SimplificamosSeuVisto';
import BeneficiosSection from '@/components/shared/BeneficiosSection';
import DicasENoticias from '@/components/shared/DicasENoticias';
import PerguntasFrequentes from '@/components/shared/PerguntasFrequentes';
import CTABanner from '@/components/shared/CTABanner';
import Contadores from '@/app/(site)/sobre/components/contadores';
import Banner from './components/banner';
import HeroDestinos from './components/HeroDestinos';

export const metadata = {
  title: 'Destinos: EUA e Portugal | Viver, estudar e trabalhar',
  description:
    'Informações sobre viver, estudar e trabalhar nos Estados Unidos e em Portugal. Entenda oportunidades e caminhos possíveis.',
};

export default function Destinos() {
  return (
    <div className='min-h-screen bg-white'>
      <HeroDestinos />
      <Banner />
      <SimplificamosSeuVisto />

      <Contadores />
      <PerguntasFrequentes slug='guia-do-imigrante' />
      <CTABanner />
      <BeneficiosSection />
      <DicasENoticias />
    </div>
  );
}
