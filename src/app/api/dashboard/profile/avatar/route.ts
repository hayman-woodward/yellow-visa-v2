import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { avatar } = await request.json();

    if (!avatar) {
      return NextResponse.json({ error: 'Avatar é obrigatório' }, { status: 400 });
    }

    // Atualizar avatar do usuário
    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: { avatar },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true
      }
    });

    return NextResponse.json({ 
      success: true, 
      user: updatedUser,
      message: 'Avatar atualizado com sucesso!' 
    });

  } catch (error) {
    console.error('Erro ao atualizar avatar:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}
