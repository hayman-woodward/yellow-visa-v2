import CTABanner from "@/components/shared/CTABanner";
import BlogHeader from "./components/BlogHeader";
import BlogPost from "./components/BlogPost";
import FeaturedImg from "./components/FeaturedImg";
import BeneficiosSection from "@/components/shared/BeneficiosSection";
import OutrosDestaques from "../locais/components/OutrosDestaques";
import { getBlogPostBySlug } from "@/lib/actions/blog";
import { Metadata } from "next";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

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
  const { slug } = await params;
  console.log('📝 BlogPage - Slug recebido:', slug);
  
  const post = await getBlogPostBySlug(slug);
  console.log('📝 BlogPage - Post retornado:', post ? 'SIM' : 'NÃO');

  if (!post) {
    console.log('📝 BlogPage - Mostrando página de erro');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
          <p className="text-gray-600">O post solicitado não foi encontrado.</p>
          <p className="text-sm text-gray-500 mt-2">Slug: {slug}</p>
        </div>
      </div>
    );
  }

  console.log('📝 BlogPage - Renderizando post:', {
    title: post.title,
    hasAuthor: !!post.author,
    authorName: post.author?.name
  });

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
      <CTABanner />
      <BeneficiosSection />
      <OutrosDestaques />
    </div>
  );
}
