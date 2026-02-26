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
      orderBy: { id: 'asc' },
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
