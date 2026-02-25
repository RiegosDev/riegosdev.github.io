'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getVideosAction(
  categorySlug?: string, // 🚀 1º: Agora recebe categoria primeiro
  searchQuery?: string, // 🚀 2º: Agora recebe busca depois
) {
  // eslint-disable-next-line
  const whereClause: any = {};

  // 1. Lógica de Busca por Título (Global ou filtrada)
  if (searchQuery) {
    whereClause.title = {
      contains: searchQuery,
      mode: 'insensitive', // Case insensitive garantido pro Postgres
    };
  }

  // 2. Lógica de Filtro por Categoria
  // Se categorySlug for vazio (''), o Next entende que é uma busca GLOBAL e ignora este bloco
  if (
    categorySlug &&
    categorySlug !== 'recommended' &&
    categorySlug !== ''
  ) {
    whereClause.categories = {
      some: {
        category: {
          slug: categorySlug,
        },
      },
    };
  }

  return prisma.video.findMany({
    where: whereClause,
    orderBy: { publishedAt: 'desc' },
    take: 60, // Quantidade de vídeos na vitrine
  });
}
