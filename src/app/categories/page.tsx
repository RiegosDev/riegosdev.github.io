import { getCategoriesWithStatsAction } from '@/actions/category.actions';
import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'Todas as Categorias de Vídeos',
  description:
    'Explore nossa lista completa de categorias e encontre exatamente o que você procura no DotF4p.',
};

export default async function CategoriesPage() {
  const categories =
    await getCategoriesWithStatsAction();

  // 🚀 LÓGICA SÊNIOR: Agrupar por Primeira Letra
  const groupedCategories =
    categories.reduce(
      (acc, category) => {
        // Pega a primeira letra e força maiúscula
        let firstLetter = category.name
          .charAt(0)
          .toUpperCase();

        // Fallback: se começar com número ou símbolo, joga pro "#"
        if (!/[A-Z]/.test(firstLetter))
          firstLetter = '#';

        if (!acc[firstLetter])
          acc[firstLetter] = [];
        acc[firstLetter].push(category);
        return acc;
      },
      {} as Record<
        string,
        typeof categories
      >,
    );

  // Ordena o array de letras
  const alphabet = Object.keys(
    groupedCategories,
  ).sort();

  return (
    <div className='container mx-auto p-4 max-w-7xl pb-20'>
      {/* HEADER DA PÁGINA */}
      <div className='mb-6 border-b border-zinc-300 dark:border-white/10 pb-6'>
        <h1 className='text-3xl md:text-4xl font-black tracking-tight text-rose-500 uppercase flex items-center gap-3'>
          <LayoutGrid className='w-8 h-8' />
          Todas as Categorias
        </h1>
      </div>

      {/* 🚀 MENU DE ÂNCORAS A-Z (Sticky + Backdrop Blur) */}
      <div className='sticky top-16 md:top-20 z-40 bg-white/90 dark:bg-dark-950/90 backdrop-blur-md py-4 mb-10 border-b border-zinc-200 dark:border-white/10 shadow-sm'>
        <div className='flex flex-wrap justify-center gap-2'>
          {alphabet.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className='w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 font-black hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 transition-colors shadow-sm'>
              {letter}
            </a>
          ))}
        </div>
      </div>

      {/* 🚀 LISTAGEM AGRUPADA */}
      <div className='space-y-16'>
        {alphabet.map((letter) => (
          <section
            key={letter}
            id={`letter-${letter}`}
            className='scroll-mt-40'>
            {/* Título da Letra */}
            <div className='flex items-center gap-4 mb-6'>
              <h2 className='text-4xl font-black text-zinc-800 dark:text-white'>
                {letter}
              </h2>
              <div className='h-px flex-1 bg-zinc-200 dark:bg-white/10' />
            </div>

            {/* Grid de Categorias daquela letra */}
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              {groupedCategories[
                letter
              ].map((category) => (
                <Link
                  target='_blank'
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className='group flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-rose-500 transition-all'>
                  <span className='text-sm font-black text-zinc-700 dark:text-zinc-300 group-hover:text-rose-500 uppercase text-center w-full truncate'>
                    {category.name}
                  </span>
                  <span className='text-[10px] font-bold text-zinc-400 mt-1 uppercase'>
                    {category.count}{' '}
                    vídeos
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
