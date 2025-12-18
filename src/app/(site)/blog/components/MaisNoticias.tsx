import VerMaisSection from '@/components/shared/VerMaisSection';
import { getRecentBlogPosts } from '@/lib/actions/blog';
import { generateSlug } from '@/utils/generateSlug';
import { truncateText } from '@/utils/text';

export default async function MaisNoticias() {
  const posts = await getRecentBlogPosts(3);
  
  const noticiasItems = posts.map(post => ({
    id: post.id,
    src: post.featuredImage || '/imgs/home/estados-unidos.jpg',
    alt: post.title,
    title: post.title,
    description: truncateText(post.excerpt || '', 64),
    href: `/blog/${post.category ? generateSlug(post.category) : 'noticias'}/${post.slug}`
  }));

  return (
    <VerMaisSection
      title='Notícias'
      description='Fique por dentro das últimas atualizações sobre imigração, mudanças na legislação e oportunidades internacionais.'
      buttonText='Ver todas as notícias'
      buttonHref='/blog/noticias'
      buttonVariant='outline-secondary'
      galleryItems={noticiasItems}
      showDescriptions={true}
    />
  );
}
