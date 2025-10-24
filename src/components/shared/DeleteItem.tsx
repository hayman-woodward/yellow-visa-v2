'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { YVButton } from '@/components/YV';

type DeleteItemProps = {
  itemSlug: string;
  itemName: string;
  itemType: 'visto' | 'faq' | 'blog' | 'team' | 'user';
  onDelete: (slug: string) => Promise<void>;
  onSuccess?: () => void;
  className?: string;
};

export default function DeleteItem({
  itemSlug,
  itemName,
  itemType,
  onDelete,
  onSuccess,
  className = ''
}: DeleteItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const getItemTypeLabel = () => {
    switch (itemType) {
      case 'visto': return 'visto';
      case 'faq': return 'FAQ';
      case 'blog': return 'post';
      case 'team': return 'membro';
      case 'user': return 'usuário';
      default: return 'item';
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja deletar o ${getItemTypeLabel()} "${itemName}"?`)) {
      return;
    }

    setIsDeleting(true);

    try {
      await onDelete(itemSlug);
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      // Error handling is done by the parent component
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <YVButton
      onClick={handleDelete}
      disabled={isDeleting}
      size="sm"
      className={`text-red-600 hover:bg-red-50 p-0 ${className}`}
    >
      {isDeleting ? (
        <Loader2 size={14} className='animate-spin' />
      ) : (
        <Trash2 size={14} />
      )}
    </YVButton>
  );
}
