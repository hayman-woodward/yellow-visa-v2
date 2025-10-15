import React from 'react';
import Link from 'next/link';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { YVText } from '@/components/YV';

interface EditPageHeaderProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  backHref: string;
  backLabel?: string;
  className?: string;
}

export default function EditPageHeader({
  title,
  subtitle,
  icon: Icon,
  backHref,
  backLabel = 'Voltar',
  className = ''
}: EditPageHeaderProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Link
        href={backHref}
        className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
        title={backLabel}
      >
        <ArrowLeft size={20} className='text-dashboard-muted' />
      </Link>
      <div>
        <div className='flex items-center gap-3 mb-2'>
          <Icon size={28} className='text-[#FFBD1A]' />
          <h1 className='text-2xl font-normal text-dashboard'>{title}</h1>
        </div>
        {subtitle && (
          <YVText variant='small' className='text-dashboard-muted'>
            {subtitle}
          </YVText>
        )}
      </div>
    </div>
  );
}
