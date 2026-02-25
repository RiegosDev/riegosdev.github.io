'use client';

import React from 'react';
import { NavigationProvider } from '@/context';

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      {/* Removemos o <NavBar /> e a div fixa daqui para evitar duplicação. 
         O Header agora é gerenciado pelo layout.tsx para permitir Server Components.
      */}
      <div className='min-h-screen bg-sky-200 dark:bg-dark-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300'>
        {/* pt-20 ou pt-32 dependendo da altura do seu Header para o conteúdo não ficar por baixo */}
        <main className='pt-20 md:pt-32 min-h-screen'>
          {children}
        </main>
      </div>
    </NavigationProvider>
  );
}
