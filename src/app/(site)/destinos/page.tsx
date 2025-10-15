import Contadores from '@/app/(site)/sobre/components/contadores';
import BeneficiosSection from '@/components/shared/BeneficiosSection';
import CTABanner from '@/components/shared/CTABanner';
import DicasENoticias from '@/components/shared/DicasENoticias';
import SimplificamosSeuVisto from '@/components/shared/SimplificamosSeuVisto';
import HeroDestinos from './components/HeroDestinos';
import Banner from './components/banner';

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
      <SimplificamosSeuVisto  showButton={false}/>

      <Contadores />
     
      <CTABanner />
      <BeneficiosSection />   

    </div>
  );
}
