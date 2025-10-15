'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, File } from 'lucide-react';
import { YVTitle, YVText } from '@/components/YV';
import PageForm from '../components/PageForm';

export default function NovaPagePage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link 
          href='/dashboard/pages'
          className='p-2 rounded-lg bg-dashboard-hover hover:bg-dashboard-border transition-colors'
        >
          <ArrowLeft size={20} className='text-dashboard' />
        </Link>
        <div className='flex items-center gap-3'>
          <File size={28} className='text-[#FFBD1A]' />
          <div>
            <YVTitle variant='heading'>Nova Página</YVTitle>
            <YVText className='text-dashboard-muted'>
              Crie uma nova página dinâmica
            </YVText>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard'>
        <div className='p-6'>
          <PageForm />
        </div>
      </div>
    </div>
  );
}
