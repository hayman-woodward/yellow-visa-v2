'use client';

import { useDashboardStats } from '@/hooks/useDashboardData';
import { YVText } from '@/components/YV';
import {
  Users,
  FileText,
  BookOpen,
  Mail,
  Plus,
  TrendingUp,
  Clock,
  UserPlus
} from 'lucide-react';

export default function DashboardPage() {
  const { stats, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <div className='space-y-6'>
        {/* Header Skeleton */}
        <div className='flex items-center justify-between'>
          <div>
            <div className='h-8 w-32 bg-gray-200 rounded animate-pulse mb-2' />
            <div className='h-4 w-64 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
        </div>

        {/* Stats Cards Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className='bg-dashboard-card rounded-lg p-5 border border-dashboard'
            >
              <div className='flex items-start justify-between mb-3'>
                <div className='w-11 h-11 bg-gray-200 rounded-full animate-pulse' />
              </div>
              <div>
                <div className='h-10 w-16 bg-gray-200 rounded animate-pulse mb-1' />
                <div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
              </div>
            </div>
          ))}
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
    <div className='space-y-6'>
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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
        {/* Usuários */}
        <div className='bg-dashboard-card rounded-lg p-5 border border-dashboard hover:border-[#FFBD1A]/50 transition-all'>
          <div className='flex items-start justify-between mb-3'>
            <div className='w-11 h-11 rounded-full bg-[#FFBD1A] flex items-center justify-center'>
              <Users className='text-black' size={20} />
            </div>
          </div>
          <div>
            <p className='text-4xl font-semibold text-dashboard mb-1'>
              {usersCount}
            </p>
            <p className='text-sm text-dashboard-muted font-medium'>Usuários</p>
          </div>
        </div>

        {/* Vistos */}
        <div className='bg-dashboard-card rounded-lg p-5 border border-dashboard hover:border-[#C04]/50 transition-all'>
          <div className='flex items-start justify-between mb-3'>
            <div className='w-11 h-11 rounded-full bg-[#C04] flex items-center justify-center'>
              <FileText className='text-white' size={20} />
            </div>
          </div>
          <div>
            <p className='text-4xl font-semibold text-dashboard mb-1'>
              {vistosCount}
            </p>
            <p className='text-sm text-dashboard-muted font-medium'>Vistos</p>
          </div>
        </div>

        {/* Posts */}
        <div className='bg-dashboard-card rounded-lg p-5 border border-dashboard hover:border-dashboard-hover transition-all'>
          <div className='flex items-start justify-between mb-3'>
            <div className='w-11 h-11 rounded-full bg-dashboard-hover flex items-center justify-center'>
              <BookOpen className='text-[#FFBD1A]' size={20} />
            </div>
          </div>
          <div>
            <p className='text-4xl font-semibold text-dashboard mb-1'>
              {blogPostsCount}
            </p>
            <p className='text-sm text-dashboard-muted font-medium'>Posts</p>
          </div>
        </div>

        {/* Contatos */}
        <div className='bg-dashboard-card rounded-lg p-5 border border-dashboard hover:border-[#FFBD1A]/50 transition-all'>
          <div className='flex items-start justify-between mb-3'>
            <div className='w-11 h-11 rounded-full bg-[#FFBD1A]/20 flex items-center justify-center'>
              <Mail className='text-[#FFBD1A]' size={20} />
            </div>
          </div>
          <div>
            <p className='text-4xl font-semibold text-dashboard mb-1'>
              {contactsCount}
            </p>
            <p className='text-sm text-dashboard-muted font-medium'>Contatos</p>
          </div>
        </div>

        {/* Leads */}
        <div className='bg-dashboard-card rounded-lg p-5 border border-dashboard hover:border-[#C04]/50 transition-all'>
          <div className='flex items-start justify-between mb-3'>
            <div className='w-11 h-11 rounded-full bg-[#C04] flex items-center justify-center'>
              <UserPlus className='text-white' size={20} />
            </div>
          </div>
          <div>
            <p className='text-4xl font-semibold text-dashboard mb-1'>
              {leadsCount}
            </p>
            <p className='text-sm text-dashboard-muted font-medium'>Leads</p>
          </div>
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
        <div className='bg-dashboard-card rounded-lg p-6 border border-dashboard'>
          <h3 className='font-semibold text-base mb-4 text-dashboard flex items-center gap-2'>
            <TrendingUp size={18} className='text-dashboard-muted' />
            Atividade Recente
          </h3>
          <div className='space-y-3'>
            <div className='flex items-start gap-3 pb-3 border-b border-dashboard'>
              <div className='w-8 h-8 rounded-full bg-[#FFBD1A]/20 flex items-center justify-center flex-shrink-0'>
                <Users className='text-[#FFBD1A]' size={14} />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm text-dashboard'>
                  Novo usuário cadastrado
                </p>
                <p className='text-xs text-dashboard-muted'>Há 2 horas</p>
              </div>
            </div>
            <div className='flex items-start gap-3 pb-3 border-b border-dashboard'>
              <div className='w-8 h-8 rounded-full bg-dashboard-hover flex items-center justify-center flex-shrink-0'>
                <BookOpen className='text-dashboard-muted' size={14} />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm text-dashboard'>Post publicado no blog</p>
                <p className='text-xs text-dashboard-muted'>Há 5 horas</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-8 h-8 rounded-full bg-[#C04]/20 flex items-center justify-center flex-shrink-0'>
                <FileText className='text-[#C04]' size={14} />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm text-dashboard'>
                  Visto atualizado: EB-2 NIW
                </p>
                <p className='text-xs text-dashboard-muted'>Ontem às 15:30</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className='bg-dashboard-card rounded-lg p-6 border border-dashboard'>
          <h3 className='font-semibold text-base mb-4 text-dashboard'>
            Resumo do Site
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-dashboard-muted'>
                Total de Usuários
              </span>
              <span className='text-sm font-medium text-dashboard'>
                {usersCount}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-dashboard-muted'>
                Tipos de Vistos Ativos
              </span>
              <span className='text-sm font-medium text-dashboard'>
                {vistosCount}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-dashboard-muted'>
                Posts Publicados
              </span>
              <span className='text-sm font-medium text-dashboard'>
                {blogPostsCount}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-dashboard-muted'>
                Contatos Recebidos
              </span>
              <span className='text-sm font-medium text-dashboard'>
                {contactsCount}
              </span>
            </div>
            <div className='pt-4 border-t border-dashboard'>
              <a
                href='/'
                target='_blank'
                className='text-sm text-[#FFBD1A] hover:text-dashboard font-medium transition-colors'
              >
                Visitar site →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
