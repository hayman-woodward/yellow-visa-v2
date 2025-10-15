import BeneficiosSection from '@/components/shared/BeneficiosSection';
import CTABanner from '@/components/shared/CTABanner';
import OutrosDestaques from '../components/OutrosDestaques';
import HeaderBlog from './components/HeaderBlog';

export default function DestinoPage() {
  return (
    <div>
      <HeaderBlog />
      <CTABanner />
      <BeneficiosSection />
      <OutrosDestaques />
    </div>
  );
}
