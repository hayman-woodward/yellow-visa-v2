'use client';

import { YVText } from '@/components/YV';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import VistoForm from '../components/VistoForm';

export default function NovoVistoPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Link
            href='/dashboard/vistos'
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
          >
            <ArrowLeft size={20} className='text-dashboard-muted' />
          </Link>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <FileText size={28} className='text-[#FFBD1A]' />
              <h1 className='text-2xl font-normal text-dashboard'>Novo Visto</h1>
            </div>
            <YVText variant='small' className='text-dashboard-muted'>
              Crie um novo tipo de visto
            </YVText>
          </div>
        </div>
        <div></div> {/* Espaço vazio para manter o layout */}
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <VistoForm />
      </div>
    </div>
  );
}
