import { prisma } from '@/lib/prisma';

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

export async function getBlogPostByCategoryAndSlug(category: string, slug: string) {
  try {
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
        relatedLinks: true
      }
    });

    if (!post) {
      return null;
    }

    // Verificar se a categoria corresponde
    if (post.category !== category) {
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
      relatedLinks: post.relatedLinks ?? null
    } as typeof post & { author: typeof author; relatedLinksEnabled: boolean; relatedLinks: string | null };
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
        relatedLinks: true
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