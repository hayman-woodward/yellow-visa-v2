'use client';

import { useState } from 'react';
import { User, Loader2 } from 'lucide-react';
import { YVUploadImg } from '@/components/YV';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange?: (avatar: string) => void;
}

export default function AvatarUpload({ 
  currentAvatar, 
  onAvatarChange 
}: AvatarUploadProps) {
  const [avatar, setAvatar] = useState(currentAvatar || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarChange = async (url: string) => {
    setAvatar(url);
    onAvatarChange?.(url);
    
    // Salvar automaticamente
    setIsSaving(true);
    try {
      const response = await fetch('/api/dashboard/profile/avatar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: url })
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar avatar');
      }

      const data = await response.json();
      console.log('Avatar salvo:', data.message);
    } catch (error) {
      console.error('Erro ao salvar avatar:', error);
      alert('Erro ao salvar avatar. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='space-y-4'>
      {/* Avatar Preview */}
      <div className='flex items-center gap-4'>
        <div className='relative w-16 h-16 rounded-full overflow-hidden border-2 border-dashboard-border'>
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className='w-full h-full object-cover object-center'
            />
          ) : (
            <div className='w-full h-full bg-dashboard-hover flex items-center justify-center'>
              <User className='text-dashboard-muted' size={24} />
            </div>
          )}
        </div>
        
        <div>
          <p className='text-sm font-medium text-dashboard'>
            {avatar ? 'Avatar atual' : 'Nenhum avatar'}
          </p>
          <p className='text-xs text-dashboard-muted'>
            Use o upload abaixo para alterar sua foto
          </p>
        </div>
      </div>

      {/* Upload Component */}
      <div className='max-w-md'>
        <YVUploadImg
          value={avatar}
          onChange={handleAvatarChange}
          placeholder="https://exemplo.com/avatar.jpg"
          className=""
        />
      </div>

      {/* Status de salvamento */}
      {isSaving && (
        <div className='flex items-center gap-2'>
          <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
          <p className='text-xs text-orange-500 font-medium'>
            Salvando avatar...
          </p>
        </div>
      )}
      
      {/* Status quando salvo */}
      {!isSaving && avatar && (
        <div className='flex items-center gap-2'>
          <p className='text-xs text-green-500 font-medium'>
            ✓ Avatar salvo
          </p>
        </div>
      )}

      {/* Upload Info */}
      <div className='text-xs text-dashboard-muted'>
        <p>• Formatos aceitos: JPG, PNG, GIF</p>
        <p>• Tamanho máximo: 1MB</p>
        <p>• Recomendado: 200x200px</p>
      </div>
    </div>
  );
}
