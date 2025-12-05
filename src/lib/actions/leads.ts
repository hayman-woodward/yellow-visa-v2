'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { normalizePhone } from '@/lib/utils';

const leadSchema = z.object({
  nomeCompleto: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  pais: z.string().optional(),
  idioma: z.string().optional(),
  destino: z.string().optional(),
  objetivo: z.string().optional(),
  tipoVisto: z.string().optional(),
  rendaAnual: z.string().optional(),
  maisInfoEstudante: z.string().optional(),
  maisInfoProfissional: z.string().optional(),
  maisInfoTurista: z.string().optional(),
  quantasPessoas: z.string().optional(),
  quantoTempo: z.string().optional(),
  estudanteOpcao: z.string().optional(),
  turismoOpcao: z.string().optional(),
  profissionalOpcao: z.string().optional()
});

export async function createLead(formData: z.infer<typeof leadSchema>) {
  try {
    const validatedData = leadSchema.parse(formData);
    
    // Validar telefone antes de salvar
    const telefoneValido = normalizePhone(validatedData.telefone);

    const lead = await prisma.lead.create({
      data: {
        name: validatedData.nomeCompleto,
        email: validatedData.email,
        phone: telefoneValido,
        notes: JSON.stringify({
          pais: validatedData.pais,
          idioma: validatedData.idioma,
          dadosAdicionais: {
            destino: validatedData.destino,
            objetivo: validatedData.objetivo,
            tipoVisto: validatedData.tipoVisto,
            rendaAnual: validatedData.rendaAnual,
            maisInfoEstudante: validatedData.maisInfoEstudante,
            maisInfoProfissional: validatedData.maisInfoProfissional,
            maisInfoTurista: validatedData.maisInfoTurista,
            quantasPessoas: validatedData.quantasPessoas,
            quantoTempo: validatedData.quantoTempo,
            estudanteOpcao: validatedData.estudanteOpcao,
            turismoOpcao: validatedData.turismoOpcao,
            profissionalOpcao: validatedData.profissionalOpcao
          }
        }),
      }
    });

    return { success: true, lead };
  } catch (error) {
    console.error('Erro ao criar lead:', error);
    return { success: false, error: 'Erro ao salvar lead' };
  }
}
