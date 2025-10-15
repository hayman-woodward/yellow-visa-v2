'use server';

import { prisma } from '@/lib/prisma';

export type FaqQuestionItem = {
  question: string;
  link: string;
  order: number;
  status: string;
};

export type FaqGroupData = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  order: number;
  status: string;
  sectionTitle: string | null;
  breadcrumbLabel: string | null;
  breadcrumbHref: string | null;
  questions: FaqQuestionItem[];
};

export async function getFaqGroupBySlug(slug: string): Promise<FaqGroupData | null> {
  try {
    const group = await prisma.faqGroup.findUnique({
      where: { slug },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!group) return null;

    return {
      id: group.id,
      title: group.title,
      slug: group.slug,
      description: group.description ?? null,
      imageUrl: group.imageUrl ?? null,
      order: group.order,
      status: group.status,
      sectionTitle: null,
      breadcrumbLabel: null,
      breadcrumbHref: null,
      questions: group.questions.map(q => ({
        question: q.question,
        link: q.link,
        order: q.order,
        status: q.status
      }))
    };
  } catch (error) {
    console.error('Failed to load FAQ group:', error);
    return null;
  }
}

export async function getAllFaqGroups(excludeSlug?: string): Promise<FaqGroupData[]> {
  try {
    const groups = await prisma.faqGroup.findMany({
      where: {
        status: 'published',
        ...(excludeSlug && { slug: { not: excludeSlug } })
      },
      include: {
        questions: {
          where: { status: 'published' },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });

    return groups.map(group => ({
      id: group.id,
      title: group.title,
      slug: group.slug,
      description: group.description ?? null,
      imageUrl: group.imageUrl ?? null,
      order: group.order,
      status: group.status,
      sectionTitle: null,
      breadcrumbLabel: null,
      breadcrumbHref: null,
      questions: group.questions.map(q => ({
        question: q.question,
        link: q.link,
        order: q.order,
        status: q.status
      }))
    }));
  } catch (error) {
    console.error('Failed to load FAQ groups:', error);
    return [];
  }
}

// Função específica para buscar dados do guia do imigrante
export async function getGuiaDoImigranteData(slug: string) {
  try {
    console.log('🔍 Buscando dados para slug:', slug);
    const faqGroup = await getFaqGroupBySlug(slug);
    console.log('📊 FAQ Group encontrado:', faqGroup);
    
    if (!faqGroup) {
      console.log('❌ Nenhum FAQ group encontrado para slug:', slug);
      return null;
    }

    const result = {
      title: faqGroup.sectionTitle || faqGroup.title,
      subtitle: faqGroup.description || 'Descrição do guia do imigrante',
      slug: faqGroup.slug
    };
    
    console.log('✅ Dados retornados:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to load guia do imigrante data:', error);
    return null;
  }
}

// Busca a pergunta do guia pelo slug da URL (ex.: seguranca-online)
// A tabela guarda o link completo em FaqQuestion.link (ex.: /guia-do-imigrante/seguranca-online)
export async function getGuiaQuestionHeader(slug: string) {
  try {
    const link = `/guia-do-imigrante/${slug}`;

    const group = await prisma.faqGroup.findFirst({
      where: {
        questions: {
          some: { link }
        }
      },
      include: {
        questions: true
      }
    });

    if (!group) {
      return null;
    }

    const question = group.questions.find(q => q.link === link);

    return {
      title: question?.question || group.title,
      subtitle: group.description || '',
      content: question?.content || '',
      slug
    };
  } catch (error) {
    console.error('❌ Failed to load guia question header:', error);
    return null;
  }
}


