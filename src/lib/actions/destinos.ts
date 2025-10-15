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
        diferencial4Image: true
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
      diferencial4Image: destino.diferencial4Image || undefined
    };
  } catch (error) {
    console.error('Failed to load destino by slug:', error);
    return null;
  }
}


