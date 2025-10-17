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

  const handleExcel = async () => {
    setLoading('excel');
    try {
      await onExportExcel();
    } finally {
      setLoading(null);
    }
  };

  const handleEmail = async () => {
    setLoading('email');
    try {
      await onSendEmail();
    } finally {
      setLoading(null);
    }
  };

  const handleCopy = async () => {
    setLoading('copy');
    try {
      await onCopyData();
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
          onClick={handleExcel}
          disabled={loading === 'excel'}
          className="flex items-center gap-2 py-2 cursor-pointer"
        >
          {loading === 'excel' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <FileSpreadsheet size={14} className="text-green-600" />
          )}
          <span>Baixar Excel</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={handleEmail}
          disabled={loading === 'email'}
          className="flex items-center gap-2 py-2 cursor-pointer"
        >
          {loading === 'email' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Mail size={14} className="text-blue-600" />
          )}
          <span>Mandar leads por email</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleCopy}
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