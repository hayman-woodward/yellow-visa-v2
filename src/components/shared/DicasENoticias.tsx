import { YVBreadcrumbs, YVSection, YVText, YVTitle } from '@/components/YV';
import { getRecentBlogPosts } from '@/lib/actions/blog';
import Link from 'next/link';

export default async function DicasENoticias() {
  const recentPosts = await getRecentBlogPosts(4);

  return (
    <YVSection className='bg-[#0F0005] text-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start'>
          {/* Lado esquerdo - Título e descrição */}
          <div>
            <YVBreadcrumbs
              className='pb-4 md:pb-5 text-[#FFBD1A]'
              items={[{ label: 'DICAS E NOTÍCIAS', href: '/blog' }]}
            />

            <YVTitle variant='heading' className='text-white max-w-md'>
              Conteúdos em Destaque
            </YVTitle>

            <YVText className='text-gray-300 mt-6 max-w-[448px] '>
              Descrição Phasellus netus natoque ante eget at
              <br /> condimentum eget.Descrição
            </YVText>
          </div>

          {/* Lado direito - Lista de artigos */}
          <div>
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className='block py-4 md:py-5 px-2 md:px-4 group'
              >
                <YVBreadcrumbs
                  items={[{ label: post.category || 'BLOG', href: `/blog/${post.slug}` }]}
                  className='pb-2 md:pb-4 text-[#8F8387]'
                />
                <YVTitle
                  variant='subtitle'
                  title={post.title}
                  noPadding
                  className='text-white group-hover:text-orange-500 transition-colors cursor-pointer'
                  tag='h3'
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </YVSection>
  );
}
