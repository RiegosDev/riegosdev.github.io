import { getVideosAction } from '@/actions/video.actions';
import { getCategoriesWithStatsAction } from '@/actions/category.actions';
import { categoryQueries } from '@/lib/queries/category.queries';
import VideoGrid from '@/components/VideoGrid';
import CategoryCard from '@/components/CategoryCard';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    cat?: string;
    q?: string;
  }>;
}

export default async function Page({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const activeCategory = params.cat;
  const searchQuery = params.q;

  // ============================================================================
  // 1. ROTA DE PESQUISA OU CATEGORIA ESPECÍFICA
  // ============================================================================
  if (activeCategory || searchQuery) {
    const rawVideos =
      await getVideosAction(
        activeCategory || '', // 🚀 CORREÇÃO: Busca global se não houver categoria
        searchQuery,
      );

    const videos = rawVideos.map(
      (video) => ({
        ...video,
        publishedAt:
          video.publishedAt.toISOString(),
        externalUrl:
          video.externalUrl || '',
      }),
    );

    const currentCategoryName =
      categoryQueries.getCategoryName(
        activeCategory || '',
      );

    return (
      <main className='container mx-auto p-4 max-w-450 pb-20'>
        <div className='mb-8 border-b border-zinc-300 dark:border-white/10 pb-4'>
          <h1 className='text-3xl font-black tracking-tight text-rose-500 uppercase'>
            {searchQuery
              ? `Resultados Para: "${searchQuery}"`
              : currentCategoryName}
          </h1>
        </div>
        <VideoGrid videos={videos} />
      </main>
    );
  }

  // ============================================================================
  // 2. HOME PADRÃO (Categorias e Trending)
  // ============================================================================
  const [categories, trendingVideos] =
    await Promise.all([
      getCategoriesWithStatsAction(),
      getVideosAction('', ''),
    ]);

  const videos = trendingVideos
    .slice(0, 15) // 🚀 REDUÇÃO: Apenas 15 vídeos em alta
    .map((video) => ({
      ...video,
      publishedAt:
        video.publishedAt.toISOString(),
      externalUrl:
        video.externalUrl || '',
    }));

  return (
    <main className='container mx-auto p-4 max-w-450 space-y-16 pb-20'>
      {/* SEÇÃO 1: CATEGORIAS POPULARES */}
      <section>
        <div className='mb-8 border-b border-zinc-300 dark:border-white/10 pb-4'>
          <h1 className='text-3xl font-black tracking-tight text-rose-500 uppercase'>
            Categorias Populares
          </h1>
          <p className='text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base'>
            Escolha o seu nicho favorito
            e aproveite o melhor
            conteúdo.
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {categories
            .slice(0, 50) // 🚀 AUMENTO: Agora exibindo 50 categorias
            .map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}
        </div>
      </section>

      {/* SEÇÃO 2: VÍDEOS EM ALTA */}
      <section>
        <div className='mb-8 border-b border-zinc-300 dark:border-white/10 pb-4 flex justify-between items-end'>
          <div>
            <h2 className='text-3xl font-black tracking-tight text-rose-500 uppercase'>
              Vídeos em Alta
            </h2>
            <p className='text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base'>
              Os conteúdos mais
              assistidos e atualizados
              do momento.
            </p>
          </div>
        </div>
        <VideoGrid videos={videos} />
      </section>
    </main>
  );
}
