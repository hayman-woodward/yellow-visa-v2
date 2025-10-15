'use client';

import { useState } from 'react';
import { Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { YVModal } from '@/components/YV';

type DeleteUserButtonProps = {
  userId: string;
  userName: string;
};

export default function DeleteUserButton({
  userId,
  userName
}: DeleteUserButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/dashboard/usuarios/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Fechar modal e recarregar página
        setIsOpen(false);
        window.location.reload();
      } else {
        const result = await response.json();
        console.error('Erro ao deletar usuário:', result.message);
        alert('Erro ao deletar usuário: ' + (result.message || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro interno do servidor');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={isDeleting}
        className='text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 cursor-pointer p-0'
        title='Deletar usuário'
      >
        {isDeleting ? (
          <Loader2 size={14} className='animate-spin' />
        ) : (
          <Trash2 size={14} />
        )}
      </button>

      <YVModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title='Deletar Usuário'
        size='sm'
        footer={
          <div className='flex items-center gap-3 w-full'>
            <button
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
              className='flex-1 px-4 py-2.5 rounded-full text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50'
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className='flex-1 px-4 py-2.5 rounded-full text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2'
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className='animate-spin' />
                  Deletando...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Deletar
                </>
              )}
            </button>
          </div>
        }
      >
        <div className='flex flex-col items-center text-center gap-4'>
          <div className='w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
            <AlertTriangle className='text-red-600' size={24} />
          </div>
          <div>
            <p className='text-gray-900 font-medium mb-1'>
              Tem certeza que deseja deletar?
            </p>
            <p className='text-sm text-gray-600'>
              O usuário <span className='font-semibold'>{userName}</span> será
              removido permanentemente do sistema.
            </p>
          </div>
        </div>
      </YVModal>
    </>
  );
}
