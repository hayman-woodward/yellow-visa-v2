import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { historiaSchema } from '@/schemas/dashboard/historia';

// GET - Listar histórias
export async function GET() {
  try {
    const historias = await prisma.historia.findMany({
      orderBy: { createdAt: 'desc' },
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

    return NextResponse.json(historias);
  } catch (error) {
    console.error('Error fetching historias:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historias' },
      { status: 500 }
    );
  }
}

// POST - Criar história
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = historiaSchema.parse(body);

    // Verificar se slug já existe
    const existing = await prisma.historia.findUnique({
      where: { slug: validated.slug }
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Slug já está em uso' },
        { status: 400 }
      );
    }

    const historia = await prisma.historia.create({
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
    console.error('Error creating historia:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Dados inválidos', errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create historia' },
      { status: 500 }
    );
  }
}
