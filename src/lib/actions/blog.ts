import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/utils/generateSlug';

export async function getRecentBlogPosts(limit: number = 4) {
  try {
    // Buscar posts publicados, priorizando os que têm publishedAt, mas incluindo todos os publicados
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'published'
      },
      orderBy: [
        {
          publishedAt: 'desc'
        },
        {
          updatedAt: 'desc'
        }
      ],
      take: limit,
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

    console.log(`📝 getRecentBlogPosts: encontrados ${posts.length} posts`);
    
    return posts;
  } catch (error: unknown) {
    console.error('Error fetching blog posts:', error);
    // Se o erro for por campos não existirem, tentar buscar sem select explícito
    if ((error as { code?: string; message?: string }).code === 'P2022' || 
        (error as { message?: string }).message?.includes('does not exist')) {
      try {
        console.log('⚠️ Tentando fallback sem select explícito...');
        const posts = await prisma.blogPost.findMany({
          where: {
            status: 'published'
          },
          orderBy: [
            {
              publishedAt: 'desc'
            },
            {
              updatedAt: 'desc'
            }
          ],
          take: limit,
        });

        // Mapear apenas os campos necessários
        const mappedPosts = posts.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          category: post.category,
          excerpt: post.excerpt,
          featuredImage: (post as any).featuredImage || null,
          publishedAt: post.publishedAt
        }));
        
        console.log(`📝 getRecentBlogPosts (fallback): encontrados ${mappedPosts.length} posts`);
        return mappedPosts;
      } catch (fallbackError) {
        console.error('Error fetching blog posts (fallback):', fallbackError);
        return [];
      }
    }
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
    // Usar select explícito para evitar buscar campos que não existem no banco
    let postData;
    try {
      postData = await prisma.blogPost.findUnique({
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
        }
      });
    } catch (error: unknown) {
      // Se der erro por campos não existirem, buscar sem eles
      if ((error as { code?: string; message?: string }).code === 'P2022' || 
          (error as { message?: string }).message?.includes('related_links') ||
          (error as { message?: string }).message?.includes('outros_destaques')) {
        postData = await prisma.blogPost.findUnique({
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
      } else {
        throw error;
      }
    }
    
    if (!postData) {
      return null;
    }

    // Montar o objeto post com valores padrão para campos opcionais
    const post = {
      id: postData.id,
      title: postData.title,
      slug: postData.slug,
      content: postData.content,
      excerpt: postData.excerpt,
      category: postData.category,
      metaTitle: postData.metaTitle,
      metaDescription: postData.metaDescription,
      ogTitle: postData.ogTitle,
      ogDescription: postData.ogDescription,
      ogImage: postData.ogImage,
      twitterTitle: postData.twitterTitle,
      twitterDescription: postData.twitterDescription,
      twitterImage: postData.twitterImage,
      featuredImage: postData.featuredImage,
      publishedAt: postData.publishedAt,
      createdAt: postData.createdAt,
      authorId: postData.authorId,
      status: postData.status,
      relatedLinksEnabled: (postData as { relatedLinksEnabled?: boolean }).relatedLinksEnabled ?? false,
      relatedLinks: (postData as { relatedLinks?: string | null }).relatedLinks ?? null,
      outrosDestaquesEnabled: false,
      outrosDestaquesTitle: null,
      outrosDestaquesDescription: null,
      outrosDestaques: null
    };

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
      author
    };
  } catch (error) {
    console.error('❌ Error fetching blog post:', error);
    return null;
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    console.log('🔍 Buscando post com slug:', slug);
    
    let postData;
    try {
      postData = await prisma.blogPost.findUnique({
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
        }
      });
    } catch (error: unknown) {
      // Se der erro por campos não existirem, buscar sem eles
      if ((error as { code?: string; message?: string }).code === 'P2022' || 
          (error as { message?: string }).message?.includes('related_links') ||
          (error as { message?: string }).message?.includes('outros_destaques')) {
        postData = await prisma.blogPost.findUnique({
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
      } else {
        throw error;
      }
    }
    
    if (!postData) {
      console.log('❌ Post não encontrado no banco');
      return null;
    }
    
    const post = {
      ...postData,
      relatedLinksEnabled: (postData as { relatedLinksEnabled?: boolean }).relatedLinksEnabled ?? false,
      relatedLinks: (postData as { relatedLinks?: string | null }).relatedLinks ?? null,
      outrosDestaquesEnabled: false,
      outrosDestaquesTitle: null,
      outrosDestaquesDescription: null,
      outrosDestaques: null
    };

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

export async function getRelatedPostsByCategory(category: string, currentSlug: string, limit: number = 3) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        category: category,
        slug: {
          not: currentSlug
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
        featuredImage: true,
        publishedAt: true
      }
    });

    console.log(`📝 getRelatedPostsByCategory: encontrados ${posts.length} posts para categoria ${category}`);
    return posts;
  } catch (error) {
    console.error('❌ Error fetching related blog posts:', error);
    return [];
  }
}