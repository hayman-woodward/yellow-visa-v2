import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updatePageSchema } from '@/schemas/dashboard/page';
import { generateSlug } from '@/utils/generateSlug';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const page = await prisma.page.findUnique({
      where: { slug },
    });

    if (!page) {
      return NextResponse.json({ message: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error: unknown) {
    console.error('Error fetching page:', error);
    return NextResponse.json({ message: 'Error fetching page', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // Validar dados com Zod
    const validated = updatePageSchema.parse(body);

    // Verificar se a página existe
    const existingPage = await prisma.page.findUnique({
      where: { slug },
    });

    if (!existingPage) {
      return NextResponse.json({ message: 'Page not found' }, { status: 404 });
    }

    const {
      title,
      slug: newSlug,
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

    const finalSlug = newSlug && newSlug !== existingPage.slug ? generateSlug(newSlug) : existingPage.slug;

    // Check for slug conflict if slug changed
    if (newSlug && newSlug !== existingPage.slug) {
      const slugConflict = await prisma.page.findUnique({
        where: { slug: finalSlug },
      });
      if (slugConflict) {
        return NextResponse.json({ message: 'New slug already exists' }, { status: 409 });
      }
    }

    const updatedPage = await prisma.page.update({
      where: { slug },
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
        publishedAt: status === 'published' && !existingPage.publishedAt ? new Date() : existingPage.publishedAt,
      },
    });

    return NextResponse.json(updatedPage);
  } catch (error: unknown) {
    console.error('Error updating page:', error);
    return NextResponse.json({ message: 'Error updating page', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const existingPage = await prisma.page.findUnique({
      where: { slug },
    });

    if (!existingPage) {
      return NextResponse.json({ message: 'Page not found' }, { status: 404 });
    }

    await prisma.page.delete({
      where: { slug },
    });

    return NextResponse.json({ message: 'Page deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting page:', error);
    return NextResponse.json({ message: 'Error deleting page', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
