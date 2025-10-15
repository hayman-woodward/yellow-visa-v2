import { z } from 'zod';

// Schema de validação de FAQ Group
export const faqGroupSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  slug: z.string()
    .min(2, 'Slug deve ter pelo menos 2 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  description: z.string().optional().or(z.literal('')),
  imageUrl: z.string().optional().or(z.literal('')),
  order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
  status: z.enum(['draft', 'published'] as const),
  // Campos para controlar a seção de FAQ
  sectionTitle: z.string().optional().or(z.literal('')),
  breadcrumbLabel: z.string().optional().or(z.literal('')),
  breadcrumbHref: z.string().optional().or(z.literal('')),
  questions: z.array(z.object({
    question: z.string().min(3, 'Pergunta deve ter pelo menos 3 caracteres'),
    link: z.string().min(1, 'Link é obrigatório'),
    order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
    status: z.enum(['draft', 'published'] as const)
  })).optional().default([])
});

// Schema para atualização de FAQ Group
export const updateFaqGroupSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  slug: z.string()
    .min(2, 'Slug deve ter pelo menos 2 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  description: z.string().optional().or(z.literal('')),
  imageUrl: z.string().optional().or(z.literal('')),
  order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
  status: z.enum(['draft', 'published'] as const),
  // Campos para controlar a seção de FAQ
  sectionTitle: z.string().optional().or(z.literal('')),
  breadcrumbLabel: z.string().optional().or(z.literal('')),
  breadcrumbHref: z.string().optional().or(z.literal('')),
  questions: z.array(z.object({
    question: z.string().min(3, 'Pergunta deve ter pelo menos 3 caracteres'),
    link: z.string().min(1, 'Link é obrigatório'),
    order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
    status: z.enum(['draft', 'published'] as const)
  })).optional().default([])
});

// Schema para o backend de FAQ Group
export const faqGroupBackendSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  slug: z.string()
    .min(2, 'Slug deve ter pelo menos 2 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  description: z.string().optional(),
  imageUrl: z.string().nullable().optional(),
  order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
  status: z.enum(['draft', 'published'] as const),
  // Campos para controlar a seção de FAQ
  sectionTitle: z.string().nullable().optional(),
  breadcrumbLabel: z.string().nullable().optional(),
  breadcrumbHref: z.string().nullable().optional(),
  questions: z.array(z.object({
    question: z.string().min(3, 'Pergunta deve ter pelo menos 3 caracteres'),
    link: z.string().min(1, 'Link é obrigatório'),
    order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
    status: z.enum(['draft', 'published'] as const)
  })).optional().default([])
});

// Schema de validação de FAQ Question
export const faqQuestionSchema = z.object({
  question: z.string().min(3, 'Pergunta deve ter pelo menos 3 caracteres'),
  content: z.string().optional(),
  link: z.string().min(1, 'Link é obrigatório'),
  order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
  status: z.enum(['draft', 'published'] as const),
  authorId: z.string().optional(),
  videoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  metaDescription: z.string().optional(),
  ogDescription: z.string().optional()
});

// Schema para atualização de FAQ Question
export const updateFaqQuestionSchema = z.object({
  question: z.string().min(3, 'Pergunta deve ter pelo menos 3 caracteres'),
  content: z.string().optional(),
  link: z.string().min(1, 'Link é obrigatório'),
  order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
  status: z.enum(['draft', 'published'] as const),
  authorId: z.string().optional(),
  videoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  metaDescription: z.string().optional(),
  ogDescription: z.string().optional()
});

// Schema para o backend de FAQ Question
export const faqQuestionBackendSchema = z.object({
  question: z.string().min(1, 'Pergunta é obrigatória'),
  content: z.string().optional(),
  link: z.string().min(1, 'Link é obrigatório'),
  order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
  status: z.enum(['draft', 'published'] as const),
  authorId: z.string().optional(),
  videoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  metaDescription: z.string().optional(),
  ogDescription: z.string().optional()
});
