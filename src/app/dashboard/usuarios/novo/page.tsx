import { YVText } from '@/components/YV';
import Link from 'next/link';
import { ArrowLeft, Shield, Mail, Lock, User } from 'lucide-react';
import UserForm from '../components/UserForm';
import UserPreview from '../components/UserPreview';

export default function NovoUsuarioPage() {
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

        <div className='mb-2'>
          <h1 className='text-2xl font-normal text-dashboard'>Novo Usuário</h1>
        </div>
        <YVText variant='small' className='text-dashboard-muted'>
          Adicione um novo administrador ao sistema
        </YVText>
      </div>

      {/* 2 Colunas */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Coluna 1 - Formulário (2/3) */}
        <div className='lg:col-span-2'>
          <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
            <UserForm />
          </div>
        </div>

        {/* Coluna 2 - Informações e Preview (1/3) */}
        <div className='flex flex-col gap-4'>
          {/* Preview Card */}
          <div className='bg-dashboard-card rounded-lg border border-dashboard p-6 flex-1'>
            <h3 className='font-semibold text-sm text-dashboard mb-4 flex items-center gap-2'>
              <User size={16} className='text-dashboard-muted' />
              Preview do Usuário
            </h3>
            <UserPreview />
          </div>

          {/* Dicas Card */}
          <div className='bg-dashboard-card rounded-lg border border-dashboard p-6 flex-1'>
            <h3 className='font-semibold text-sm text-dashboard mb-4 flex items-center gap-2'>
              <Shield size={16} className='text-dashboard-muted' />
              Dicas de Segurança
            </h3>
            <div className='space-y-3'>
              <div className='flex gap-3'>
                <Mail
                  size={14}
                  className='text-[#FFBD1A] mt-0.5 flex-shrink-0'
                />
                <div>
                  <p className='text-xs font-medium text-dashboard'>
                    Email único
                  </p>
                  <p className='text-xs text-dashboard-muted'>
                    Cada usuário deve ter um email único
                  </p>
                </div>
              </div>
              <div className='flex gap-3'>
                <Lock
                  size={14}
                  className='text-[#FFBD1A] mt-0.5 flex-shrink-0'
                />
                <div>
                  <p className='text-xs font-medium text-dashboard'>
                    Senha forte
                  </p>
                  <p className='text-xs text-dashboard-muted'>
                    Mín. 6 caracteres, 1 maiúscula e 1 caractere especial (@, #,
                    $)
                  </p>
                </div>
              </div>
              <div className='flex gap-3'>
                <Shield
                  size={14}
                  className='text-[#FFBD1A] mt-0.5 flex-shrink-0'
                />
                <div>
                  <p className='text-xs font-medium text-dashboard'>
                    Permissões
                  </p>
                  <p className='text-xs text-dashboard-muted'>
                    Escolha o nível de acesso adequado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
