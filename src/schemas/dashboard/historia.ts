import { z } from 'zod';

export const historiaSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  slug: z.string().min(3, 'Slug deve ter pelo menos 3 caracteres'),
  content: z.string().min(20, 'Conteúdo deve ter pelo menos 20 caracteres'),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  authorName: z.string().min(3, 'Nome do autor é obrigatório'),
  country: z.string().min(2, 'País é obrigatório'),
  status: z.enum(['draft', 'published'])
});

export type HistoriaFormData = z.infer<typeof historiaSchema>;

