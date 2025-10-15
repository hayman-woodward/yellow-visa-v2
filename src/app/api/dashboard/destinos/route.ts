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
        // Campos dos benefícios
        beneficiosEnabled: true,
        beneficio1Title: true,
        beneficio1Description: true,
        beneficio1Icon: true,
        beneficio2Title: true,
        beneficio2Description: true,
        beneficio2Icon: true,
        beneficio3Title: true,
        beneficio3Description: true,
        beneficio3Icon: true,
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
        status: validated.status,
        // Campos das principais cidades
        cityEnabled: validated.cityEnabled || false,
        cityTitle: validated.cityTitle || null,
        cityDescription: validated.cityDescription || null,
        city1Title: validated.city1Title || null,
        city1Description: validated.city1Description || null,
        city1Image: validated.city1Image || null,
        city2Title: validated.city2Title || null,
        city2Description: validated.city2Description || null,
        city2Image: validated.city2Image || null,
        city3Title: validated.city3Title || null,
        city3Description: validated.city3Description || null,
        city3Image: validated.city3Image || null,
        city4Title: validated.city4Title || null,
        city4Description: validated.city4Description || null,
        city4Image: validated.city4Image || null,
        // Campos dos diferenciais
        diferenciaisEnabled: validated.diferenciaisEnabled || false,
        diferenciaisTitle: validated.diferenciaisTitle || null,
        diferenciaisDescription: validated.diferenciaisDescription || null,
        diferencial1Title: validated.diferencial1Title || null,
        diferencial1Description: validated.diferencial1Description || null,
        diferencial1Image: validated.diferencial1Image || null,
        diferencial2Title: validated.diferencial2Title || null,
        diferencial2Description: validated.diferencial2Description || null,
        diferencial2Image: validated.diferencial2Image || null,
        diferencial3Title: validated.diferencial3Title || null,
        diferencial3Description: validated.diferencial3Description || null,
        diferencial3Image: validated.diferencial3Image || null,
        diferencial4Title: validated.diferencial4Title || null,
        diferencial4Description: validated.diferencial4Description || null,
        diferencial4Image: validated.diferencial4Image || null,
        // Campos dos benefícios
        beneficiosEnabled: validated.beneficiosEnabled || false,
        beneficio1Title: validated.beneficio1Title || null,
        beneficio1Description: validated.beneficio1Description || null,
        beneficio1Icon: validated.beneficio1Icon || null,
        beneficio2Title: validated.beneficio2Title || null,
        beneficio2Description: validated.beneficio2Description || null,
        beneficio2Icon: validated.beneficio2Icon || null,
        beneficio3Title: validated.beneficio3Title || null,
        beneficio3Description: validated.beneficio3Description || null,
        beneficio3Icon: validated.beneficio3Icon || null,
        // Campos dos requisitos especiais
        requisitosEnabled: validated.requisitosEnabled || false,
        requisitosTitle: validated.requisitosTitle || null,
        requisitosDescription: validated.requisitosDescription || null,
        requisitosBreadcrumb: validated.requisitosBreadcrumb || null,
        requisitosButtonText: validated.requisitosButtonText || null,
        requisitosButtonUrl: validated.requisitosButtonUrl || null,
        requisito1Title: validated.requisito1Title || null,
        requisito1Description: validated.requisito1Description || null,
        requisito1Icon: validated.requisito1Icon || null,
        requisito2Title: validated.requisito2Title || null,
        requisito2Description: validated.requisito2Description || null,
        requisito2Icon: validated.requisito2Icon || null,
        requisito3Title: validated.requisito3Title || null,
        requisito3Description: validated.requisito3Description || null,
        requisito3Icon: validated.requisito3Icon || null,
        requisito4Title: validated.requisito4Title || null,
        requisito4Description: validated.requisito4Description || null,
        requisito4Icon: validated.requisito4Icon || null,
        requisito5Title: validated.requisito5Title || null,
        requisito5Description: validated.requisito5Description || null,
        requisito5Icon: validated.requisito5Icon || null,
        requisito6Title: validated.requisito6Title || null,
        requisito6Description: validated.requisito6Description || null,
        requisito6Icon: validated.requisito6Icon || null,
        requisito7Title: validated.requisito7Title || null,
        requisito7Description: validated.requisito7Description || null,
        requisito7Icon: validated.requisito7Icon || null,
        requisito8Title: validated.requisito8Title || null,
        requisito8Description: validated.requisito8Description || null,
        requisito8Icon: validated.requisito8Icon || null,
        // Campos do CTA
        ctaEnabled: validated.ctaEnabled || false,
        ctaTitle: validated.ctaTitle || null,
        ctaDescription: validated.ctaDescription || null,
        ctaButtonText: validated.ctaButtonText || null,
        ctaButtonUrl: validated.ctaButtonUrl || null
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