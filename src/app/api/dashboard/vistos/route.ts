import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { vistoSchema } from '@/schemas/dashboard/visto';

// GET - Listar vistos
export async function GET() {
  try {
    const vistos = await prisma.visto.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        imageUrl: true,
        country: true,
        vistoType: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(vistos);
  } catch (error) {
    console.error('Error fetching vistos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vistos' },
      { status: 500 }
    );
  }
}

// POST - Criar visto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = vistoSchema.parse(body);

    // Verificar se slug já existe
    const existing = await prisma.visto.findUnique({
      where: { slug: validated.slug }
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Slug já está em uso' },
        { status: 400 }
      );
    }

    const visto = await prisma.visto.create({
      data: {
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        excerpt: validated.excerpt || null,
        content: validated.content || null,
        bannerTitle: validated.bannerTitle || null,
        videoUrl: validated.videoUrl || null,
        // Campos das principais cidades
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
        diferenciaisEnabled: validated.diferenciaisEnabled,
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
        // Campos do FAQ
        faqEnabled: validated.faqEnabled,
        faqTitle: validated.faqTitle || null,
        faqDescription: validated.faqDescription || null,
        faq1Question: validated.faq1Question || null,
        faq1Answer: validated.faq1Answer || null,
        faq2Question: validated.faq2Question || null,
        faq2Answer: validated.faq2Answer || null,
        faq3Question: validated.faq3Question || null,
        faq3Answer: validated.faq3Answer || null,
        faq4Question: validated.faq4Question || null,
        faq4Answer: validated.faq4Answer || null,
        faq5Question: validated.faq5Question || null,
        faq5Answer: validated.faq5Answer || null,
        faq6Question: validated.faq6Question || null,
        faq6Answer: validated.faq6Answer || null,
        // Campos dos benefícios
        beneficiosEnabled: validated.beneficiosEnabled,
        beneficio1Title: validated.beneficio1Title || null,
        beneficio1Description: validated.beneficio1Description || null,
        beneficio1Icon: validated.beneficio1Icon || null,
        beneficio2Title: validated.beneficio2Title || null,
        beneficio2Description: validated.beneficio2Description || null,
        beneficio2Icon: validated.beneficio2Icon || null,
        beneficio3Title: validated.beneficio3Title || null,
        beneficio3Description: validated.beneficio3Description || null,
        beneficio3Icon: validated.beneficio3Icon || null,
        // Campos do banner dinâmico
        bannerEnabled: validated.bannerEnabled,
        bannerDescription: validated.bannerDescription || null,
        bannerButtonText: validated.bannerButtonText || null,
        bannerButtonUrl: validated.bannerButtonUrl || null,
        // Campos do CTA dinâmico
        ctaTitle: validated.ctaTitle || null,
        ctaDescription: validated.ctaDescription || null,
        ctaButtonText: validated.ctaButtonText || null,
        ctaButtonUrl: validated.ctaButtonUrl || null,
        // Campos das principais cidades
        cityEnabled: validated.cityEnabled,
        imageUrl: validated.imageUrl || null,
        country: validated.country,
        vistoType: validated.vistoType,
        status: validated.status,
        authorId: validated.authorId || null,
        metaTitle: validated.metaTitle || null,
        metaDescription: validated.metaDescription || null,
        metaKeywords: validated.metaKeywords || null,
        ogTitle: validated.ogTitle || null,
        ogDescription: validated.ogDescription || null,
        ogImage: validated.ogImage || null,
        twitterTitle: validated.twitterTitle || null,
        twitterDescription: validated.twitterDescription || null,
        twitterImage: validated.twitterImage || null
      }
    });

    return NextResponse.json({ success: true, data: visto });
  } catch (error) {
    console.error('Error creating visto:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Dados inválidos', errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create visto' },
      { status: 500 }
    );
  }
}
