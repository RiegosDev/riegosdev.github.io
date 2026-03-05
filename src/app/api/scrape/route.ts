import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { discoverNewCategoriesAction } from '@/actions/discovery.actions';
import { crawlCategoryAction } from '@/actions/scraper.actions';
import {
  refreshExistingContentAction,
  cleanBrokenVideosAction,
} from '@/actions/maintenance.actions';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function POST(
  request: NextRequest,
) {
  const startTime = Date.now();

  try {
    const authHeader =
      request.headers.get(
        'x-api-secret',
      );
    const secret =
      process.env.N8N_API_SECRET;

    if (
      !secret ||
      authHeader !== secret
    ) {
      return NextResponse.json(
        { error: 'Acesso Negado.' },
        { status: 401 },
      );
    }

    const {
      command,
      limit,
      categorySlug,
      targetUrl,
    } = await request.json();

    // 🏎️ COMANDO 1: MANUTENÇÃO (Atualiza o conteúdo existente)
    if (command === 'MAINTENANCE') {
      console.log(
        `🧹 [JOB] Iniciando manutenção de ${limit || 5} categorias...`,
      );
      const result =
        await refreshExistingContentAction(
          limit || 16,
        );

      console.log(
        `✅ [JOB] Manutenção finalizada em ${Date.now() - startTime}ms`,
      );
      return NextResponse.json({
        ...result,
        message:
          'Manutenção concluída.',
      });
    }

    // 🛰️ COMANDO 2: DISCOVERY (Busca novas categorias)
    if (command === 'DISCOVERY') {
      console.log(
        '🤖 [JOB] Iniciando Discovery de novas categorias...',
      );
      await discoverNewCategoriesAction();

      console.log(
        `✅ [JOB] Discovery finalizado em ${Date.now() - startTime}ms`,
      );
      return NextResponse.json({
        success: true,
        message:
          'Mapeamento concluído.',
      });
    }

    // 🏗️ COMANDO 3: SCRAPE (Focado em uma única categoria)
    if (command === 'SCRAPE') {
      if (!categorySlug || !targetUrl) {
        return NextResponse.json(
          {
            error: 'Faltam parâmetros.',
          },
          { status: 400 },
        );
      }
      console.log(
        `🚀 [JOB] Raspagem focada: ${categorySlug}`,
      );
      await crawlCategoryAction(
        categorySlug,
        targetUrl,
      );

      console.log(
        `✅ [JOB] Scrape focado finalizado em ${Date.now() - startTime}ms`,
      );
      return NextResponse.json({
        success: true,
        message: `Categoria ${categorySlug} atualizada.`,
      });
    }

    // 🗑️ COMANDO 4: CLEANUP (Verifica e remove vídeos offline/404)
    if (command === 'CLEANUP') {
      console.log(
        `🧹 [JOB] Iniciando limpeza de ${limit || 100} vídeos...`,
      );
      const result =
        await cleanBrokenVideosAction(
          limit || 100,
        );

      console.log(
        `✅ [JOB] Limpeza finalizada em ${Date.now() - startTime}ms`,
      );
      return NextResponse.json({
        ...result,
        message:
          'Limpeza de vídeos quebrados concluída.',
      });
    }

    return NextResponse.json(
      { error: 'Comando inválido.' },
      { status: 400 },
    );
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(
      `❌ [API] Erro após ${Date.now() - startTime}ms:`,
      error.message,
    );
    return NextResponse.json(
      {
        error: 'Erro interno.',
        details: error.message,
      },
      { status: 500 },
    );
  }
}
