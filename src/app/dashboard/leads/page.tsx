'use client';

import { useState, useEffect } from 'react';
import { YVText, YVTitle, YVCard, YVTextField, YVSelect, YVButton, YVTable, YVTableRow, YVTableCell, YVTableAvatar, YVTableBadge, YVTableActions } from '@/components/YV';
import { Search, Filter, Download, Mail, Phone, Calendar, User, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DashboardHeader from '@/components/shared/DashboardHeader';
import LeadDetailsModal from './components/LeadDetailsModal';

interface Lead {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  source: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new': return 'info';
      case 'contacted': return 'warning';
      case 'qualified': return 'success';
      case 'converted': return 'success';
      case 'lost': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'contacted': return 'Contatado';
      case 'qualified': return 'Qualificado';
      case 'converted': return 'Convertido';
      case 'lost': return 'Perdido';
      default: return status;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'website': return 'Website';
      case 'social': return 'Redes Sociais';
      case 'referral': return 'Indicação';
      case 'ads': return 'Anúncios';
      case 'stepper': return 'Stepper';
      case 'newsletter': return 'Newsletter';
      default: return source;
    }
  };

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardHeader
        title="Leads"
        icon={User}
        count={filteredLeads.length}
        countLabel="leads"
        buttonText="Exportar"
        buttonVariant='outline'
        buttonIcon={Download}
        buttonOnClick={() => console.log('Exportar leads')}
      />

      {/* Filtros */}
      <div className='flex items-center gap-4'>
        <YVTextField
          placeholder="Buscar leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant='modern'
          size='md'
          className='flex-1 max-w-md'
        />

        <YVSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'all', label: 'Todos os Status' },
            { value: 'new', label: 'Novo' },
            { value: 'contacted', label: 'Contatado' },
            { value: 'qualified', label: 'Qualificado' },
            { value: 'converted', label: 'Convertido' },
            { value: 'lost', label: 'Perdido' }
          ]}
          variant='modern'
          size='md'
        />

        <YVSelect
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          options={[
            { value: 'all', label: 'Todas as Fontes' },
            { value: 'website', label: 'Website' },
            { value: 'social', label: 'Redes Sociais' },
            { value: 'referral', label: 'Indicação' },
            { value: 'ads', label: 'Anúncios' }
          ]}
          variant='modern'
          size='md'
        />
      </div>

      {/* Tabela com YVTable */}
      <YVTable
        headers={['Nome', 'Email', 'Telefone', 'Fonte', 'Status', 'Criado em', '']}
        headerColSpans={['col-span-3', 'col-span-3', 'col-span-2', 'col-span-1', 'col-span-1', 'col-span-1', 'col-span-1']}
        loading={loading}
        emptyMessage="Nenhum lead encontrado"
      >
        {filteredLeads.map((lead) => (
          <YVTableRow key={lead.id} className='py-4'>
            <YVTableCell className='col-span-3'>
              <div className='flex items-center gap-4'>
                <YVTableAvatar icon={<User size={16} />} />
                <div className='font-medium text-gray-900 text-base'>
                  {lead.name || 'Sem nome'}
                </div>
              </div>
            </YVTableCell>
            <YVTableCell className='col-span-3'>
              <div className='text-sm text-gray-600'>{lead.email}</div>
            </YVTableCell>
            <YVTableCell className='col-span-2'>
              <div className='text-sm text-gray-500'>
                {lead.phone || '-'}
              </div>
            </YVTableCell>
            <YVTableCell className='col-span-1'>
              <div className='text-sm text-gray-500'>
                {getSourceLabel(lead.source)}
              </div>
            </YVTableCell>
            <YVTableCell className='col-span-1'>
              <YVTableBadge variant={getStatusVariant(lead.status)}>
                {getStatusLabel(lead.status)}
              </YVTableBadge>
            </YVTableCell>
            <YVTableCell className='col-span-1'>
              <div className='text-sm text-gray-500'>
                {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
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
                  <DropdownMenuContent align="end" >             
                  
                    <DropdownMenuItem
                      className='flex items-center gap-2 py-2 cursor-pointer'
                      onClick={() => handleViewDetails(lead)}
                    >
                      <User size={14} className='flex-shrink-0' />
                      <span>Ver Detalhes</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </YVTableActions>
            </YVTableCell>
          </YVTableRow>
        ))}
      </YVTable>

      {/* Modal de Detalhes */}
      <LeadDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        lead={selectedLead}
      />
    </div>
  );
}