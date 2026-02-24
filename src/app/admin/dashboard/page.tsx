// src/app/admin/dashboard/page.tsx
import { PrismaClient } from '@prisma/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LogoutButton from '@/components/Admin/LogoutButton';
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

  return (
    <div className='p-8 space-y-6 bg-slate-900 min-h-screen text-white'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <h1 className='text-3xl font-black tracking-tight text-rose-500 uppercase'>
          Painel de Controle
        </h1>
        <LogoutButton />
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
                  )
                : 'Aguardando Robô...'}
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
