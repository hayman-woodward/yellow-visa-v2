import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/auth';

export async function POST() {
  try {
    await deleteSession();
    
    return NextResponse.json(
      { success: true, message: 'Logout realizado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no logout:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao fazer logout' },
      { status: 500 }
    );
  }
}
