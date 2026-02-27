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

  title: {
    default:
      'DotF4p.com - Seu Hub gratuito de Conteúdos Adultos!',
    template: '%s | DotF4p.com',
  },
  description:
    'Acompanhe os melhores vídeos e categorias em alta com a melhor performance e privacidade.',
  keywords: [
    'vídeos gratuitos',
    'conteúdo adulto',
    'hub adulto',
    'dotf4p',
  ],

  // 🌐 OPEN GRAPH (WhatsApp, Telegram, Facebook, LinkedIn)
  openGraph: {
    title:
      'DotF4p.com - Seu Hub gratuito de Conteúdos Adultos!',
    description:
      'Acompanhe os melhores vídeos e categorias em alta com a melhor performance e privacidade.',
    url: 'https://dotf4p.com',
    siteName: 'DotF4p',
    locale: 'pt_BR',
    type: 'website',
    // O Next.js já vai puxar o opengraph-image.png da raiz do /src/app automaticamente,
    // mas declarar o OG aqui garante que o WhatsApp leia o título e a descrição certos.
  },

  // 🐦 TWITTER / X (Também lido por alguns agregadores e o Discord)
  twitter: {
    card: 'summary_large_image', // Exige que a imagem seja o card grande (1200x630)
    title:
      'DotF4p.com - Seu Hub gratuito de Conteúdos Adultos!',
    description:
      'Acompanhe os melhores vídeos e categorias em alta com a melhor performance e privacidade.',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const videoCount =
    await prisma.video.count();
  const allCategories =
    await getCategoriesWithStatsAction();

  return (
    <html lang='pt-br' className='dark'>
      <body className='antialiased bg-sky-200 dark:bg-dark-950 transition-colors duration-300'>
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
