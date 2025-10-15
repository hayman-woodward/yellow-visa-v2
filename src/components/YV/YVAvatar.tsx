'use client';

import React from 'react';
import { User } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const yvAvatarVariants = cva(
  'rounded-full flex items-center justify-center overflow-hidden',
  {
    variants: {
      size: {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base',
        xl: 'w-12 h-12 text-lg'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

interface YVAvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getBackgroundColor = (name: string) => {
  const colors = [
    'bg-[#FFBD1A]', 'bg-blue-500', 'bg-green-500', 'bg-purple-500',
    'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-orange-500'
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

const YVAvatar = ({
  src,
  name,
  size = 'md',
  className = ''
}: YVAvatarProps) => {
  const [imageError, setImageError] = React.useState(false);

  const initials = name ? getInitials(name) : 'U';
  const backgroundColor = name ? getBackgroundColor(name) : 'bg-gray-500';

  return (
    <div className={cn(yvAvatarVariants({ size }), className)}>
      {src && !imageError ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`w-full h-full ${backgroundColor} flex items-center justify-center text-white font-semibold`}>
          {name ? initials : <User size={size === 'sm' ? 12 : size === 'md' ? 16 : size === 'lg' ? 20 : 24} />}
        </div>
      )}
    </div>
  );
};

export { YVAvatar, getBackgroundColor };
