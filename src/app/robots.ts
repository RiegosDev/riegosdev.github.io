import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Se no futuro criarmos um /admin, a gente coloca o disallow: '/admin' aqui
    },
    sitemap:
      'https://riegos.dev/sitemap.xml',
  };
}
