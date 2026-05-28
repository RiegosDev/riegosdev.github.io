import Link from 'next/link';
import {
  CalendarClock,
  ExternalLink,
  FileWarning,
  FolderKanban,
} from 'lucide-react';
import { contentRoot, readManifest } from './_lib/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Cronogramas',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CronogramasPage() {
  let manifest;
  let loadError = false;

  try {
    manifest = await readManifest();
  } catch {
    loadError = true;
  }

  return (
    <main className='min-h-screen bg-slate-950 text-slate-50'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10'>
        <header className='flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300'>
              Riegos.dev
            </p>
            <h1 className='mt-2 text-3xl font-semibold text-white sm:text-4xl'>
              Cronogramas
            </h1>
          </div>
          {manifest ? (
            <div className='inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300'>
              <CalendarClock className='h-4 w-4 text-emerald-300' />
              Atualizado em {manifest.updatedAt}
            </div>
          ) : null}
        </header>

        {loadError ? (
          <section className='rounded-lg border border-amber-400/30 bg-amber-400/10 p-5 text-amber-50'>
            <div className='flex items-start gap-3'>
              <FileWarning className='mt-0.5 h-5 w-5 flex-none text-amber-300' />
              <div>
                <h2 className='text-base font-semibold'>
                  Conteudo de cronogramas nao encontrado
                </h2>
                <p className='mt-2 text-sm leading-6 text-amber-100/90'>
                  O app espera encontrar o manifest em{' '}
                  <code className='rounded bg-black/25 px-1.5 py-0.5'>
                    {contentRoot}
                  </code>
                  . Confirme o deploy do repo privado e o volume read-only no
                  container.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {manifest ? (
          <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {manifest.projects.map((project) => (
              <Link
                key={project.id}
                href={`/cronogramas/${project.id}`}
                className='group rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-emerald-300/60 hover:bg-emerald-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300'
              >
                <div className='flex items-start justify-between gap-4'>
                  <div className='rounded-md border border-emerald-300/20 bg-emerald-300/10 p-2 text-emerald-200'>
                    <FolderKanban className='h-5 w-5' />
                  </div>
                  <ExternalLink className='h-4 w-4 text-slate-500 transition group-hover:text-emerald-200' />
                </div>
                <h2 className='mt-5 text-xl font-semibold text-white'>
                  {project.title}
                </h2>
                {project.description ? (
                  <p className='mt-2 text-sm leading-6 text-slate-300'>
                    {project.description}
                  </p>
                ) : null}
                <div className='mt-5 flex flex-wrap gap-2 text-xs font-medium'>
                  {project.status ? (
                    <span className='rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-emerald-200'>
                      {project.status}
                    </span>
                  ) : null}
                  <span className='rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300'>
                    {project.updatedAt}
                  </span>
                </div>
              </Link>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}

