import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE - Deletar visto permanentemente
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Verificar se visto existe e está deletado
    const existing = await prisma.visto.findUnique({
      where: { slug }
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Visto não encontrado' },
        { status: 404 }
      );
    }

    if (existing.status !== 'deleted') {
      return NextResponse.json(
        { success: false, message: 'Visto não está na lixeira' },
        { status: 400 }
      );
    }

    // Delete permanente
    await prisma.visto.delete({
      where: { slug }
    });

    return NextResponse.json({ success: true, message: 'Visto deletado permanentemente' });
  } catch (error) {
    console.error('Error permanently deleting visto:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to permanently delete visto' },
      { status: 500 }
    );
  }
}
