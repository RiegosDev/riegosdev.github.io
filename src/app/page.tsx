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

  // Se tiver pesquisa ou uma categoria específica selecionada, exibe VÍDEOS
  if (activeCategory || searchQuery) {
    const rawVideos =
      await getVideosAction(
        activeCategory || 'recommended',
        searchQuery,
      );

    // 1. O Filtro de Tipagem (Mapeamento Sênior)
    const videos = rawVideos.map(
      (video) => ({
        ...video,
        // Converte o objeto Date do Prisma para uma string ISO exigida pelo Front
        publishedAt:
          video.publishedAt.toISOString(),
        // Garante que se vier null do banco, o front recebe uma string vazia
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
      <div className='container mx-auto p-4 max-w-450 pb-20 mt-4'>
        <div className='mb-6'>
          <h1 className='text-2xl font-black tracking-tight flex items-center gap-2 text-white capitalize'>
            {currentCategoryName}
          </h1>
        </div>
        <VideoGrid videos={videos} />
      </div>
    );
  }

  // Se NÃO tiver categoria (Página Inicial /), exibe o HUB DE CATEGORIAS
  const categories =
    await getCategoriesWithStatsAction();

  return (
    <div className='container mx-auto p-4 max-w-450 pb-20 mt-4'>
      <div className='mb-8 border-b border-white/10 pb-4'>
        <h1 className='text-3xl font-black tracking-tight text-white'>
          Categorias Populares
        </h1>
        <p className='text-gray-400 mt-2'>
          Escolha o seu nicho favorito e
          aproveite.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
          />
        ))}
      </div>
    </div>
  );
}
