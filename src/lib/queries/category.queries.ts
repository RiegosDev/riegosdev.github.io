// /src/lib/queries/category.queries.ts
import { prisma } from '@/lib/prisma';

export const categoryQueries = {
  getCategoryName: async (
    slug: string,
    searchQuery?: string,
  ) => {
    if (searchQuery)
      return `Resultados para: "${searchQuery}"`;
    if (!slug) return 'Vídeos'; // Fallback padrão

    // 🚀 Busca o nome real da categoria direto no banco
    const category =
      await prisma.category.findUnique({
        where: { slug },
        select: { name: true }, // Otimização: trazemos só o nome
      });

    return category?.name || 'Vídeos';
  },
};
