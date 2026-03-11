import Home from '@/components/Home';

// REGRA DE OURO 1: Server Component puro (sem 'use client')
export const metadata = {
  title:
    'Riegos.dev | Engenharia de Software e Automação',
  description:
    'Desenvolvemos soluções Full Stack de alta performance e fluxos de automação com n8n.',
};

export default function HomePage() {
  return <Home />;
}

// para push
