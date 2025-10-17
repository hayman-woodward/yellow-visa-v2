import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Buscar leads do dia atual
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dailyLeads = await prisma.lead.findMany({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (dailyLeads.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'Nenhum lead encontrado para hoje',
        count: 0 
      });
    }

    // Por enquanto, só retorna os dados (email será implementado depois)
    return NextResponse.json({ 
      success: true, 
      message: `📧 Email preparado! ${dailyLeads.length} leads do dia prontos para envio.`,
      count: dailyLeads.length,
      leads: dailyLeads.map(lead => ({
        nome: lead.name || 'Sem nome',
        email: lead.email,
        telefone: lead.phone || '-',
        fonte: getSourceLabel(lead.source),
        status: getStatusLabel(lead.status),
        criado: new Date(lead.createdAt).toLocaleString('pt-BR')
      }))
    });

  } catch (error) {
    console.error('Erro ao enviar email dos leads:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao enviar email dos leads' },
      { status: 500 }
    );
  }
}


function getSourceLabel(source: string) {
  switch (source) {
    case 'website': return 'Website';
    case 'social': return 'Redes Sociais';
    case 'referral': return 'Indicação';
    case 'ads': return 'Anúncios';
    case 'stepper': return 'Stepper';
    case 'newsletter': return 'Newsletter';
    default: return source;
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'new': return 'Novo';
    case 'contacted': return 'Contatado';
    case 'qualified': return 'Qualificado';
    case 'converted': return 'Convertido';
    case 'lost': return 'Perdido';
    default: return status;
  }
}
