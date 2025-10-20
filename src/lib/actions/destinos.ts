'use server';

import { prisma } from '@/lib/prisma';

export type DestinoSummary = {
  label: string;
  slug: string;
};

export type DestinoData = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  excerpt?: string;
  content?: string;
  bannerTitle?: string;
  imageUrl?: string;
  country: string;
  continent: string;
  highlights?: string;
  status: string;
  // Campos das principais cidades
  cityEnabled: boolean;
  cityTitle?: string;
  cityDescription?: string;
  city1Title?: string;
  city1Description?: string;
  city1Image?: string;
  city2Title?: string;
  city2Description?: string;
  city2Image?: string;
  city3Title?: string;
  city3Description?: string;
  city3Image?: string;
  city4Title?: string;
  city4Description?: string;
  city4Image?: string;
  // Campos dos diferenciais
  diferenciaisEnabled: boolean;
  diferenciaisTitle?: string;
  diferenciaisDescription?: string;
  diferencial1Title?: string;
  diferencial1Description?: string;
  diferencial1Image?: string;
  diferencial2Title?: string;
  diferencial2Description?: string;
  diferencial2Image?: string;
  diferencial3Title?: string;
  diferencial3Description?: string;
  diferencial3Image?: string;
  diferencial4Title?: string;
  diferencial4Description?: string;
  diferencial4Image?: string;
  // Campos dos requisitos especiais
  requisitosEnabled: boolean;
  requisitosTitle?: string;
  requisitosDescription?: string;
  requisitosBreadcrumb?: string;
  requisitosButtonText?: string;
  requisitosButtonUrl?: string;
  requisito1Title?: string;
  requisito1Description?: string;
  requisito1Icon?: string;
  requisito2Title?: string;
  requisito2Description?: string;
  requisito2Icon?: string;
  requisito3Title?: string;
  requisito3Description?: string;
  requisito3Icon?: string;
  requisito4Title?: string;
  requisito4Description?: string;
  requisito4Icon?: string;
  requisito5Title?: string;
  requisito5Description?: string;
  requisito5Icon?: string;
  requisito6Title?: string;
  requisito6Description?: string;
  requisito6Icon?: string;
  requisito7Title?: string;
  requisito7Description?: string;
  requisito7Icon?: string;
  requisito8Title?: string;
  requisito8Description?: string;
  requisito8Icon?: string;
  // Campos do CTA
  ctaEnabled: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
};

export async function getPublishedDestinos(): Promise<DestinoSummary[]> {
  try {
    const destinos = await prisma.destino.findMany({
      where: { status: 'published' },
      orderBy: { name: 'asc' },
      select: { name: true, slug: true }
    });

    return destinos.map((d: { name: string; slug: string }) => ({ label: d.name, slug: d.slug }));
  } catch (error) {
    console.error('Failed to load published destinos:', error);
    return [];
  }
}

