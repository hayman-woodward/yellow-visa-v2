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
    // Tentar buscar normalmente primeiro
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!blogPost) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    // Garantir que campos opcionais existam mesmo se não estiverem no banco
    const blogPostWithDefaults: Record<string, unknown> = {
      ...blogPost,
      relatedLinksEnabled: (blogPost as { relatedLinksEnabled?: boolean }).relatedLinksEnabled ?? false,
      relatedLinks: (blogPost as { relatedLinks?: string | null }).relatedLinks ?? null,
    };
    
    // Adicionar campos outrosDestaques apenas se existirem no banco
    if ('outrosDestaquesEnabled' in blogPost) {
      blogPostWithDefaults.outrosDestaquesEnabled = (blogPost as { outrosDestaquesEnabled?: boolean }).outrosDestaquesEnabled ?? false;
      blogPostWithDefaults.outrosDestaquesTitle = (blogPost as { outrosDestaquesTitle?: string | null }).outrosDestaquesTitle ?? null;
      blogPostWithDefaults.outrosDestaquesDescription = (blogPost as { outrosDestaquesDescription?: string | null }).outrosDestaquesDescription ?? null;
      blogPostWithDefaults.outrosDestaques = (blogPost as { outrosDestaques?: string | null }).outrosDestaques ?? null;
    } else {
      // Se não existirem, adicionar valores padrão
      blogPostWithDefaults.outrosDestaquesEnabled = false;
      blogPostWithDefaults.outrosDestaquesTitle = null;
      blogPostWithDefaults.outrosDestaquesDescription = null;
      blogPostWithDefaults.outrosDestaques = null;
    }

    return NextResponse.json(blogPostWithDefaults);
  } catch (error: unknown) {
    // Se o erro for por campos não existirem, usar select explícito
    if ((error as { code?: string; message?: string }).code === 'P2022' && 
        ((error as { message?: string }).message?.includes('related_links') || 
         (error as { message?: string }).message?.includes('outros_destaques'))) {
      try {
        const resolvedParams = await params;
        const blogPost = await prisma.blogPost.findUnique({
          where: { slug: resolvedParams.slug },
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
            relatedLinksEnabled: true,
            relatedLinks: true,
          },
        });

        if (!blogPost) {
          return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
        }

        // Adicionar valores padrão para campos que podem não existir
        const blogPostWithDefaults = {
          ...blogPost,
          relatedLinksEnabled: (blogPost as { relatedLinksEnabled?: boolean }).relatedLinksEnabled ?? false,
          relatedLinks: (blogPost as { relatedLinks?: string | null }).relatedLinks ?? null,
          outrosDestaquesEnabled: false,
          outrosDestaquesTitle: null,
          outrosDestaquesDescription: null,
          outrosDestaques: null,
        };

        return NextResponse.json(blogPostWithDefaults);
      } catch (selectError) {
        console.error('Error fetching blog post with select:', selectError);
        return NextResponse.json({ message: 'Error fetching blog post', error: selectError instanceof Error ? selectError.message : 'Unknown error' }, { status: 500 });
      }
    }

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

    // Calcular o slug final antes de usar
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

    // Preparar dados de atualização
    const updateData: Record<string, unknown> = {
      ...baseUpdateData,
    };

    // Adicionar campos opcionais se existirem no validated
    if ('relatedLinksEnabled' in validated) {
      updateData.relatedLinksEnabled = relatedLinksEnabled ?? false;
    }
    if ('relatedLinks' in validated) {
      updateData.relatedLinks = relatedLinks ?? null;
    }

    console.log('💾 Dados para atualizar:', updateData);
    console.log('💾 authorId que será salvo:', updateData.authorId);

    // Tentar atualizar normalmente
    let updatedPost;
    try {
      updatedPost = await prisma.blogPost.update({
        where: { slug },
        data: updateData,
      });
    } catch (error: unknown) {
      // Se der erro por campos não existirem, atualizar sem esses campos
      if ((error as { message?: string }).message?.includes('relatedLinks') || (error as { code?: string }).code === 'P2022') {
        console.warn('⚠️ Campos relatedLinks não existem no banco, atualizando sem eles');
        const safeUpdateData = { ...updateData };
        delete safeUpdateData.relatedLinksEnabled;
        delete safeUpdateData.relatedLinks;
        updatedPost = await prisma.blogPost.update({
          where: { slug },
          data: safeUpdateData,
        });
      } else {
        throw error;
      }
    }

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
