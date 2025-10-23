import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const leadSchema = z.object({
  nomeCompleto: z.string().optional(),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  pais: z.string().optional(),
  language: z.string().optional(),
  destino: z.string().optional(),
  service: z.string().optional(),
  tipoVisto: z.string().optional(),
  rendaAnual: z.string().optional(),
  maisInfoEstudante: z.string().optional(),
  maisInfoProfissional: z.string().optional(),
  maisInfoTurista: z.string().optional(),
  quantasPessoas: z.string().optional(),
  quantoTempo: z.string().optional(),
  estudanteOpcao: z.string().optional(),
  turismoOpcao: z.string().optional(),
  profissionalOpcao: z.string().optional(),
  source: z.string().optional(),
  utm_data: z.record(z.string(), z.string()).optional().nullable()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);
    const lead = await prisma.lead.create({
      data: {
        name: validatedData.nomeCompleto || null,
        email: validatedData.email,
        phone: validatedData.telefone || null,
        status: 'new',
        source: validatedData.source || 'stepper',
        notes: JSON.stringify({
          // Dados do formulário
          destino: validatedData.destino,
          objetivo: validatedData.service, // Mapear service para objetivo no banco
          tipoVisto: validatedData.tipoVisto,
          rendaAnual: validatedData.rendaAnual,
          maisInfoEstudante: validatedData.maisInfoEstudante,
          maisInfoProfissional: validatedData.maisInfoProfissional,
          maisInfoTurista: validatedData.maisInfoTurista,
          quantasPessoas: validatedData.quantasPessoas,
          quantoTempo: validatedData.quantoTempo,
          estudanteOpcao: validatedData.estudanteOpcao,
          turismoOpcao: validatedData.turismoOpcao,
          profissionalOpcao: validatedData.profissionalOpcao,
          pais: validatedData.pais,
          idioma: validatedData.language, // Mapear language para idioma no banco
          // UTM Parameters (capturados do localStorage)
          utm_data: body.utm_data || null
        })
      }
    });
    // Lead criado com sucesso

    return NextResponse.json({ 
      success: true, 
      lead: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        source: lead.source,
        status: lead.status
      }
    });
  } catch (error) {
    console.error('=== ERRO AO CRIAR LEAD ===');
    console.error('Erro completo:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    if (errorStack) {
      console.error('Stack trace:', errorStack);
    }
    
    return NextResponse.json(
      { success: false, error: 'Erro ao salvar lead', details: errorMessage },
      { status: 500 }
    );
  }
}