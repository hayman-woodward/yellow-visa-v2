'use client';

import { useEffect, useState } from 'react';
import { Check, CheckCheck, RefreshCw } from 'lucide-react';
import { YVTable, YVTableRow, YVTableCell, YVSkeletonList } from '@/components/YV';
import DashboardHeader from '@/components/shared/DashboardHeader';

interface SystemLog {
  id: string;
  title: string;
  description: string | null;
  category: string;
  isRead: boolean;
  markedByUserId: string | null;
  markedByUserName: string | null;
  markedByUserAvatar: string | null;
  createdAt: string;
}

export default function UpdatesPage() {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await fetch('/api/dashboard/updates');
      const data = await response.json();
      setLogs(data.logs || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error('Erro ao buscar updates:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch('/api/dashboard/updates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchUpdates();
    } catch (error) {
      console.error('Erro ao marcar como lido:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/dashboard/updates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAllAsRead: true })
      });
      fetchUpdates();
    } catch (error) {
      console.error('Erro ao marcar todos como lido:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'há alguns minutos';
    if (hours < 24) return `há ${hours}h`;
    if (days === 1) return 'ontem';
    if (days < 7) return `há ${days} dias`;
    return date.toLocaleDateString('pt-BR');
  };

  const unreadLogs = logs.filter(log => !log.isRead);

  if (loading) {
    return <YVSkeletonList />;
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardHeader
        title="Atualizações do Sistema"
        icon={RefreshCw}
        count={unreadCount}
        countLabel={unreadCount === 1 ? 'atualização não lida' : 'atualizações não lidas'}
        buttonText={unreadCount > 0 ? 'Marcar todos como lido' : undefined}
        buttonIcon={CheckCheck}
        buttonVariant='outline'
        buttonOnClick={markAllAsRead}
      />

      {/* Tabela de Updates */}
      {logs.length > 0 && (
        <YVTable
          headers={['Título', 'Descrição', 'Data', 'Status', 'Conferido por']}
          headerColSpans={['col-span-4', 'col-span-3', 'col-span-2', 'col-span-1', 'col-span-2']}
        >
          {logs.map((log) => (
            <YVTableRow key={log.id} className='py-4'>
              <YVTableCell className='col-span-4'>
                <div className='font-medium text-gray-900 text-base'>
                  {log.title}
                  {!log.isRead && (
                    <span className='ml-2 text-xs bg-[#FFBD1A] text-[#0F0005] px-2 py-1 rounded-full font-medium'>
                      Novo
                    </span>
                  )}
                </div>
              </YVTableCell>
              <YVTableCell className='col-span-3'>
                <div className='text-sm text-gray-600'>
                  {log.description || '-'}
                </div>
              </YVTableCell>
              <YVTableCell className='col-span-2'>
                <div className='text-sm text-gray-500'>
                  {formatDate(log.createdAt)}
                </div>
              </YVTableCell>
              <YVTableCell className='col-span-1'>
                {log.isRead ? (
                  <div className='flex items-center justify-center w-8 h-8 rounded-full bg-green-100'>
                    <CheckCheck size={18} className='text-green-600' />
                  </div>
                ) : (
                  <span className='text-sm text-gray-500'>Não lido</span>
                )}
              </YVTableCell>
              <YVTableCell className='col-span-2'>
                {log.isRead ? (
                  log.markedByUserName && (
                    <div className='flex items-center gap-2'>
                      {log.markedByUserAvatar && (
                        <div className='w-7 h-7 rounded-full overflow-hidden border border-gray-300'>
                          <img
                            src={log.markedByUserAvatar}
                            alt={log.markedByUserName}
                            className='w-full h-full object-cover'
                          />
                        </div>
                      )}
                      <span className='text-sm text-gray-600'>
                        {log.markedByUserName}
                      </span>
                    </div>
                  )
                ) : (
                  <button
                    onClick={() => markAsRead(log.id)}
                    title='Marcar como lido'
                    className='w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer'
                  >
                    <Check size={18} className='text-green-600' />
                  </button>
                )}
              </YVTableCell>
            </YVTableRow>
          ))}
        </YVTable>
      )}

      {logs.length === 0 && (
        <div className='text-center py-12'>
          <div className='text-dashboard-muted mb-2'>Nenhuma atualização ainda</div>
          <p className='text-sm text-dashboard-muted'>
            As atualizações do sistema aparecerão aqui
          </p>
        </div>
      )}
    </div>
  );
}

