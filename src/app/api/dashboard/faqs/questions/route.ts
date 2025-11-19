import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Listar todas as perguntas de FAQ publicadas
export async function GET() {
  try {
    const questions = await prisma.faqQuestion.findMany({
      where: {
        status: 'published'
      },
      select: {
        id: true,
        question: true,
        link: true,
        order: true,
        group: {
          select: {
            title: true,
            slug: true
          }
        }
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching FAQ questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQ questions' },
      { status: 500 }
    );
  }
}

