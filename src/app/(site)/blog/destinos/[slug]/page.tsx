import BeneficiosSection from '@/components/shared/BeneficiosSection';
import CTABanner from '@/components/shared/CTABanner';
import OutrosDestaques from '../components/OutrosDestaques';
import HeaderBlog from './components/HeaderBlog';
import { getRecentBlogPosts } from '@/lib/actions/blog';

export default async function DestinoPage() {
  const posts = await getRecentBlogPosts(3);
  return (
    <div>
      <HeaderBlog />
      <CTABanner />
      <BeneficiosSection />
      <OutrosDestaques posts={posts} />
    </div>
  );
}
