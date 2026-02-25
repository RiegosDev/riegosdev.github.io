import { MetadataRoute } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // A URL base oficial do seu projeto
  const baseUrl = 'https://dotf4p.com';

  // 1. ROTAS ESTÁTICAS (A Home é a mais importante)
  const staticRoutes: MetadataRoute.Sitemap =
    [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 1.0,
      },
    ];

  try {
    // 2. ROTAS DE CATEGORIAS (O Ouro do SEO em Silo)
    const categories =
      await prisma.category.findMany({
        select: { slug: true },
      });

    const categoryRoutes: MetadataRoute.Sitemap =
      categories.map((cat) => ({
        url: `${baseUrl}/category/${cat.slug}`, // Ajuste '/category/' se a sua rota no front for diferente
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      }));

    // 3. ROTAS DE VÍDEOS (A cauda longa do SEO)
    const videos =
      await prisma.video.findMany({
        select: {
          slug: true,
          publishedAt: true,
        },
        orderBy: {
          publishedAt: 'desc',
        },
        take: 10000, // Limite seguro para não estourar a memória na geração do XML. Se passar de 50k no futuro, a gente faz paginação.
      });

    const videoRoutes: MetadataRoute.Sitemap =
      videos.map((video) => ({
        url: `${baseUrl}/video/${video.slug}`, // Ajuste '/video/' se a sua rota de player for diferente
        lastModified:
          video.publishedAt ||
          new Date(),
        changeFrequency: 'monthly', // Vídeos raramente mudam depois de postados
        priority: 0.7,
      }));

    // Retorna o array unificado, o Next.js compila em XML automaticamente
    return [
      ...staticRoutes,
      ...categoryRoutes,
      ...videoRoutes,
    ];
  } catch (error) {
    console.error(
      '🚨 [SITEMAP] Erro ao gerar rotas dinâmicas:',
      error,
    );
    // Se o banco falhar por algum motivo bizarro, ele pelo menos entrega a Home pro Google não dar erro 500
    return staticRoutes;
  }
}
