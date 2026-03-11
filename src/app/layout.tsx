import '@/app/globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider'; // Import do nosso provedor

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://riegos.dev',
  ),
  applicationName: 'Riegos.dev',
  title: {
    default:
      'Riegos.dev | Engenharia de Software e Automação',
    template: '%s | Riegos.dev',
  },
  description:
    'Desenvolvemos soluções Full Stack de alta performance e fluxos de automação com n8n para escalar sua operação.',
  keywords: [
    'Software Architecture',
    'Next.js',
    'Landing Page',
    'Automação',
    'Riegosdev',
    'n8n',
    'Clean Architecture',
    'SaaS',
    'Full Stack',
    'Arquitetura e urbanismo',
    'Engenharia',
    'Arquitetura',
    'Calculadora de rampa',
  ],
  openGraph: {
    title:
      'Riegos.dev | Engenharia de Software e Automação',
    description:
      'Engenharia de software e automação para escalar sua operação.',
    url: 'https://riegos.dev',
    siteName: 'Riegos.dev',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://riegos.dev/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Riegos.dev - Engenharia de software e automação',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Riegos.dev | Engenharia de Software e Automação',
    description:
      'Engenharia de software e automação para escalar sua operação.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Removi a classe "dark" chumbada na tag html, o next-themes controla isso agora
    <html
      lang='pt-BR'
      className='scroll-smooth'
      suppressHydrationWarning>
      <body className='antialiased bg-sky-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 min-h-screen overflow-x-hidden selection:bg-emerald-500/30 transition-colors duration-300'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange={
            false
          } // Mantém a transição suave
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
