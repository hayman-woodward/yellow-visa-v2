import { YVIcon } from '@/components/YV';
import VistosDestinosMenu from './VistosDestinosMenu';
import type { VistoSummary } from '@/lib/actions/vistos';
import DicasNoticiasMenu from './DicasNoticiasMenu';
import Link from 'next/link';

interface MenuItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
  isVistosMenu?: boolean;
  isDicasMenu?: boolean;
}

interface HeaderMenuProps {
  items: MenuItem[];
  className?: string;
  vistos?: VistoSummary[];
}

export default function HeaderMenu({ items, className = '', vistos }: HeaderMenuProps) {
  return (
    <div className={`flex items-center space-x-8 ${className}`}>
      {items.map((item, index) => (
        <div key={index} >
          {item.hasDropdown ? (
            item.isVistosMenu ? (
              <VistosDestinosMenu vistos={vistos}>
                <button className='flex items-center gap-1 text-[#0F0005] hover:text-[#C60540] transition-colors font-bold text-[13px] leading-[18px] tracking-[-0.5px] cursor-pointer'>
                  {item.label}
                  <YVIcon name='small-caret-down' />
                </button>
              </VistosDestinosMenu>
            ) : item.isDicasMenu ? (
              <DicasNoticiasMenu>
                <button className='flex items-center gap-1 text-[#0F0005] hover:text-[#C60540] transition-colors font-bold text-[13px] leading-[18px] tracking-[-0.5px] cursor-pointer'>
                  {item.label}
                  <YVIcon name='small-caret-down' />
                </button>
              </DicasNoticiasMenu>
            ) : (
              <button className='flex items-center gap-1 text-[#0F0005] hover:text-[#C60540] transition-colors font-bold text-[13px] leading-[18px] tracking-[-0.5px]'>
                {item.label}
                <YVIcon name='small-caret-down' />
              </button>
            )
          ) : (
            <Link
              href={item.href!}
              className='text-[#0F0005] hover:text-[#C60540] transition-colors font-bold text-[13px] leading-[18px] tracking-[-0.5px]'
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
