// src/app/api/track-click/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();
    const {
      videoId,
      title,
      url,
      source,
    } = body;

    // Pega a data e hora exata do clique (Fuso de Brasília)
    const date =
      new Date().toLocaleString(
        'pt-BR',
        {
          timeZone: 'America/Sao_Paulo',
        },
      );

    // Monta a linha do CSV (separado por vírgula e aspas para evitar quebra de texto)
    const csvLine = `"${date}","${videoId}","${title}","${source}","${url}"\n`;

    // Define o caminho: pasta raiz do projeto / logs / cliques.csv
    const logDir = path.join(
      process.cwd(),
      'logs',
    );
    const filePath = path.join(
      logDir,
      'cliques.csv',
    );

    // Cria a pasta "logs" se ela não existir
    await fs.mkdir(logDir, {
      recursive: true,
    });

    // Adiciona a linha no arquivo (se não existir, ele cria)
    await fs.appendFile(
      filePath,
      csvLine,
      'utf8',
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      'Erro ao salvar log de clique:',
      error,
    );
    return NextResponse.json(
      { error: 'Falha ao registrar' },
      { status: 500 },
    );
  }
}
