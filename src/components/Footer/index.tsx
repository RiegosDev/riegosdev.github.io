import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t border-border bg-emerald-50/80 dark:bg-card pt-16 pb-8'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12'>
        {/* Coluna 1 */}
        <div className='space-y-4'>
          <h4 className='font-bold text-foreground mb-6'>
            riegos.dev
          </h4>
          <ul className='space-y-3 text-sm text-muted-foreground'>
            <li>
              <Link
                href='/abordagem'
                className='hover:text-emerald-500 transition-colors'>
                Sobre nós
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='hover:text-emerald-500 transition-colors'>
                Nosso Blog
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='hover:text-emerald-500 transition-colors'>
                Cases de Sucesso
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 2 */}
        <div className='space-y-4'>
          <h4 className='font-bold text-foreground mb-6'>
            Soluções
          </h4>
          <ul className='space-y-3 text-sm text-muted-foreground'>
            <li>
              <Link
                href='/solucoes'
                className='hover:text-emerald-500 transition-colors'>
                Desenvolvimento Next.js
              </Link>
            </li>
            <li>
              <Link
                href='/automacao'
                className='hover:text-emerald-500 transition-colors'>
                Automação com n8n
              </Link>
            </li>
            <li>
              <Link
                href='/solucoes'
                className='hover:text-emerald-500 transition-colors'>
                Refatoração de Legado
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3 */}
        <div className='space-y-4'>
          <h4 className='font-bold text-foreground mb-6'>
            Legal
          </h4>
          <ul className='space-y-3 text-sm text-muted-foreground'>
            <li>
              <Link
                href='/termos'
                className='hover:text-emerald-500 transition-colors'>
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link
                href='/privacidade'
                className='hover:text-emerald-500 transition-colors'>
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 4 */}
        <div className='space-y-4'>
          <h4 className='font-bold text-foreground mb-6'>
            Pronto para escalar?
          </h4>
          <p className='text-sm text-muted-foreground mb-4'>
            Agende uma call técnica para
            mapearmos seus gargalos.
          </p>
          <div className='bg-background border border-border p-4 rounded-xl flex items-center justify-between'>
            <Link
              href='/faleconosco'
              className='bg-background border border-border p-4 rounded-xl flex items-center justify-between group hover:border-emerald-500/50 transition-colors'>
              <span className='text-sm font-semibold text-foreground group-hover:text-emerald-500 transition-colors'>
                Fale conosco
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <button className='bg-emerald-600 group-hover:bg-emerald-500 text-white p-2 rounded-lg transition'>
                &rarr;
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 pt-8 border-t border-border text-center text-sm text-muted-foreground'>
        © 2026 Riegos.dev - Arquitetura
        de Software e Automação. Todos
        os direitos reservados.
      </div>
    </footer>
  );
}
