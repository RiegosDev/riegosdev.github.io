import Link from 'next/link';
import { getCategoriesWithStatsAction } from '@/actions/category.actions';
import clsx from 'clsx';

export default async function QuickCategoriesNav() {
  // Puxa as categorias ordenadas por relevância direto do banco
  const categories =
    await getCategoriesWithStatsAction();

  // Pega só o Top 5
  const topCategories =
    categories.slice(0, 5);

  return (
    <nav className='flex items-center gap-4 md:gap-6 overflow-hidden'>
      {topCategories.map(
        (cat, index) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className={clsx(
              'text-[11px] md:text-xs font-bold text-zinc-500 hover:text-rose-500 uppercase tracking-widest transition-colors whitespace-nowrap',
              // Lógica Responsiva Sênior:
              index >= 3 &&
                'hidden sm:block', // Mostra a partir da 4ª no SM
              index >= 6 &&
                'hidden md:block', // Mostra a partir da 7ª no MD
              index >= 9 &&
                'hidden xl:block', // Mostra a partir da 10ª no XL
            )}>
            {cat.name}
          </Link>
        ),
      )}
    </nav>
  );
}
