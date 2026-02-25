// src/components/NavBar/index.tsx
'use client';

import {
  useState,
  useEffect,
} from 'react';
import {
  ChevronDown,
  Video,
} from 'lucide-react'; // 🚀 Removidos Menu e X, pois não tem mobile aqui mais
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
        // 🚀 CORREÇÃO SÊNIOR: hidden md:block (Some no mobile!) e z-30 seguro.
        'hidden md:block w-full bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-white/5 relative z-30 transition-colors duration-300',
        `transition-transform duration-500 ${isTheaterMode ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`,
      )}>
      <div className='container mx-auto max-w-362.5'>
        {/* DESKTOP MENU (Única coisa que sobrou, mobile foi arrancado) */}
        <div className='flex items-center gap-6 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 flex-wrap'>
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

            {/* DROPDOWN DESKTOP DA NAVBAR */}
            {isCatOpen && (
              <div className='absolute top-full left-0 pt-1 w-64 z-40 animate-in fade-in slide-in-from-top-2'>
                <div className='bg-white dark:bg-dark-800 rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden py-2'>
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
                        <Video className='w-4 h-4 text-gray-400 opacity-50' />{' '}
                        <span className='capitalize font-bold text-[13px]'>
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
      </div>
    </div>
  );
};

export default NavBar;
