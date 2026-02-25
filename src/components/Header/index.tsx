'use client';

import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Search,
  Settings,
  VenusAndMars,
  Check,
  ChevronDown,
  LayoutGrid,
} from 'lucide-react';
import { useNavigation } from '@/context';
import Image from 'next/image';
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
  const {
    isTheaterMode,
    isDarkMode,
    toggleTheme,
  } = useNavigation();
  const [
    isSettingsOpen,
    setIsSettingsOpen,
  ] = useState(false);
  const [
    isMobileSearchOpen,
    setIsMobileSearchOpen,
  ] = useState(false);
  const [
    isGenderMenuOpen,
    setIsGenderMenuOpen,
  ] = useState(false);
  const [
    isCategoriesOpen,
    setIsCategoriesOpen,
  ] = useState(false);

  const settingsRef =
    useRef<HTMLDivElement>(null);
  const genderRef =
    useRef<HTMLDivElement>(null);
  const categoriesRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      const target =
        event.target as Node;
      if (
        settingsRef.current &&
        !settingsRef.current.contains(
          target,
        )
      )
        setIsSettingsOpen(false);
      if (
        genderRef.current &&
        !genderRef.current.contains(
          target,
        )
      )
        setIsGenderMenuOpen(false);
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(
          target,
        )
      )
        setIsCategoriesOpen(false);
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
    <header
      className={clsx(
        'bg-white/90 dark:bg-dark-900/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5 transition-all duration-500 shadow-sm relative z-120',
        isTheaterMode
          ? '-translate-y-full'
          : 'translate-y-0',
      )}>
      {/* LINHA 1: LOGO, BUSCA E ACTIONS */}
      <div className='container mx-auto max-w-450 h-20 px-4 flex items-center justify-between gap-4'>
        <Link
          href='/'
          className={clsx(
            'items-center gap-2 select-none min-w-fit',
            isMobileSearchOpen
              ? 'hidden md:flex'
              : 'flex',
          )}>
          <div className='flex items-baseline group'>
            <span className='text-3xl font-black tracking-tighter text-rose-500 group-hover:text-rose-400 transition-colors'>
              DotF4p
            </span>
            <span className='text-xl font-bold text-slate-500 dark:text-slate-400'>
              .com
            </span>
          </div>
        </Link>

        <div
          className={clsx(
            'flex-1 max-w-5xl items-center justify-center gap-3 sm:gap-6 px-2',
            isMobileSearchOpen
              ? 'flex'
              : 'hidden md:flex',
          )}>
          <div className='hidden md:block shrink-0'>
            <Image
              src='/ml.png'
              alt='AD L'
              width={150}
              height={50}
              className='h-12 w-auto'
            />
          </div>
          <div className='flex-1 w-full max-w-2xl'>
            <SearchBar
              isMobileOpen={
                isMobileSearchOpen
              }
              onCloseMobile={() =>
                setIsMobileSearchOpen(
                  false,
                )
              }
            />
          </div>
          <div className='hidden md:block shrink-0'>
            <Image
              src='/bda.png'
              alt='AD R'
              width={150}
              height={50}
              className='h-12 w-auto'
            />
          </div>
        </div>

        <div
          className={clsx(
            'items-center gap-3 relative min-w-fit',
            isMobileSearchOpen
              ? 'hidden md:flex'
              : 'flex',
          )}>
          <button
            className='md:hidden p-2 text-gray-500 bg-gray-100 dark:bg-white/5 rounded-full'
            onClick={() =>
              setIsMobileSearchOpen(
                true,
              )
            }>
            <Search className='w-5 h-5' />
          </button>

          {/* GENDER MENU (MANTIDO CONFORME SOLICITADO) */}
          <div
            className='relative hidden sm:block'
            ref={genderRef}>
            <button
              onClick={() =>
                setIsGenderMenuOpen(
                  !isGenderMenuOpen,
                )
              }
              className='p-2.5 rounded-xl border text-rose-500 border-rose-100 dark:border-rose-900/20'>
              <VenusAndMars className='w-5 h-5' />
            </button>
            {isGenderMenuOpen && (
              <div className='absolute right-0 top-full mt-4 w-48 bg-white dark:bg-dark-900 rounded-xl shadow-xl border border-gray-200 dark:border-white/10 z-50 py-2 animate-in fade-in slide-in-from-top-2'>
                <button className='w-full text-left px-4 py-2 text-sm flex items-center justify-between'>
                  <span>Hétero</span>
                  <Check className='w-4 h-4 text-rose-500' />
                </button>
              </div>
            )}
          </div>

          {/* SETTINGS MENU */}
          <div
            className='relative'
            ref={settingsRef}>
            <button
              onClick={() =>
                setIsSettingsOpen(
                  !isSettingsOpen,
                )
              }
              className='p-2.5 rounded-xl border border-transparent text-gray-500 dark:text-gray-400'>
              <Settings className='w-5 h-5' />
            </button>
            {isSettingsOpen && (
              <div className='absolute right-0 top-full mt-4 w-60 bg-white dark:bg-dark-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 z-50 p-4'>
                <div className='flex items-center justify-between text-sm font-semibold'>
                  <span>
                    Modo Noturno
                  </span>
                  <button
                    onClick={
                      toggleTheme
                    }
                    className={clsx(
                      'w-11 h-6 rounded-full relative transition-colors',
                      isDarkMode
                        ? 'bg-rose-500'
                        : 'bg-gray-200 dark:bg-gray-700',
                    )}>
                    <div
                      className={clsx(
                        'absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform',
                        isDarkMode
                          ? 'translate-x-5'
                          : 'translate-x-0',
                      )}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LINHA 2: SUB-HEADER COM CATEGORIAS REAIS */}
      <div className='hidden lg:block border-t border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-dark-950/50'>
        <div className='container mx-auto max-w-450 px-4 h-10 flex items-center relative'>
          <div
            className='relative h-full flex items-center'
            onMouseEnter={() =>
              setIsCategoriesOpen(true)
            }
            onMouseLeave={() =>
              setIsCategoriesOpen(false)
            }
            ref={categoriesRef}>
            <button
              className={clsx(
                'flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest transition-colors mr-2',
                isCategoriesOpen
                  ? 'text-rose-600'
                  : 'text-rose-500 hover:text-rose-600',
              )}>
              <LayoutGrid className='w-3.5 h-3.5' />
              Categorias
              <ChevronDown
                className={clsx(
                  'w-3.5 h-3.5 transition-transform',
                  isCategoriesOpen &&
                    'rotate-180',
                )}
              />
            </button>

            {/* DROP-DOWN COM MAP DAS CATEGORIAS REAIS */}
            {isCategoriesOpen && (
              <div className='absolute top-full left-0 w-150 bg-white dark:bg-dark-900 shadow-2xl border border-gray-100 dark:border-white/10 rounded-b-xl p-6 z-150 animate-in fade-in slide-in-from-top-2'>
                <div className='grid grid-cols-4 gap-4 max-h-100 overflow-y-auto custom-scrollbar'>
                  <Link
                    href='/categories'
                    className='col-span-4 text-[10px] font-black text-rose-500 border-b border-gray-100 dark:border-white/5 pb-2 mb-2 hover:underline'>
                    VER TODAS AS
                    CATEGORIAS (
                    {categories.length})
                    →
                  </Link>
                  {categories.map(
                    (c) => (
                      <Link
                        key={c.id}
                        href={`/category/${c.slug}`}
                        className='text-[11px] font-medium text-zinc-500 hover:text-rose-500 transition-colors truncate'>
                        {c.name}{' '}
                        <span className='text-[9px] text-zinc-400 ml-0.5'>
                          ({c.count})
                        </span>
                      </Link>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          <div className='h-4 w-px bg-zinc-300 dark:bg-white/10 mx-3' />
          {quickNav}
        </div>
      </div>
    </header>
  );
};

export default Header;
