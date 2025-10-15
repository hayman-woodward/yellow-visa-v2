import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const leadSchema = z.object({
  nomeCompleto: z.string().optional(),
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
  profissionalOpcao: z.string().optional(),
  source: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    console.log('=== API LEADS - INÍCIO ===');
    const body = await request.json();
    console.log('Body recebido:', body);
    
    const validatedData = leadSchema.parse(body);
    console.log('Dados validados:', validatedData);
    
    console.log('Tentando conectar com Prisma...');
    const lead = await prisma.lead.create({
      data: {
        name: validatedData.nomeCompleto || null,
        email: validatedData.email,
        phone: validatedData.telefone || null,
        status: 'new',
        source: validatedData.source || 'stepper',
        notes: JSON.stringify({
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
          profissionalOpcao: validatedData.profissionalOpcao,
          pais: validatedData.pais,
          idioma: validatedData.idioma
        })
      }
    });
    console.log('Lead criado com sucesso:', lead);

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