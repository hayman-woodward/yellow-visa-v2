import { YVText } from '@/components/YV';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import DestinoForm from '../components/DestinoForm';

export default function NovoDestinoPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <Link
          href='/dashboard/destinos'
          className='inline-flex items-center gap-2 text-dashboard-muted hover:text-dashboard mb-4 transition-colors'
        >
          <ArrowLeft size={16} />
          <span className='text-sm font-medium'>Voltar para destinos</span>
        </Link>

        <div className='flex items-center gap-3 mb-2'>
          <MapPin size={28} className='text-[#FFBD1A]' />
          <h1 className='text-2xl font-normal text-dashboard'>Novo Destino</h1>
        </div>
        <YVText variant='small' className='text-dashboard-muted'>
          Adicione um novo destino ao sistema
        </YVText>
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <DestinoForm />
      </div>
    </div>
  );
}
