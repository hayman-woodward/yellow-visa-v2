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
        status: validated.status
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
