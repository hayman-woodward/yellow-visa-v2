'use client';

import { useState } from 'react';
import { Download, Mail, FileSpreadsheet, Copy, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ExportDropdownProps {
  onExportExcel: () => void;
  onSendEmail: () => void;
  onCopyData: () => void;
  isLoading?: boolean;
}

export default function ExportDropdown({ onExportExcel, onSendEmail, onCopyData, isLoading = false }: ExportDropdownProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (action: string, fn: () => Promise<void>) => {
    console.log('Dropdown action clicked:', action);
    setLoading(action);
    try {
      await fn();
    } finally {
      setLoading(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={() => handleAction('excel', onExportExcel)}
          disabled={loading === 'excel'}
          className="flex items-center gap-2 py-2 cursor-pointer"
        >
          {loading === 'excel' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <FileSpreadsheet size={14} className="text-green-600" />
          )}
          <span>Salvar como CSV</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleAction('email', onSendEmail)}
          disabled={loading === 'email'}
          className="flex items-center gap-2 py-2 cursor-pointer"
        >
          {loading === 'email' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Mail size={14} className="text-blue-600" />
          )}
          <span>Mandar leads do dia por email</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleAction('copy', onCopyData)}
          disabled={loading === 'copy'}
          className="flex items-center gap-2 py-2 cursor-pointer"
        >
          {loading === 'copy' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Copy size={14} className="text-orange-600" />
          )}
          <span>Copiar dados para clipboard</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}