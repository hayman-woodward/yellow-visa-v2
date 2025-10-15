import { YVText } from '@/components/YV';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';
import HistoriaForm from '../components/HistoriaForm';

export default function NovaHistoriaPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <Link
          href='/dashboard/historias'
          className='inline-flex items-center gap-2 text-dashboard-muted hover:text-dashboard mb-4 transition-colors'
        >
          <ArrowLeft size={16} />
          <span className='text-sm font-medium'>Voltar para histórias</span>
        </Link>

        <div className='flex items-center gap-3 mb-2'>
          <Heart size={28} className='text-[#FFBD1A]' />
          <h1 className='text-2xl font-normal text-dashboard'>Nova História</h1>
        </div>
        <YVText variant='small' className='text-dashboard-muted'>
          Adicione uma nova história de imigração
        </YVText>
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <HistoriaForm />
      </div>
    </div>
  );
}
