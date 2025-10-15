import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Buscar membro da equipe específico por slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const teamMember = await prisma.teamMember.findUnique({
      where: { slug },
    });

    if (!teamMember) {
      return NextResponse.json(
        { error: 'Membro da equipe não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(teamMember);
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar membro da equipe
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const {
      name,
      position,
      bio,
      imageUrl,
      email,
      linkedin,
      order,
      status,
      newSlug,
    } = body;

    // Verificar se o membro da equipe existe
    const existingMember = await prisma.teamMember.findUnique({
      where: { slug },
    });

    if (!existingMember) {
      return NextResponse.json(
        { error: 'Membro da equipe não encontrado' },
        { status: 404 }
      );
    }

    // Se o slug mudou, verificar se o novo slug já existe
    if (newSlug && newSlug !== slug) {
      const slugExists = await prisma.teamMember.findUnique({
        where: { slug: newSlug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Novo slug já existe' },
          { status: 400 }
        );
      }
    }

    const updatedMember = await prisma.teamMember.update({
      where: { slug },
      data: {
        name,
        position,
        bio,
        imageUrl,
        email,
        linkedin,
        order: order || 0,
        status: status || 'draft',
        slug: newSlug || slug,
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar membro da equipe
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const existingMember = await prisma.teamMember.findUnique({
      where: { slug },
    });

    if (!existingMember) {
      return NextResponse.json(
        { error: 'Membro da equipe não encontrado' },
        { status: 404 }
      );
    }

    await prisma.teamMember.delete({
      where: { slug },
    });

    return NextResponse.json({ message: 'Membro da equipe deletado com sucesso' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}
