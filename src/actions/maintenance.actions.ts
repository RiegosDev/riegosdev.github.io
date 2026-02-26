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

  for (const video of videos) {
    if (!video.externalUrl) continue;

    // 🚀 Lógica de Timeout para o Fetch nativo
    const controller =
      new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      5000,
    ); // 5 segundos

    try {
      // Passamos o 'signal' do controller em vez do 'timeout'
      const response = await fetch(
        video.externalUrl,
        {
          method: 'HEAD',
          signal: controller.signal,
        },
      );

      if (response.status === 404) {
        console.log(
          `🗑️ [REMOVING] Vídeo offline (404): ${video.slug}`,
        );
        await prisma.video.delete({
          where: { id: video.id },
        });
        removedCount++;
      }
    } catch {
      // 🚀 Sem o (e), o ESLint fica feliz. Cai aqui se der timeout ou a rede oscilar.
      console.warn(
        `⚠️ Erro/Timeout ao checar ${video.slug}, pulando...`,
      );
    } finally {
      // Limpa o timer da memória para a VPS não chorar
      clearTimeout(timeoutId);
    }
  }

  return {
    success: true,
    removed: removedCount,
  };
}
