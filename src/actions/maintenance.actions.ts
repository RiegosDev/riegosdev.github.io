// src/actions/maintenance.actions.ts
import { prisma } from '@/lib/prisma';
import { crawlCategoryAction } from './scraper.actions';

export async function refreshExistingContentAction(
  limit = 5,
) {
  console.log(
    `🧹 [MAINTENANCE] Iniciando atualização de ${limit} categorias...`,
  );

  // Como não temos updatedAt, buscamos as categorias por ordem de ID
  const categories =
    await prisma.category.findMany({
      take: limit,
      orderBy: { updatedAt: 'asc' },
    });

  for (const cat of categories) {
    try {
      console.log(
        `🔄 [MAINTENANCE] Atualizando: ${cat.slug}`,
      );
      // Passamos o slug para o scraper trabalhar
      await crawlCategoryAction(
        cat.slug,
        cat.slug,
      );
    } catch (e) {
      console.error(
        `❌ Erro na categoria ${cat.slug}:`,
        e,
      );
    }
  }

  return {
    success: true,
    processed: categories.length,
  };
}
export async function cleanBrokenVideosAction(
  limit = 50,
) {
  console.log(
    `🧹 [CLEANUP] Verificando integridade de ${limit} vídeos...`,
  );

  const videos =
    await prisma.video.findMany({
      take: limit,
      orderBy: { createdAt: 'asc' }, // Começa pelos mais antigos
    });

  let removedCount = 0;
  let current = 1;

  for (const video of videos) {
    if (!video.externalUrl) {
      current++;
      continue;
    }

    // 🚀 LOG DE PROGRESSO: Para você saber que não travou!
    console.log(
      `⏳ [${current}/${videos.length}] Checando: ${video.slug.slice(0, 30)}...`,
    );

    const controller =
      new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      5000,
    );

    try {
      const response = await fetch(
        video.externalUrl,
        {
          method: 'HEAD',
          signal: controller.signal,
        },
      );

      // Alguns sites adultos retornam 410 Gone quando o vídeo é deletado
      if (
        response.status === 404 ||
        response.status === 410
      ) {
        console.log(
          `🗑️ [REMOVING] Vídeo offline (${response.status}): ${video.slug}`,
        );
        await prisma.video.delete({
          where: { id: video.id },
        });
        removedCount++;
      } else {
        // 🚀 LOG DE SUCESSO SILENCIOSO: Mostra que passou liso
        console.log(
          `✅ [OK] Status: ${response.status}`,
        );
      }
    } catch {
      console.warn(
        `⚠️ [TIMEOUT] Site não respondeu a tempo, pulando...`,
      );
    } finally {
      clearTimeout(timeoutId);
    }

    current++;
  }

  return {
    success: true,
    removed: removedCount,
  };
}
