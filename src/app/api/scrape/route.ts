// src/app/api/scrape/route.ts
import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { discoverNewCategoriesAction } from '@/actions/discovery.actions';
import { crawlCategoryAction } from '@/actions/scraper.actions';

// 🚀 Aumentamos o tempo limite de execução do Next.js (Vercel/Docker)
export const maxDuration = 300; // 5 minutos (limite padrão do plano Pro, ajuste se necessário)

export async function POST(
  request: NextRequest,
) {
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
      categorySlug,
      targetUrl,
    } = await request.json();

    if (command === 'DISCOVERY') {
      console.log(
        '🤖 [API] Iniciando mapeamento de categorias... (AGUARDANDO)',
      );
      // 🚀 MUDANÇA: Agora usamos AWAIT para o processo não ser morto pelo Docker
      await discoverNewCategoriesAction();

      return NextResponse.json({
        success: true,
        message:
          'Mapeamento de categorias concluído com sucesso.',
      });
    }

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
        `🤖 [API] Raspagem iniciada: ${categorySlug} (AGUARDANDO)`,
      );

      // 🚀 MUDANÇA: Esperamos a raspagem terminar antes de responder ao n8n
      await crawlCategoryAction(
        categorySlug,
        targetUrl,
      );

      return NextResponse.json({
        success: true,
        message: `Raspagem da categoria ${categorySlug} concluída.`,
      });
    }

    return NextResponse.json(
      { error: 'Comando inválido.' },
      { status: 400 },
    );
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(
      '❌ [API] Erro na rota:',
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
