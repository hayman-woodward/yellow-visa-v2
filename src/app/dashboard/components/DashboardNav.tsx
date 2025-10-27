'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { YVText } from '@/components/YV';
import { LayoutDashboard, Users, FileText, Heart, MapPin, UserCheck, HelpCircle, BookOpen, UserPlus, RefreshCw } from 'lucide-react';

const menuItems = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Visão Geral',
    exact: true
  }
];

const cmsItems = [
  {
    href: '/dashboard/blog',
    icon: BookOpen,
    label: 'Blog'
  },
  {
    href: '/dashboard/vistos',
    icon: FileText,
    label: 'Vistos'
  },
  {
    href: '/dashboard/historias',
    icon: Heart,
    label: 'Histórias'
  },
  {
    href: '/dashboard/destinos',
    icon: MapPin,
    label: 'Destinos'
  },
  // {
  //   href: '/dashboard/team',
  //   icon: UserCheck,
  //   label: 'Equipe'
  // },
  {
    href: '/dashboard/faqs',
    icon: HelpCircle,
    label: 'FAQs'
  }
];

const adminItems = [
  {
    href: '/dashboard/usuarios',
    icon: Users,
    label: 'Usuários'
  },
  {
    href: '/dashboard/leads',
    icon: UserPlus,
    label: 'Leads'
  }
];

export function DashboardNav() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch('/api/dashboard/updates');
      const data = await response.json();
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error('Erro ao buscar updates:', error);
    }
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };


  return (
    <nav className='flex-1 p-4'>
      <ul className='space-y-1'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={true}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative ${active
                  ? 'bg-dashboard-hover text-dashboard'
                  : 'text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover'
                  }`}
              >
                {active && (
                  <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FFBD1A] rounded-r-full' />
                )}
                <Icon size={20} />
                <span className='font-medium'>{item.label}</span>
              </Link>
            </li>
          );
        })}

        {/* Updates no menu */}
        <li>
          <Link
            href='/dashboard/updates'
            prefetch={true}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative ${
              isActive('/dashboard/updates')
                ? 'bg-dashboard-hover text-dashboard'
                : 'text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover'
            }`}
          >
            {isActive('/dashboard/updates') && (
              <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FFBD1A] rounded-r-full' />
            )}
            <RefreshCw size={20} />
            <span className='font-medium'>Atualizações</span>
            {unreadCount > 0 && (
              <span className='ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
        </li>

        <li className='pt-4 pb-2'>
          <YVText className='text-dashboard-muted text-xs font-bold px-4 opacity-60'>
            CONTEÚDO (CMS)
          </YVText>
        </li>

        {cmsItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={true}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative ${active
                  ? 'bg-dashboard-hover text-dashboard'
                  : 'text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover'
                  }`}
              >
                {active && (
                  <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FFBD1A] rounded-r-full' />
                )}
                <Icon size={20} />
                <span className='font-medium'>{item.label}</span>
              </Link>
            </li>
          );
        })}

        <li className='pt-4 pb-2'>
          <YVText className='text-dashboard-muted text-xs font-bold px-4 opacity-60'>
            ADMIN
          </YVText>
        </li>

        {adminItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={true}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative ${active
                  ? 'bg-dashboard-hover text-dashboard'
                  : 'text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover'
                  }`}
              >
                {active && (
                  <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FFBD1A] rounded-r-full' />
                )}
                <Icon size={20} />
                <span className='font-medium'>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function DashboardSettingsLink() {
  const pathname = usePathname();
  const active = pathname.startsWith('/dashboard/configuracoes');

  return (
    <div className='px-4 pb-4'>
      <Link
        href='/dashboard/configuracoes'
        prefetch={true}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative ${active
          ? 'bg-dashboard-hover text-dashboard'
          : 'text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover'
          }`}
      >
        {active && (
          <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FFBD1A] rounded-r-full' />
        )}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' />
          <circle cx='12' cy='12' r='3' />
        </svg>
        <span className='font-medium'>Configurações</span>
      </Link>
    </div>
  );
}
