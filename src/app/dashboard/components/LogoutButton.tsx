'use client';

import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        window.location.href = '/yv-admin';
      } else {
        console.error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className='w-full px-4 py-2 rounded-lg bg-dashboard-hover hover:bg-dashboard-border transition-colors text-sm font-medium flex items-center justify-center gap-2 text-dashboard-muted hover:text-dashboard'
    >
      <LogOut size={16} />
      Sair
    </button>
  );
}
