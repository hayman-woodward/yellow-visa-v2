import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { destinoSchema } from '@/schemas/dashboard/destino';

// GET - Listar destinos
export async function GET() {
  try {
    const destinos = await prisma.destino.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        content: true,
        imageUrl: true,
        country: true,
        continent: true,
        highlights: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(destinos);
  } catch (error) {
    console.error('Error fetching destinos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinos' },
      { status: 500 }
    );
  }
}

// POST - Criar destino
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = destinoSchema.parse(body);

    // Verificar se slug já existe
    const existing = await prisma.destino.findUnique({
      where: { slug: validated.slug }
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Slug já está em uso' },
        { status: 400 }
      );
    }

    const destino = await prisma.destino.create({
      data: {
        name: validated.name,
        slug: validated.slug,
        description: validated.description || null,
        content: validated.content || null,
        imageUrl: validated.imageUrl || null,
        country: validated.country,
        continent: validated.continent,
        highlights: validated.highlights || null,
        status: validated.status
      }
    });

    return NextResponse.json({ success: true, data: destino });
  } catch (error) {
    console.error('Error creating destino:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Dados inválidos', errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create destino' },
      { status: 500 }
    );
  }
}