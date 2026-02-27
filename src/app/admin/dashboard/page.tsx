// src/app/admin/dashboard/page.tsx
import { PrismaClient } from '@prisma/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LogoutButton from '@/components/Admin/LogoutButton';
import {
  Download,
  MousePointerClick,
} from 'lucide-react'; // 🚀 Ícones novos
import fs from 'fs/promises';
import path from 'path';
export const dynamic = 'force-dynamic'; // Isso impede o erro de prerender no build

const prisma = new PrismaClient();

export default async function DashboardPage() {
  // Queries rápidas para o Dashboard
  const totalVideos =
    await prisma.video.count();

  const totalCategories =
    await prisma.category.count();

  const lastUpdate =
    await prisma.video.findFirst({
      orderBy: { createdAt: 'desc' },
    });
  // 🚀 Lógica Sênior: Lendo o CSV direto do disco para o Dashboard
  let lastClicks: string[] = [];
  try {
    const logPath = path.join(
      process.cwd(),
      'logs',
      'cliques.csv',
    );
    const fileContent =
      await fs.readFile(
        logPath,
        'utf8',
      );
    // Pega as últimas 5 linhas e inverte para mostrar o mais recente no topo
    lastClicks = fileContent
      .trim()
      .split('\n')
      .slice(-5)
      .reverse();
  } catch {
    lastClicks = [
      'Aguardando primeiros cliques...',
    ];
  }

  return (
    <div className='p-8 space-y-6 bg-slate-900 min-h-screen text-white'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <h1 className='text-3xl font-black tracking-tight text-rose-500 uppercase'>
          Painel de Controle
        </h1>
        <div className='flex gap-3'>
          {/* 🚀 Botão de Download Direto */}
          <a
            href='/api/track-click'
            download
            className='flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-colors'>
            <Download className='w-4 h-4' />{' '}
            Exportar CSV
          </a>
          <LogoutButton />
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        {/* Card 1: Total de Vídeos */}
        <Card className='bg-dark-900 border-white/5'>
          <CardHeader>
            <CardTitle className='text-sm font-medium text-slate-400'>
              Vídeos Minerados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-4xl font-black text-white'>
              {totalVideos}
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Categorias Descobertas */}
        <Card className='bg-dark-900 border-white/5'>
          <CardHeader>
            <CardTitle className='text-sm font-medium text-slate-400'>
              Categorias (Discovery)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-4xl font-black text-rose-400'>
              {totalCategories}
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Última Sincronização */}
        <Card className='bg-dark-900 border-white/5'>
          <CardHeader>
            <CardTitle className='text-sm font-medium text-slate-400'>
              Último Scrape
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-sm text-gray-400 font-medium'>
              {lastUpdate?.createdAt
                ? new Date(
                    lastUpdate.createdAt,
                  ).toLocaleString(
                    'pt-BR',
                    {
                      timeZone:
                        'America/Sao_Paulo',
                    },
                  )
                : 'Aguardando Robô...'}
            </div>
          </CardContent>
        </Card>
        <Card className='bg-dark-900 border-white/5'>
          <CardHeader>
            <CardTitle className='text-sm font-medium text-slate-400'>
              Vídeos Minerados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-4xl font-black text-white'>
              {totalVideos}
            </div>
          </CardContent>
        </Card>

        {/* 🚀 Card Novo: Monitor de Cliques */}
        <Card className='bg-dark-900 border-white/5'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-slate-400'>
              Cliques (Live)
            </CardTitle>
            <MousePointerClick className='w-4 h-4 text-rose-500' />
          </CardHeader>
          <CardContent>
            <div className='text-xs space-y-1 font-mono text-slate-400'>
              {lastClicks.map(
                (click, i) => (
                  <p
                    key={i}
                    className='truncate border-b border-white/5 pb-1'>
                    {click
                      .split(',')[0]
                      .replace(
                        /"/g,
                        '',
                      )}{' '}
                    -{' '}
                    {click
                      .split(',')[2]
                      ?.replace(
                        /"/g,
                        '',
                      )}
                  </p>
                ),
              )}
            </div>
          </CardContent>
        </Card>
        <Card className='bg-dark-900 border-white/5'>
          <CardHeader>
            <CardTitle className='text-sm font-medium text-slate-400'>
              Vídeos Minerados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-4xl font-black text-white'>
              {totalVideos}
            </div>
          </CardContent>
        </Card>

        {/* 🚀 Card Novo: Monitor de Cliques */}
        <Card className='bg-dark-900 border-rose-500/20'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-slate-400'>
              Cliques (Live)
            </CardTitle>
            <MousePointerClick className='w-4 h-4 text-rose-500' />
          </CardHeader>
          <CardContent>
            <div className='text-xs space-y-1 font-mono text-slate-400'>
              {lastClicks.map(
                (click, i) => (
                  <p
                    key={i}
                    className='truncate border-b border-white/5 pb-1'>
                    {click
                      .split(',')[0]
                      .replace(
                        /"/g,
                        '',
                      )}{' '}
                    -{' '}
                    {click
                      .split(',')[2]
                      ?.replace(
                        /"/g,
                        '',
                      )}
                  </p>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aviso do Motor Autônomo */}
      <div className='mt-8 p-6 bg-rose-500/10 border border-rose-500/20 rounded-xl'>
        <h3 className='text-xl font-bold text-rose-500 mb-2'>
          Motor Autônomo Ativo 🚀
        </h3>
        <p className='text-slate-300'>
          A importação manual foi
          desativada. O conteúdo deste
          painel é alimentado
          automaticamente pelo
          <strong>
            {' '}
            Discovery Mode
          </strong>{' '}
          e pelo{' '}
          <strong>
            n8n Crawler
          </strong>{' '}
          rodando em background na VPS.
        </p>
      </div>
    </div>
  );
}
