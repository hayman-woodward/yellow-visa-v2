import Contadores from '@/app/(site)/sobre/components/contadores';
import CTABanner from '@/components/shared/CTABanner';
import SimplificamosSeuVisto from '@/components/shared/SimplificamosSeuVisto';
import DicasENoticias from '@/components/shared/DicasENoticias';
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

      {/* <Contadores /> */}
     
      <CTABanner />
      {/* <BeneficiosSection />    */}
      <DicasENoticias />
    </div>
  );
}
