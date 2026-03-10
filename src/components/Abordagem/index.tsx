import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Image from 'next/image';

export default function Abordagem() {
  return (
    <main className='relative min-h-screen text-foreground overflow-hidden font-sans antialiased bg-background'>
      <div className='aurora-bg'></div>
      <div className='aurora-line'></div>
      <Header />

      <div className='relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-20'>
        <section className='text-center space-y-6 max-w-3xl mx-auto mt-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-foreground'>
            Somos engenheiros, não{' '}
            <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400'>
              apenas `apagadores de
              incêndios`.
            </span>
          </h1>
          <p className='text-lg text-muted-foreground'>
            Você fala direto com os
            arquitetos da solução.
            Conheça as mentes que vão
            colocar a sua infraestrutura
            para rodar e aumentar o seu{' '}
            <b>ROI</b>&nbsp;
            <i>
              (Retorno sobre
              investimento)!
            </i>
          </p>
        </section>

        <div className='grid md:grid-cols-2 gap-8 mt-16'>
          {/* Card Daniel */}
          <div className='glass-card p-8 rounded-2xl bg-card border-border text-center space-y-4 flex flex-col items-center'>
            {/* CONTAINER PAI: Ele que faz o corte perfeito em círculo com overflow-hidden */}
            <div className='w-32 h-32 relative rounded-full overflow-hidden border-4 border-emerald-500/20'>
              <Image
                src='/DLN.jpg'
                alt='Daniel Riêgo'
                fill
                /* Apenas object-cover e a animação de zoom! Sem padding, sem rounded-lg */
                className='object-cover transition-transform duration-500 hover:scale-110'
                priority
              />
            </div>

            <h3 className='text-2xl font-bold text-foreground'>
              Daniel Riêgo
            </h3>
            <p className='text-emerald-500 font-semibold'>
              Arquiteto FullStack (BFF)
              e Automação.
            </p>
            <p className='text-muted-foreground text-sm'>
              Especialista em Next.js,
              Clean Architecture e
              fluxos complexos no n8n.
              Focado em transformar
              gargalos operacionais em
              código de alta
              performance.
            </p>
          </div>

          {/* Card Tiago */}
          <div className='glass-card p-8 rounded-2xl bg-card border-border text-center space-y-4 flex flex-col items-center'>
            {/* CONTAINER PAI: Ele que faz o corte perfeito em círculo com overflow-hidden */}
            <div className='w-32 h-32 relative rounded-full overflow-hidden border-4 border-emerald-500/20'>
              <Image
                src='/TLN.jpg'
                alt='Tiago Riêgo'
                fill
                /* Apenas object-cover e a animação de zoom! Sem padding, sem rounded-lg */
                className='object-cover transition-transform duration-500 hover:scale-110'
                priority
              />
            </div>

            <h3 className='text-2xl font-bold text-foreground'>
              Tiago Riêgo
            </h3>
            <p className='text-teal-500 font-semibold'>
              Arquiteto de Automação e
              FullStack.
            </p>
            <p className='text-muted-foreground text-sm'>
              Especialista em fluxos
              complexos de automação com
              n8n e Clean Architecture.
              Focado em transformar
              gargalos operacionais em
              código de alta
              performance.
            </p>
          </div>
        </div>
      </div>

      <div className='relative z-10'>
        <Footer />
      </div>
    </main>
  );
}
