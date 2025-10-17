import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { userBackendSchema } from '@/schemas/dashboard/user';

// GET - Listar usuários
export async function GET() {
  try {
    const usuarios = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true
      }
    });

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usuarios' },
      { status: 500 }
    );
  }
}

// POST - Criar usuário
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = userBackendSchema.parse(body);

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email }
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email já está em uso' },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await hash(validated.password, 12);

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
        role: validated.role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Error creating user:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Dados inválidos', errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create user' },
      { status: 500 }
    );
  }
}
