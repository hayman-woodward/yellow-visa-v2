import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateUserBackendSchema } from '@/schemas/dashboard/user';

// GET - Buscar usuário específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const usuario = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(usuario);
  } catch (error) {
    console.error('Error fetching usuario:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usuario' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar usuário
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = updateUserBackendSchema.parse(body);

    // Verificar se usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se email já existe (exceto para o próprio usuário)
    if (validated.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: validated.email }
      });

      if (emailExists) {
        return NextResponse.json(
          { success: false, message: 'Email já está em uso' },
          { status: 400 }
        );
      }
    }

    // Preparar dados para atualização
    const updateData: Record<string, string | number> = {
      name: validated.name,
      email: validated.email,
      role: validated.role
    };

    // Só atualizar senha se fornecida
    if (validated.password && validated.password.length > 0) {
      const { hash } = await import('bcryptjs');
      updateData.password = await hash(validated.password, 12);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json({ 
      success: true, 
      data: updatedUser,
      message: 'Usuário atualizado com sucesso'
    });
  } catch (error) {
    console.error('Error updating usuario:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Dados inválidos', errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update usuario' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar usuário
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verificar se usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Deletar usuário
    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Usuário deletado com sucesso'
    });
  } catch (error) {
    console.error('Error deleting usuario:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete usuario' },
      { status: 500 }
    );
  }
}