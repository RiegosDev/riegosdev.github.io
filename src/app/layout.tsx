import '@/app/globals.css';
import { Suspense } from 'react';
import RootClientLayout from './RootClientLayout';
import Header from '@/components/Header';
import QuickCategoriesNav from '@/components/QuickCategoriesNav';
import { getCategoriesWithStatsAction } from '@/actions/category.actions';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🚀 BUSCA REAL: Pegamos as categorias do Prisma no Servidor para evitar waterfalls no cliente [cite: 2026-02-16]
  const allCategories =
    await getCategoriesWithStatsAction();

  return (
    <html lang='pt-br' className='dark'>
      <body className='antialiased bg-sky-200 dark:bg-dark-950 transition-colors duration-300'>
        <Suspense
          fallback={
            <div className='min-h-screen bg-dark-950 animate-pulse' />
          }>
          <RootClientLayout>
            <div className='fixed top-0 left-0 right-0 z-120'>
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
