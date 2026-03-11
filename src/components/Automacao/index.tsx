import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import {
  Bot,
  MessageSquare,
  Database,
  ArrowRight,
  Zap,
  Car,
  Dumbbell,
  Stethoscope,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';

export default function Automacao() {
  return (
    <main className='relative min-h-screen text-foreground overflow-hidden font-sans antialiased'>
      <div className='aurora-bg'></div>
      <div className='aurora-line'></div>
      <Header />

      <div className='relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-20'>
        <section className='text-center space-y-6 max-w-3xl mx-auto mt-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-foreground'>
            Sua empresa no <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400'>
              piloto automático (n8n).
            </span>
          </h1>
          <p className='text-lg text-muted-foreground'>
            Integramos seu WhatsApp,
            CRM, bancos de dados e APIs.
            O que sua equipe leva horas
            para fazer, nossos agentes
            de Inteligência Artificial
            executam em milissegundos.
          </p>
        </section>

        {/* FLUXOGRAMAS VISUAIS DE AUTOMAÇÃO (Puro CSS) */}
        <div className='space-y-16'>
          {/* Fluxograma 1: Academias (Ex: Pratique Fitness) */}
          <div className='glass-card p-8 rounded-2xl bg-card border-border relative overflow-hidden'>
            <div className='flex items-center gap-3 mb-8'>
              <Dumbbell className='text-emerald-500 w-8 h-8' />
              <h2 className='text-2xl font-bold text-foreground'>
                Redes de Academias &
                Fitness
              </h2>
            </div>

            {/* O Flow Visual */}
            <div className='flex flex-col md:flex-row items-center justify-between gap-4 relative'>
              {/* Linha conectora no fundo (Desktop) */}
              <div className='hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border -z-10 -translate-y-1/2'></div>

              <div className='bg-background border border-border p-4 rounded-xl text-center w-full md:w-64 z-10 shadow-lg'>
                <MessageSquare className='w-6 h-6 text-blue-500 mx-auto mb-2' />
                <p className='font-semibold text-sm text-foreground'>
                  Lead via Instagram
                </p>
                <p className='text-xs text-muted-foreground'>
                  Pede info de planos
                </p>
              </div>
              <ArrowRight className='hidden md:block w-8 h-8 text-emerald-500 bg-card rounded-full' />
              <div className='bg-emerald-950/10 dark:bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl text-center w-full md:w-64 z-10 shadow-[0_0_15px_rgba(16,185,129,0.15)]'>
                <Bot className='w-6 h-6 text-emerald-500 mx-auto mb-2' />
                <p className='font-semibold text-sm text-emerald-600 dark:text-emerald-400'>
                  Agente de Vendas (n8n)
                </p>
                <p className='text-xs text-muted-foreground'>
                  Responde e oferece
                  Aula Experimental
                </p>
              </div>
              <ArrowRight className='hidden md:block w-8 h-8 text-emerald-500 bg-card rounded-full' />
              <div className='bg-background border border-border p-4 rounded-xl text-center w-full md:w-64 z-10 shadow-lg'>
                <Database className='w-6 h-6 text-orange-500 mx-auto mb-2' />
                <p className='font-semibold text-sm text-foreground'>
                  CRM & Agenda
                </p>
                <p className='text-xs text-muted-foreground'>
                  Registra visita na
                  unidade mais próxima
                </p>
              </div>
            </div>
          </div>

          {/* Fluxograma 2: Concessionárias / Agências de Carros */}
          <div className='glass-card p-8 rounded-2xl bg-card border-border relative overflow-hidden'>
            <div className='flex items-center gap-3 mb-8'>
              <Car className='text-blue-500 w-8 h-8' />
              <h2 className='text-2xl font-bold text-foreground'>
                Agências de Veículos
                Premium
              </h2>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between gap-4 relative'>
              <div className='hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border -z-10 -translate-y-1/2'></div>

              <div className='bg-background border border-border p-4 rounded-xl text-center w-full md:w-64 z-10 shadow-lg'>
                <MessageSquare className='w-6 h-6 text-emerald-500 mx-auto mb-2' />
                <p className='font-semibold text-sm text-foreground'>
                  WhatsApp do Cliente
                </p>
                <p className='text-xs text-muted-foreground'>
                  `Tem Jeep Compass
                  2022?`
                </p>
              </div>
              <ArrowRight className='hidden md:block w-8 h-8 text-blue-500 bg-card rounded-full' />
              <div className='bg-blue-950/10 dark:bg-blue-950/20 border border-blue-500/30 p-4 rounded-xl text-center w-full md:w-64 z-10 shadow-[0_0_15px_rgba(59,130,246,0.15)]'>
                <Workflow className='w-6 h-6 text-blue-500 mx-auto mb-2' />
                <p className='font-semibold text-sm text-blue-600 dark:text-blue-400'>
                  Busca em Tempo Real
                </p>
                <p className='text-xs text-muted-foreground'>
                  n8n consulta estoque
                  no Supabase/ERP
                </p>
              </div>
              <ArrowRight className='hidden md:block w-8 h-8 text-blue-500 bg-card rounded-full' />
              <div className='bg-background border border-border p-4 rounded-xl text-center w-full md:w-64 z-10 shadow-lg'>
                <Zap className='w-6 h-6 text-yellow-500 mx-auto mb-2' />
                <p className='font-semibold text-sm text-foreground'>
                  Fechamento Inteligente
                </p>
                <p className='text-xs text-muted-foreground'>
                  IA envia fotos e
                  agenda test-drive
                </p>
              </div>
            </div>
          </div>

          {/* Fluxograma 3: Clínicas (A Arquitetura Complexa MedX) */}
          <div className='glass-card p-8 rounded-2xl bg-card border-border relative overflow-hidden border-l-4 border-l-emerald-500'>
            <div className='flex items-center gap-3 mb-6'>
              <Stethoscope className='text-rose-500 w-8 h-8' />
              <div>
                <h2 className='text-2xl font-bold text-foreground'>
                  Arquitetura Complexa:
                  Clínicas Médicas
                </h2>
                <p className='text-sm text-muted-foreground mt-1'>
                  Baseado no motor{' '}
                  <strong>MedX</strong>:
                  Buffer de fila,
                  sub-workflows e
                  roteamento de IA.
                </p>
              </div>
            </div>

            {/* Representação visual do seu JSON MedX */}
            <div className='grid md:grid-cols-4 gap-4'>
              <div className='bg-background border border-border p-5 rounded-xl text-left shadow-sm hover:border-emerald-500/50 transition-colors'>
                <span className='text-[10px] uppercase font-bold text-slate-400 mb-2 block'>
                  01. Ingestão
                </span>
                <p className='text-sm font-bold text-foreground flex items-center gap-2'>
                  <Workflow className='w-4 h-4 text-emerald-500' />{' '}
                  Webhook P/ Whatsapp
                </p>
                <p className='text-xs text-muted-foreground mt-2 leading-relaxed'>
                  Recebe mensagem do
                  WhatsApp e salva na
                  fila do{' '}
                  <strong>Redis</strong>{' '}
                  para evitar rate-limit
                  e quedas.
                </p>
              </div>

              <div className='bg-background border border-border p-5 rounded-xl text-left shadow-sm hover:border-emerald-500/50 transition-colors'>
                <span className='text-[10px] uppercase font-bold text-slate-400 mb-2 block'>
                  02. Orquestração
                </span>
                <p className='text-sm font-bold text-foreground flex items-center gap-2'>
                  <Database className='w-4 h-4 text-blue-500' />{' '}
                  Supabase Auth
                </p>
                <p className='text-xs text-muted-foreground mt-2 leading-relaxed'>
                  Consulta banco de
                  dados. Se for um lead
                  novo, cria o registro
                  do paciente
                  automaticamente.
                </p>
              </div>

              <div className='bg-emerald-950/5 dark:bg-emerald-950/20 border border-emerald-500/30 p-5 rounded-xl text-left shadow-[0_0_15px_rgba(16,185,129,0.1)]'>
                <span className='text-[10px] uppercase font-bold text-emerald-500 mb-2 block'>
                  03. O Cérebro
                </span>
                <p className='text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2'>
                  <Bot className='w-4 h-4' />{' '}
                  Agente Isis + Think
                </p>
                <p className='text-xs text-muted-foreground mt-2 leading-relaxed'>
                  OpenAI processa
                  intenção internamente
                  (Think Tool), cruza
                  agendas de médicos e
                  responde humanizado.
                </p>
              </div>

              <div className='bg-background border border-border p-5 rounded-xl text-left shadow-sm hover:border-orange-500/50 transition-colors'>
                <span className='text-[10px] uppercase font-bold text-slate-400 mb-2 block'>
                  04. Retenção
                </span>
                <p className='text-sm font-bold text-foreground flex items-center gap-2'>
                  <Zap className='w-4 h-4 text-orange-500' />{' '}
                  Loop de Follow-Up
                </p>
                <p className='text-xs text-muted-foreground mt-2 leading-relaxed'>
                  Gatilhos programados
                  (FUP1, FUP2) que
                  resgatam
                  automaticamente leads
                  que pararam de
                  responder.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className='text-center mt-24 glass-card p-12 rounded-3xl border border-emerald-500/20 bg-card'>
          <h2 className='text-3xl font-bold text-foreground mb-4'>
            Pronto para demitir suas
            planilhas?
          </h2>
          <p className='text-muted-foreground mb-8 max-w-xl mx-auto'>
            Agende um bate-papo técnico
            para desenharmos o mapa da
            automação da sua empresa sem
            compromisso.
          </p>
          <button className='bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-full font-bold transition shadow-[0_0_20px_rgba(16,185,129,0.4)]'>
            <Link
              href='/faleconosco'
              className='bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-full font-bold transition shadow-[0_0_20px_rgba(16,185,129,0.4)] inline-block'>
              Mapear Gargalos da Minha
              Empresa
            </Link>
          </button>
        </div>
      </div>
      <div className='relative z-10'>
        <Footer />
      </div>
    </main>
  );
}
