import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarClock, Maximize2 } from 'lucide-react';
import { contentFileUrl, getProject } from '../_lib/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Cronograma',
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  params: Promise<{
    project: string;
  }>;
};

export default async function CronogramaProjectPage({ params }: PageProps) {
  const { project: projectId } = await params;
  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }

  const iframeSrc = contentFileUrl(project.htmlPath);

  return (
    <main className='flex min-h-screen flex-col bg-slate-950 text-slate-50'>
      <header className='flex flex-col gap-4 border-b border-white/10 bg-slate-950/95 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6'>
        <div className='flex min-w-0 items-center gap-3'>
          <Link
            href='/cronogramas'
            className='inline-flex h-10 w-10 flex-none items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-200 transition hover:border-emerald-300/60 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300'
            aria-label='Voltar para cronogramas'
          >
            <ArrowLeft className='h-5 w-5' />
          </Link>
          <div className='min-w-0'>
            <h1 className='truncate text-lg font-semibold text-white sm:text-xl'>
              {project.title}
            </h1>
            <div className='mt-1 flex items-center gap-2 text-xs text-slate-400'>
              <CalendarClock className='h-3.5 w-3.5 text-emerald-300' />
              Atualizado em {project.updatedAt}
            </div>
          </div>
        </div>
        <a
          href={iframeSrc}
          target='_blank'
          rel='noreferrer'
          className='inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 text-sm font-medium text-slate-200 transition hover:border-emerald-300/60 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300'
        >
          <Maximize2 className='h-4 w-4' />
          Abrir
        </a>
      </header>

      <iframe
        src={iframeSrc}
        title={`Cronograma ${project.title}`}
        className='h-[calc(100vh-89px)] w-full flex-1 border-0 bg-white'
      />
    </main>
  );
}

