import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Função para converter ID da renda para valor formatado
function getRendaFormattedValue(rendaId: string | undefined): string {
  const rendas: { [key: string]: string } = {
    'menos-50k': 'Menos de R$ 50.000',
    '50k-199k': 'R$ 50.000 a R$ 199.999',
    '200k-499k': 'R$ 200.000 a R$ 499.999',
    'acima-500k': 'Acima de R$ 500.000'
  };
  return rendas[rendaId || ''] || 'Não informado';
}

const leadSchema = z.object({
  nomeCompleto: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').refine(
    (nome) => nome.trim().includes(' '), 
    'Por favor, digite seu nome completo'
  ),
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
          idioma: validatedData.idioma,
          // UTM Parameters (capturados do localStorage)
          utm_data: body.utm_data || null
        })
      }
    });

    // Enviar para Salesforce (API antiga) - COMENTADO PARA TESTE AMANHÃ
    /*
    try {
      const salesforceResponse = await fetch('https://api.yellowvisa.com/api/usa-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: validatedData.nomeCompleto?.split(' ')[0] || '',
          lastName: validatedData.nomeCompleto?.split(' ').slice(1).join(' ') || '',
          email: validatedData.email,
          country: validatedData.pais || 'Brasil',
          nationality: validatedData.pais || 'Brasil',
          phone: validatedData.telefone || '',
          service: 'visto', // Fixo como no sistema antigo
          subSource: 'Stepper Form',
          academicBackground: 'Não informado', // Fixo como no sistema antigo
          leadSource: 'Website',
          migrateTo: validatedData.destino || 'Estados Unidos',
          occupation: 'Não informado', // Fixo como no sistema antigo
          language: validatedData.idioma || 'Português',
          timeExperience: 'de-5-a-10-anos', // Fixo como no sistema antigo
          contactChannel: 'Email',
          additionalInfo: JSON.stringify({
            objetivo: validatedData.objetivo,
            estudanteOpcao: validatedData.estudanteOpcao,
            turismoOpcao: validatedData.turismoOpcao,
            profissionalOpcao: validatedData.profissionalOpcao,
            maisInfoEstudante: validatedData.maisInfoEstudante,
            maisInfoProfissional: validatedData.maisInfoProfissional,
            maisInfoTurista: validatedData.maisInfoTurista,
            quantasPessoas: validatedData.quantasPessoas,
            quantoTempo: validatedData.quantoTempo,
            tipoVisto: validatedData.tipoVisto,
            utm_data: body.utm_data
          }),
          whatsapp: validatedData.telefone || '',
          annualIncome: getRendaFormattedValue(validatedData.rendaAnual) || 'Não informado',
          utm: body.utm_data?.utm_source || '',
          source: body.utm_data?.utm_source || '',
          medium: body.utm_data?.utm_medium || '',
          term: body.utm_data?.utm_term || '',
          refer: body.utm_data?.refer || '',
          sellerId: null, // Será definido pela API
        }),
      });

      if (salesforceResponse.ok) {
        const salesforceData = await salesforceResponse.json();
        console.log('Lead enviado para Salesforce:', salesforceData);
        
        // Atualizar lead com ID do Salesforce se disponível
        if (salesforceData.id) {
          const updatedNotes = JSON.parse(lead.notes || '{}');
          updatedNotes.salesforce_id = salesforceData.id;
          updatedNotes.lead_owner = salesforceData.user?.leadOwner;
          
          await prisma.lead.update({
            where: { id: lead.id },
            data: { 
              notes: JSON.stringify(updatedNotes)
            }
          });
        }
      }
    } catch (error) {
      console.error('Erro ao enviar para Salesforce:', error);
      // Não falha o processo principal se Salesforce der erro
    }
    */

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