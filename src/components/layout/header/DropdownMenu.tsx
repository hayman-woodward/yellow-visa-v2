import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { YVText } from '@/components/YV';

interface DropdownItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  isSubtitle?: boolean;
}

interface DropdownColumn {
  title: string;
  href?: string;
  items: DropdownItem[];
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  columns: DropdownColumn[];
  className?: string;
}

const DropdownMenu = ({
  trigger,
  columns,
  className = ''
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setTimeout(() => setIsVisible(false), 200);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Limpa timeout ao desmontar
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    // Limpa timeout anterior se existir
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    // Delay para dar tempo do usuário navegar para o dropdown
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => setIsVisible(false), 200);
    }, 200);
  };

  return (
    <div className='relative w-full'>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='cursor-pointer'
      >
        {trigger}
      </div>

      {isVisible && (
        <div
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'fixed top-16 left-0 right-0 z-50 bg-white shadow-xl mt-3 pb-1 lg:pt-12',
            'transition-all duration-200 ease-in-out',
            isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2 pointer-events-none',
            className
          )}
        >
          <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 '>
            <div className='flex gap-10 items-start'>
              {/* Imagem à esquerda */}
              <div className='w-1/3 flex-shrink-0'>
                <div className='w-[289px] xl:w-[389px] h-[386px] xl:h-[516px] bg-gray-200 overflow-hidden'>
                  <Image
                    src='/imgs/vistos-e-destinos-dropdown.jpg'
                    alt='Imigração'
                    width={389}
                    height={516}
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>

              {/* Menu à direita */}
              <div className='flex-1 flex gap-6'>
                {columns.map((column, columnIndex) => (
                  <div key={columnIndex} className='flex-1'>
                    {column.href ? (
                      <Link
                        href={column.href}
                        className='block font-extrabold pb-3 text-[#0F0005] hover:text-[#C60540] transition-colors duration-150'
                      >
                        {column.title}
                      </Link>
                    ) : (
                      <YVText className='font-extrabold pb-3'>
                        {column.title}
                      </YVText>
                    )}
                    <ul className='space-y-4 pt-3 gap-4 pb-3'>
                      {column.items.map((item) => (
                        <li key={item.id} className='max-w-[240px]'>
                          {item.isSubtitle ? (
                            <div className='py-1'>
                              <YVText
                                variant='small'
                                className='text-gray-900 !font-semibold text-sm uppercase tracking-wide'
                              >
                                {item.label}
                              </YVText>
                            </div>
                          ) : (
                            <a
                              href={item.href}
                              className='flex items-center justify-between group hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 -my-2 transition-colors duration-150'
                            >
                              <YVText
                                variant='small'
                                className='text-gray-700 group-hover:text-gray-900 font-medium text-base'
                              >
                                {item.label}
                              </YVText>
                              <svg
                                className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-150'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M9 5l7 7-7 7'
                                />
                              </svg>
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
