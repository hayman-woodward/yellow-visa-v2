'use client';

import { useDashboardStats } from '@/hooks/useDashboardData';
import { useAnalytics } from '@/hooks/useAnalytics';
import { YVText } from '@/components/YV';
import {
  Users,
  FileText,
  BookOpen,
  Mail,
  Plus,
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
  const leadsTrendData = [
    { name: 'Seg', leads: 12 },
    { name: 'Ter', leads: 18 },
    { name: 'Qua', leads: 8 },
    { name: 'Qui', leads: 25 },
    { name: 'Sex', leads: 15 },
    { name: 'Sáb', leads: 22 },
    { name: 'Dom', leads: 19 },
  ];

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50/30'>
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

          {/* Quick Actions Skeleton */}
          <div className='bg-white rounded-lg p-6 border border-gray-200'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-4 h-4 bg-gray-200 rounded animate-pulse' />
              <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className='flex items-center gap-3 p-3 rounded-lg border border-gray-200'>
                  <div className='w-10 h-10 rounded bg-gray-200 animate-pulse' />
                  <div>
                    <div className='h-4 w-24 bg-gray-200 rounded animate-pulse mb-1' />
                    <div className='h-3 w-16 bg-gray-200 rounded animate-pulse' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity/Recent Skeleton */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className='bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/20'>
                <div className='flex items-center gap-2 mb-4'>
                  <div className='w-4 h-4 bg-gray-200 rounded animate-pulse' />
                  <div className='h-4 w-32 bg-gray-200 rounded animate-pulse' />
                </div>
                <div className='space-y-3'>
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className='flex items-start gap-3 pb-3 border-b border-gray-200/50'>
                      <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse' />
                      <div className='flex-1'>
                        <div className='h-4 w-40 bg-gray-200 rounded animate-pulse mb-1' />
                        <div className='h-3 w-16 bg-gray-200 rounded animate-pulse' />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50/30'>
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
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
                labelStyle={{ color: '#f9fafb' }}
              />
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#000000" 
                strokeWidth={3}
                dot={{ fill: '#000000', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='bg-dashboard-card rounded-lg p-6 border border-dashboard'>
        <h3 className='font-semibold text-base mb-4 text-dashboard flex items-center gap-2'>
          <Plus size={18} className='text-dashboard-muted' />
          Ações Rápidas
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
          <a
            href='/dashboard/usuarios/novo'
            className='flex items-center gap-3 p-3 rounded-lg border border-dashboard hover:border-[#FFBD1A] hover:bg-dashboard-hover transition-colors group'
          >
            <div className='w-10 h-10 rounded bg-[#FFBD1A]/20 flex items-center justify-center group-hover:bg-[#FFBD1A]/30 transition-colors'>
              <Users className='text-[#FFBD1A]' size={18} />
            </div>
            <div>
              <p className='text-sm font-medium text-dashboard'>Novo Usuário</p>
              <p className='text-xs text-dashboard-muted'>Adicionar admin</p>
            </div>
          </a>

          <a
            href='/dashboard/vistos/novo'
            className='flex items-center gap-3 p-3 rounded-lg border border-dashboard hover:border-[#C04] hover:bg-dashboard-hover transition-colors group'
          >
            <div className='w-10 h-10 rounded bg-[#C04]/20 flex items-center justify-center group-hover:bg-[#C04]/30 transition-colors'>
              <FileText className='text-[#C04]' size={18} />
            </div>
            <div>
              <p className='text-sm font-medium text-dashboard'>Novo Visto</p>
              <p className='text-xs text-dashboard-muted'>Adicionar visto</p>
            </div>
          </a>

          <a
            href='/dashboard/blog/novo'
            className='flex items-center gap-3 p-3 rounded-lg border border-dashboard hover:bg-dashboard-hover transition-colors group'
          >
            <div className='w-10 h-10 rounded bg-dashboard-hover flex items-center justify-center group-hover:bg-dashboard-border transition-colors'>
              <BookOpen className='text-dashboard-muted' size={18} />
            </div>
            <div>
              <p className='text-sm font-medium text-dashboard'>Novo Post</p>
              <p className='text-xs text-dashboard-muted'>Escrever artigo</p>
            </div>
          </a>
        </div>
      </div>

      {/* Activity / Recent */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {/* Atividade Recente */}
        <div className='bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/20'>
          <h3 className='font-semibold text-base mb-4 text-gray-900 flex items-center gap-2'>
            <TrendingUp size={18} className='text-orange-600' />
            Atividade Recente
          </h3>
          <div className='space-y-3'>
            <div className='flex items-start gap-3 pb-3 border-b border-gray-200/50'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center flex-shrink-0'>
                <Users className='text-orange-600' size={14} />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm text-gray-900'>
                  Novo usuário cadastrado
                </p>
                <p className='text-xs text-gray-500'>Há 2 horas</p>
              </div>
            </div>
            <div className='flex items-start gap-3 pb-3 border-b border-gray-200/50'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center flex-shrink-0'>
                <BookOpen className='text-orange-600' size={14} />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm text-gray-900'>Post publicado no blog</p>
                <p className='text-xs text-gray-500'>Há 5 horas</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-br from-magenta-100 to-pink-100 flex items-center justify-center flex-shrink-0'>
                <FileText className='text-magenta-600' size={14} />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm text-gray-900'>
                  Visto atualizado: EB-2 NIW
                </p>
                <p className='text-xs text-gray-500'>Ontem às 15:30</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className='bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/20'>
          <h3 className='font-semibold text-base mb-4 text-gray-900 flex items-center gap-2'>
            <BarChart3 size={18} className='text-magenta-600' />
            Resumo do Site
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 rounded-xl border border-yellow-200/30'>
              <span className='text-sm font-medium text-gray-700'>Total de Usuários</span>
              <span className='text-lg font-bold text-orange-600'>{usersCount}</span>
            </div>
            <div className='flex items-center justify-between p-3 bg-gradient-to-r from-magenta-50/50 to-pink-50/50 rounded-xl border border-magenta-200/30'>
              <span className='text-sm font-medium text-gray-700'>Tipos de Vistos Ativos</span>
              <span className='text-lg font-bold text-magenta-600'>{vistosCount}</span>
            </div>
            <div className='flex items-center justify-between p-3 bg-gradient-to-r from-orange-50/50 to-yellow-50/50 rounded-xl border border-orange-200/30'>
              <span className='text-sm font-medium text-gray-700'>Posts Publicados</span>
              <span className='text-lg font-bold text-orange-600'>{blogPostsCount}</span>
            </div>
            <div className='flex items-center justify-between p-3 bg-gradient-to-r from-magenta-50/50 to-pink-50/50 rounded-xl border border-magenta-200/30'>
              <span className='text-sm font-medium text-gray-700'>Contatos Recebidos</span>
              <span className='text-lg font-bold text-magenta-600'>{contactsCount}</span>
            </div>
            <div className='pt-4 border-t border-gray-200/50'>
              <a
                href='/'
                target='_blank'
                className='text-sm text-YV hover:text-orange-600 font-medium transition-colors'
              >
                Visitar site →
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
