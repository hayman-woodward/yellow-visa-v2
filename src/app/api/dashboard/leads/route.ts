import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET - Listar leads
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar novo lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, phone, source = 'newsletter' } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se já existe lead com este email
    const existingLead = await prisma.lead.findUnique({
      where: { email }
    });

    if (existingLead) {
      return NextResponse.json(
        { success: false, message: 'Este email já está cadastrado em nossa newsletter!' },
        { status: 409 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        email,
        name,
        phone,
        source
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Email cadastrado com sucesso na newsletter!',
      lead 
    }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar lead:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
