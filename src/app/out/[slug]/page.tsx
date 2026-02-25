import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Image from 'next/image'; // 🚀 Mantendo a otimização do Next.js
import RedirectTimer from './RedirectTimer';
import VideoGrid from '@/components/VideoGrid';
import {
  formatISODuration,
  getEmbedContent,
} from '@/utils/utils'; // 🚀 Nova Utils Sênior

const prisma = new PrismaClient();

interface OutPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * 🚀 SEO METADATA: Títulos dinâmicos para indexação
 */
export async function generateMetadata({
  params,
}: OutPageProps) {
  const resolvedParams = await params;
  const video =
    await prisma.video.findUnique({
      where: {
        slug: resolvedParams.slug,
      },
      select: { title: true },
    });

  if (!video)
    return {
      title: 'Vídeo não encontrado',
    };

  return {
    title: `Assistindo: ${video.title}`,
  };
}

export default async function OutPage({
  params,
}: OutPageProps) {
  const { slug } = await params;

  // 1. Busca o vídeo e categorias relacionadas
  const video =
    await prisma.video.findUnique({
      where: { slug },
      include: {
        categories: {
          select: { categoryId: true },
        },
      },
    });

  if (!video || !video.externalUrl)
    return notFound();

  // 🚀 2. JSON-LD: Dados Estruturados com ISO 8601 [cite: 2026-02-16]
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: `Assista ao vídeo ${video.title} no DotF4p.com - Seu hub gratuito de conteúdos adultos.`,
    thumbnailUrl: [video.thumbnail],
    uploadDate:
      video.publishedAt.toISOString(),
    duration: formatISODuration(
      video.duration,
    ), // 🚀 Utilizando o novo formato ISO
    contentUrl: video.externalUrl,
    embedUrl: getEmbedContent(
      video.externalUrl,
    ), // 🚀 Gerando URL de player real
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: {
        '@type':
          'https://schema.org/WatchAction',
      },
      userInteractionCount:
        video.views || 0,
    },
  };

  // 3. Sugestões de Retenção
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
        NOT: { id: video.id },
      },
      take: 8,
      orderBy: { publishedAt: 'desc' },
    });

  const suggestedVideos =
    rawSuggested.map((v) => ({
      ...v,
      publishedAt:
        v.publishedAt.toISOString(),
      externalUrl: v.externalUrl || '',
    }));

  return (
    <main className='flex flex-col items-center min-h-screen bg-zinc-950 text-white p-4'>
      {/* 🚀 Injeção do Schema para o Google [cite: 2026-02-16] */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            videoSchema,
          ),
        }}
      />

      {/* 🔞 FAKE PLAYER UI */}
      <div className='relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 mb-8 group'>
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          priority
          className='object-cover opacity-30 blur-sm'
          sizes='(max-width: 1200px) 100vw, 1200px'
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-6'>
          <RedirectTimer
            targetUrl={
              video.externalUrl
            }
          />
        </div>
      </div>

      {/* 🚀 SEÇÃO DE RELACIONADOS */}
      <div className='w-full max-w-6xl'>
        <div className='flex items-center justify-between mb-6 border-b border-zinc-800 pb-4'>
          <h2 className='text-xl md:text-2xl font-black text-white uppercase tracking-tighter'>
            Veja também nesta categoria:
          </h2>
        </div>
        <VideoGrid
          videos={suggestedVideos}
        />
      </div>
    </main>
  );
}
