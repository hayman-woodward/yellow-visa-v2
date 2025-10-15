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
      images: post.ogImage ? [post.ogImage] : ['https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/og-image.png'],
    },
    twitter: {
      title: post.twitterTitle || post.title,
      description: post.twitterDescription || post.excerpt || undefined,
      images: post.twitterImage ? [post.twitterImage] : ['https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/og-image.png'],
    },
  };
}

export default function BlogPage() {
  return (
    <div>
      <BlogHeader />
      <FeaturedImg />
      <BlogPost />
      <CTABanner />
      <BeneficiosSection />
      <OutrosDestaques />
    </div>
  );
}
