import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Restaurar visto da lixeira
export async function POST(
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

    // Restaurar visto - voltar para draft
    await prisma.visto.update({
      where: { slug },
      data: { status: 'draft' }
    });

    return NextResponse.json({ success: true, message: 'Visto restaurado com sucesso' });
  } catch (error) {
    console.error('Error restoring visto:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to restore visto' },
      { status: 500 }
    );
  }
}
