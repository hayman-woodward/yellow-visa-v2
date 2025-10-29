'use client';

import { YVButton, YVLogo } from '@/components/YV';
import HeaderMenu from '@/components/layout/header';
import { menuData } from '@/components/layout/header/data';
import type { VistoSummary } from '@/lib/actions/vistos';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SmartComecarButton from '@/components/shared/SmartComecarButton';

export default function YVHeader({ vistos, disableComecarButton = false }: { vistos?: VistoSummary[]; disableComecarButton?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll da página quando menu mobile estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Fecha o menu automaticamente em qualquer navegação
  useEffect(() => {
    if (!pathname) return;
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  const menuItems = [
    { label: 'Vistos e Destinos', hasDropdown: true, isVistosMenu: true },
    // { label: 'Dicas e Notícias', hasDropdown: true, isDicasMenu: true },
    // { label: 'Guia do imigrante', href: '/guia-do-imigrante' },
    { label: 'Sobre a Yellow Visa', href: '/sobre' }
  ];

  // Dados dinâmicos para vistos
  const dynamicVistosData = (() => {
    const baseData = menuData.vistosDestinos;
    if (!vistos || vistos.length === 0) return baseData;
    const firstColumn = baseData[0];
    const otherColumns = baseData.slice(1);
    const dynamicFirst = {
      ...firstColumn,
      href: firstColumn.href || '/vistos', // Garantir que href seja preservado ou usar fallback
      items: vistos.map((v) => ({ id: v.slug, label: v.label, href: `/vistos/${v.slug}` }))
    };
    return [dynamicFirst, ...otherColumns];
  })();

  const handleSubmenuToggle = (submenu: string) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const handleBackToMain = () => {
    setActiveSubmenu(null);
  };

  return (
    <header className={`${isScrolled ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className='max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 z-50'>
        <nav className='flex items-center justify-between py-5'>
          {/* Logo */}
          <Link href='/'>
            <YVLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex '>
            <HeaderMenu items={menuItems} vistos={vistos} />
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center gap-2 sm:gap-4'>
            {/* Login Button - Hidden on mobile */}
            <div className='hidden lg:flex items-center gap-2 sm:gap-4'>
              {/* <YVButton href='/yv-admin'>
                <YVIcon name='user' />
                Log in
              </YVButton> */}

              <SmartComecarButton
                variant='secondary'
                disabled={disableComecarButton}
                className={disableComecarButton ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Comece agora
              </SmartComecarButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if (!isMenuOpen) setActiveSubmenu(null);
              }}
              className='lg:hidden text-[#0F0005] hover:text-[#C60540] transition-colors p-1 pr-5'
            >
              <svg
                width='30'
                height='30'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_1029_11296)'>
                  <path
                    d='M2 4.66667C2 4.29848 2.29848 4 2.66667 4H6.66667C7.03487 4 7.33333 4.29848 7.33333 4.66667C7.33333 5.03486 7.03487 5.33333 6.66667 5.33333H2.66667C2.29848 5.33333 2 5.03486 2 4.66667Z'
                    fill='#0F0005'
                  />
                  <path
                    d='M2.66667 7.33333C2.29848 7.33333 2 7.6318 2 8C2 8.36813 2.29848 8.66667 2.66667 8.66667H13.3333C13.7015 8.66667 14 8.36813 14 8C14 7.6318 13.7015 7.33333 13.3333 7.33333H2.66667Z'
                    fill='#0F0005'
                  />
                  <path
                    d='M2 11.3333C2 10.9651 2.29848 10.6667 2.66667 10.6667H13.3333C13.7015 10.6667 14 10.9651 14 11.3333C14 11.7015 13.7015 12 13.3333 12H2.66667C2.29848 12 2 11.7015 2 11.3333Z'
                    fill='#0F0005'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_1029_11296'>
                    <rect width='16' height='16' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className='lg:hidden fixed inset-0 z-50 bg-black/50'
            onClick={() => {
              setIsMenuOpen(false);
              setActiveSubmenu(null);
            }}
          >
            <div
              className='fixed right-0 top-0 h-full w-full bg-white shadow-xl overflow-y-auto overflow-x-hidden'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header */}
              <div className='flex justify-between items-center px-6 py-4'>
                <span className='text-gray-600 font-medium'></span>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveSubmenu(null);
                  }}
                  className='w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 transition-colors'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12 4L4 12M4 4L12 12'
                      stroke='#0F0005'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <div className='px-6 space-y-2'>
                {!activeSubmenu ? (
                  // Menu principal
                  menuItems.map((item, index) => (
                    <div key={index}>
                      {item.hasDropdown ? (
                        <button
                          onClick={() => handleSubmenuToggle(item.label)}
                          className='flex items-center justify-between text-gray-800 hover:text-[#C60540] transition-colors py-[10px] md:py-3 w-full text-left'
                        >
                          <span className='text-[22px]'>{item.label}</span>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M6 12L10 8L6 4'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </button>
                        ) : (
                         <Link
                            href={item.href || '#'}
                            className='flex items-center justify-between text-gray-800 hover:text-[#C60540] transition-colors py-3'
                            onClick={() => {
                              setIsMenuOpen(false);
                              setActiveSubmenu(null);
                            }}
                          >
                          <span className='text-[22px]'>{item.label}</span>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M6 12L10 8L6 4'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  ))
                ) : (
                  // Submenu
                  <div>
                    {/* Header do submenu */}
                    <div className='flex items-center py-3 mb-4'>
                      <button
                        onClick={handleBackToMain}
                        className='mr-4 p-1 hover:bg-gray-100 rounded'
                      >
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M10 12L6 8L10 4'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                      <span className='text-[22px] font-medium'>{activeSubmenu}</span>
                    </div>

                    {/* Itens do submenu */}
                    <div className='space-y-3'>
                      {activeSubmenu === 'Vistos e Destinos' && 
                        dynamicVistosData.map((column, index) => (
                          <div key={column.id} className={`${index > 0 ? 'mt-12' : 'mb-6'}`}>
                            {column.href ? (
                              <Link
                                href={column.href}
                                className='block text-base font-semibold text-gray-800 mb-3 hover:text-[#C60540] transition-colors cursor-pointer'
                                onClick={(e) => {
                                  console.log('Clicked on column:', column.title, column.href);
                                  setIsMenuOpen(false);
                                  setActiveSubmenu(null);
                                }}
                              >
                                {column.title}
                              </Link>
                            ) : (
                              <h3 className='text-base font-semibold text-gray-800 mb-3'>
                                {column.title}
                              </h3>
                            )}
                            <div className='space-y-2'>
                              {column.items?.map((item) => (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  className='flex items-center justify-between text-gray-600 hover:text-[#C60540] transition-colors py-2'
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setActiveSubmenu(null);
                                  }}
                                >
                                  <span className='text-[18px]'>{item.label}</span>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M6 12L10 8L6 4'
                                      stroke='currentColor'
                                      strokeWidth='1.5'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                    />
                                  </svg>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))
                      }
                      
                      {/* {activeSubmenu === 'Dicas e Notícias' && 
                        menuData.dicasNoticias.map((column) => (
                          <div key={column.id} className='mb-6'>
                            <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                              {column.title}
                            </h3>
                            <div className='space-y-2'>
                              {column.items?.map((item) => (
                                <a
                                  key={item.id}
                                  href={item.href}
                                  className='flex items-center justify-between text-gray-600 hover:text-[#C60540] transition-colors py-2'
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <span className='text-[18px]'>{item.label}</span>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M6 12L10 8L6 4'
                                      stroke='currentColor'
                                      strokeWidth='1.5'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                    />
                                  </svg>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))
                      } */}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className='absolute bottom-20 left-6 right-6'>
                <div className='w-full'>                  
                  <SmartComecarButton
                    variant='secondary'
                    disabled={disableComecarButton}
                    className={`w-full justify-center ${disableComecarButton ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Comece agora
                  </SmartComecarButton>                  
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
