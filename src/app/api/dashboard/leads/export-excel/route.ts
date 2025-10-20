import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Buscar todos os leads
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Por enquanto, retorna CSV simples
    const csvData = leads.map(lead => {
      const stepperData = lead.notes ? JSON.parse(lead.notes) : null;
      const utmData = stepperData?.utm_data || {};
      
      return [
        lead.name || 'Sem nome',
        lead.email,
        lead.phone || '',
        getSourceLabel(lead.source),
        getStatusLabel(lead.status),
        new Date(lead.createdAt).toLocaleDateString('pt-BR'),
        stepperData?.destino || '',
        stepperData?.objetivo || '',
        utmData.utm_source || '',
        utmData.utm_medium || '',
        utmData.utm_campaign || ''
      ].join(',');
    }).join('\n');

    const csvContent = 'Nome,Email,Telefone,Fonte,Status,Criado em,Destino,Objetivo,UTM Source,UTM Medium,UTM Campaign\n' + csvData;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });

  } catch (error) {
    console.error('Erro ao exportar Excel:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao exportar Excel' },
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