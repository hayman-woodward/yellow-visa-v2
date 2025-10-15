import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { destinoSchema } from '@/schemas/dashboard/destino';

// GET - Buscar destino por slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const destino = await prisma.destino.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        content: true,
        bannerTitle: true,
        imageUrl: true,
        country: true,
        continent: true,
        highlights: true,
        status: true,
        // Campos das principais cidades
        cityEnabled: true,
        cityTitle: true,
        cityDescription: true,
        city1Title: true,
        city1Description: true,
        city1Image: true,
        city2Title: true,
        city2Description: true,
        city2Image: true,
        city3Title: true,
        city3Description: true,
        city3Image: true,
        city4Title: true,
        city4Description: true,
        city4Image: true,
        // Campos dos diferenciais
        diferenciaisEnabled: true,
        diferenciaisTitle: true,
        diferenciaisDescription: true,
        diferencial1Title: true,
        diferencial1Description: true,
        diferencial1Image: true,
        diferencial2Title: true,
        diferencial2Description: true,
        diferencial2Image: true,
        diferencial3Title: true,
        diferencial3Description: true,
        diferencial3Image: true,
        diferencial4Title: true,
        diferencial4Description: true,
        diferencial4Image: true,
        // Campos dos benefícios
        beneficiosEnabled: true,
        beneficio1Title: true,
        beneficio1Description: true,
        beneficio1Icon: true,
        beneficio2Title: true,
        beneficio2Description: true,
        beneficio2Icon: true,
        beneficio3Title: true,
        beneficio3Description: true,
        beneficio3Icon: true,
        // Campos dos requisitos especiais
        requisitosEnabled: true,
        requisitosTitle: true,
        requisitosDescription: true,
        requisitosBreadcrumb: true,
        requisitosButtonText: true,
        requisitosButtonUrl: true,
        requisito1Title: true,
        requisito1Description: true,
        requisito1Icon: true,
        requisito2Title: true,
        requisito2Description: true,
        requisito2Icon: true,
        requisito3Title: true,
        requisito3Description: true,
        requisito3Icon: true,
        requisito4Title: true,
        requisito4Description: true,
        requisito4Icon: true,
        requisito5Title: true,
        requisito5Description: true,
        requisito5Icon: true,
        requisito6Title: true,
        requisito6Description: true,
        requisito6Icon: true,
        requisito7Title: true,
        requisito7Description: true,
        requisito7Icon: true,
        requisito8Title: true,
        requisito8Description: true,
        requisito8Icon: true,
        // Campos do CTA
        ctaEnabled: true,
        ctaTitle: true,
        ctaDescription: true,
        ctaButtonText: true,
        ctaButtonUrl: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!destino) {
      return NextResponse.json({ error: 'Destino not found' }, { status: 404 });
    }

    return NextResponse.json(destino);
  } catch (error) {
    console.error('Error fetching destino:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destino' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar destino
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const validated = destinoSchema.parse(body);

    // Verificar se destino existe
    const existing = await prisma.destino.findUnique({
      where: { slug }
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Destino não encontrado' },
        { status: 404 }
      );
    }

    // Se o slug está sendo alterado, verificar se o novo slug já existe
    if (validated.slug !== slug) {
      const slugExists = await prisma.destino.findUnique({
        where: { slug: validated.slug }
      });

      if (slugExists) {
        return NextResponse.json(
          { success: false, message: 'Slug já está em uso' },
          { status: 400 }
        );
      }
    }

    const destino = await prisma.destino.update({
      where: { slug },
      data: {
        name: validated.name,
        slug: validated.slug,
        description: validated.description || null,
        content: validated.content || null,
        bannerTitle: validated.bannerTitle || null,
        imageUrl: validated.imageUrl || null,
        country: validated.country,
        continent: validated.continent,
        highlights: validated.highlights || null,
        status: validated.status,
        // Campos das principais cidades
        cityEnabled: validated.cityEnabled || false,
        cityTitle: validated.cityTitle || null,
        cityDescription: validated.cityDescription || null,
        city1Title: validated.city1Title || null,
        city1Description: validated.city1Description || null,
        city1Image: validated.city1Image || null,
        city2Title: validated.city2Title || null,
        city2Description: validated.city2Description || null,
        city2Image: validated.city2Image || null,
        city3Title: validated.city3Title || null,
        city3Description: validated.city3Description || null,
        city3Image: validated.city3Image || null,
        city4Title: validated.city4Title || null,
        city4Description: validated.city4Description || null,
        city4Image: validated.city4Image || null,
        // Campos dos diferenciais
        diferenciaisEnabled: validated.diferenciaisEnabled || false,
        diferenciaisTitle: validated.diferenciaisTitle || null,
        diferenciaisDescription: validated.diferenciaisDescription || null,
        diferencial1Title: validated.diferencial1Title || null,
        diferencial1Description: validated.diferencial1Description || null,
        diferencial1Image: validated.diferencial1Image || null,
        diferencial2Title: validated.diferencial2Title || null,
        diferencial2Description: validated.diferencial2Description || null,
        diferencial2Image: validated.diferencial2Image || null,
        diferencial3Title: validated.diferencial3Title || null,
        diferencial3Description: validated.diferencial3Description || null,
        diferencial3Image: validated.diferencial3Image || null,
        diferencial4Title: validated.diferencial4Title || null,
        diferencial4Description: validated.diferencial4Description || null,
        diferencial4Image: validated.diferencial4Image || null,
        // Campos dos benefícios
        beneficiosEnabled: validated.beneficiosEnabled || false,
        beneficio1Title: validated.beneficio1Title || null,
        beneficio1Description: validated.beneficio1Description || null,
        beneficio1Icon: validated.beneficio1Icon || null,
        beneficio2Title: validated.beneficio2Title || null,
        beneficio2Description: validated.beneficio2Description || null,
        beneficio2Icon: validated.beneficio2Icon || null,
        beneficio3Title: validated.beneficio3Title || null,
        beneficio3Description: validated.beneficio3Description || null,
        beneficio3Icon: validated.beneficio3Icon || null,
        // Campos dos requisitos especiais
        requisitosEnabled: validated.requisitosEnabled || false,
        requisitosTitle: validated.requisitosTitle || null,
        requisitosDescription: validated.requisitosDescription || null,
        requisitosBreadcrumb: validated.requisitosBreadcrumb || null,
        requisitosButtonText: validated.requisitosButtonText || null,
        requisitosButtonUrl: validated.requisitosButtonUrl || null,
        requisito1Title: validated.requisito1Title || null,
        requisito1Description: validated.requisito1Description || null,
        requisito1Icon: validated.requisito1Icon || null,
        requisito2Title: validated.requisito2Title || null,
        requisito2Description: validated.requisito2Description || null,
        requisito2Icon: validated.requisito2Icon || null,
        requisito3Title: validated.requisito3Title || null,
        requisito3Description: validated.requisito3Description || null,
        requisito3Icon: validated.requisito3Icon || null,
        requisito4Title: validated.requisito4Title || null,
        requisito4Description: validated.requisito4Description || null,
        requisito4Icon: validated.requisito4Icon || null,
        requisito5Title: validated.requisito5Title || null,
        requisito5Description: validated.requisito5Description || null,
        requisito5Icon: validated.requisito5Icon || null,
        requisito6Title: validated.requisito6Title || null,
        requisito6Description: validated.requisito6Description || null,
        requisito6Icon: validated.requisito6Icon || null,
        requisito7Title: validated.requisito7Title || null,
        requisito7Description: validated.requisito7Description || null,
        requisito7Icon: validated.requisito7Icon || null,
        requisito8Title: validated.requisito8Title || null,
        requisito8Description: validated.requisito8Description || null,
        requisito8Icon: validated.requisito8Icon || null,
        // Campos do CTA
        ctaEnabled: validated.ctaEnabled || false,
        ctaTitle: validated.ctaTitle || null,
        ctaDescription: validated.ctaDescription || null,
        ctaButtonText: validated.ctaButtonText || null,
        ctaButtonUrl: validated.ctaButtonUrl || null
      }
    });

    return NextResponse.json({ success: true, data: destino });
  } catch (error) {
    console.error('Error updating destino:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Dados inválidos', errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update destino' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar destino
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Verificar se destino existe
    const existing = await prisma.destino.findUnique({
      where: { slug }
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Destino não encontrado' },
        { status: 404 }
      );
    }

    await prisma.destino.delete({
      where: { slug }
    });

    return NextResponse.json({
      success: true,
      message: 'Destino deletado com sucesso'
    });
  } catch (error) {
    console.error('Error deleting destino:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete destino' },
      { status: 500 }
    );
  }
}
