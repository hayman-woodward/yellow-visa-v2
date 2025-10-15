'use client';

import { YVText } from '@/components/YV';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import TeamForm from '../components/TeamForm';

export default function NovoMembroPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link
          href='/dashboard/team'
          className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
        >
          <ArrowLeft size={20} className='text-dashboard-muted' />
        </Link>
        <div>
          <div className='flex items-center gap-3 mb-2'>
            <Users size={28} className='text-[#FFBD1A]' />
            <h1 className='text-2xl font-normal text-dashboard'>Novo Membro da Equipe</h1>
          </div>
          <YVText variant='small' className='text-dashboard-muted'>
            Adicione um novo membro à equipe Yellow Visa
          </YVText>
        </div>
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <TeamForm />
      </div>
    </div>
  );
}
