import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Métricas de hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Leads de hoje
    const leadsToday = await prisma.lead.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    // Total de leads
    const totalLeads = await prisma.lead.count();

    // Taxa de conversão (simulada - leads / 1000 visitantes estimados)
    const conversionRate = totalLeads > 0 ? ((totalLeads / 1000) * 100).toFixed(1) : '0.0';

    // Visto mais popular (baseado em leads que mencionam o visto)
    const popularVisto = await prisma.lead.findFirst({
      where: {
        source: {
          contains: 'visto'
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Leads por fonte (UTM)
    const leadsBySource = await prisma.lead.groupBy({
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
    });

    // Tendência de leads (últimos 7 dias)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const leadsTrend = await prisma.lead.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      select: {
        createdAt: true
      }
    });

    // Agrupar por dia
    const leadsByDay = leadsTrend.reduce((acc, lead) => {
      const date = lead.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
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

    // Vistos mais populares (baseado em status published)
    const popularVistos = await prisma.visto.findMany({
      where: {
        status: 'published'
      },
      select: {
        title: true,
        country: true,
        status: true
      },
      take: 5
    });

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
