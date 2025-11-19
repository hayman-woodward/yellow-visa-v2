import { getBlogPostBySlug } from "@/lib/actions/blog";
import { redirect } from "next/navigation";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  
  // Buscar o post para pegar a categoria
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    // Se não encontrar, redireciona para página 404
    redirect('/not-found');
  }

  // Redirecionar para a estrutura com categoria
  const category = post.category || 'blog';
  redirect(`/blog/${category}/${slug}`);
}
