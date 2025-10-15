import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { faqGroupBackendSchema } from '@/schemas/dashboard/faq';
import { Prisma } from '@prisma/client';

// GET - Listar todos os FAQs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';

    const where: Record<string, string | number> = {};
    if (status !== 'all') {
      where.status = status;
    }

    const faqGroups = await prisma.faqGroup.findMany({
      where,
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });

    return NextResponse.json(faqGroups);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

// POST - Criar novo FAQ Group
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados com Zod
    const validated = faqGroupBackendSchema.parse(body);
    
    const {
      title,
      slug,
      description,
      imageUrl,
      order,
      status,
      sectionTitle,
      questions = []
    } = validated;

    // Verificar se o slug já existe
    const existingGroup = await prisma.faqGroup.findUnique({
      where: { slug },
    });

    if (existingGroup) {
      return NextResponse.json(
        { error: 'Slug já existe' },
        { status: 400 }
      );
    }

    const faqGroup = await prisma.faqGroup.create({
      data: {
        title,
        slug,
        description,
        imageUrl,
        order: Number(order) || 0,
        status: status || 'draft',
        sectionTitle,
        questions: {
          create: questions.map((q: Record<string, string | number>) => ({
            question: String(q.question),
            link: String(q.link),
            order: Number(q.order) || 0,
            status: String(q.status) as 'draft' | 'published' || 'draft'
          }))
        }
      } as Prisma.FaqGroupCreateInput,
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    });

    return NextResponse.json(faqGroup, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ Group:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create FAQ Group' },
      { status: 500 }
    );
  }
}
