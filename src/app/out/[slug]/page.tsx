import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import RedirectTimer from './RedirectTimer';
import VideoGrid from '@/components/VideoGrid'; // Reutilizando seu componente de grid

const prisma = new PrismaClient();

interface OutPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OutPage({
  params,
}: OutPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 1. Busca o vídeo atual e suas categorias para encontrar relacionados
  const video =
    await prisma.video.findUnique({
      where: { slug },
      include: {
        categories: {
          select: { categoryId: true },
        },
      },
    });

  if (!video || !video.externalUrl) {
    return notFound();
  }

  // 2. Busca Vídeos Sugeridos (Relacionados por categoria)
  const categoryIds =
    video.categories.map(
      (c) => c.categoryId,
    );

  const rawSuggested =
    await prisma.video.findMany({
      where: {
        categories: {
          some: {
            categoryId: {
              in: categoryIds,
            },
          },
        },
        NOT: { id: video.id }, // Não sugerir o próprio vídeo
      },
      take: 8, // Grid de 2 linhas no desktop
      orderBy: { publishedAt: 'desc' },
    });

  // Mapeamento para o formato do VideoGrid
  const suggestedVideos =
    rawSuggested.map((v) => ({
      ...v,
      publishedAt:
        v.publishedAt.toISOString(),
      externalUrl: v.externalUrl || '',
    }));

  return (
    <div className='flex flex-col items-center min-h-screen bg-zinc-950 text-white p-4 md:p-8'>
      {/* 🚀 ESPAÇO CPM 1: Banner Topo */}
      <div className='w-full max-w-4xl h-24 bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-10 rounded-lg'>
        <span className='text-zinc-600 font-bold tracking-widest'>
          AD SPOT (728x90)
        </span>
      </div>

      {/* BOX DE REDIRECIONAMENTO */}
      <div className='w-full max-w-2xl bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-800 text-center mb-16'>
        <h1 className='text-2xl md:text-3xl font-black mb-4 text-rose-500 uppercase tracking-tight'>
          Preparando seu vídeo...
        </h1>
        <p className='text-zinc-400 mb-8 leading-relaxed'>
          Você está sendo redirecionado
          para assistir: <br />
          <span className='text-white font-bold text-lg'>
            &quot;{video.title}&quot;
          </span>
        </p>

        <RedirectTimer
          targetUrl={video.externalUrl}
        />
      </div>

      {/* 🔞 SEÇÃO DE RETENÇÃO: SUGESTÕES INTELIGENTES */}
      <div className='w-full max-w-6xl'>
        <div className='flex items-center justify-between mb-6 border-b border-zinc-800 pb-4'>
          <h2 className='text-xl md:text-2xl font-black text-white uppercase tracking-tighter'>
            Mudou de ideia? Veja estes
            também:
          </h2>
          <span className='text-rose-500 text-xs font-bold px-2 py-1 bg-rose-500/10 rounded'>
            RECOMENDADOS
          </span>
        </div>

        <VideoGrid
          videos={suggestedVideos}
        />
      </div>

      {/* 🚀 ESPAÇO CPM 2: Banner Rodapé */}
      <div className='w-full max-w-4xl h-60 bg-zinc-900 border border-zinc-800 flex items-center justify-center mt-16 rounded-lg'>
        <span className='text-zinc-600 font-bold tracking-widest'>
          AD SPOT (NATIVE/CPA)
        </span>
      </div>
    </div>
  );
}
