import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createBlogPostSchema } from '@/schemas/dashboard/blog';
import { generateSlug } from '@/utils/generateSlug';

export async function GET() {
  try {
    // Tentar buscar normalmente primeiro
    const blogPosts = await prisma.blogPost.findMany({
      orderBy: { order: 'asc' },
    });
    
    // Adicionar valores padrão para campos que podem não existir no banco
    const blogPostsWithDefaults = blogPosts.map((post: any) => ({
      ...post,
      relatedLinksEnabled: post.relatedLinksEnabled ?? false,
      relatedLinks: post.relatedLinks ?? null,
    }));
    
    return NextResponse.json(blogPostsWithDefaults);
  } catch (error: any) {
    // Se o erro for por campos não existirem, usar select explícito
    if (error.code === 'P2022' && error.message?.includes('related_links')) {
      try {
        const blogPosts = await prisma.blogPost.findMany({
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            content: true,
            featuredImage: true,
            createdAt: true,
            updatedAt: true,
            authorId: true,
            category: true,
            isFeatured: true,
            metaDescription: true,
            metaKeywords: true,
            metaTitle: true,
            ogDescription: true,
            ogImage: true,
            ogTitle: true,
            order: true,
            publishedAt: true,
            status: true,
            tags: true,
            twitterDescription: true,
            twitterImage: true,
            twitterTitle: true,
          },
          orderBy: { order: 'asc' },
        });
        
        // Adicionar valores padrão para campos que não existem
        const blogPostsWithDefaults = blogPosts.map((post: any) => ({
          ...post,
          relatedLinksEnabled: false,
          relatedLinks: null,
        }));
        
        return NextResponse.json(blogPostsWithDefaults);
      } catch (selectError) {
        console.error('Error fetching blog posts with select:', selectError);
        return NextResponse.json({ message: 'Error fetching blog posts', error: selectError instanceof Error ? selectError.message : 'Unknown error' }, { status: 500 });
      }
    }
    
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ message: 'Error fetching blog posts', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createBlogPostSchema.parse(body);

    const {
      title,
      slug: customSlug,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      metaKeywords,
      ogTitle,
      ogDescription,
      ogImage,
      twitterTitle,
      twitterDescription,
      twitterImage,
      featuredImage,
      category,
      tags,
      order,
      status,
      isFeatured,
      authorId,
      relatedLinksEnabled,
      relatedLinks,
    } = validated;

    const finalSlug = customSlug || generateSlug(title);

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: finalSlug },
    });

    if (existingPost) {
      return NextResponse.json({ message: 'Slug already exists' }, { status: 409 });
    }

    // Preparar dados base
    const baseData = {
      title,
      slug: finalSlug,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      metaKeywords,
      ogTitle,
      ogDescription,
      ogImage,
      twitterTitle,
      twitterDescription,
      twitterImage,
      featuredImage,
      category,
      tags,
      order,
      status,
      isFeatured,
      authorId: authorId || null,
      publishedAt: status === 'published' ? new Date() : null,
    };

    // Adicionar campos novos apenas se estiverem presentes
    const createData = {
      ...baseData,
      ...(relatedLinksEnabled !== undefined && { relatedLinksEnabled: relatedLinksEnabled || false }),
      ...(relatedLinks !== undefined && { relatedLinks: relatedLinks || null }),
    };

    const newPost = await prisma.blogPost.create({
      data: createData,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ message: 'Error creating blog post', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
