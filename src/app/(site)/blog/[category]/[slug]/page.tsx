import CTABanner from "@/components/shared/CTABanner";
import BlogHeader from "../../components/BlogHeader";
import BlogPost from "../../components/BlogPost";
import FeaturedImg from "../../components/FeaturedImg";
import BeneficiosSection from "@/components/shared/BeneficiosSection";
import OutrosDestaques from "../../locais/components/OutrosDestaques";
import { getBlogPostByCategoryAndSlug, getRelatedPostsByCategory } from "@/lib/actions/blog";
import { Metadata } from "next";
import RelatedLinks from "./components/RelatedLinks";

interface BlogPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getBlogPostByCategoryAndSlug(category, slug);

  if (!post) {
    return {
      title: 'Post não encontrado | Yellow Visa',
      description: 'O post solicitado não foi encontrado.',
    };
  }

  return {
    title: post.metaTitle || `${post.title} | Yellow Visa`,
    description: post.metaDescription || post.excerpt || `Leia mais sobre ${post.title} no blog da Yellow Visa.`,
    openGraph: {
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.excerpt || undefined,
      images: post.ogImage ? [post.ogImage] : ['https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/yv-og-image.jpg'],
    },
    twitter: {
      title: post.twitterTitle || post.title,
      description: post.twitterDescription || post.excerpt || undefined,
      images: post.twitterImage ? [post.twitterImage] : ['https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/yv-og-image.jpg'],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { category, slug } = await params;
  
  const post = await getBlogPostByCategoryAndSlug(category, slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
          <p className="text-gray-600">O post solicitado não foi encontrado.</p>
          <p className="text-sm text-gray-500 mt-2">Categoria: {category} | Slug: {slug}</p>
        </div>
      </div>
    );
  }

  // Parse related links - pode ser array de IDs ou array de objetos
  let relatedLinks: Array<{ title: string; link: string }> = [];
  if (post.relatedLinks) {
    try {
      const parsed = JSON.parse(post.relatedLinks);
      
      // Se for array de IDs (strings), buscar as FAQs correspondentes
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (typeof parsed[0] === 'string') {
          // Array de IDs - buscar FAQs
          const { prisma } = await import('@/lib/prisma');
          const faqQuestions = await prisma.faqQuestion.findMany({
            where: {
              id: { in: parsed },
              status: 'published'
            },
            select: {
              question: true,
              link: true
            }
          });
          
          relatedLinks = faqQuestions.map(faq => ({
            title: faq.question,
            link: faq.link
          }));
        } else if (typeof parsed[0] === 'object' && 'title' in parsed[0] && 'link' in parsed[0]) {
          // Já é array de objetos com title e link
          relatedLinks = parsed;
        }
      }
    } catch (error) {
      console.error('Error parsing related links:', error);
    }
  }

  // Buscar outros destaques (posts da mesma categoria)
  const relatedPosts = await getRelatedPostsByCategory(post.category || 'noticias', post.slug, 3);

  return (
    <div className="bg-white">
      <BlogHeader 
        title={post.title}
        excerpt={post.excerpt || ''}
        category={post.category || ''}
        author={post.author}
        publishedAt={post.publishedAt}
      />
      <FeaturedImg imageUrl={post.featuredImage} />
      <BlogPost content={post.content} />
      {post.relatedLinksEnabled && relatedLinks.length > 0 && (
        <RelatedLinks links={relatedLinks} />
      )}
      <CTABanner />
      <BeneficiosSection />
      <OutrosDestaques posts={relatedPosts} categoryName={post.category || 'Notícias'} />
    </div>
  );
}

