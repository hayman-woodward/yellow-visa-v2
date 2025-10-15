import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { YVContainer } from '@/components/YV';
import { DashboardThemeProvider } from './context/ThemeContext';
import { DashboardLogo } from './components/DashboardLogo';
import { DashboardNav, DashboardSettingsLink } from './components/DashboardNav';
import { LogoutButton } from './components/LogoutButton';
import './globals.css';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Se não tiver sessão, expulsa pro login
  if (!session) {
    redirect('/yv-admin');
  }

  return (
    <DashboardThemeProvider>
      <div className='flex min-h-screen bg-dashboard-bg transition-colors'>
        {/* Sidebar */}
        <aside className='w-64 bg-dashboard-sidebar text-dashboard flex flex-col shadow-2xl border-r border-dashboard transition-colors overflow-hidden fixed left-0 top-0 h-screen'>
          {/* Logo */}
          <div className='p-6 border-b border-dashboard'>
            <DashboardLogo />
          </div>

          {/* Menu */}
          <DashboardNav />

          {/* Settings link (before user info) */}
          <DashboardSettingsLink />

          {/* User info + Logout */}
          <div className='p-4 border-t border-dashboard'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-10 h-10 rounded-full bg-[#FFBD1A] flex items-center justify-center text-black font-bold'>
                {session.name.charAt(0)}
              </div>
              <div className='flex-1 min-w-0'>
                <p className='font-medium text-sm truncate text-dashboard'>
                  {session.name}
                </p>
                <p className='text-xs text-dashboard-muted truncate'>
                  {session.email}
                </p>
              </div>
            </div>

            <LogoutButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 ml-64 bg-dashboard-bg '>
          <div className='w-full max-w-[80%] md:max-w-[1000px] lg:max-w-[1200px] xl:max-w-[1400px] py-8 mx-auto px-4 sm:px-6 md:px-5'>
            {children}
          </div>
        </main>
      </div>
    </DashboardThemeProvider>
  );
}
