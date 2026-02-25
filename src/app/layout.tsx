import '@/app/globals.css';
import { Suspense } from 'react';
import RootClientLayout from './RootClientLayout';
import Header from '@/components/Header';
import QuickCategoriesNav from '@/components/QuickCategoriesNav';
import { getCategoriesWithStatsAction } from '@/actions/category.actions';
import { AgeGate } from '@/components/AgeGate';

export const metadata = {
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
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              />
            </div>
            {children}
          </RootClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
