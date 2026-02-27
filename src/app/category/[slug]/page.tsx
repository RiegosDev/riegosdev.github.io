import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import VideoCard from '@/components/VideoCard';
import { VideoItem } from '@/models'; // 🚀 Importamos o Model para tipar certinho

const prisma = new PrismaClient();

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps) {
  const resolvedParams = await params;
  const category =
    await prisma.category.findUnique({
      where: {
        slug: resolvedParams.slug,
      },
    });

  if (!category)
    return {
      title: 'Categoria não encontrada',
    };

  return {
    title: `${category.name} - Vídeos Gratuitos e em Alta`,
    description: `Assista aos melhores vídeos da categoria ${category.name} em alta qualidade no DotF4p.com.`,
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const category =
    await prisma.category.findUnique({
      where: { slug },
      include: {
        videos: {
          include: {
            video: true,
          },
          orderBy: {
            video: {
              publishedAt: 'desc',
            },
          },
          take: 40,
        },
      },
    });

  if (!category) {
    return notFound();
  }

  return (
    <div className='min-h-screen bg-zinc-950 text-white p-4 md:p-8'>
      <header className='mb-8 border-b border-zinc-800 pb-4'>
        <h1 className='text-3xl md:text-4xl font-black text-pink-500 uppercase tracking-wider'>
          {category.name}
        </h1>
        <p className='text-zinc-400 mt-2 text-sm'>
          Exibindo os vídeos mais
          recentes para a categoria{' '}
          {category.name.toLowerCase()}.
        </p>
      </header>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4'>
        {category.videos.map((item) => {
          const vid = item.video;

          // 🚀 O MAPEMENTO SÊNIOR: Ajusta a diferença entre Prisma e Front-end
          const mappedVideo: VideoItem =
            {
              ...vid,
              publishedAt: String(
                vid.publishedAt,
              ), // Resolve o erro do Date -> String
              externalUrl:
                vid.externalUrl ||
                undefined, // Resolve o erro de null -> undefined
            };

          return (
            <VideoCard
              key={mappedVideo.id}
              video={mappedVideo}
            />
          );
        })}
      </div>

      {category.videos.length ===
        40 && (
        <div className='mt-12 flex justify-center'>
          <button className='px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors'>
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  );
}
