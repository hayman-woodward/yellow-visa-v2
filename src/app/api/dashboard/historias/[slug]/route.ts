import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { historiaSchema } from '@/schemas/dashboard/historia';

// GET - Buscar história por slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const historia = await prisma.historia.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        imageUrl: true,
        authorName: true,
        country: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!historia) {
      return NextResponse.json(
        { error: 'Historia not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(historia);
  } catch (error) {
    console.error('Error fetching historia:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historia' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar história
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const validated = historiaSchema.parse(body);

    // Verificar se história existe
    const existing = await prisma.historia.findUnique({
      where: { slug }
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'História não encontrada' },
        { status: 404 }
      );
    }

    // Se o slug está sendo alterado, verificar se o novo slug já existe
    if (validated.slug !== slug) {
      const slugExists = await prisma.historia.findUnique({
        where: { slug: validated.slug }
      });

      if (slugExists) {
        return NextResponse.json(
          { success: false, message: 'Slug já está em uso' },
          { status: 400 }
        );
      }
    }

    const historia = await prisma.historia.update({
      where: { slug },
      data: {
        title: validated.title,
        slug: validated.slug,
        content: validated.content,
        imageUrl: validated.imageUrl || null,
        authorName: validated.authorName,
        country: validated.country,
        status: validated.status
      }
    });

    return NextResponse.json({ success: true, data: historia });
  } catch (error) {
    console.error('Error updating historia:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Dados inválidos', errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update historia' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar história
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Verificar se história existe
    const existing = await prisma.historia.findUnique({
      where: { slug }
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'História não encontrada' },
        { status: 404 }
      );
    }

    await prisma.historia.delete({
      where: { slug }
    });

    return NextResponse.json({
      success: true,
      message: 'História deletada com sucesso'
    });
  } catch (error) {
    console.error('Error deleting historia:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete historia' },
      { status: 500 }
    );
  }
}
