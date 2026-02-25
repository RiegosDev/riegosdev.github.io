import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
) {
  // 🛡️ Segurança Sênior: Verificação de Token
  // No painel da sua VPS (ou no .env), você cria a variável N8N_SECRET_TOKEN
  const authHeader =
    request.headers.get(
      'authorization',
    );
  const SECRET =
    process.env.N8N_SECRET_TOKEN ||
    '5sNU7p9uqJJwXRIrQ6XbaRkI';

  if (
    authHeader !== `Bearer ${SECRET}`
  ) {
    return NextResponse.json(
      {
        error:
          'Acesso Negado. Tá achando que é festa?',
      },
      { status: 401 },
    );
  }

  try {
    // 🚀 Puxa os vídeos que têm URL externa
    const totalVideos =
      await prisma.video.count({
        where: {
          externalUrl: { not: null },
        },
      });
    const randomSkip = Math.floor(
      Math.random() *
        Math.max(0, totalVideos - 500),
    );

    const videos =
      await prisma.video.findMany({
        where: {
          externalUrl: { not: null },
        },
        select: {
          id: true,
          slug: true,
          externalUrl: true,
        },
        take: 200, // 🚀 Limita para não quebrar o n8n
        skip: randomSkip, // 🚀 Pega uma fatia diferente a cada execução
      });
    return NextResponse.json({
      success: true,
      count: videos.length,
      videos,
    });
  } catch (error) {
    console.error(
      'Erro na API de Monitoramento:',
      error,
    );
    return NextResponse.json(
      {
        error:
          'Erro interno do servidor',
      },
      { status: 500 },
    );
  }
}
