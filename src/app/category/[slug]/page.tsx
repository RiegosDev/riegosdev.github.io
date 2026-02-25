import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const prisma = new PrismaClient();

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// 🚀 1. SEO SÊNIOR: Gera as meta tags dinâmicas para o Google ler!
export async function generateMetadata({
  params,
}: CategoryPageProps) {
  const resolvedParams = await params;
  const category =
    await prisma.category.findUnique({
      where: {
        slug: resolvedParams.slug,
      },
    });

  if (!category)
    return {
      title:
        'Categoria não encontrada - DotF4p',
    };

  return {
    title: `${category.name} Videos - DotF4p`,
    description: `Assista aos melhores vídeos da categoria ${category.name} em alta qualidade.`,
  };
}

// 🚀 2. SERVER FIRST: Renderiza o HTML pronto direto do servidor
export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Busca a categoria e os vídeos associados a ela pela tabela pivô
  const category =
    await prisma.category.findUnique({
      where: { slug },
      include: {
        videos: {
          include: {
            video: true,
          },
          orderBy: {
            video: {
              publishedAt: 'desc',
            }, // Traz os mais recentes primeiro
          },
          take: 40, // Paginação inicial marota pra não pesar
        },
      },
    });

  // Type Guard de elite
  if (!category) {
    return notFound();
  }

  return (
    <div className='min-h-screen bg-zinc-950 text-white p-4 md:p-8'>
      {/* HEADER DA CATEGORIA */}
      <header className='mb-8 border-b border-zinc-800 pb-4'>
        <h1 className='text-3xl md:text-4xl font-black text-pink-500 uppercase tracking-wider'>
          {category.name}
        </h1>
        <p className='text-zinc-400 mt-2 text-sm'>
          Exibindo os vídeos mais
          recentes para a categoria{' '}
          {category.name.toLowerCase()}.
        </p>
      </header>

      {/* GRID DE VÍDEOS */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {category.videos.map((item) => {
          const vid = item.video;
          return (
            // O Link aponta direto pra rota /out que já tem o RedirectTimer!
            <Link
              href={`/out/${vid.slug}`}
              key={vid.id}
              className='group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-pink-500 hover:shadow-[0_0_15px_rgba(219,39,119,0.3)] transition-all'>
              <div className='relative aspect-video bg-zinc-950'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className='object-cover w-full h-full group-hover:opacity-70 transition-opacity'
                />
                <div className='absolute bottom-2 right-2 bg-black/90 px-2 py-1 text-xs font-bold rounded text-zinc-300'>
                  {vid.duration}
                </div>
              </div>

              <div className='p-4'>
                <h3 className='text-sm font-semibold text-zinc-200 line-clamp-2 group-hover:text-pink-400 transition-colors'>
                  {vid.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ESPAÇO PARA PAGINAÇÃO NO FUTURO */}
      {category.videos.length ===
        40 && (
        <div className='mt-12 flex justify-center'>
          <button className='px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors'>
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  );
}
