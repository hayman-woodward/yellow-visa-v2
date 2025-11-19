import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createBlogPostSchema } from '@/schemas/dashboard/blog';
import { generateSlug } from '@/utils/generateSlug';

export async function GET() {
  try {
    const blogPosts = await prisma.blogPost.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(blogPosts);
  } catch (error: unknown) {
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
