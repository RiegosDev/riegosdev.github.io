import React from 'react';
import Image from 'next/image';
import Header from '../Header';
import Footer from '../Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='relative min-h-screen text-slate-50 overflow-hidden font-sans antialiased'>
      {/* Aurora Boreal Background */}
      <div className='aurora-bg'></div>
      <div className='aurora-line'></div>

      <Header />

      <div className='relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32'>
        {/* Hero Section */}
        <section className='text-center space-y-8 max-w-4xl mx-auto mt-10'>
          <h1 className='text-4xl md:text-xl font-extrabold tracking-tight text-white leading-tight'>
            Engenharia de software e
            automação para <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200'>
              escalar sua operação.
            </span>
          </h1>
          <p className='text-lg text-slate-400 max-w-2xl mx-auto'>
            Desenvolvemos soluções Full
            Stack de alta performance e
            fluxos de automação
            inteligentes. Destrave o
            crescimento do seu negócio
            com arquitetura limpa.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4 pt-4'>
            <button className='bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold transition shadow-[0_0_20px_rgba(16,185,129,0.4)]'>
              <Link
                href='/faleconosco'
                className='bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold transition shadow-[0_0_20px_rgba(16,185,129,0.3)]'>
                Agendar Consultoria
                Gratuita
              </Link>
            </button>
            <button className='bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold transition shadow-[0_0_20px_rgba(16,185,129,0.4)]'>
              <Link
                href='/solucoes'
                className='bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold transition shadow-[0_0_20px_rgba(16,185,129,0.3)]'>
                Ver como trabalhamos
              </Link>
            </button>
          </div>

          {/* O NOVO BENTO GRID: A Vitrine de Autoridade */}
          <div className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[280px]'>
            {/* Card 1: Fluxo n8n (Ocupa 2 colunas no desktop) */}
            <div className='group relative overflow-hidden rounded-2xl glass-card md:col-span-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-end p-6'>
              <Image
                src='/Fluxon8nConcessionária.png'
                alt='Fluxo n8n'
                fill
                className='object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent'></div>
              <div className='relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2 text-left'>
                <h3 className='text-2xl font-bold text-white mb-2'>
                  Automação Backend
                  Inteligente
                </h3>
                <p className='text-sm text-slate-300 max-w-md'>
                  Fluxos complexos com
                  n8n integrando
                  sistemas legados, APIs
                  e gatilhos em tempo
                  real para eliminar o
                  trabalho manual.
                </p>
              </div>
            </div>

            {/* Card 2: CRM */}
            <div className='group relative overflow-hidden rounded-2xl glass-card transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-end p-6'>
              <Image
                src='/crm.jpg'
                alt='CRM Personalizado'
                fill
                className='object-cover object-top opacity-50 group-hover:opacity-70 transition-opacity duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent'></div>
              <div className='relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2 text-left'>
                <h3 className='text-xl font-bold text-white mb-2'>
                  Sistemas Sob Medida
                </h3>
                <p className='text-sm text-slate-300'>
                  Desenvolvimento de
                  CRMs e Dashboards de
                  alta performance.
                </p>
              </div>
            </div>

            {/* Card 3: Automação WhatsApp */}
            <div className='group relative overflow-hidden rounded-2xl glass-card transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-end p-6'>
              <Image
                src='/Auton8nWhatsappRiegosCar.png'
                alt='Atendimento IA WhatsApp'
                fill
                className='object-cover object-center opacity-50 group-hover:opacity-20 transition-opacity duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent'></div>
              <div className='relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2 text-left'>
                <h3 className='text-xl font-bold text-white mb-2'>
                  Atendimento com IA
                </h3>
                <p className='text-sm text-slate-300'>
                  Robôs no WhatsApp que
                  convertem leads e
                  agendam reuniões 24/7.
                </p>
              </div>
            </div>

            {/* Card 4: Full Stack / Next.js (Ocupa 2 colunas) */}
            <div className='group relative overflow-hidden rounded-2xl glass-card md:col-span-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-end p-6'>
              <Image
                src='/fullstacklabs.png'
                alt='Arquitetura Next.js'
                fill
                className='object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent'></div>
              <div className='relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2 text-left'>
                <h3 className='text-2xl font-bold text-white mb-2'>
                  Plataformas Escaláveis
                </h3>
                <p className='text-sm text-slate-300 max-w-md'>
                  Aplicações Full Stack
                  desenhadas no Next.js
                  (App Router),
                  garantindo o máximo de
                  SEO e velocidade de
                  carregamento.
                </p>
              </div>
            </div>
          </div>
          {/* Card 5: Calculadora NBR */}
          <div className='group relative overflow-hidden rounded-2xl glass-card transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-end p-6 border-emerald-500/20 min-h-[280px]'>
            {/* 1. A IMAGEM AGORA FICA NA RAIZ DO CARD, PREENCHENDO ELE TODO */}
            <Image
              src='/calcrampa.png'
              alt='Calculadora de Rampa - Arquitetura'
              fill
              className='object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-0 object-center'
            />

            {/* 2. OVERLAY CLARO PARA GARANTIR LEITURA DO TEXTO (Fica branco por baixo e some pro topo) */}
            <div className='absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-transparent dark:from-slate-200/95 dark:via-slate-200/80 z-0'></div>

            {/* 3. O CONTEÚDO ENVELOPADO EM Z-10 PARA O LINK SER CLICÁVEL */}
            <div className='relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2 text-left mt-auto'>
              {/* O ícone 📐 bonitinho e isolado */}
              <div className='w-14 h-14 bg-emerald-500/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-emerald-500/30'>
                <span className='text-2xl'>
                  📐
                </span>
              </div>

              {/* Textos chamando a nossa classe do globals.css */}
              <h3 className='text-2xl text-fundo-claro mb-2'>
                Calculadora de Rampas -
                NBR 9050
              </h3>
              <p className='text-sm text-fundo-claro-muted max-w-xs mb-4'>
                Ferramenta gratuita para
                arquitetos urbanistas e
                engenheiros.
              </p>

              <Link
                href='/calculadora-rampa'
                className='text-emerald-700 dark:text-emerald-700 font-extrabold hover:underline flex items-center gap-2'>
                Acessar Grátis &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Seção de Dor */}
        <section className='space-y-12'>
          <div className='text-center space-y-4'>
            <h2 className='text-2xl md:text-4xl font-bold'>
              A tecnologia atual é um
              motor ou um freio?
            </h2>
          </div>
          <div className='grid md:grid-cols-3 gap-6'>
            <div className='glass-card p-8 rounded-2xl space-y-4 hover:-translate-y-1 transition duration-300'>
              <div className='text-emerald-400 text-3xl'>
                ⏳
              </div>
              <h3 className='text-xl font-bold text-white'>
                Trabalho Repetitivo
              </h3>
              <p className='text-slate-400 text-sm'>
                Sua equipe gasta horas
                em planilhas e copiando
                dados entre sistemas que
                não se conversam.
              </p>
            </div>
            <div className='glass-card p-8 rounded-2xl space-y-4 hover:-translate-y-1 transition duration-300'>
              <div className='text-emerald-400 text-3xl'>
                🐢
              </div>
              <h3 className='text-xl font-bold text-white'>
                Sistemas Lentos
              </h3>
              <p className='text-slate-400 text-sm'>
                A aplicação demora para
                carregar, trava com
                muitos acessos e
                prejudica a experiência
                do cliente.
              </p>
            </div>
            <div className='glass-card p-8 rounded-2xl space-y-4 hover:-translate-y-1 transition duration-300'>
              <div className='text-emerald-400 text-3xl'>
                💸
              </div>
              <h3 className='text-xl font-bold text-white'>
                Código Legado
              </h3>
              <p className='text-slate-400 text-sm'>
                Alterar algo quebra o
                resto. A falta de
                arquitetura limpa está
                custando tempo e
                dinheiro.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Autoridade */}
        <section className='glass-card p-12 rounded-3xl border border-emerald-500/20 relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl z-0'></div>
          <div className='relative z-10 max-w-2xl'>
            <h2 className='text-3xl font-bold mb-6 text-white'>
              Construído por quem
              entende de negócio.
            </h2>
            <p className='text-slate-300 mb-8 leading-relaxed'>
              Não somos uma agência
              genérica. Somos o Daniel e
              o Tiago. Você lida
              diretamente com os
              arquitetos que vão
              desenhar, codar e
              automatizar a
              infraestrutura da sua
              empresa no n8n. Do
              planejamento ao deploy, a
              gente garante a entrega.
            </p>
            <div className='flex gap-4 items-center'>
              <div className='flex -space-x-4'>
                <div className='w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white'>
                  D
                </div>
                <div className='w-12 h-12 rounded-full bg-slate-600 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white'>
                  T
                </div>
              </div>
              <span className='text-sm text-slate-400 font-semibold'>
                Os Arquitetos da sua
                Solução
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className='relative z-10'>
        <Footer />
      </div>
    </main>
  );
}
// Teste
