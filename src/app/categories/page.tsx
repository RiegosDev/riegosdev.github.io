import { getCategoriesWithStatsAction } from '@/actions/category.actions';
import Link from 'next/link';
import {
  LayoutGrid,
  PlayCircle,
} from 'lucide-react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic'; // 🚀 Garante dados frescos do Prisma a cada acesso

// 🚀 Metadata Sênior para o Google amar essa página
export const metadata: Metadata = {
  title:
    'Todas as Categorias - DotF4p.com',
  description:
    'Explore nossa lista completa de categorias e encontre exatamente o que você procura.',
};

export default async function CategoriesPage() {
  // Busca os dados reais do banco
  const categories =
    await getCategoriesWithStatsAction();

  return (
    <div className='container mx-auto p-4 max-w-7xl pb-20'>
      {/* HEADER DA PÁGINA */}
      <div className='mb-10 border-b border-zinc-300 dark:border-white/10 pb-6'>
        <h1 className='text-4xl font-black tracking-tight text-rose-500 uppercase flex items-center gap-3'>
          <LayoutGrid className='w-8 h-8' />
          Categorias
        </h1>
        <p className='text-zinc-500 dark:text-zinc-400 mt-2 text-lg'>
          Navegue por mais de{' '}
          {categories.length} nichos
          organizados para a sua melhor
          experiência.
        </p>
      </div>

      {/* GRID DE CATEGORIAS RESPONSIVO */}
      {/*  */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className='group relative flex flex-col bg-white dark:bg-dark-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/5 hover:border-rose-500 hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-300'>
            {/* THUMBNAIL COM OVERLAY */}
            <div className='relative aspect-video overflow-hidden'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.thumbnail}
                alt={category.name}
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100'
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent' />

              {/* BADGE DE CONTAGEM */}
              <div className='absolute bottom-3 left-3 flex items-center gap-1.5 bg-rose-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg'>
                <PlayCircle className='w-3 h-3' />
                {category.count} VÍDEOS
              </div>
            </div>

            {/* INFO */}
            <div className='p-4 bg-white dark:bg-dark-900'>
              <h3 className='text-sm font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-wider group-hover:text-rose-500 transition-colors'>
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* FOOTER DA PÁGINA (SEO) */}
      {categories.length === 0 && (
        <div className='text-center py-20'>
          <p className='text-zinc-500'>
            Nenhuma categoria populada
            ainda. O robô está
            trabalhando...
          </p>
        </div>
      )}
    </div>
  );
}
