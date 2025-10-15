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

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
        status: 'published'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        excerpt: true,
        metaTitle: true,
        metaDescription: true,
        ogTitle: true,
        ogDescription: true,
        ogImage: true,
        twitterTitle: true,
        twitterDescription: true,
        twitterImage: true,
        featuredImage: true,
        publishedAt: true
      }
    });

    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}