import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { faqQuestionBackendSchema } from '@/schemas/dashboard/faq';

// PUT - Atualizar pergunta
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; questionId: string }> }
) {
  try {
    const { slug, questionId } = await params;
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

    // Verificar se a pergunta existe e pertence ao grupo
    const existingQuestion = await prisma.faqQuestion.findFirst({
      where: {
        id: questionId,
        groupId: group.id
      }
    });

    if (!existingQuestion) {
      return NextResponse.json(
        { error: 'Pergunta não encontrada' },
        { status: 404 }
      );
    }

    // Atualizar pergunta
    const question = await prisma.faqQuestion.update({
      where: { id: questionId },
      data: {
        question: validated.question,
        content: validated.content || null,
        link: validated.link,
        order: validated.order,
        status: validated.status,
        authorId: validated.authorId || null,
        videoUrl: validated.videoUrl || null,
        imageurl: validated.imageUrl || null,
        metadescription: validated.metaDescription || null,
        ogdescription: validated.ogDescription || null
      }
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error('Error updating question:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update question', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar pergunta
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; questionId: string }> }
) {
  try {
    const { slug, questionId } = await params;

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

    // Verificar se a pergunta existe e pertence ao grupo
    const existingQuestion = await prisma.faqQuestion.findFirst({
      where: {
        id: questionId,
        groupId: group.id
      }
    });

    if (!existingQuestion) {
      return NextResponse.json(
        { error: 'Pergunta não encontrada' },
        { status: 404 }
      );
    }

    // Deletar pergunta
    await prisma.faqQuestion.delete({
      where: { id: questionId }
    });

    return NextResponse.json({ message: 'Pergunta deletada com sucesso!' });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}
