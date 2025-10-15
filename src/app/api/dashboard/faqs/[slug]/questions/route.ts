import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { faqQuestionBackendSchema } from '@/schemas/dashboard/faq';

// POST - Adicionar nova pergunta ao grupo
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // Validar dados com Zod
    const validated = faqQuestionBackendSchema.parse(body);

    // Verificar se o grupo existe
    const group = await prisma.faqGroup.findUnique({
      where: { slug }
    });

    if (!group) {
      return NextResponse.json(
        { error: 'Grupo de FAQ não encontrado' },
        { status: 404 }
      );
    }

    // Criar nova pergunta
    const question = await prisma.faqQuestion.create({
      data: {
        question: validated.question,
        link: validated.link,
        order: validated.order,
        status: validated.status,
        groupId: group.id
      }
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}
