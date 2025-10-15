'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { YVTitle, YVText } from '@/components/YV';
import BlogForm from '../components/BlogForm';

export default function NovoPostPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link 
          href='/dashboard/blog'
          className='p-2 rounded-lg bg-dashboard-hover hover:bg-dashboard-border transition-colors'
        >
          <ArrowLeft size={20} className='text-dashboard' />
        </Link>
        <div className='flex items-center gap-3'>
          <BookOpen size={28} className='text-[#FFBD1A]' />
          <div>
            <YVTitle variant='heading'>Novo Post do Blog</YVTitle>
            <YVText className='text-dashboard-muted'>
              Crie um novo post para o blog
            </YVText>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard'>
        <div className='p-6'>
          <BlogForm />
        </div>
      </div>
    </div>
  );
}
