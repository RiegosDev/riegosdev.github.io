'use client';

import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Search,
  Settings,
  ChevronDown,
  LayoutGrid,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useNavigation } from '@/context';
import Link from 'next/link';
import clsx from 'clsx';
import SearchBar from './SearchBar';

interface HeaderProps {
  quickNav?: React.ReactNode;
  categories: {
    id: string;
    name: string;
    slug: string;
    count: number;
  }[];
}

const Header: React.FC<HeaderProps> = ({
  quickNav,
  categories,
}) => {
  const { isDarkMode, toggleTheme } =
    useNavigation();

  // Estados do Mobile
  const [
    isMobileSearchOpen,
    setIsMobileSearchOpen,
  ] = useState(false);
  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);
  const [
    isMobileCatDropdownOpen,
    setIsMobileCatDropdownOpen,
  ] = useState(false);

  // 🚀 Trazendo de volta os estados do Desktop
  const [
    isCategoriesOpen,
    setIsCategoriesOpen,
  ] = useState(false);
  const categoriesRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );
    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
  }, []);

  return (
    <>
      {/* O HEADER VISUAL FICA AQUI */}
      <header className='w-full bg-white/95 dark:bg-dark-950/95 backdrop-blur-md border-b border-gray-100 dark:border-white/5 shadow-xs relative z-50'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-16 md:h-20 gap-4'>
            {/* LADO ESQUERDO */}
            <div className='flex items-center gap-2 md:gap-4'>
              <button
                onClick={() =>
                  setIsMobileMenuOpen(
                    !isMobileMenuOpen,
                  )
                }
                className='md:hidden p-1.5 text-zinc-500 hover:text-rose-500 transition-colors'>
                {isMobileMenuOpen ? (
                  <X className='w-7 h-7' />
                ) : (
                  <Menu className='w-7 h-7' />
                )}
              </button>

              <Link
                href='/'
                className='flex items-center group'>
                <div className='flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-rose-500 rounded-xl mr-2 md:mr-3 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform'>
                  <span className='text-white font-black text-lg md:text-xl'>
                    D
                  </span>
                </div>
                <span className='text-xl md:text-2xl font-black tracking-tighter text-zinc-900 dark:text-white group-hover:text-rose-500 transition-colors'>
                  DotF4p
                  <span className='text-rose-500'>
                    .com
                  </span>
                </span>
              </Link>
            </div>

            {/* CENTRO */}
            <div className='hidden md:block flex-1 max-w-2xl'>
              <SearchBar
                isMobileOpen={false}
                onCloseMobile={() => {}}
              />
            </div>

            {/* LADO DIREITO */}
            <div className='flex items-center gap-2 md:gap-4'>
              <button
                onClick={() =>
                  setIsMobileSearchOpen(
                    !isMobileSearchOpen,
                  )
                }
                className='md:hidden p-2 text-zinc-500 hover:text-rose-500 transition-colors'>
                <Search className='w-6 h-6' />
              </button>
              <button
                onClick={toggleTheme}
                className='p-2 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all'>
                <Settings
                  className={clsx(
                    'w-5 h-5 transition-transform duration-500',
                    isDarkMode &&
                      'rotate-180',
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 🚀 NOVA BARRA INFERIOR DESKTOP (Categorias + QuickNav com recuo) */}
        {quickNav && (
          <div className='border-t border-gray-100 dark:border-white/5 hidden md:block'>
            {/* md:px-8 e lg:px-12 dão aquele recuo maior na esquerda que você pediu */}
            <div className='container mx-auto px-4 md:px-8 lg:px-12'>
              <div className='flex items-center h-12'>
                {/* 🚀 BOTÃO DE CATEGORIAS DESKTOP */}
                <div
                  className='flex items-center h-full relative'
                  ref={categoriesRef}>
                  <button
                    onClick={() =>
                      setIsCategoriesOpen(
                        !isCategoriesOpen,
                      )
                    }
                    className={clsx(
                      'flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest transition-colors mr-4',
                      isCategoriesOpen
                        ? 'text-rose-500'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-rose-500',
                    )}>
                    Categorias
                    <ChevronDown
                      className={clsx(
                        'w-4 h-4 transition-transform',
                        isCategoriesOpen &&
                          'rotate-180',
                      )}
                    />
                  </button>

                  {/* 🚀 SEPARADOR VISUAL | */}
                  <div className='h-5 w-[2px] bg-zinc-200 dark:bg-white/10 mr-4 rounded-full' />

                  {/* 🚀 DROPDOWN DESKTOP */}
                  {isCategoriesOpen && (
                    <div className='absolute top-full left-0 mt-0 w-[600px] bg-white dark:bg-dark-900 shadow-2xl border border-gray-100 dark:border-white/10 rounded-b-xl p-6 z-[120] animate-in fade-in slide-in-from-top-2'>
                      <div className='grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar'>
                        <Link
                          href='/categories'
                          onClick={() =>
                            setIsCategoriesOpen(
                              false,
                            )
                          }
                          className='col-span-4 text-[10px] font-black text-rose-500 border-b border-gray-100 dark:border-white/5 pb-2 mb-2 hover:underline'>
                          VER TODAS AS
                          CATEGORIAS (
                          {
                            categories.length
                          }
                          ) →
                        </Link>
                        {categories.map(
                          (c) => (
                            <Link
                              key={c.id}
                              href={`/category/${c.slug}`}
                              onClick={() =>
                                setIsCategoriesOpen(
                                  false,
                                )
                              }
                              className='text-[11px] font-medium text-zinc-500 hover:text-rose-500 transition-colors truncate'>
                              {c.name}{' '}
                              <span className='text-[9px] text-zinc-400 ml-0.5'>
                                (
                                {
                                  c.count
                                }
                                )
                              </span>
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 🚀 O RESTO DA QUICK NAV (4k, 60fps, etc) */}
                <div className='flex-1 overflow-hidden flex items-center h-full'>
                  {quickNav}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Exibe o quickNav puro no Mobile caso precise */}
        {quickNav && (
          <div className='border-t border-gray-100 dark:border-white/5 md:hidden'>
            {quickNav}
          </div>
        )}
      </header>

      {/* MAGIA SÊNIOR: OS MENUS FICAM DE FORA DO <header> PARA FUGIR DO BACKDROP-BLUR */}

      {isMobileSearchOpen && (
        <div className='md:hidden fixed inset-0 bg-white dark:bg-dark-950 z-[100] p-4 flex items-center animate-in fade-in zoom-in-95 duration-200'>
          <SearchBar
            isMobileOpen={true}
            onCloseMobile={() =>
              setIsMobileSearchOpen(
                false,
              )
            }
          />
        </div>
      )}

      {isMobileMenuOpen && (
        <div className='md:hidden fixed inset-x-0 top-[64px] bottom-0 bg-white dark:bg-dark-950 z-[100] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200'>
          <div className='flex flex-col p-4 space-y-4'>
            <div className='border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden'>
              <button
                onClick={() =>
                  setIsMobileCatDropdownOpen(
                    !isMobileCatDropdownOpen,
                  )
                }
                className='w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-white/5 font-black uppercase text-sm text-zinc-800 dark:text-zinc-200'>
                Categorias
                <ChevronDown
                  className={clsx(
                    'w-5 h-5 transition-transform duration-300',
                    isMobileCatDropdownOpen &&
                      'rotate-180',
                  )}
                />
              </button>

              {isMobileCatDropdownOpen && (
                <div className='flex flex-col bg-white dark:bg-dark-950 animate-in slide-in-from-top-2'>
                  {categories
                    .slice(0, 8)
                    .map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        onClick={() =>
                          setIsMobileMenuOpen(
                            false,
                          )
                        }
                        className='p-4 border-t border-zinc-100 dark:border-white/5 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-rose-500 active:bg-zinc-100 dark:active:bg-white/5 transition-colors'>
                        {cat.name}
                      </Link>
                    ))}
                  <Link
                    href='/categories'
                    onClick={() =>
                      setIsMobileMenuOpen(
                        false,
                      )
                    }
                    className='p-4 border-t border-zinc-100 dark:border-white/5 text-sm font-black text-rose-500 uppercase flex items-center justify-between bg-rose-50 dark:bg-rose-500/10'>
                    Ver todas (
                    {categories.length}){' '}
                    <ChevronRight className='w-4 h-4' />
                  </Link>
                </div>
              )}
            </div>

            <Link
              href='/'
              onClick={() =>
                setIsMobileMenuOpen(
                  false,
                )
              }
              className='p-4 rounded-xl border border-zinc-200 dark:border-white/10 font-black uppercase text-sm text-zinc-800 dark:text-zinc-200 flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-white/5'>
              <LayoutGrid className='w-4 h-4 text-rose-500' />{' '}
              Início
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
