'use client';

import { HelpCircle } from 'lucide-react';
import { YVText } from '@/components/YV';
import FaqForm from '../components/FaqForm';

export default function NovoFaqPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <div className='flex items-center gap-3 mb-2'>
          <HelpCircle size={28} className='text-[#FFBD1A]' />
          <h1 className='text-2xl font-normal text-dashboard'>Novo FAQ</h1>
        </div>
        <YVText variant='small' className='text-dashboard-muted'>
          Adicione uma nova pergunta frequente
        </YVText>
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <FaqForm />
      </div>
    </div>
  );
}


