import { cn } from '@/lib/utils';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
  disabled?: boolean;
}

interface YVBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  disabled?: boolean;
}

const YVBreadcrumbs = ({ items, className, disabled }: YVBreadcrumbsProps) => {
  return (
    <div className={cn('text-orange-500', className)}>
      <nav className='flex items-center text-sm font-heading'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='14'
          viewBox='0 0 12 14'
          fill='none'
          className='mr-2 opacity-40'
        >
          <path
            d='M0 14H3.42857L12 0H9.42857C8.89812 0 8.40749 0.267213 8.14286 0.700055L0 14Z'
            className='fill-current'
          />
        </svg>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-[15px] md:text-[14px] hover:opacity-80 uppercase font-semibold ${
              disabled ? 'pointer-events-none' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export { YVBreadcrumbs };
