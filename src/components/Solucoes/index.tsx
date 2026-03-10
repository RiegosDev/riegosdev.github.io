import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../Header';
import Footer from '../Footer';
import {
  ArrowRight,
  Code2,
  Rocket,
  MonitorSmartphone,
} from 'lucide-react';

export default function Solucoes() {
  return (
    <main className='relative min-h-screen text-foreground overflow-hidden font-sans antialiased bg-background'>
      <div className='aurora-bg'></div>
      <div className='aurora-line'></div>
      <Header />

      <div className='relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-20'>
        {/* Header da Página */}
        <section className='text-center space-y-6 max-w-3xl mx-auto mt-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-foreground'>
            Engenharia sob medida para{' '}
            <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400'>
              sistemas de alta demanda.
            </span>
          </h1>
          <p className='text-lg text-muted-foreground'>
            Do legado ao estado da arte.
            Construímos CRMs,
            Dashboards, Landing Pages e
            plataformas SaaS usando
            Next.js, Prisma e Clean
            Architecture.
          </p>
        </section>

        {/* Grid de Soluções (Bento Grid com as suas imagens) */}
        <div className='grid md:grid-cols-2 gap-6'>
          {/* Solução 1: SaaS / FullStackLabs */}
          <div className='glass-card rounded-2xl bg-card border-border overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300'>
            <div className='p-8 flex-1'>
              <div className='w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20'>
                <Code2 className='text-emerald-500 w-7 h-7' />
              </div>
              <h3 className='text-2xl font-bold text-foreground mb-3'>
                Plataformas SaaS & Web
                Apps
              </h3>
              <p className='text-muted-foreground mb-6'>
                Desenvolvimento de ponta
                a ponta. Como fizemos no{' '}
                <strong>dotf4p</strong>{' '}
                e no{' '}
                <strong>
                  FullStackHubLabs
                </strong>
                . Sistemas que aguentam
                tráfego pesado sem
                piscar.
              </p>
            </div>
            <div className='relative h-48 w-full border-t border-border overflow-hidden bg-slate-900'>
              <Image
                src='/fullstacklabs.png'
                alt='FullStackHubLabs'
                fill
                className='object-cover opacity-80 group-hover:scale-105 transition-transform duration-500 object-top'
              />
            </div>
          </div>

          {/* Solução 2: CRMs e Dashboards */}
          <div className='glass-card rounded-2xl bg-card border-border overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300'>
            <div className='p-8 flex-1'>
              <div className='w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 border border-teal-500/20'>
                <Rocket className='text-teal-500 w-7 h-7' />
              </div>
              <h3 className='text-2xl font-bold text-foreground mb-3'>
                Sistemas Internos Sob
                Medida
              </h3>
              <p className='text-muted-foreground mb-6'>
                Painéis administrativos
                e CRMs com gestão de
                tickets e controle
                financeiro. Tudo em
                tempo real para dar
                visibilidade total à sua
                operação.
              </p>
            </div>
            <div className='relative h-48 w-full border-t border-border overflow-hidden bg-slate-900'>
              <Image
                src='/crm.jpg'
                alt='CRM Dashboard'
                fill
                className='object-cover opacity-80 group-hover:scale-105 transition-transform duration-500 object-top'
              />
            </div>
          </div>

          {/* Solução 3: Portfólios e SPAs (Ocupa 2 colunas no Desktop) */}
          <div className='glass-card rounded-2xl bg-card border-border md:col-span-2 overflow-hidden flex flex-col md:flex-row group hover:-translate-y-1 transition-all duration-300'>
            <div className='p-8 flex-1'>
              <div className='w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20'>
                <MonitorSmartphone className='text-blue-500 w-7 h-7' />
              </div>
              <h3 className='text-2xl font-bold text-foreground mb-3'>
                Portfólios e SPAs
                Interativos
              </h3>
              <p className='text-muted-foreground mb-6 max-w-lg'>
                Sua vitrine digital
                precisa ser impecável.
                Desenvolvemos Single
                Page Applications
                responsivas que prendem
                a atenção do usuário
                desde o primeiro scroll.
              </p>
              <button className='text-blue-500 font-semibold flex items-center gap-2 hover:text-blue-400 transition-colors'>
                <Link href='/faleconosco'>
                  Destacar minha marca
                </Link>
                <ArrowRight className='w-4 h-4' />
              </button>
            </div>
            <div className='relative h-64 md:h-auto md:w-1/2 border-t md:border-t-0 md:border-l border-border overflow-hidden bg-slate-900'>
              <Image
                src='/portfolio.png'
                alt='Portfolio SPA'
                fill
                className='object-cover opacity-80 group-hover:scale-105 transition-transform duration-500 object-left'
              />
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

        {/* GATILHO MATADOR PARA AUTOMAÇÃO (Cross-Sell) */}
        <section className='mt-20'>
          <div className='relative overflow-hidden glass-card rounded-3xl border border-emerald-500/30 bg-emerald-950/5 dark:bg-emerald-950/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-emerald-900/20'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl z-0 pointer-events-none'></div>
            <div className='relative z-10 flex-1'>
              <h2 className='text-3xl font-bold text-foreground mb-4'>
                Sua plataforma já
                existe, mas os processos
                são manuais?
              </h2>
              <p className='text-lg text-muted-foreground max-w-xl'>
                Se sua equipe ainda usa
                planilhas e copia dados
                na mão, você está
                perdendo tempo e
                dinheiro. Nós conectamos
                tudo no piloto
                automático.
              </p>
            </div>
            <div className='relative z-10'>
              <Link href='/automacao'>
                <button className='bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold transition shadow-[0_0_20px_rgba(16,185,129,0.4)] whitespace-nowrap flex items-center gap-2'>
                  Ver Soluções em n8n{' '}
                  <ArrowRight className='w-5 h-5' />
                </button>
              </Link>
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
