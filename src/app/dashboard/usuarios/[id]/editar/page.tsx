'use client';

import { useUser } from '@/hooks/useDashboardData';
import { YVText } from '@/components/YV';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import UserForm from '../../components/UserForm';
import { useParams } from 'next/navigation';

export default function EditarUsuarioPage() {
  const params = useParams();
  const id = params.id as string;
  const { user, loading, error } = useUser(id);

  if (loading) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='w-7 h-7 bg-gray-200 rounded animate-pulse' />
          <div className='h-8 w-32 bg-gray-200 rounded animate-pulse' />
        </div>
        <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
          <div className='space-y-4'>
            <div className='h-4 w-64 bg-gray-200 rounded animate-pulse' />
            <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
            <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
            <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
            <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <YVText className='text-red-500'>Erro ao carregar usuário: {error}</YVText>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='text-center py-12'>
        <YVText className='text-dashboard-muted'>Usuário não encontrado</YVText>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <Link
          href='/dashboard/usuarios'
          className='inline-flex items-center gap-2 text-dashboard-muted hover:text-dashboard mb-4 transition-colors'
        >
          <ArrowLeft size={16} />
          <span className='text-sm font-medium'>Voltar para usuários</span>
        </Link>

        <div className='flex items-center gap-3 mb-2'>
          <Shield size={28} className='text-[#FFBD1A]' />
          <h1 className='text-2xl font-normal text-dashboard'>Editar Usuário</h1>
        </div>
        <YVText variant='small' className='text-dashboard-muted'>
          Atualize as informações do usuário
        </YVText>
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <UserForm
          defaultValues={{
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }}
          isEditing={true}
        />
      </div>
    </div>
  );
}