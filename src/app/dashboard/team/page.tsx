'use client';

import { YVTable, YVTableActions, YVTableAvatar, YVTableBadge, YVTableCell, YVTableRow } from '@/components/YV';
import DashboardHeader from '@/components/shared/DashboardHeader';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTeamMembers } from '@/hooks/useDashboardData';
import { MoreHorizontal, Pencil, Plus, Users } from 'lucide-react';
import Link from 'next/link';
import DeleteTeamButton from './components/DeleteTeamButton';

export default function TeamPage() {
  const { teamMembers, loading } = useTeamMembers();

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardHeader
        title="Equipe"
        icon={Users}
        count={teamMembers.length}
        countLabel="membros"
        buttonText="Novo Membro"
        buttonVariant='outline'
        buttonIcon={Plus}
        buttonHref="/dashboard/team/novo"
      />

      {/* Tabela com YVTable */}
      <YVTable
        headers={['Membro', 'Posição', 'Email', 'Status', 'Criado em', '']}
        headerColSpans={['col-span-3', 'col-span-3', 'col-span-3', 'col-span-1', 'col-span-1', 'col-span-1']}
        loading={loading}
        emptyMessage="Nenhum membro encontrado"
      >
        {teamMembers.map((member) => (
          <YVTableRow key={member.id} className='py-4'>
            <YVTableCell className='col-span-3'>
              <div className='flex items-center gap-4'>
                <YVTableAvatar icon={<Users size={16} />} />
                <div className='font-medium text-gray-900 text-base'>
                  {member.name}
                </div>
              </div>
            </YVTableCell>
            <YVTableCell className='col-span-3'>
              <div className='text-sm text-gray-600'>{member.position}</div>
            </YVTableCell>
            <YVTableCell className='col-span-3'>
              <div className='text-sm text-gray-500'>
                {member.email || '-'}
              </div>
            </YVTableCell>
            <YVTableCell className='col-span-1'>
              <YVTableBadge
                variant={member.status === 'published' ? 'success' : 'default'}
              >
                {member.status === 'published' ? 'Publicado' : 'Rascunho'}
              </YVTableBadge>
            </YVTableCell>
            <YVTableCell className='col-span-1'>
              <div className='text-sm text-gray-500'>
                {new Date(member.createdAt).toLocaleDateString('pt-BR')}
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
                      <Link href={`/dashboard/team/${member.slug}/editar`} className='flex items-center gap-2 py-2'>
                        <Pencil size={14} className='flex-shrink-0' />
                        <span>Editar</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <div className='flex items-center gap-2 text-red-600 cursor-pointer py-2'>
                        <DeleteTeamButton
                          memberSlug={member.slug}
                          memberName={member.name}
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