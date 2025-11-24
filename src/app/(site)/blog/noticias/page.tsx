import CTABanner from '@/components/shared/CTABanner';
import BeneficiosSection from '@/components/shared/BeneficiosSection';
import { YVGallery, YVSection, YVText, YVTitle } from '@/components/YV';
import { getBlogPostsByCategory } from '@/lib/actions/blog';
import { generateSlug } from '@/utils/generateSlug';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Notícias | Blog Yellow Visa',
  description: 'Fique por dentro das últimas notícias sobre imigração, vistos e destinos.',
};

export default async function NoticiasPage() {
  const posts = await getBlogPostsByCategory('Notícias');

  const postsData = posts.map((post) => ({
    id: post.id,
    src: post.featuredImage || '/imgs/home/estados-unidos.jpg',
    alt: post.title,
    title: post.title,
    description: post.excerpt || '',
    href: `/blog/${generateSlug(post.category || 'blog')}/${post.slug}`
  }));

  return (
    <>
      <YVSection className='bg-YV-secondary-gradient px-4 -mt-[88px] md:-mt-[120px]'>
        <div className='max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 pt-[93px] md:pt-[100px]'>
          <div className='pb-5 lg:pb-10'>
            <Link
              href='/blog'
              className='text-[14x] font-bold transition-all duration-200 py-[10px] md:py-[14px] hover:opacity-70 flex items-center gap-1'
            >
              ← Voltar para Dicas e Notícias
            </Link>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 lg:gap-20 items-start'>
            <div>
              <YVTitle tag="h1" variant='hero' title='Notícias' />
            </div>
            <div className='space-y-6 pt-6 md:pt-9 md:pl-6'>
              <YVText>
                Fique por dentro das últimas notícias sobre imigração, vistos e destinos.
              </YVText>
            </div>
          </div>
        </div>
      </YVSection>

      {postsData.length > 0 ? (
        <YVSection className='bg-white px-4'>
          <div className='max-w-[1248px] mx-auto'>
            <YVGallery
              items={postsData}
              variant='grid'
              columns={4}
              gap='custom'
              showTitles={true}
              showDescriptions={true}
              aspectRatio='auto'
              imageClassName='aspect-[294/400] object-cover max-h-[400px] md:max-h-full'
              className='[&>*]:!gap-x-6 [&>*]:!gap-y-12'
            />
          </div>
        </YVSection>
      ) : (
        <YVSection className='bg-white px-4'>
          <div className='max-w-[1248px] mx-auto text-center py-12'>
            <YVText>Nenhuma notícia encontrada.</YVText>
          </div>
        </YVSection>
      )}

      <CTABanner />
      <BeneficiosSection />
    </>
  );
}

