import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Buscar updates
export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const logs = await prisma.systemLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    const unreadCount = await prisma.systemLog.count({
      where: { isRead: false }
    });

    return NextResponse.json({ logs, unreadCount });
  } catch (error) {
    console.error('Erro ao buscar updates:', error);
    return NextResponse.json({ error: 'Erro ao buscar updates' }, { status: 500 });
  }
}

// Marcar como lido
export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Buscar dados completos do usuário incluindo avatar
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        name: true,
        avatar: true
      }
    });

    const { id, markAsNegative, notes } = await request.json();

    if (markAsNegative && id) {
      await prisma.systemLog.update({
        where: { id },
        data: { 
          isRead: true,
          isNegative: true,
          notes: notes || null,
          markedByUserId: session.userId,
          markedByUserName: user?.name || session.name,
          markedByUserAvatar: user?.avatar || null
        }
      });
    } else if (id) {
      await prisma.systemLog.update({
        where: { id },
        data: { 
          isRead: true,
          markedByUserId: session.userId,
          markedByUserName: user?.name || session.name,
          markedByUserAvatar: user?.avatar || null
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao marcar como lido:', error);
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 });
  }
}


