import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  title: string;
  icon: LucideIcon;
  count?: number;
  countLabel?: string;
  buttonText?: string;
  buttonIcon?: LucideIcon;
  buttonHref?: string;
  buttonOnClick?: () => void;
  buttonVariant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

export default function DashboardHeader({
  title,
  icon: Icon,
  count,
  countLabel,
  buttonText,
  buttonIcon: ButtonIcon,
  buttonHref,
  buttonOnClick,
  buttonVariant = 'default',
  className = ''
}: DashboardHeaderProps) {
  const buttonContent = (
    <>
      {ButtonIcon && <ButtonIcon size={16} className='mr-2' />}
      {buttonText}
    </>
  );

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className='flex items-center gap-3'>
        <Icon size={24} className='text-[#FFBD1A]' />
        <h1 className='text-2xl font-semibold text-dashboard'>{title}</h1>
        {count !== undefined && (
          <span className='px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full'>
            {count} {countLabel || 'itens'}
          </span>
        )}
      </div>

      {buttonText && (
        <>
          {buttonHref ? (
            <Button
              asChild
              size="sm"
              variant={buttonVariant}
              className={buttonVariant === 'default' ? 'bg-[#0F0005] hover:bg-[#0F0005]/90 text-[#FFBD1A]' : ''}
            >
              <a href={buttonHref}>
                {buttonContent}
              </a>
            </Button>
          ) : (
            <Button
              size="sm"
              variant={buttonVariant}
              onClick={buttonOnClick}
              className={buttonVariant === 'default' ? 'bg-[#0F0005] hover:bg-[#0F0005]/90 text-[#FFBD1A]' : ''}
            >
              {buttonContent}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
