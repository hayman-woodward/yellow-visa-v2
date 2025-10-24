'use client';

import { useDashboardStats } from '@/hooks/useDashboardData';
import { useAnalytics } from '@/hooks/useAnalytics';
import { YVText } from '@/components/YV';
import {
  Users,
  FileText,
  BookOpen,
  TrendingUp,
  Clock,
  UserPlus,
  Target,
  TrendingDown,
  Award,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const { stats, loading, error } = useDashboardStats();
  const { data: analytics, loading: analyticsLoading } = useAnalytics();

  // Dados para o gráfico de tendência (últimos 7 dias)
  const leadsTrendData = analytics?.trendData?.map(item => ({
    name: new Date(item.date).toLocaleDateString('pt-BR', { weekday: 'short' }),
    leads: item.leads
  })) || [
    { name: 'Seg', leads: 0 },
    { name: 'Ter', leads: 0 },
    { name: 'Qua', leads: 0 },
    { name: 'Qui', leads: 0 },
    { name: 'Sex', leads: 0 },
    { name: 'Sáb', leads: 0 },
    { name: 'Dom', leads: 0 },
  ];

  if (loading) {
    return (
      <div className='min-h-screen -my-4 lg:-my-8 bg-gradient-to-br '>
        <div className='space-y-8 p-6'>
          {/* Header Skeleton */}
          <div className='flex items-center justify-between'>
            <div>
              <div className='h-8 w-32 bg-gray-200 rounded animate-pulse mb-2' />
              <div className='h-4 w-64 bg-gray-200 rounded animate-pulse' />
            </div>
            <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
          </div>

          {/* Stats Cards Skeleton */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className='bg-white rounded-xl p-4 shadow-md'
              >
                <div className='flex items-center justify-between mb-3'>
                  <div className='w-10 h-10 rounded-xl bg-gray-200 animate-pulse' />
                </div>
                <div>
                  <div className='h-8 w-16 bg-gray-200 rounded animate-pulse mb-1' />
                  <div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
                </div>
              </div>
            ))}
          </div>

          {/* Analytics Cards Skeleton */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='bg-white rounded-xl p-4 shadow-md'>
                <div className='flex items-center justify-between mb-3'>
                  <div className='w-10 h-10 rounded-xl bg-gray-200 animate-pulse' />
                </div>
                <div>
                  <div className='h-8 w-16 bg-gray-200 rounded animate-pulse mb-1' />
                  <div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
                </div>
              </div>
            ))}
          </div>

          {/* Gráfico de Tendência Skeleton */}
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg'>
            <div className='flex items-center justify-between mb-8'>
              <div>
                <div className='h-8 w-48 bg-gray-200 rounded animate-pulse mb-2' />
                <div className='h-4 w-32 bg-gray-200 rounded animate-pulse' />
              </div>
              <div className='flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full'>
                <div className='w-4 h-4 bg-gray-200 rounded animate-pulse' />
                <div className='h-4 w-32 bg-gray-200 rounded animate-pulse' />
              </div>
            </div>
            
            <div className='h-64 bg-gray-100 rounded-lg animate-pulse' />
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className='text-center py-12'>
        <YVText className='text-red-500'>
          Erro ao carregar dados: {error}
        </YVText>
      </div>
    );
  }

  const { usersCount, vistosCount, blogPostsCount, contactsCount, leadsCount } = stats;

  return (
    <div className='min-h-screen -my-4 lg:-my-8'>
      <div className='space-y-8 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-normal text-dashboard mb-1'>
            Dashboard
          </h1>
          <p className='text-sm text-dashboard-muted'>
            Bem-vindo de volta, Rafael Dias
          </p>
        </div>
        <div className='flex items-center gap-2 text-sm text-dashboard-muted'>
          <Clock size={16} />
          <span>{new Date().toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {/* Usuários */}
        <div className='bg-white rounded-xl p-4 shadow-md'>
          <div className='flex items-center justify-between mb-3'>
            <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
              <Users className='text-gray-700' size={18} />
            </div>
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-900 mb-1'>
              {usersCount}
            </p>
            <p className='text-xs text-gray-600 font-medium'>Usuários</p>
          </div>
        </div>

        {/* Vistos */}
        <div className='bg-white rounded-xl p-4 shadow-md'>
          <div className='flex items-center justify-between mb-3'>
            <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
              <FileText className='text-gray-700' size={18} />
            </div>
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-900 mb-1'>
              {vistosCount}
            </p>
            <p className='text-xs text-gray-600 font-medium'>Vistos</p>
          </div>
        </div>

        {/* Posts */}
        <div className='bg-white rounded-xl p-4 shadow-md'>
          <div className='flex items-center justify-between mb-3'>
            <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
              <BookOpen className='text-gray-700' size={18} />
            </div>
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-900 mb-1'>
              {blogPostsCount}
            </p>
            <p className='text-xs text-gray-600 font-medium'>Posts</p>
          </div>
        </div>


        {/* Leads */}
        <div className='bg-white rounded-xl p-4 shadow-md'>
          <div className='flex items-center justify-between mb-3'>
            <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
              <UserPlus className='text-gray-700' size={18} />
            </div>
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-900 mb-1'>
              {leadsCount}
            </p>
            <p className='text-xs text-gray-600 font-medium'>Leads</p>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {analyticsLoading ? (
          // Loading skeleton para analytics
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='bg-white rounded-xl p-4 shadow-md'>
              <div className='flex items-center justify-between mb-3'>
                <div className='w-10 h-10 rounded-xl bg-gray-200 animate-pulse' />
              </div>
              <div>
                <div className='h-8 w-16 bg-gray-200 rounded animate-pulse mb-1' />
                <div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
              </div>
            </div>
          ))
        ) : analytics ? (
          <>
            {/* Leads Hoje */}
            <div className='bg-white rounded-xl p-4 shadow-md'>
              <div className='flex items-center justify-between mb-3'>
                <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
                  <TrendingUp className='text-gray-700' size={18} />
                </div>
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-900 mb-1'>
                  {analytics.leadsToday}
                </p>
                <p className='text-xs text-gray-600 font-medium'>Leads Hoje</p>
              </div>
            </div>

            {/* Taxa de Conversão */}
            <div className='bg-white rounded-xl p-4 shadow-md'>
              <div className='flex items-center justify-between mb-3'>
                <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
                  <Target className='text-gray-700' size={18} />
                </div>
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-900 mb-1'>
                  {analytics.conversionRate}
                </p>
                <p className='text-xs text-gray-600 font-medium'>Taxa Conversão</p>
              </div>
            </div>

            {/* Visto Mais Popular */}
            <div className='bg-white rounded-xl p-4 shadow-md'>
              <div className='flex items-center justify-between mb-3'>
                <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
                  <Award className='text-gray-700' size={18} />
                </div>
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-900 mb-1'>
                  {analytics.popularVisto}
                </p>
                <p className='text-xs text-gray-600 font-medium'>Mais Popular</p>
              </div>
            </div>

            {/* Total de Leads */}
            <div className='bg-white rounded-xl p-4 shadow-md'>
              <div className='flex items-center justify-between mb-3'>
                <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
                  <TrendingDown className='text-gray-700' size={18} />
                </div>
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-900 mb-1'>
                  {analytics.totalLeads}
                </p>
                <p className='text-xs text-gray-600 font-medium'>Total Leads</p>
              </div>
            </div>
          </>
        ) : (
          // Fallback quando analytics falha
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='bg-white rounded-xl p-4 shadow-md border border-gray-200'>
              <div className='flex items-center justify-between mb-3'>
                <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
                  <BarChart3 className='text-gray-400' size={18} />
                </div>
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-400 mb-1'>--</p>
                <p className='text-xs text-gray-500 font-medium'>Dados indisponíveis</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Gráfico de Tendência de Leads */}
      <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-2 tracking-tight'>Tendência de Leads</h3>
            <p className='text-gray-600 font-medium'>Últimos 7 dias</p>
          </div>
          <div className='flex items-center gap-3 px-4 py-2 bg-YV/10 rounded-full border border-YV/30'>
            <TrendingUp size={18} className='text-YV' />
            <span className='text-sm font-semibold text-YV'>+12% vs semana anterior</span>
          </div>
        </div>
        
        <div className='h-64'>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={leadsTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#374151"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#374151"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: '#374151',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ color: '#374151' }}
              />
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#000000" 
                strokeWidth={3}
                dot={{ fill: '#000000', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#000000', strokeWidth: 2, fill: '#000000' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>
    </div>
  );
}
