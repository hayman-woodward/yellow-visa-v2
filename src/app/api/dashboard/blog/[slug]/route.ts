import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateBlogPostSchema } from '@/schemas/dashboard/blog';
import { generateSlug } from '@/utils/generateSlug';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!blogPost) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(blogPost);
  } catch (error: unknown) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ message: 'Error fetching blog post', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    console.log('📥 PUT /api/dashboard/blog/[slug] - Body recebido:', body);
    console.log('📥 authorId no body:', body.authorId);

    // Validar dados com Zod
    const validated = updateBlogPostSchema.parse(body);
    
    console.log('✅ Dados validados:', validated);
    console.log('✅ authorId validado:', validated.authorId);

    // Verificar se o post existe
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!existingPost) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
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
      category,
      tags,
      order,
      status,
      isFeatured,
      authorId,
      relatedLinksEnabled,
      relatedLinks,
    } = validated;

    // Preparar dados de atualização (sem os campos novos se não existirem no banco)
    const baseUpdateData = {
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
      publishedAt: status === 'published' && !existingPost.publishedAt ? new Date() : existingPost.publishedAt,
    };

    // Adicionar campos novos apenas se estiverem presentes no validated
    const updateData = {
      ...baseUpdateData,
      ...(relatedLinksEnabled !== undefined && { relatedLinksEnabled }),
      ...(relatedLinks !== undefined && { relatedLinks }),
    };

    const finalSlug = newSlug && newSlug !== existingPost.slug ? generateSlug(newSlug) : existingPost.slug;

    // Check for slug conflict if slug changed
    if (newSlug && newSlug !== existingPost.slug) {
      const slugConflict = await prisma.blogPost.findUnique({
        where: { slug: finalSlug },
      });
      if (slugConflict) {
        return NextResponse.json({ message: 'New slug already exists' }, { status: 409 });
      }
    }

    console.log('💾 Dados para atualizar:', updateData);
    console.log('💾 authorId que será salvo:', updateData.authorId);

    const updatedPost = await prisma.blogPost.update({
      where: { slug },
      data: updateData,
    });

    console.log('✅ Post atualizado:', updatedPost);
    console.log('✅ authorId no post atualizado:', updatedPost.authorId);

    return NextResponse.json(updatedPost);
  } catch (error: unknown) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ message: 'Error updating blog post', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!existingPost) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    await prisma.blogPost.delete({
      where: { slug },
    });

    return NextResponse.json({ message: 'Blog post deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ message: 'Error deleting blog post', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
