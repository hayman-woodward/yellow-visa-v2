'use client';

import { useEffect, useState } from 'react';
import { YVButton } from '@/components/YV';
import { getSmartComecarUrl } from '@/lib/utils/smartUrl';

interface SmartComecarButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * Botão inteligente "Começar" que:
 * - Usa UTM de campanha se já estiver salvo
 * - Usa UTM manual do site se não houver campanha
 */
export default function SmartComecarButton({
  children = 'Comece agora',
  variant = 'secondary',
  className = '',
  disabled = false,
  onClick,
}: SmartComecarButtonProps) {
  const [url, setUrl] = useState('/comecar');

  useEffect(() => {
    // Gerar URL inteligente no cliente
    setUrl(getSmartComecarUrl());
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <YVButton
      variant={variant}
      href={disabled ? '#' : url}
      disabled={disabled}
      className={className}
      onClick={handleClick}
    >
      {children}
    </YVButton>
  );
}

