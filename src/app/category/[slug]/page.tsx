import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

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

      {/* 🚀 REFACTOR: Classes Tailwind perfeitamente alinhadas com o VideoGrid da Home! */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4'>
        {category.videos.map((item) => {
          const vid = item.video;
          return (
            <a
              href={
                vid.externalUrl || '#'
              }
              target='_blank'
              rel='noopener noreferrer nofollow'
              key={vid.id}
              className='group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-pink-500 hover:shadow-[0_0_15px_rgba(219,39,119,0.3)] transition-all'>
              <div className='relative aspect-video bg-zinc-950'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className='object-cover w-full h-full group-hover:opacity-70 transition-opacity'
                />
                <div className='absolute bottom-2 right-2 bg-black/90 px-1.5 py-0.5 text-[10px] font-bold rounded text-zinc-300 z-10'>
                  {vid.duration}
                </div>
              </div>

              <div className='flex flex-col px-1 py-2'>
                <h3 className='text-sm font-semibold text-zinc-200 line-clamp-2 leading-tight group-hover:text-pink-400 transition-colors'>
                  {vid.title}
                </h3>
              </div>
            </a>
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
