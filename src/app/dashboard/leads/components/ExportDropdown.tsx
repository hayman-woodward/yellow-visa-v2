'use client';

import { useState } from 'react';
import { Download, FileSpreadsheet, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ExportDropdownProps {
  leads: any[];
  onExportExcel: () => void;
  onSendEmail: () => void;
}

export default function ExportDropdown({ leads, onExportExcel, onSendEmail }: ExportDropdownProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExportExcel = async () => {
    setIsLoading(true);
    try {
      await onExportExcel();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      await onSendEmail();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={isLoading || leads.length === 0}
          className="flex items-center gap-2"
        >
          <Download size={16} />
          {isLoading ? 'Processando...' : 'Exportar'}
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem 
          onClick={handleExportExcel}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FileSpreadsheet size={16} className="text-green-600" />
          <span>Salvar como Excel</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleSendEmail}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Mail size={16} className="text-blue-600" />
          <span>Enviar leads do dia por email</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
