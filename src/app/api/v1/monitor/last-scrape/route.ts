import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ajuste o path conforme sua estrutura [cite: 2026-02-18]

export const dynamic = 'force-dynamic'; // Garante que não venha cache do Next.js [cite: 2026-02-16]

export async function GET(
  request: Request,
) {
  try {
    // 1. Validação de Segurança (Opcional, mas recomendado usar o mesmo token do n8n) [cite: 2025-07-17]
    const authHeader =
      request.headers.get(
        'authorization',
      );
    if (
      authHeader !==
      `Bearer ${process.env.N8N_SECRET_TOKEN}`
    ) {
      return NextResponse.json(
        { error: 'Acesso Negado.' },
        { status: 401 },
      );
    }

    // 2. Busca os últimos 5 vídeos inseridos ou atualizados [cite: 2026-02-16]
    const lastVideos =
      await prisma.video.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }, // Ou 'publishedAt' se preferir [cite: 2026-02-16]
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true,
        },
      });

    // 3. Busca a contagem total para conferir o crescimento [cite: 2026-02-16]
    const totalCount =
      await prisma.video.count();

    return NextResponse.json({
      success: true,
      timestamp:
        new Date().toISOString(),
      totalVideos: totalCount,
      lastInserted: lastVideos,
    });
  } catch (error) {
    console.error(
      '❌ Erro ao buscar status do scrape:',
      error,
    );
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
