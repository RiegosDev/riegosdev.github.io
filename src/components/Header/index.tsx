'use client';

import React, { useState } from 'react';
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

  // Estados apenas para o Mobile
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

  return (
    // 🚀 ROOT DO HEADER EM Z-50
    <header className='w-full bg-white/95 dark:bg-dark-950/95 backdrop-blur-md border-b border-gray-100 dark:border-white/5 shadow-xs relative z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16 md:h-20 gap-4'>
          {/* 🚀 LADO ESQUERDO (Hambúrguer Mobile + Logo) */}
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

          {/* 🚀 CENTRO: BUSCA DESKTOP */}
          <div className='hidden md:block flex-1 max-w-2xl'>
            <SearchBar
              isMobileOpen={false}
              onCloseMobile={() => {}}
            />
          </div>

          {/* 🚀 LADO DIREITO (Busca Mobile + Dark Mode) */}
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

      {/* OVERLAY BUSCA MOBILE */}
      {isMobileSearchOpen && (
        <div className='md:hidden absolute inset-0 bg-white dark:bg-dark-950 z-50 p-4 flex items-center animate-in fade-in zoom-in-95 duration-200'>
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

      {/* 🚀 MENU HAMBÚRGUER MOBILE */}
      {isMobileMenuOpen && (
        <div className='md:hidden fixed inset-x-0 top-16 bottom-0 bg-white dark:bg-dark-950 z-50 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200'>
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
                    {categories.length})
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
              <LayoutGrid className='w-4 h-4 text-rose-500' />
              Início
            </Link>
          </div>
        </div>
      )}

      {quickNav && (
        <div className='border-t border-gray-100 dark:border-white/5'>
          {quickNav}
        </div>
      )}
    </header>
  );
};

export default Header;
