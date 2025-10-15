import { z } from 'zod';

export const pageSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  slug: z.string()
    .min(2, 'Slug deve ter pelo menos 2 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  content: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),
  excerpt: z.string().optional(),
  
  // SEO
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  
  // Open Graph
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  
  // Twitter Card
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  
  // Configurações
  featuredImage: z.string().optional(),
  order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
  status: z.enum(['draft', 'published', 'archived'] as const),
  isHomepage: z.boolean().default(false)
});

export const updatePageSchema = pageSchema.partial();

export const pageBackendSchema = pageSchema.extend({
  excerpt: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  metaKeywords: z.string().optional().nullable(),
  ogTitle: z.string().optional().nullable(),
  ogDescription: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
  twitterTitle: z.string().optional().nullable(),
  twitterDescription: z.string().optional().nullable(),
  twitterImage: z.string().optional().nullable(),
  featuredImage: z.string().optional().nullable(),
});

export const createPageSchema = pageBackendSchema.extend({
  publishedAt: z.string().optional().nullable()
});
