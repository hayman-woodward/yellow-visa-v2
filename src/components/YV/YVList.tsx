import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type YVListProps = {
  children: ReactNode;
  className?: string;
  headers?: string[];
  compact?: boolean;
};

export function YVList({ children, className, headers, compact = true }: YVListProps) {
  if (compact) {
    return (
      <div className={cn('bg-white rounded-lg border border-gray-200 shadow-sm', className)}>
        {headers && (
          <div className='border-b border-gray-200'>
            <div className='grid grid-cols-6 gap-4 px-4 py-3'>
              {headers.map((header, i) => (
                <div key={i} className='text-sm font-semibold text-gray-900'>
                  {header}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='divide-y divide-gray-200'>{children}</div>
      </div>
    );
  }

  // Versão original (legacy)
  return (
    <div className={cn('space-y-2', className)}>
      {headers && (
        <div className='grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-2 text-xs font-medium text-dashboard-muted uppercase tracking-wide'>
          {headers.map((header, i) => (
            <div key={i}>{header}</div>
          ))}
        </div>
      )}
      <div className='space-y-2'>{children}</div>
    </div>
  );
}

type YVListItemProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function YVListItem({ children, className, onClick }: YVListItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-dashboard-card rounded-lg border border-dashboard px-4 py-3',
        'hover:border-[#FFBD1A]/50 transition-colors duration-150',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

type YVListContentProps = {
  avatar?: ReactNode;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  meta?: Array<{ label: string; value: string | number }>;
  actions?: ReactNode;
};

export function YVListContent({
  avatar,
  title,
  subtitle,
  badge,
  meta,
  actions
}: YVListContentProps) {
  return (
    <div className='grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center'>
      {/* Avatar + Title */}
      <div className='flex items-center gap-3 min-w-0'>
        {avatar && <div className='flex-shrink-0'>{avatar}</div>}
        <span className='font-medium text-dashboard text-sm truncate'>
          {title}
        </span>
      </div>

      {/* Subtitle (email, descrição, etc) */}
      {subtitle && (
        <span className='text-sm text-dashboard-muted truncate'>
          {subtitle}
        </span>
      )}

      {/* Badge */}
      {badge && <div className='flex-shrink-0'>{badge}</div>}

      {/* Meta (data, etc) */}
      {meta && meta.length > 0 && (
        <div className='text-sm text-dashboard-muted'>
          {meta.map((item, i) => (
            <span key={i}>{item.value}</span>
          ))}
        </div>
      )}

      {/* Actions */}
      {actions && <div className='flex items-center gap-2'>{actions}</div>}
    </div>
  );
}

// Avatar Component
type YVListAvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
};

export function YVListAvatar({
  src,
  alt,
  fallback,
  className
}: YVListAvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || 'Avatar'}
        className={cn('w-9 h-9 rounded-full object-cover', className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'w-9 h-9 rounded-full bg-[#FFBD1A] flex items-center justify-center text-[#0F0005] font-bold text-sm',
        className
      )}
    >
      {fallback || '?'}
    </div>
  );
}

// Badge Component
type YVListBadgeProps = {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
};

export function YVListBadge({
  children,
  variant = 'default',
  className
}: YVListBadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };

  return (
    <span
      className={cn(
        'px-2 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
