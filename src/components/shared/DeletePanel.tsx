'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { YVButton, YVTextField, YVText } from '@/components/YV';

interface DeletePanelProps {
  expanded: boolean;
  onToggle: () => void;
  onDelete: (slug: string) => Promise<void>;
  itemName: string;
  itemSlug: string;
  isDeleting: boolean;
  className?: string;
}

export function DeletePanel({
  expanded,
  onToggle,
  onDelete,
  itemName,
  itemSlug,
  isDeleting,
  className = ''
}: DeletePanelProps) {
  const [confirmText, setConfirmText] = useState('');
  const [localIsDeleting, setLocalIsDeleting] = useState(false);

  const getConfirmationText = () => {
    return `deletar ${itemName}`;
  };

  const isConfirmValid = confirmText.toLowerCase() === getConfirmationText().toLowerCase();
  const isLoading = isDeleting || localIsDeleting;

  const handleDelete = async () => {
    if (!isConfirmValid || isLoading) return;

    setLocalIsDeleting(true);
    try {
      await onDelete(itemSlug);
      setConfirmText('');
    } catch (error) {
      console.error('Erro ao deletar:', error);
    } finally {
      setLocalIsDeleting(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      <div className="px-6 py-3 h-fit">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-3 text-gray-900 hover:text-red-600 transition-colors w-full cursor-pointer hover:bg-gray-50 rounded-lg p-2"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
              <Trash2 size={14} className="text-white" />
            </div>
            <h3 className="text-base font-semibold">Deletar {itemName}</h3>
          </div>
          <div className="ml-auto">
            {expanded ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
        </button>

        {expanded && (
          <div className="space-y-4 py-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Trash2 size={12} className="text-white" />
                </div>
                <h4 className="text-base font-semibold text-gray-900">Mover para Lixeira</h4>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">Pode ser restaurado</p>
                    <p className="text-xs text-gray-600">O {itemName} será movido para a lixeira e poderá ser restaurado</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3 max-w-xs">
                <YVText className="text-xs text-gray-600">
                  Para confirmar, digite <span className="font-mono text-md bg-gray-200 px-1 rounded text-gray-700">{getConfirmationText()}</span>:
                </YVText>

                <YVTextField
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={getConfirmationText()}
                  variant="modern"
                  size="md"
                  className="w-full"
                  disabled={isLoading}
                />

                <YVButton
                  onClick={handleDelete}
                  disabled={!isConfirmValid || isLoading}
                  size="md"
                  className="w-fit bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={14} className='animate-spin' />
                      Movendo...
                    </>
                  ) : (
                    <>
                      <Trash2 size={14} />
                      Mover para Lixeira
                    </>
                  )}
                </YVButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}