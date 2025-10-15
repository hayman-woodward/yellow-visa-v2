import CTABanner from '@/components/shared/CTABanner';
import SobreDestinos from './components/SobreDestinos';
import CardsDestinos from './components/CardsDestinos';
import OutrosDestaques from './components/OutrosDestaques';
import BeneficiosSection from '@/components/shared/BeneficiosSection';

export default function Destinos() {
  return (
    <>
      <SobreDestinos />
      <CardsDestinos />
      <CTABanner />
      <BeneficiosSection />
      <OutrosDestaques />
    </>
  );
}
