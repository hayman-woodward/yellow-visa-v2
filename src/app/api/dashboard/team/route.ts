import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { teamMemberBackendSchema } from '@/schemas/dashboard/team';

// GET - Listar todos os membros da equipe
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';

    const where: Record<string, string | number> = {};
    if (status !== 'all') {
      where.status = status;
    }

    const teamMembers = await prisma.teamMember.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

// POST - Criar novo membro da equipe
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados com Zod
    const validated = teamMemberBackendSchema.parse(body);
    
    const {
      name,
      slug,
      position,
      bio,
      imageUrl,
      email,
      order,
      status,
    } = validated;

    // Verificar se o slug já existe
    const existingMember = await prisma.teamMember.findUnique({
      where: { slug },
    });

    if (existingMember) {
      return NextResponse.json(
        { error: 'Slug já existe' },
        { status: 400 }
      );
    }

    const teamMember = await prisma.teamMember.create({
      data: {
        name,
        slug,
        position,
        bio,
        imageUrl,
        email,
        order: order || 0,
        status: status || 'draft',
      },
    });

    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
