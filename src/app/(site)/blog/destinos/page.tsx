import CTABanner from '@/components/shared/CTABanner';
import SobreDestinos from './components/SobreDestinos';
import CardsDestinos from './components/CardsDestinos';
import OutrosDestaques from './components/OutrosDestaques';
import BeneficiosSection from '@/components/shared/BeneficiosSection';
import { getRecentBlogPosts } from '@/lib/actions/blog';

export default async function Destinos() {
  const posts = await getRecentBlogPosts(3);
  return (
    <>
      <SobreDestinos />
      <CardsDestinos />
      <CTABanner />
      <BeneficiosSection />
      <OutrosDestaques posts={posts} />
    </>
  );
}
