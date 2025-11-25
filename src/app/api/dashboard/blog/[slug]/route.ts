import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateBlogPostSchema } from '@/schemas/dashboard/blog';
import { generateSlug } from '@/utils/generateSlug';
import { getSession } from '@/lib/auth';

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
  let slug: string | undefined;
  
  try {
    // Verificar autenticação
    const session = await getSession();
    if (!session) {
      console.error('❌ Unauthorized delete attempt');
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    // Resolver params
    try {
      const resolvedParams = await params;
      slug = resolvedParams.slug;
    } catch (paramsError) {
      console.error('❌ Error resolving params:', paramsError);
      return NextResponse.json({ 
        message: 'Erro ao processar parâmetros', 
        error: paramsError instanceof Error ? paramsError.message : 'Unknown error'
      }, { status: 400 });
    }

    if (!slug || slug.trim() === '') {
      console.error('❌ Empty slug provided');
      return NextResponse.json({ message: 'Slug é obrigatório' }, { status: 400 });
    }

    console.log('🗑️ Attempting to delete blog post with slug:', slug);

    // Verificar se o post existe usando query raw para evitar erros de campos inexistentes
    const existingPost = await prisma.$queryRaw<Array<{ id: string }>>`
      SELECT id FROM blog_posts WHERE slug = ${slug} LIMIT 1
    `;

    if (!existingPost || existingPost.length === 0) {
      console.log('❌ Blog post not found:', slug);
      return NextResponse.json({ message: 'Post não encontrado' }, { status: 404 });
    }

    console.log('✅ Blog post found, deleting...', existingPost[0].id);

    // Deletar usando query raw para evitar problemas com campos que não existem
    await prisma.$executeRaw`
      DELETE FROM blog_posts WHERE slug = ${slug}
    `;

    console.log('✅ Blog post deleted successfully:', slug);

    return NextResponse.json({ 
      message: 'Post deletado com sucesso',
      success: true
    }, { status: 200 });
  } catch (error: unknown) {
    console.error('❌ Error deleting blog post:', error);
    
    // Tentar serializar o erro de forma segura
    let errorDetails = 'Erro desconhecido';
    let errorCode = 'UNKNOWN';
    
    if (error && typeof error === 'object') {
      if ('code' in error) {
        errorCode = String(error.code);
      }
      if ('message' in error) {
        errorDetails = String(error.message);
      } else if ('meta' in error && error.meta && typeof error.meta === 'object' && 'target' in error.meta) {
        errorDetails = `Constraint violation: ${JSON.stringify(error.meta.target)}`;
      }
    } else if (error instanceof Error) {
      errorDetails = error.message;
    }
    
    console.error('Error code:', errorCode);
    console.error('Error details:', errorDetails);
    console.error('Full error:', error);
    
    // Verificar se é um erro de constraint do Prisma
    if (errorCode === 'P2003') {
      return NextResponse.json({ 
        message: 'Não é possível deletar o post: existem registros relacionados', 
        error: errorDetails
      }, { status: 409 });
    }
    
    if (errorCode === 'P2025') {
      return NextResponse.json({ 
        message: 'Post não encontrado', 
        error: errorDetails
      }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Erro ao deletar post', 
      error: errorDetails,
      code: errorCode
    }, { status: 500 });
  }
}
