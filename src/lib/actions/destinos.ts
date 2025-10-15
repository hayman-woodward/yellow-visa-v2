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
        city4Image: true
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
      city4Image: destino.city4Image || undefined
    };
  } catch (error) {
    console.error('Failed to load destino by slug:', error);
    return null;
  }
}


