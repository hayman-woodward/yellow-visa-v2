import { YVText } from '@/components/YV';
import { Settings, Moon, Sun } from 'lucide-react';
import ThemeSwitch from './components/ThemeSwitch';
import DashboardHeader from '@/components/shared/DashboardHeader';

export default function ConfiguracoesPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardHeader
        title="Configurações"
        icon={Settings}
      />



      {/* Appearance Section */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 rounded-lg bg-[#FFBD1A]/20 flex items-center justify-center'>
            <Sun className='text-[#FFBD1A]' size={20} />
          </div>
          <div>
            <h3 className='font-semibold text-base text-dashboard'>
              Aparência
            </h3>
            <p className='text-sm text-dashboard-muted'>
              Escolha como o dashboard aparece para você
            </p>
          </div>
        </div>

        <div className='space-y-4 mt-6'>
          {/* Theme Toggle */}
          <div className='flex items-center justify-between p-4 rounded-lg bg-dashboard-hover'>
            <div className='flex items-center gap-3'>
              <Moon className='text-dashboard-muted' size={18} />
              <div>
                <p className='text-sm font-medium text-dashboard'>
                  Modo Escuro
                </p>
                <p className='text-xs text-dashboard-muted'>
                  Reduz o brilho da tela para melhor conforto visual
                </p>
              </div>
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}
