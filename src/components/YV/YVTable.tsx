import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type YVTableProps = {
  children: ReactNode;
  className?: string;
  headers?: string[];
  headerColSpans?: string[];
  loading?: boolean;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage?: number;
    totalItems?: number;
  };
};

export function YVTable({
  children,
  className,
  headers,
  headerColSpans,
  loading = false,
  emptyMessage = 'Nenhum item encontrado',
  pagination
}: YVTableProps) {
  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden', className)}>
      {headers && (
        <div className='border-b border-gray-200 bg-gray-50'>
          <div className='grid grid-cols-12 gap-4 px-4 py-3'>
            {headers.map((header, i) => (
              <div key={i} className={cn('text-sm font-semibold text-gray-900', headerColSpans?.[i])}>
                {header}
              </div>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className='divide-y divide-gray-200'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='grid grid-cols-12 gap-4 px-4 py-3 animate-pulse'>
              <div className='col-span-3 flex items-center gap-4'>
                <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
                <div className='h-4 w-24 bg-gray-200 rounded'></div>
              </div>
              <div className='col-span-3 flex items-center'>
                <div className='h-4 w-32 bg-gray-200 rounded'></div>
              </div>
              <div className='col-span-2 flex items-center'>
                <div className='h-5 w-20 bg-gray-200 rounded'></div>
              </div>
              <div className='col-span-3 flex items-center'>
                <div className='h-4 w-20 bg-gray-200 rounded'></div>
              </div>
              <div className='col-span-1 flex items-center justify-end'>
                <div className='w-8 h-8 bg-gray-200 rounded'></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='divide-y divide-gray-200'>{children}</div>
      )}

      {/* Paginação */}
      {pagination && pagination.totalPages > 1 && (
        <div className='border-t border-gray-200 bg-gray-50 px-4 py-3'>
          <div className='flex items-center justify-between'>
            <div className='text-sm text-gray-700'>
              {pagination.totalItems && (
                <span>
                  Mostrando {((pagination.currentPage - 1) * (pagination.itemsPerPage || 10)) + 1} a{' '}
                  {Math.min(pagination.currentPage * (pagination.itemsPerPage || 10), pagination.totalItems)} de{' '}
                  {pagination.totalItems} itens
                </span>
              )}
            </div>

            <div className='flex items-center gap-2'>
              <button
                onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className='p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronLeft size={16} />
              </button>

              <div className='flex items-center gap-1'>
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const page = i + 1;
                  const isActive = page === pagination.currentPage;

                  return (
                    <button
                      key={page}
                      onClick={() => pagination.onPageChange(page)}
                      className={cn(
                        'px-3 py-1 text-sm rounded-md border',
                        isActive
                          ? 'bg-[#FFBD1A] text-black border-[#FFBD1A]'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      )}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className='p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type YVTableRowProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function YVTableRow({ children, className, onClick }: YVTableRowProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

type YVTableCellProps = {
  children: ReactNode;
  className?: string;
  colSpan?: number;
};

export function YVTableCell({ children, className, colSpan }: YVTableCellProps) {
  return (
    <div
      className={cn('flex items-center', className)}
      style={colSpan ? { gridColumn: `span ${colSpan}` } : undefined}
    >
      {children}
    </div>
  );
}

// Avatar Component para tabelas
type YVTableAvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  icon?: ReactNode;
};

export function YVTableAvatar({
  src,
  alt,
  fallback,
  className,
  icon
}: YVTableAvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || 'Avatar'}
        className={cn('w-8 h-8 rounded-full object-cover', className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'w-8 h-8 rounded-full bg-[#FFBD1A] flex items-center justify-center text-black',
        className
      )}
    >
      {icon || fallback || '?'}
    </div>
  );
}

// Badge Component para tabelas
type YVTableBadgeProps = {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
};

export function YVTableBadge({
  children,
  variant = 'default',
  className
}: YVTableBadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-600',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// Actions Component para tabelas
type YVTableActionsProps = {
  children: ReactNode;
  className?: string;
};

export function YVTableActions({ children, className }: YVTableActionsProps) {
  return (
    <div className={cn('flex items-center justify-end gap-1 w-full', className)}>
      {children}
    </div>
  );
}
