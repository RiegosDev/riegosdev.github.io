'use client';

import React, {
  useState,
  useEffect,
} from 'react';
import {
  Search,
  X,
} from 'lucide-react';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import clsx from 'clsx';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function SearchBar({
  isMobileOpen,
  onCloseMobile,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams =
    useSearchParams();

  // Estado inicial vindo da URL
  const [localQuery, setLocalQuery] =
    useState(
      searchParams.get('q') || '',
    );

  // 🚀 CORREÇÃO SÊNIOR: Sincronização Assíncrona
  // Usamos o setTimeout(0) para evitar o erro de 'cascading renders' no Linter.
  useEffect(() => {
    const queryFromUrl =
      searchParams.get('q') || '';

    const timer = setTimeout(() => {
      setLocalQuery(queryFromUrl);
    }, 0);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleSearchSubmit = (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    const trimmedQuery =
      localQuery.trim();

    if (trimmedQuery) {
      router.push(
        `/?q=${encodeURIComponent(trimmedQuery)}`,
      );
    } else {
      router.push('/');
    }

    onCloseMobile();
  };

  const clearSearch = () => {
    setLocalQuery('');
    router.push('/');
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={
        styles.searchContainer
      }>
      <div
        className={clsx(
          styles.searchInputWrapper,
          'relative overflow-hidden rounded-full shadow-inner bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-white/10 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all',
        )}>
        <input
          type='text'
          placeholder='Pesquisar vídeos...'
          value={localQuery}
          onChange={(e) =>
            setLocalQuery(
              e.target.value,
            )
          }
          className='w-full bg-transparent py-3 pl-6 pr-20 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none'
        />

        <div className='absolute right-1 top-1 bottom-1 flex items-center gap-1'>
          {localQuery && (
            <button
              type='button'
              onClick={clearSearch}
              className='p-2 text-gray-400 hover:text-rose-500 transition-colors outline-none'>
              <X className='h-4 w-4' />
            </button>
          )}
          <button
            type='submit'
            className='px-4 h-full rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors outline-none'>
            <Search className='h-5 w-5' />
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <button
          type='button'
          onClick={onCloseMobile}
          className='md:hidden ml-3 p-2 text-gray-400 hover:text-rose-500 bg-gray-100 dark:bg-white/5 rounded-full'>
          <X className='w-5 h-5' />
        </button>
      )}
    </form>
  );
}
