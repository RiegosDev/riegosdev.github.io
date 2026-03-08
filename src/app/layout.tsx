import '@/app/globals.css';
import { Suspense } from 'react';
import RootClientLayout from './RootClientLayout';
import Header from '@/components/Header';
import QuickCategoriesNav from '@/components/QuickCategoriesNav';
import { getCategoriesWithStatsAction } from '@/actions/category.actions';
import { AgeGate } from '@/components/AgeGate';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  // 🚀 FUNDAMENTAL: Define a URL base para o Next.js montar os links absolutos das imagens
  metadataBase: new URL(
    'https://dotf4p.com',
  ),
  applicationName: 'DotF4p',

  title: {
    default:
      'DotF4p.com - Your free hub for adult content!',
    template: '%s | DotF4p.com',
  },
  description:
    'Watch the best trending videos and categories with top performance and privacy.',
  keywords: [
    'free videos',
    'adult content',
    'adult hub',
    'dotf4p',
  ],

  // 🌐 OPEN GRAPH (WhatsApp, Telegram, Facebook, LinkedIn)
  openGraph: {
    title:
      'DotF4p.com - Your free hub for adult content!',
    description:
      'Watch the best trending videos and categories with top performance and privacy.',
    url: 'https://dotf4p.com',
    siteName: 'DotF4p',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://dotf4p.com/opengraph-image.png',
        width: 1200, // Ajuste para a dimensão exata da sua imagem, recomendo muito 1200x630
        height: 630,
        alt: 'DotF4p - Adult content hub',
        type: 'image/png',
      },
    ],
    // O Next.js já vai puxar o opengraph-image.png da raiz do /src/app automaticamente,
    // mas declarar o OG aqui garante que o WhatsApp leia o título e a descrição certos.
  },

  // 🐦 TWITTER / X (Também lido por alguns agregadores e o Discord)
  twitter: {
    card: 'summary_large_image', // Exige que a imagem seja o card grande (1200x630)
    title:
      'DotF4p.com - Your free hub for adult content!',
    description:
      'Watch the best trending videos and categories with top performance and privacy.',
  },
  other: {
    rating:
      'RTA-5042-1996-1400-1577-RTA',
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/', // Diz pro Google: "A raiz do site É em inglês"
      'x-default': '/', // Diz pro Google: "Pro resto do mundo todo, caia aqui!"
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🚀 Tática de Sênior: Protege o build do Docker!
  let videoCount = 0;
  try {
    videoCount =
      await prisma.video.count();
  } catch (error) {
    console.warn(
      `⚠️ Build phase: Banco de dados inacessível no momento. Ignorando contagem inicial. ${error}`,
    );
  }

  // A action getCategoriesWithStatsAction já tem try/catch internamente, então não quebra o build!
  const allCategories =
    await getCategoriesWithStatsAction();

  return (
    <html lang='en' className='dark'>
      <body className='antialiased bg-slate-200 dark:bg-dark-950 transition-colors duration-300'>
        <AgeGate />

        <Suspense
          fallback={
            <div className='min-h-screen bg-dark-950 animate-pulse' />
          }>
          <RootClientLayout>
            <div className='fixed top-0 inset-x-0 z-[100]'>
              <Header
                categories={
                  allCategories
                }
                quickNav={
                  <QuickCategoriesNav />
                }
                totalVideoCount={
                  videoCount
                }
              />
            </div>
            {children}
          </RootClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
