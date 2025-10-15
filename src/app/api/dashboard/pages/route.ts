import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPageSchema } from '@/schemas/dashboard/page';
import { generateSlug } from '@/utils/generateSlug';

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(pages);
  } catch (error: unknown) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({ message: 'Error fetching pages', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createPageSchema.parse(body);

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
      order,
      status,
      isHomepage,
    } = validated;

    const finalSlug = customSlug || generateSlug(title);

    // Check if slug already exists
    const existingPage = await prisma.page.findUnique({
      where: { slug: finalSlug },
    });

    if (existingPage) {
      return NextResponse.json({ message: 'Slug already exists' }, { status: 409 });
    }

    const newPage = await prisma.page.create({
      data: {
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
        order,
        status,
        isHomepage,
        publishedAt: status === 'published' ? new Date() : null,
      },
    });

    return NextResponse.json(newPage, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating page:', error);
    return NextResponse.json({ message: 'Error creating page', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
