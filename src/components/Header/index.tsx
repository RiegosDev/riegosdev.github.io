'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '../ThemeToggle';

export default function Header() {
  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  return (
    <header className='fixed w-full top-0 z-50 bg-emerald-50/80 dark:bg-background/80 backdrop-blur-md border-b border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center relative'>
        {/* Lado Esquerdo: Logo e Texto */}
        <div className='flex items-center gap-2 sm:gap-3'>
          {/* MOBILE: Logo como botão do Dropdown */}
          <div className='relative md:hidden flex items-center'>
            <button
              onClick={() =>
                setIsMobileMenuOpen(
                  !isMobileMenuOpen,
                )
              }
              className='focus:outline-none'
              aria-label='Abrir menu'>
              <Image
                src='/logoofc.png'
                alt='Menu Riegos.dev'
                width={40}
                height={40}
                /* Hack de contraste: Fundo escuro no Light Mode, transparente no Dark */
                className='rounded-lg dark:bg-transparent bg-slate-900 p-1 transition-all'
                priority
              />
            </button>

            {/* O Dropdown Mobile */}
            {isMobileMenuOpen && (
              <div className='absolute top-full left-0 mt-3 w-56 bg-card border border-border rounded-xl shadow-2xl flex flex-col p-2 gap-1 z-50 animate-in fade-in slide-in-from-top-4'>
                <Link
                  href='/solucoes'
                  onClick={() =>
                    setIsMobileMenuOpen(
                      false,
                    )
                  }
                  className='p-3 hover:bg-accent hover:text-accent-foreground rounded-lg text-sm font-medium transition-colors text-foreground'>
                  Soluções
                </Link>
                <Link
                  href='/automacao'
                  onClick={() =>
                    setIsMobileMenuOpen(
                      false,
                    )
                  }
                  className='p-3 hover:bg-accent hover:text-accent-foreground rounded-lg text-sm font-medium transition-colors text-foreground'>
                  Automação (n8n)
                </Link>
                <Link
                  href='/abordagem'
                  onClick={() =>
                    setIsMobileMenuOpen(
                      false,
                    )
                  }
                  className='p-3 hover:bg-accent hover:text-accent-foreground rounded-lg text-sm font-medium transition-colors text-foreground'>
                  Nossa Abordagem
                </Link>
              </div>
            )}
          </div>

          {/* DESKTOP: Logo normal apontando pra home */}
          <Link
            href='/'
            className='hidden md:block group'>
            <Image
              src='/logoofc.png'
              alt='Logo Riegos.dev'
              width={42}
              height={42}
              className='rounded-lg dark:bg-transparent bg-slate-900 p-1 group-hover:opacity-80 transition-all'
              priority
            />
          </Link>

          {/* TEXTO: Sempre aponta pra home */}
          <Link href='/'>
            <div className='text-xl sm:text-2xl font-bold tracking-tighter text-foreground hover:opacity-80 transition-opacity'>
              riegos
              <span className='text-emerald-500'>
                .dev
              </span>
            </div>
          </Link>
        </div>

        {/* Navegação Desktop */}
        <nav className='hidden md:flex gap-8 text-sm text-foreground/70 font-medium'>
          <Link
            href='/solucoes'
            className='hover:text-emerald-500 transition-colors'>
            Soluções
          </Link>
          <Link
            href='/automacao'
            className='hover:text-emerald-500 transition-colors'>
            Automação (n8n)
          </Link>
          <Link
            href='/abordagem'
            className='hover:text-emerald-500 transition-colors'>
            Nossa Abordagem
          </Link>
        </nav>

        {/* Área de Ações */}
        <div className='flex items-center gap-3 sm:gap-4'>
          <ThemeToggle />
          <button className='bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition shadow-[0_0_15px_rgba(16,185,129,0.3)]'>
            <Link
              href='/faleconosco'
              className='bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition shadow-[0_0_15px_rgba(16,185,129,0.3)]'>
              <span className='hidden sm:inline'>
                Fale com os Arquitetos
              </span>
              <span className='sm:hidden'>
                Falar Agora
              </span>
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
}
