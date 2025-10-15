import { z } from 'zod';

export const destinoSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  slug: z.string().min(3, 'Slug deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  content: z.string().optional(),
  bannerTitle: z.string().optional(),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  country: z.string().min(2, 'País é obrigatório'),
  continent: z.enum(['América do Norte', 'América do Sul', 'Europa', 'Ásia', 'África', 'Oceania']),
  highlights: z.string().optional(),
  status: z.enum(['draft', 'published']),
  // Campos das principais cidades
  cityEnabled: z.boolean().default(false),
  cityTitle: z.string().optional(),
  cityDescription: z.string().optional(),
  city1Title: z.string().optional(),
  city1Description: z.string().optional(),
  city1Image: z.string().url('URL inválida').optional().or(z.literal('')),
  city2Title: z.string().optional(),
  city2Description: z.string().optional(),
  city2Image: z.string().url('URL inválida').optional().or(z.literal('')),
  city3Title: z.string().optional(),
  city3Description: z.string().optional(),
  city3Image: z.string().url('URL inválida').optional().or(z.literal('')),
  city4Title: z.string().optional(),
  city4Description: z.string().optional(),
  city4Image: z.string().url('URL inválida').optional().or(z.literal(''))
});

export type DestinoFormData = z.infer<typeof destinoSchema>;

