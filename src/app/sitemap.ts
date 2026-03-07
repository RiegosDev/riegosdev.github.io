import { MetadataRoute } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dotf4p.com';

  // 1. ROTAS ESTÁTICAS (A Home)
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
        url: `${baseUrl}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      }));

    // 🚀 ALERTA SÊNIOR: Rotas de vídeos (/video/[slug]) removidas para evitar
    // erro 404 e suicídio de SEO. O foco é rankear Categorias e a Home.

    return [
      ...staticRoutes,
      ...categoryRoutes,
    ];
  } catch (error) {
    console.error(
      '🚨 [SITEMAP] Erro ao gerar rotas dinâmicas:',
      error,
    );
    return staticRoutes;
  }
}
