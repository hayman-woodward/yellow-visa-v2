import { z } from 'zod';

// Schema de validação de membro da equipe
export const teamMemberSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  slug: z.string()
    .min(2, 'Slug deve ter pelo menos 2 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  position: z.string().min(2, 'Posição deve ter pelo menos 2 caracteres'),
  bio: z.string().optional(),
  imageUrl: z.string().url('URL da imagem inválida').optional().or(z.literal('')),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
  status: z.enum(['draft', 'published'] as const)
});

// Schema para atualização (todos os campos opcionais exceto os obrigatórios)
export const updateTeamMemberSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  slug: z.string()
    .min(2, 'Slug deve ter pelo menos 2 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  position: z.string().min(2, 'Posição deve ter pelo menos 2 caracteres'),
  bio: z.string().optional(),
  imageUrl: z.string().url('URL da imagem inválida').optional().or(z.literal('')),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
  status: z.enum(['draft', 'published'] as const)
});

// Schema para o backend (sem campos opcionais vazios)
export const teamMemberBackendSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  slug: z.string()
    .min(2, 'Slug deve ter pelo menos 2 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  position: z.string().min(2, 'Posição deve ter pelo menos 2 caracteres'),
  bio: z.string().optional(),
  imageUrl: z.string().url('URL da imagem inválida').optional(),
  email: z.string().email('Email inválido').optional(),
  linkedin: z.string().url('URL do LinkedIn inválida').optional(),
  order: z.number().int().min(0, 'Ordem deve ser um número positivo'),
  status: z.enum(['draft', 'published'] as const)
});
