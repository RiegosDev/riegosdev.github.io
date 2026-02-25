import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin', // Segurança da área restrita
        '/api', // Evita bot batendo em rota de backend
        '/out/*', // 🛡️ Protege seu funil de CPM contra detecção de spam do Google
        '/login',
      ],
    },
    sitemap:
      'https://dotf4p.com/sitemap.xml',
  };
}
