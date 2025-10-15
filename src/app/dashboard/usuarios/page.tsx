'use client';

import { useUsuarios } from '@/hooks/useDashboardData';
import { YVText, YVTable, YVTableRow, YVTableCell, YVTableAvatar, YVTableBadge, YVTableActions } from '@/components/YV';
import Link from 'next/link';
import { Plus, Pencil, Users, Shield, MoreHorizontal } from 'lucide-react';
import DeleteUserButton from './components/DeleteUserButton';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DashboardHeader from '@/components/shared/DashboardHeader';

export default function UsuariosPage() {
  const { usuarios, loading, error } = useUsuarios();

  if (error) {
    return (
      <div className='text-center py-12'>
        <YVText className='text-red-500'>
          Erro ao carregar usuários: {error}
        </YVText>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardHeader
        title="Usuários"
        icon={Users}
        count={usuarios.length}
        countLabel="usuários"
        buttonText="Novo Usuário"
        buttonIcon={Plus}
        buttonVariant='outline'
        buttonHref="/dashboard/usuarios/novo"
      />

      {/* Tabela com YVTable */}
      <YVTable
        headers={['Usuário', 'Email', 'Função', 'Criado em', '']}
        headerColSpans={['col-span-3', 'col-span-3', 'col-span-2', 'col-span-3', 'col-span-1']}
        loading={loading}
        emptyMessage="Nenhum usuário encontrado"
      >
        {usuarios.map((usuario) => (
          <YVTableRow key={usuario.id} className='py-4'>
            <YVTableCell className='col-span-3'>
              <div className='flex items-center gap-4'>
                <YVTableAvatar icon={<Users size={16} />} />
                <div className='font-medium text-gray-900 text-base'>{usuario.name}</div>
              </div>
            </YVTableCell>
            <YVTableCell className='col-span-3'>
              <div className='text-sm text-gray-600'>{usuario.email}</div>
            </YVTableCell>
            <YVTableCell className='col-span-2'>
              <YVTableBadge
                variant={
                  usuario.role === 'super_admin' ? 'info' :
                    usuario.role === 'admin' ? 'default' :
                      usuario.role === 'content_creator' ? 'success' : 'default'
                }
              >
                <Shield size={10} className='mr-1' />
                {usuario.role === 'super_admin'
                  ? 'Super Admin'
                  : usuario.role === 'content_creator'
                    ? 'Criador de Conteúdo'
                    : usuario.role}
              </YVTableBadge>
            </YVTableCell>
            <YVTableCell className='col-span-3'>
              <div className='text-sm text-gray-500'>
                {new Date(usuario.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </YVTableCell>
            <YVTableCell className='col-span-1'>
              <YVTableActions>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className='h-8 w-8 p-0 ml-auto'>
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/usuarios/${usuario.id}/editar`} className='flex items-center gap-2 py-2'>
                        <Pencil size={14} className='flex-shrink-0' />
                        <span>Editar</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <div className='flex items-center gap-2 text-red-600 cursor-pointer py-2'>
                        <DeleteUserButton
                          userId={usuario.id}
                          userName={usuario.name}
                        />
                        <span>Excluir</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </YVTableActions>
            </YVTableCell>
          </YVTableRow>
        ))}
      </YVTable>
    </div>
  );
}