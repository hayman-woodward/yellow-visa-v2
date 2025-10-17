import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    // Buscar leads
    let whereClause: any = {};
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      whereClause.createdAt = {
        gte: startDate,
        lt: endDate
      };
    }

    const leads = await prisma.lead.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    // Preparar dados para Excel
    const excelData = leads.map(lead => {
      const notes = lead.notes ? JSON.parse(lead.notes) : {};
      
      return {
        'ID': lead.id,
        'Nome': lead.name || '',
        'Email': lead.email,
        'Telefone': lead.phone || '',
        'Status': lead.status,
        'Fonte': lead.source,
        'Criado em': new Date(lead.createdAt).toLocaleDateString('pt-BR'),
        'Destino': notes.destino || '',
        'Objetivo': notes.objetivo || '',
        'Tipo de Visto': notes.tipoVisto || '',
        'Renda Anual': notes.rendaAnual || '',
        'Experiência': notes.maisInfoProfissional || '',
        'País': notes.pais || '',
        'Idioma': notes.idioma || '',
        'UTM Source': notes.utm_data?.utm_source || '',
        'UTM Medium': notes.utm_data?.utm_medium || '',
        'UTM Campaign': notes.utm_data?.utm_campaign || '',
        'Referência': notes.utm_data?.refer || ''
      };
    });

    // Criar workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Ajustar largura das colunas
    const colWidths = [
      { wch: 10 }, // ID
      { wch: 20 }, // Nome
      { wch: 25 }, // Email
      { wch: 15 }, // Telefone
      { wch: 12 }, // Status
      { wch: 12 }, // Fonte
      { wch: 12 }, // Criado em
      { wch: 15 }, // Destino
      { wch: 20 }, // Objetivo
      { wch: 15 }, // Tipo de Visto
      { wch: 15 }, // Renda Anual
      { wch: 15 }, // Experiência
      { wch: 15 }, // País
      { wch: 10 }, // Idiomas
      { wch: 15 }, // UTM Source
      { wch: 15 }, // UTM Medium
      { wch: 20 }, // UTM Campaign
      { wch: 20 }  // Referência
    ];
    
    worksheet['!cols'] = colWidths;
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

    // Gerar buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Retornar arquivo
    const filename = date 
      ? `leads_${date.replace(/-/g, '_')}.xlsx`
      : `leads_${new Date().toISOString().split('T')[0].replace(/-/g, '_')}.xlsx`;

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });

  } catch (error) {
    console.error('Erro ao exportar Excel:', error);
    return NextResponse.json(
      { error: 'Erro ao exportar leads' },
      { status: 500 }
    );
  }
}
