'use client';

import { useEffect, useState } from 'react';

export default function UserPreview() {
  const [nameInput, setNameInput] = useState('');
  const [avatarInitials, setAvatarInitials] = useState('?');

  useEffect(() => {
    // Escuta mudanças no input de nome
    const handleInput = () => {
      const input = document.getElementById('name') as HTMLInputElement;
      if (input) {
        const value = input.value.trim();
        setNameInput(value);

        // Pega as iniciais (primeira letra do primeiro e segundo nome)
        if (value) {
          const names = value.split(' ').filter((n) => n.length > 0);
          if (names.length === 1) {
            setAvatarInitials(names[0].charAt(0).toUpperCase());
          } else if (names.length >= 2) {
            const initials =
              names[0].charAt(0).toUpperCase() +
              names[1].charAt(0).toUpperCase();
            setAvatarInitials(initials);
          }
        } else {
          setAvatarInitials('?');
        }
      }
    };

    // Adiciona listener
    const input = document.getElementById('name');
    if (input) {
      input.addEventListener('input', handleInput);
    }

    return () => {
      if (input) {
        input.removeEventListener('input', handleInput);
      }
    };
  }, []);

  return (
    <div className='flex flex-col items-center text-center'>
      <div className='w-20 h-20 rounded-full bg-gradient-to-br from-[#FFBD1A] to-[#C04] flex items-center justify-center text-white text-2xl font-bold mb-3 transition-all'>
        {avatarInitials}
      </div>
      <p className='text-xs text-dashboard-muted'>
        {nameInput || 'Digite o nome para gerar o avatar'}
      </p>
    </div>
  );
}
