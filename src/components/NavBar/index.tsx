// src/components/NavBar.tsx
'use client';

import {
  useState,
  useEffect,
} from 'react';
import {
  ChevronDown,
  Video,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { useNavigation } from '@/context';
import { getCategoriesWithStatsAction } from '@/actions/category.actions';

const NavBar: React.FC = () => {
  const { isTheaterMode } =
    useNavigation();
  const searchParams =
    useSearchParams();
  const activeCategory =
    searchParams.get('cat') ||
    'recommended';

  const [isCatOpen, setIsCatOpen] =
    useState(false);
  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);
  const [
    dbCategories,
    setDbCategories,
  ] = useState<
    {
      id: string;
      slug: string;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    getCategoriesWithStatsAction()
      .then(setDbCategories)
      .catch((err) =>
        console.error(
          'Erro ao buscar categorias do Menu:',
          err,
        ),
      );
  }, []);

  const navItems = [
    {
      label: 'Vídeos',
      href: '/?cat=recommended',
    },
  ];

  return (
    <div
      className={clsx(
        'w-full bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-white/5 relative z-40 transition-colors duration-300',
        `transition-transform duration-500 ${isTheaterMode ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`,
      )}>
      <div className='container mx-auto max-w-450'>
        {/* MOBILE TOGGLE */}
        <div className='flex md:hidden items-center justify-between px-4 py-3'>
          <span className='font-bold text-gray-800 dark:text-gray-200 capitalize'>
            {activeCategory ===
            'recommended'
              ? 'Menu'
              : activeCategory}
          </span>
          <button
            onClick={() =>
              setIsMobileMenuOpen(
                !isMobileMenuOpen,
              )
            }
            className='p-1 text-gray-600 dark:text-gray-400 hover:text-rose-500 transition-colors'>
            {isMobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>

        {/* DESKTOP MENU */}
        <div className='hidden md:flex items-center gap-6 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 flex-wrap'>
          <Link
            href='/?cat=recommended'
            className={clsx(
              'whitespace-nowrap hover:text-rose-500 transition-colors',
              `${activeCategory === 'recommended' ? 'text-rose-500' : ''}`,
            )}>
            Vídeos
          </Link>

          <div
            className='relative'
            onMouseEnter={() =>
              setIsCatOpen(true)
            }
            onMouseLeave={() =>
              setIsCatOpen(false)
            }>
            <button
              className={clsx(
                'flex items-center gap-1 whitespace-nowrap hover:text-rose-500 transition-colors py-2',
                `${isCatOpen ? 'text-rose-500' : ''}`,
              )}>
              Categorias{' '}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isCatOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isCatOpen && (
              <div className='absolute top-full left-0 pt-1 w-64 z-40'>
                <div className='bg-white dark:bg-dark-800 rounded-md shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden py-2'>
                  {dbCategories.map(
                    (cat) => (
                      <Link
                        key={cat.id}
                        href={`/?cat=${cat.slug}`}
                        onClick={() =>
                          setIsCatOpen(
                            false,
                          )
                        }
                        className={clsx(
                          `w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-3 transition-colors ${activeCategory === cat.slug ? 'text-rose-500 bg-gray-50 dark:bg-white/5' : 'text-gray-700 dark:text-gray-300'}`,
                        )}>
                        <Video className='w-4 h-4 text-gray-400' />{' '}
                        <span className='capitalize'>
                          {cat.name}
                        </span>
                      </Link>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          {navItems
            .slice(1)
            .map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className='whitespace-nowrap hover:text-rose-500 transition-colors'>
                {item.label}
              </Link>
            ))}
        </div>

        {/* MOBILE MENU (GAVETA) */}
        {isMobileMenuOpen && (
          <div className='md:hidden flex flex-col px-4 py-2 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-dark-800/50'>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() =>
                  setIsMobileMenuOpen(
                    false,
                  )
                }
                className='py-3 font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-white/5 last:border-0'>
                {item.label}
              </Link>
            ))}
            <div className='py-2 text-xs font-bold text-gray-400 uppercase tracking-widest mt-2'>
              Categorias
            </div>
            <div className='grid grid-cols-2 gap-2 mb-4'>
              {dbCategories.map(
                (cat) => (
                  <Link
                    key={cat.id}
                    href={`/?cat=${cat.slug}`}
                    onClick={() =>
                      setIsMobileMenuOpen(
                        false,
                      )
                    }
                    className={clsx(
                      `py-2 px-3 rounded-md text-sm capitalize flex items-center gap-2 ${activeCategory === cat.slug ? 'bg-rose-500/10 text-rose-500' : 'bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/5'}`,
                    )}>
                    <Video className='w-3 h-3 opacity-50' />{' '}
                    {cat.name}
                  </Link>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
