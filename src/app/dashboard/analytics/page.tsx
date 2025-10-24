'use client';

import { useAnalytics } from '@/hooks/useAnalytics';
import { YVText } from '@/components/YV';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Target, Award, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#FFBD1A', '#C04', '#3B82F6', '#10B981', '#8B5CF6'];

export default function AnalyticsPage() {
  const { data: analytics, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className='space-y-6'>
        <div className='h-8 w-32 bg-gray-200 rounded animate-pulse' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='bg-dashboard-card rounded-lg p-6 border border-dashboard'>
              <div className='h-64 bg-gray-200 rounded animate-pulse' />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className='text-center py-12'>
        <YVText className='text-red-500'>
          Erro ao carregar analytics: {error}
        </YVText>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-normal text-dashboard mb-1'>
            Analytics
          </h1>
          <p className='text-sm text-dashboard-muted'>
            Métricas e insights do seu site
          </p>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-dashboard-card rounded-lg p-5 border border-dashboard'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='w-10 h-10 rounded-full bg-green-500 flex items-center justify-center'>
              <TrendingUp className='text-white' size={18} />
            </div>
            <div>
              <p className='text-2xl font-semibold text-dashboard'>{analytics.leadsToday}</p>
              <p className='text-sm text-dashboard-muted'>Leads Hoje</p>
            </div>
          </div>
        </div>

        <div className='bg-dashboard-card rounded-lg p-5 border border-dashboard'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center'>
              <Target className='text-white' size={18} />
            </div>
            <div>
              <p className='text-2xl font-semibold text-dashboard'>{analytics.conversionRate}</p>
              <p className='text-sm text-dashboard-muted'>Taxa Conversão</p>
            </div>
          </div>
        </div>

        <div className='bg-dashboard-card rounded-lg p-5 border border-dashboard'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center'>
              <Award className='text-white' size={18} />
            </div>
            <div>
              <p className='text-lg font-semibold text-dashboard truncate'>{analytics.popularVisto}</p>
              <p className='text-sm text-dashboard-muted'>Visto Popular</p>
            </div>
          </div>
        </div>

        <div className='bg-dashboard-card rounded-lg p-5 border border-dashboard'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center'>
              <Users className='text-white' size={18} />
            </div>
            <div>
              <p className='text-2xl font-semibold text-dashboard'>{analytics.totalLeads}</p>
              <p className='text-sm text-dashboard-muted'>Total Leads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Tendência de Leads */}
        <div className='bg-dashboard-card rounded-lg p-8 border border-dashboard'>
          <div className='flex items-center gap-2 mb-4'>
            <TrendingUp className='text-dashboard-muted' size={18} />
            <h3 className='font-semibold text-dashboard'>Tendência de Leads (7 dias)</h3>
          </div>
          <div className='h-64'>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                  formatter={(value) => [value, 'Leads']}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#FFBD1A" 
                  strokeWidth={2}
                  dot={{ fill: '#FFBD1A', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads por Fonte */}
        <div className='bg-dashboard-card rounded-lg p-6 border border-dashboard'>
          <div className='flex items-center gap-2 mb-4'>
            <BarChart3 className='text-dashboard-muted' size={18} />
            <h3 className='font-semibold text-dashboard'>Leads por Fonte</h3>
          </div>
          <div className='h-64'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.leadsBySource}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="source" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [value, 'Leads']} />
                <Bar dataKey="count" fill="#C04" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vistos Populares */}
        <div className='bg-dashboard-card rounded-lg p-6 border border-dashboard'>
          <div className='flex items-center gap-2 mb-4'>
            <PieChartIcon className='text-dashboard-muted' size={18} />
            <h3 className='font-semibold text-dashboard'>Vistos Populares</h3>
          </div>
          <div className='h-64'>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.popularVistos}
                  dataKey="title"
                  nameKey="title"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                    label={({ name }) => name}
                >
                  {analytics.popularVistos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lista de Vistos */}
        <div className='bg-dashboard-card rounded-lg p-6 border border-dashboard'>
          <div className='flex items-center gap-2 mb-4'>
            <Award className='text-dashboard-muted' size={18} />
            <h3 className='font-semibold text-dashboard'>Vistos em Destaque</h3>
          </div>
          <div className='space-y-3'>
            {analytics.popularVistos.map((visto, index) => (
              <div key={index} className='flex items-center justify-between p-3 bg-dashboard-hover rounded-lg'>
                <div>
                  <p className='font-medium text-dashboard text-sm'>{visto.title}</p>
                  <p className='text-xs text-dashboard-muted'>{visto.country}</p>
                </div>
                <div className='w-3 h-3 rounded-full' style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
