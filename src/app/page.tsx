import { getVideosAction } from '@/actions/video.actions';
import { getCategoriesWithStatsAction } from '@/actions/category.actions';
import { categoryQueries } from '@/lib/queries/category.queries';
import VideoGrid from '@/components/VideoGrid';
import CategoryCard from '@/components/CategoryCard';

// Garante que a página seja sempre atualizada no servidor (Server First)
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
  // 1. ROTA DE PESQUISA OU CATEGORIA ESPECÍFICA (O usuário usou o menu/busca)
  // ============================================================================
  if (activeCategory || searchQuery) {
    const rawVideos =
      await getVideosAction(
        activeCategory || 'recommended',
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
        activeCategory || 'recommended',
        searchQuery,
      );

    return (
      <div className='container mx-auto p-4 max-w-7xl pb-20 mt-4'>
        <div className='mb-6 border-b border-zinc-800 pb-4'>
          <h1 className='text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2 text-pink-500 capitalize'>
            {currentCategoryName}
          </h1>
        </div>
        <VideoGrid videos={videos} />
      </div>
    );
  }

  // ============================================================================
  // 2. ROTA PRINCIPAL (HOME) - O Funil Perfeito
  // ============================================================================

  // 🚀 MODO SÊNIOR: Busca categorias e vídeos em paralelo para performance extrema
  const [
    categories,
    rawTrendingVideos,
  ] = await Promise.all([
    getCategoriesWithStatsAction(),
    getVideosAction('', ''), // Puxa os vídeos gerais em alta
  ]);

  // Filtro de Tipagem do Prisma pro Front-end
  const trendingVideos =
    rawTrendingVideos.map((video) => ({
      ...video,
      publishedAt:
        video.publishedAt.toISOString(),
      externalUrl:
        video.externalUrl || '',
    }));

  return (
    <div className='container mx-auto p-4 max-w-7xl pb-20 mt-4 space-y-16'>
      {/* SEÇÃO 1: CATEGORIAS EM DESTAQUE */}
      <section>
        <div className='mb-8 border-b border-zinc-800 pb-4'>
          <h1 className='text-3xl font-black tracking-tight text-white uppercase'>
            Categorias Populares
          </h1>
          <p className='text-zinc-400 mt-2 text-sm md:text-base'>
            Escolha o seu nicho favorito
            e aproveite o melhor
            conteúdo.
          </p>
        </div>

        {/* Mostra apenas as 10 maiores categorias para manter a Home limpa */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {categories
            .slice(0, 10)
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
        <div className='mb-8 border-b border-zinc-800 pb-4 flex justify-between items-end'>
          <div>
            <h2 className='text-3xl font-black tracking-tight text-pink-500 uppercase'>
              Vídeos em Alta
            </h2>
            <p className='text-zinc-400 mt-2 text-sm md:text-base'>
              Os conteúdos mais
              assistidos e atualizados
              do momento.
            </p>
          </div>
        </div>

        <VideoGrid
          videos={trendingVideos}
        />
      </section>
    </div>
  );
}
