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
        city4Image: validated.city4Image || null
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
