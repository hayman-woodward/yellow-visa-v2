import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/utils/generateSlug';

export async function getRecentBlogPosts(limit: number = 4) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        publishedAt: {
          not: null
        }
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        excerpt: true,
        publishedAt: true
      }
    });

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostsByCategory(category: string) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        publishedAt: {
          not: null
        },
        category: category
      },
      orderBy: {
        publishedAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true
      }
    });

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
}

export async function getPublishedHistorias() {
  try {
    const historias = await prisma.historia.findMany({
      where: {
        status: 'published'
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        imageUrl: true,
        authorName: true,
        country: true,
        createdAt: true
      }
    });

    return historias;
  } catch (error) {
    console.error('Error fetching historias:', error);
    return [];
  }
}

export async function getBlogPostByCategoryAndSlug(category: string, slug: string) {
  try {
    // Tentar buscar com os campos relacionados primeiro
    let post: {
      id: string;
      title: string;
      slug: string;
      content: string;
      excerpt: string | null;
      category: string | null;
      metaTitle: string | null;
      metaDescription: string | null;
      ogTitle: string | null;
      ogDescription: string | null;
      ogImage: string | null;
      twitterTitle: string | null;
      twitterDescription: string | null;
      twitterImage: string | null;
      featuredImage: string | null;
      publishedAt: Date | null;
      createdAt: Date;
      authorId: string | null;
      status: string;
      relatedLinksEnabled?: boolean;
      relatedLinks?: string | null;
      outrosDestaquesEnabled?: boolean;
      outrosDestaquesTitle?: string | null;
      outrosDestaquesDescription?: string | null;
      outrosDestaques?: string | null;
    } | null;
    try {
      post = await prisma.blogPost.findUnique({
        where: {
          slug
        },
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          excerpt: true,
          category: true,
          metaTitle: true,
          metaDescription: true,
          ogTitle: true,
          ogDescription: true,
          ogImage: true,
          twitterTitle: true,
          twitterDescription: true,
          twitterImage: true,
          featuredImage: true,
          publishedAt: true,
          createdAt: true,
          authorId: true,
          status: true,
          relatedLinksEnabled: true,
          relatedLinks: true,
          outrosDestaquesEnabled: true,
          outrosDestaquesTitle: true,
          outrosDestaquesDescription: true,
          outrosDestaques: true
        }
      });
    } catch (error: unknown) {
      // Se os campos não existirem, buscar sem eles
      if ((error as { code?: string; message?: string }).code === 'P2022' || (error as { message?: string }).message?.includes('related_links')) {
        post = await prisma.blogPost.findUnique({
          where: {
            slug
          },
          select: {
            id: true,
            title: true,
            slug: true,
            content: true,
            excerpt: true,
            category: true,
            metaTitle: true,
            metaDescription: true,
            ogTitle: true,
            ogDescription: true,
            ogImage: true,
            twitterTitle: true,
            twitterDescription: true,
            twitterImage: true,
            featuredImage: true,
            publishedAt: true,
            createdAt: true,
            authorId: true,
            status: true,
          }
        });
        // Adicionar valores padrão
        if (post) {
          post.relatedLinksEnabled = false;
          post.relatedLinks = null;
          post.outrosDestaquesEnabled = false;
          post.outrosDestaquesTitle = null;
          post.outrosDestaquesDescription = null;
          post.outrosDestaques = null;
        }
      } else {
        throw error;
      }
    }

    if (!post) {
      return null;
    }

    // Verificar se a categoria corresponde (normalizar ambas para comparar)
    const normalizedPostCategory = post.category ? generateSlug(post.category) : 'blog';
    const normalizedUrlCategory = category ? generateSlug(category) : 'blog';
    if (normalizedPostCategory !== normalizedUrlCategory) {
      return null;
    }

    // Filtrar apenas posts publicados
    if (post.status !== 'published') {
      return null;
    }

    // Buscar autor separadamente se houver authorId
    let author = null;
    if (post.authorId) {
      const authorData = await prisma.user.findUnique({
        where: { id: post.authorId },
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true
        }
      });
      author = authorData;
    }

    return {
      ...post,
      author,
      relatedLinksEnabled: post.relatedLinksEnabled ?? false,
      relatedLinks: post.relatedLinks ?? null,
      outrosDestaquesEnabled: post.outrosDestaquesEnabled ?? false,
      outrosDestaquesTitle: post.outrosDestaquesTitle ?? null,
      outrosDestaquesDescription: post.outrosDestaquesDescription ?? null,
      outrosDestaques: post.outrosDestaques ?? null
    } as typeof post & { author: typeof author; relatedLinksEnabled: boolean; relatedLinks: string | null; outrosDestaquesEnabled: boolean; outrosDestaquesTitle: string | null; outrosDestaquesDescription: string | null; outrosDestaques: string | null };
  } catch (error) {
    console.error('❌ Error fetching blog post:', error);
    return null;
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    console.log('🔍 Buscando post com slug:', slug);
    
    const post = await prisma.blogPost.findUnique({
      where: {
        slug
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        excerpt: true,
        category: true,
        metaTitle: true,
        metaDescription: true,
        ogTitle: true,
        ogDescription: true,
        ogImage: true,
        twitterTitle: true,
        twitterDescription: true,
        twitterImage: true,
        featuredImage: true,
        publishedAt: true,
        createdAt: true,
        authorId: true,
        status: true,
        relatedLinksEnabled: true,
        relatedLinks: true,
        outrosDestaquesEnabled: true,
        outrosDestaquesTitle: true,
        outrosDestaquesDescription: true,
        outrosDestaques: true
      }
    });

    console.log('📄 Post encontrado:', post ? 'SIM' : 'NÃO');
    if (post) {
      console.log('📊 Status do post:', post.status);
      console.log('👤 AuthorId:', post.authorId);
    }

    if (!post) {
      console.log('❌ Post não encontrado no banco');
      return null;
    }

    // Filtrar apenas posts publicados
    if (post.status !== 'published') {
      console.log('⚠️ Post encontrado mas não está publicado. Status:', post.status);
      return null;
    }

    // Buscar autor separadamente se houver authorId
    let author = null;
    if (post.authorId) {
      console.log('🔍 Buscando autor com ID:', post.authorId);
      const authorData = await prisma.user.findUnique({
        where: { id: post.authorId },
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true
        }
      });
      console.log('👤 Autor encontrado:', authorData ? 'SIM' : 'NÃO');
      if (authorData) {
        console.log('👤 Nome do autor:', authorData.name);
        console.log('👤 Avatar do autor:', authorData.avatar || 'SEM AVATAR');
      }
      author = authorData;
    } else {
      console.log('⚠️ Post não tem authorId');
    }

    const result = {
      ...post,
      author
    };
    
    console.log('✅ Retornando post com autor:', result.author ? 'SIM' : 'NÃO');
    return result;
  } catch (error) {
    console.error('❌ Error fetching blog post:', error);
    return null;
  }
}