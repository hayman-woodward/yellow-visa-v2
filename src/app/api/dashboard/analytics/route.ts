import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Métricas de hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Executar queries em paralelo para melhor performance
    const [
      leadsToday,
      totalLeads,
      popularVisto,
      leadsBySource,
      leadsTrend,
      popularVistos
    ] = await Promise.all([
      // Leads de hoje
      prisma.lead.count({
        where: {
          createdAt: {
            gte: today,
            lt: tomorrow
          }
        }
      }),

      // Total de leads
      prisma.lead.count(),

      // Visto mais popular (otimizado - apenas o primeiro resultado)
      prisma.lead.findFirst({
        where: {
          source: {
            contains: 'visto'
          }
        },
        select: {
          source: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),

      // Leads por fonte (UTM) - limitado a 5
      prisma.lead.groupBy({
        by: ['source'],
        _count: {
          source: true
        },
        orderBy: {
          _count: {
            source: 'desc'
          }
        },
        take: 5
      }),

      // Tendência de leads (últimos 7 dias) - apenas contagem por dia
      prisma.lead.groupBy({
        by: ['createdAt'],
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        _count: {
          id: true
        }
      }),

      // Vistos mais populares (apenas campos necessários)
      prisma.visto.findMany({
        where: {
          status: 'published'
        },
        select: {
          title: true,
          country: true
        },
        take: 5
      })
    ]);

    // Taxa de conversão (simulada - leads / 1000 visitantes estimados)
    const conversionRate = totalLeads > 0 ? ((totalLeads / 1000) * 100).toFixed(1) : '0.0';

    // Processar dados de tendência de forma mais eficiente
    const leadsByDay = leadsTrend.reduce((acc, item) => {
      const date = item.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + item._count.id;
      return acc;
    }, {} as Record<string, number>);

    // Criar array com últimos 7 dias
    const trendData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      trendData.push({
        date: dateStr,
        leads: leadsByDay[dateStr] || 0
      });
    }

    return NextResponse.json({
      // Métricas principais
      leadsToday,
      totalLeads,
      conversionRate: `${conversionRate}%`,
      popularVisto: popularVisto?.source || 'N/A',
      
      // Dados para gráficos
      leadsBySource: leadsBySource.map(item => ({
        source: item.source,
        count: item._count.source
      })),
      
      trendData,
      
      popularVistos: popularVistos.map(visto => ({
        title: visto.title,
        country: visto.country
      }))
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
