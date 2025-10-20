'use server';

import { prisma } from '@/lib/prisma';

export type VistoSummary = {
  label: string;
  slug: string;
  country: string;
};

export type VistoData = {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt?: string;
  content?: string;
  bannerTitle?: string;
  // Campos do banner dinâmico
  bannerEnabled: boolean;
  bannerDescription?: string;
  bannerButtonText?: string;
  bannerButtonUrl?: string;
  // Campos do CTA dinâmico
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  videoUrl?: string;
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
  // Campos do FAQ
  faqEnabled: boolean;
  faqTitle?: string;
  faqDescription?: string;
  faq1Question?: string;
  faq1Answer?: string;
  faq2Question?: string;
  faq2Answer?: string;
  faq3Question?: string;
  faq3Answer?: string;
  faq4Question?: string;
  faq4Answer?: string;
  faq5Question?: string;
  faq5Answer?: string;
  faq6Question?: string;
  faq6Answer?: string;
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
  // Campos dos benefícios
  beneficiosEnabled: boolean;
  beneficio1Title?: string;
  beneficio1Description?: string;
  beneficio1Icon?: string;
  beneficio2Title?: string;
  beneficio2Description?: string;
  beneficio2Icon?: string;
  beneficio3Title?: string;
  beneficio3Description?: string;
  beneficio3Icon?: string;
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
  imageUrl?: string;
  country: string;
  vistoType: string;
  status: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

export async function getPublishedVistos(): Promise<VistoSummary[]> {
  try {
    const vistos = await prisma.visto.findMany({
      where: { status: 'published' },
      orderBy: { title: 'asc' },
      select: { title: true, slug: true, country: true }
    });

    return vistos.map((v: { title: string; slug: string; country: string }) => ({ 
      label: v.title, 
      slug: v.slug, 
      country: v.country 
    }));
  } catch (error) {
    console.error('Failed to load published vistos:', error);
    // Evita quebrar a página caso o banco esteja indisponível
    return [];
  }
}

export async function getVistoBySlug(slug: string): Promise<VistoData | null> {
  try {
    const visto = await prisma.visto.findUnique({
      where: { 
        slug,
        status: 'published'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        excerpt: true,
        content: true,
        bannerTitle: true,
        // Campos do banner dinâmico
        bannerEnabled: true,
        bannerDescription: true,
        bannerButtonText: true,
        bannerButtonUrl: true,
        // Campos do CTA dinâmico
        ctaTitle: true,
        ctaDescription: true,
        ctaButtonText: true,
        ctaButtonUrl: true,
        videoUrl: true,
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
        // Campos do FAQ
        faqEnabled: true,
        faqTitle: true,
        faqDescription: true,
        faq1Question: true,
        faq1Answer: true,
        faq2Question: true,
        faq2Answer: true,
        faq3Question: true,
        faq3Answer: true,
        faq4Question: true,
        faq4Answer: true,
        faq5Question: true,
        faq5Answer: true,
        faq6Question: true,
        faq6Answer: true,
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
        imageUrl: true,
        country: true,
        vistoType: true,
        status: true,
        metaTitle: true,
        metaDescription: true,
        metaKeywords: true,
        ogTitle: true,
        ogDescription: true,
        ogImage: true,
        twitterTitle: true,
        twitterDescription: true,
        twitterImage: true
      }
    });

    if (!visto) return null;

    return {
      id: visto.id,
      title: visto.title,
      slug: visto.slug,
      description: visto.description,
      excerpt: visto.excerpt || undefined,
      content: visto.content || undefined,
      bannerTitle: visto.bannerTitle || undefined,
      // Campos do banner dinâmico
      bannerEnabled: visto.bannerEnabled,
      bannerDescription: visto.bannerDescription || undefined,
      bannerButtonText: visto.bannerButtonText || undefined,
      bannerButtonUrl: visto.bannerButtonUrl || undefined,
      // Campos do CTA dinâmico
      ctaTitle: visto.ctaTitle || undefined,
      ctaDescription: visto.ctaDescription || undefined,
      ctaButtonText: visto.ctaButtonText || undefined,
      ctaButtonUrl: visto.ctaButtonUrl || undefined,
      videoUrl: visto.videoUrl || undefined,
      // Campos das principais cidades
      cityEnabled: visto.cityEnabled,
      cityTitle: visto.cityTitle || undefined,
      cityDescription: visto.cityDescription || undefined,
      city1Title: visto.city1Title || undefined,
      city1Description: visto.city1Description || undefined,
      city1Image: visto.city1Image || undefined,
      city2Title: visto.city2Title || undefined,
      city2Description: visto.city2Description || undefined,
      city2Image: visto.city2Image || undefined,
      city3Title: visto.city3Title || undefined,
      city3Description: visto.city3Description || undefined,
      city3Image: visto.city3Image || undefined,
      city4Title: visto.city4Title || undefined,
      city4Description: visto.city4Description || undefined,
      city4Image: visto.city4Image || undefined,
      // Campos do FAQ
      faqEnabled: visto.faqEnabled,
      faqTitle: visto.faqTitle || undefined,
      faqDescription: visto.faqDescription || undefined,
      faq1Question: visto.faq1Question || undefined,
      faq1Answer: visto.faq1Answer || undefined,
      faq2Question: visto.faq2Question || undefined,
      faq2Answer: visto.faq2Answer || undefined,
      faq3Question: visto.faq3Question || undefined,
      faq3Answer: visto.faq3Answer || undefined,
      faq4Question: visto.faq4Question || undefined,
      faq4Answer: visto.faq4Answer || undefined,
      faq5Question: visto.faq5Question || undefined,
      faq5Answer: visto.faq5Answer || undefined,
      faq6Question: visto.faq6Question || undefined,
      faq6Answer: visto.faq6Answer || undefined,
      // Campos dos diferenciais
      diferenciaisEnabled: visto.diferenciaisEnabled,
      diferenciaisTitle: visto.diferenciaisTitle || undefined,
      diferenciaisDescription: visto.diferenciaisDescription || undefined,
      diferencial1Title: visto.diferencial1Title || undefined,
      diferencial1Description: visto.diferencial1Description || undefined,
      diferencial1Image: visto.diferencial1Image || undefined,
      diferencial2Title: visto.diferencial2Title || undefined,
      diferencial2Description: visto.diferencial2Description || undefined,
      diferencial2Image: visto.diferencial2Image || undefined,
      diferencial3Title: visto.diferencial3Title || undefined,
      diferencial3Description: visto.diferencial3Description || undefined,
      diferencial3Image: visto.diferencial3Image || undefined,
      diferencial4Title: visto.diferencial4Title || undefined,
      diferencial4Description: visto.diferencial4Description || undefined,
      diferencial4Image: visto.diferencial4Image || undefined,
      // Campos dos benefícios
      beneficiosEnabled: visto.beneficiosEnabled,
      beneficio1Title: visto.beneficio1Title || undefined,
      beneficio1Description: visto.beneficio1Description || undefined,
      beneficio1Icon: visto.beneficio1Icon || undefined,
      beneficio2Title: visto.beneficio2Title || undefined,
      beneficio2Description: visto.beneficio2Description || undefined,
      beneficio2Icon: visto.beneficio2Icon || undefined,
      beneficio3Title: visto.beneficio3Title || undefined,
      beneficio3Description: visto.beneficio3Description || undefined,
      beneficio3Icon: visto.beneficio3Icon || undefined,
      // Campos dos requisitos especiais
      requisitosEnabled: visto.requisitosEnabled,
      requisitosTitle: visto.requisitosTitle || undefined,
      requisitosDescription: visto.requisitosDescription || undefined,
      requisitosBreadcrumb: visto.requisitosBreadcrumb || undefined,
      requisitosButtonText: visto.requisitosButtonText || undefined,
      requisitosButtonUrl: visto.requisitosButtonUrl || undefined,
      requisito1Title: visto.requisito1Title || undefined,
      requisito1Description: visto.requisito1Description || undefined,
      requisito1Icon: visto.requisito1Icon || undefined,
      requisito2Title: visto.requisito2Title || undefined,
      requisito2Description: visto.requisito2Description || undefined,
      requisito2Icon: visto.requisito2Icon || undefined,
      requisito3Title: visto.requisito3Title || undefined,
      requisito3Description: visto.requisito3Description || undefined,
      requisito3Icon: visto.requisito3Icon || undefined,
        requisito4Title: visto.requisito4Title || undefined,
        requisito4Description: visto.requisito4Description || undefined,
        requisito4Icon: visto.requisito4Icon || undefined,
        requisito5Title: visto.requisito5Title || undefined,
        requisito5Description: visto.requisito5Description || undefined,
        requisito5Icon: visto.requisito5Icon || undefined,
        requisito6Title: visto.requisito6Title || undefined,
        requisito6Description: visto.requisito6Description || undefined,
        requisito6Icon: visto.requisito6Icon || undefined,
        requisito7Title: visto.requisito7Title || undefined,
        requisito7Description: visto.requisito7Description || undefined,
        requisito7Icon: visto.requisito7Icon || undefined,
        requisito8Title: visto.requisito8Title || undefined,
        requisito8Description: visto.requisito8Description || undefined,
        requisito8Icon: visto.requisito8Icon || undefined,
      imageUrl: visto.imageUrl || undefined,
      country: visto.country,
      vistoType: visto.vistoType,
      status: visto.status,
      metaTitle: visto.metaTitle || undefined,
      metaDescription: visto.metaDescription || undefined,
      metaKeywords: visto.metaKeywords || undefined,
      ogTitle: visto.ogTitle || undefined,
      ogDescription: visto.ogDescription || undefined,
      ogImage: visto.ogImage || undefined,
      twitterTitle: visto.twitterTitle || undefined,
      twitterDescription: visto.twitterDescription || undefined,
      twitterImage: visto.twitterImage || undefined
    };
  } catch (error) {
    console.error('Failed to load visto by slug:', error);
    return null;
  }
}