export async function getDestinoBySlug(slug: string): Promise<DestinoData | null> {
  try {
    const destino = await prisma.destino.findUnique({
      where: {
        slug,
        status: 'published'
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        content: true,
        bannerTitle: true,
        imageUrl: true,
        country: true,
        continent: true,
        highlights: true,
        status: true,
        // Campos das principais cidades
        cityEnabled: true,
        cityTitle: true,
        cityDescription: true,
        city1Title: true,
        city1Description: true,
        city1Image: true,
        city2Title: true,
        city2Description: true,
        city2Image: true,
        city3Title: true,
        city3Description: true,
        city3Image: true,
        city4Title: true,
        city4Description: true,
        city4Image: true,
        // Campos dos diferenciais
        diferenciaisEnabled: true,
        diferenciaisTitle: true,
        diferenciaisDescription: true,
        diferencial1Title: true,
        diferencial1Description: true,
        diferencial1Image: true,
        diferencial2Title: true,
        diferencial2Description: true,
        diferencial2Image: true,
        diferencial3Title: true,
        diferencial3Description: true,
        diferencial3Image: true,
        diferencial4Title: true,
        diferencial4Description: true,
        diferencial4Image: true,
        // Campos dos requisitos especiais
        requisitosEnabled: true,
        requisitosTitle: true,
        requisitosDescription: true,
        requisitosBreadcrumb: true,
        requisitosButtonText: true,
        requisitosButtonUrl: true,
        requisito1Title: true,
        requisito1Description: true,
        requisito1Icon: true,
        requisito2Title: true,
        requisito2Description: true,
        requisito2Icon: true,
        requisito3Title: true,
        requisito3Description: true,
        requisito3Icon: true,
        requisito4Title: true,
        requisito4Description: true,
        requisito4Icon: true,
        requisito5Title: true,
        requisito5Description: true,
        requisito5Icon: true,
        requisito6Title: true,
        requisito6Description: true,
        requisito6Icon: true,
        requisito7Title: true,
        requisito7Description: true,
        requisito7Icon: true,
        requisito8Title: true,
        requisito8Description: true,
        requisito8Icon: true,
        // Campos do CTA
        ctaEnabled: true,
        ctaTitle: true,
        ctaDescription: true,
        ctaButtonText: true,
        ctaButtonUrl: true
      }
    });

    if (!destino) return null;

    return {
      id: destino.id,
      name: destino.name,
      slug: destino.slug,
      description: destino.description || undefined,
      content: destino.content || undefined,
      bannerTitle: destino.bannerTitle || undefined,
      imageUrl: destino.imageUrl || undefined,
      country: destino.country,
      continent: destino.continent,
      highlights: destino.highlights || undefined,
      status: destino.status,
      // Campos das principais cidades
      cityEnabled: destino.cityEnabled || false,
      cityTitle: destino.cityTitle || undefined,
      cityDescription: destino.cityDescription || undefined,
      city1Title: destino.city1Title || undefined,
      city1Description: destino.city1Description || undefined,
      city1Image: destino.city1Image || undefined,
      city2Title: destino.city2Title || undefined,
      city2Description: destino.city2Description || undefined,
      city2Image: destino.city2Image || undefined,
      city3Title: destino.city3Title || undefined,
      city3Description: destino.city3Description || undefined,
      city3Image: destino.city3Image || undefined,
      city4Title: destino.city4Title || undefined,
      city4Description: destino.city4Description || undefined,
      city4Image: destino.city4Image || undefined,
      // Campos dos diferenciais
      diferenciaisEnabled: destino.diferenciaisEnabled || false,
      diferenciaisTitle: destino.diferenciaisTitle || undefined,
      diferenciaisDescription: destino.diferenciaisDescription || undefined,
      diferencial1Title: destino.diferencial1Title || undefined,
      diferencial1Description: destino.diferencial1Description || undefined,
      diferencial1Image: destino.diferencial1Image || undefined,
      diferencial2Title: destino.diferencial2Title || undefined,
      diferencial2Description: destino.diferencial2Description || undefined,
      diferencial2Image: destino.diferencial2Image || undefined,
      diferencial3Title: destino.diferencial3Title || undefined,
      diferencial3Description: destino.diferencial3Description || undefined,
      diferencial3Image: destino.diferencial3Image || undefined,
      diferencial4Title: destino.diferencial4Title || undefined,
      diferencial4Description: destino.diferencial4Description || undefined,
      diferencial4Image: destino.diferencial4Image || undefined,
      // Campos dos requisitos especiais
      requisitosEnabled: destino.requisitosEnabled || false,
      requisitosTitle: destino.requisitosTitle || undefined,
      requisitosDescription: destino.requisitosDescription || undefined,
      requisitosBreadcrumb: destino.requisitosBreadcrumb || undefined,
      requisitosButtonText: destino.requisitosButtonText || undefined,
      requisitosButtonUrl: destino.requisitosButtonUrl || undefined,
      requisito1Title: destino.requisito1Title || undefined,
      requisito1Description: destino.requisito1Description || undefined,
      requisito1Icon: destino.requisito1Icon || undefined,
      requisito2Title: destino.requisito2Title || undefined,
      requisito2Description: destino.requisito2Description || undefined,
      requisito2Icon: destino.requisito2Icon || undefined,
      requisito3Title: destino.requisito3Title || undefined,
      requisito3Description: destino.requisito3Description || undefined,
      requisito3Icon: destino.requisito3Icon || undefined,
      requisito4Title: destino.requisito4Title || undefined,
      requisito4Description: destino.requisito4Description || undefined,
      requisito4Icon: destino.requisito4Icon || undefined,
      requisito5Title: destino.requisito5Title || undefined,
      requisito5Description: destino.requisito5Description || undefined,
      requisito5Icon: destino.requisito5Icon || undefined,
      requisito6Title: destino.requisito6Title || undefined,
      requisito6Description: destino.requisito6Description || undefined,
      requisito6Icon: destino.requisito6Icon || undefined,
      requisito7Title: destino.requisito7Title || undefined,
      requisito7Description: destino.requisito7Description || undefined,
      requisito7Icon: destino.requisito7Icon || undefined,
      requisito8Title: destino.requisito8Title || undefined,
      requisito8Description: destino.requisito8Description || undefined,
      requisito8Icon: destino.requisito8Icon || undefined,
      // Campos do CTA
      ctaEnabled: destino.ctaEnabled || false,
      ctaTitle: destino.ctaTitle || undefined,
      ctaDescription: destino.ctaDescription || undefined,
      ctaButtonText: destino.ctaButtonText || undefined,
      ctaButtonUrl: destino.ctaButtonUrl || undefined
    };
  } catch (error) {
    console.error('Failed to load destino by slug:', error);
    return null;
  }
}


