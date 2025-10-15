import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { faqGroupBackendSchema } from '@/schemas/dashboard/faq';
import { Prisma } from '@prisma/client';

// GET - Buscar FAQ específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const faqGroup = await prisma.faqGroup.findUnique({
      where: { slug },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!faqGroup) {
      return NextResponse.json(
        { error: 'FAQ não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(faqGroup);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQ' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar FAQ
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    
    console.log('PUT /api/dashboard/faqs/[slug] - Body recebido:', JSON.stringify(body, null, 2));
    
    // Se newSlug foi enviado, usar ele como o novo slug
    const dataToValidate = body.newSlug ? { ...body, slug: body.newSlug } : body;
    console.log('Dados para validação:', JSON.stringify(dataToValidate, null, 2));
    
    const validated = faqGroupBackendSchema.parse(dataToValidate);
    console.log('Dados validados:', JSON.stringify(validated, null, 2));

    // Verificar se FAQ Group existe
    const existingGroup = await prisma.faqGroup.findUnique({
      where: { slug }
    });

    if (!existingGroup) {
      return NextResponse.json(
        { success: false, message: 'FAQ não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se novo slug já existe (se mudou)
    if (validated.slug !== slug) {
      const slugExists = await prisma.faqGroup.findUnique({
        where: { slug: validated.slug }
      });

      if (slugExists) {
        return NextResponse.json(
          { success: false, message: 'Slug já está em uso' },
          { status: 400 }
        );
      }
    }

    const updateData = {
      title: validated.title,
      slug: validated.slug,
      description: validated.description,
      imageUrl: validated.imageUrl,
      order: validated.order,
      status: validated.status,
      sectionTitle: validated.sectionTitle
    };
    
    console.log('Dados para atualização no banco:', JSON.stringify(updateData, null, 2));
    console.log('Perguntas para processar:', JSON.stringify(validated.questions, null, 2));
    
    // Atualizar o FAQ Group
    const updatedGroup = await prisma.faqGroup.update({
      where: { slug },
      data: updateData as Prisma.FaqGroupUpdateInput
    });
    
    // Processar perguntas se existirem
    if (validated.questions && validated.questions.length > 0) {
      console.log('Processando perguntas...');
      
      // Deletar perguntas existentes
      await prisma.faqQuestion.deleteMany({
        where: { groupId: updatedGroup.id }
      });
      
      // Criar novas perguntas
      const questionsToCreate = validated.questions.map((question, index) => ({
        question: question.question,
        link: question.link,
        order: question.order || index,
        status: question.status,
        groupId: updatedGroup.id
      }));
      
      console.log('Criando perguntas:', JSON.stringify(questionsToCreate, null, 2));
      
      await prisma.faqQuestion.createMany({
        data: questionsToCreate
      });
    }
    
    // Buscar o grupo atualizado com as perguntas
    const finalGroup = await prisma.faqGroup.findUnique({
      where: { id: updatedGroup.id },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    });
    
    console.log('FAQ atualizado com sucesso:', JSON.stringify(finalGroup, null, 2));

    return NextResponse.json({ 
      success: true, 
      data: finalGroup,
      message: 'FAQ atualizado com sucesso'
    });
  } catch (error) {
    console.error('Error updating FAQ:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Dados inválidos', errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar FAQ
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Verificar se FAQ Group existe
    const existingGroup = await prisma.faqGroup.findUnique({
      where: { slug }
    });

    if (!existingGroup) {
      return NextResponse.json(
        { success: false, message: 'FAQ não encontrado' },
        { status: 404 }
      );
    }

    // Deletar FAQ Group (as perguntas serão deletadas automaticamente por causa do onDelete: Cascade)
    await prisma.faqGroup.delete({
      where: { slug }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'FAQ deletado com sucesso'
    });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}


