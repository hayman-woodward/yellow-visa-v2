'use client';

import { useFaqs } from '@/hooks/useDashboardData';
import { YVText, YVSelect, YVTable, YVTableRow, YVTableCell, YVTableAvatar, YVTableBadge, YVTableActions } from '@/components/YV';
import Link from 'next/link';
import { Plus, Pencil, HelpCircle, Calendar, MoreHorizontal } from 'lucide-react';
import DeleteFaqButton from './components/DeleteFaqButton';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DashboardHeader from '@/components/shared/DashboardHeader';

export default function FaqsPage() {
  const { faqs, loading } = useFaqs();
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filtrar FAQs baseado no status selecionado
  const filteredFaqs = faqs.filter(faq => {
    if (selectedStatus === 'all') return true;
    return faq.status === selectedStatus;
  });


  return (
    <div className='space-y-4'>
      {/* Header */}
      <DashboardHeader
        title="FAQs"
        icon={HelpCircle}
        count={filteredFaqs.length}
        countLabel="FAQs"
        buttonText="Novo FAQ"
        buttonIcon={Plus}
        buttonVariant='outline'
        buttonHref="/dashboard/faqs/novo"
        className="mb-2"
      />

      {/* Filtro */}
      <div className='flex items-center gap-4 pt-2'>
        <YVSelect
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}

          options={[
            { value: 'all', label: 'Todos' },
            { value: 'published', label: 'Publicados' },
            { value: 'draft', label: 'Rascunhos' }
          ]}
          variant='modern'
          size='md'

        />
      </div>

      {/* Header da Tabela */}
      <div className='bg-white rounded-lg border border-gray-200 shadow-sm'>


        {/* Tabela com YVTable */}
        <YVTable
          headers={['FAQ', 'Título', 'Descrição', 'Perguntas', 'Status']}
          headerColSpans={['col-span-1', 'col-span-4', 'col-span-4', 'col-span-1', 'col-span-1', 'col-span-1']}
          loading={loading}
          emptyMessage="Nenhum FAQ encontrado"
          className='border-0 shadow-none rounded-none'
        >
          {filteredFaqs.length === 0 ? (
            <YVTableRow>
              <YVTableCell colSpan={6} className='text-center py-8 text-gray-500'>
                Nenhum FAQ encontrado
              </YVTableCell>
            </YVTableRow>
          ) : (
            filteredFaqs.map((faq) => (
              <YVTableRow key={faq.id} className='py-4'>
                <YVTableCell className='col-span-1'>
                  <YVTableAvatar icon={<HelpCircle size={16} />} />
                </YVTableCell>
                <YVTableCell className='col-span-4'>
                  <div className='font-medium text-gray-900 text-base'>{faq.title}</div>
                </YVTableCell>
                <YVTableCell className='col-span-4'>
                  <div className='text-sm text-gray-600 line-clamp-2'>
                    {faq.description || 'Sem descrição'}
                  </div>
                </YVTableCell>
                <YVTableCell className='col-span-1'>
                  <div className='text-sm text-gray-500'>
                    {faq.questions?.length || 0} perguntas
                  </div>
                </YVTableCell>
                <YVTableCell className='col-span-1'>
                  <YVTableBadge
                    variant={faq.status === 'published' ? 'success' : 'warning'}
                  >
                    {faq.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </YVTableBadge>
                </YVTableCell>
                <YVTableCell className='col-span-1'>
                  <YVTableActions>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className='h-8 w-8 p-0'>
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/faqs/${faq.slug}/editar`} className='flex items-center gap-2 py-1'>
                            <Pencil size={14} className='flex-shrink-0' />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <div className='flex items-center gap-2 text-red-600 cursor-pointer py-1'>
                            <DeleteFaqButton
                              faqSlug={faq.slug}
                              faqQuestion={faq.title}
                            />
                            <span>Excluir</span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </YVTableActions>
                </YVTableCell>
              </YVTableRow>
            ))
          )}
        </YVTable>
      </div>
    </div>
  );
}