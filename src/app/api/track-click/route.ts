// src/app/api/track-click/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// 🚀 POST: Registra o clique com Timestamp e Data legível
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { videoId, title, url, source } = body;

    // 🕒 Lógica de Tempo Sênior
    const now = new Date();
    const timestamp = Date.now(); // ID de tempo único (milissegundos)
    const readableDate = now.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });

    // 📊 Nova Estrutura CSV: Timestamp é a 1ª coluna agora!
    const csvLine = `"${timestamp}","${readableDate}","${videoId}","${title}","${source}","${url}"\n`;

    const logDir = path.join(process.cwd(), 'logs');
    const filePath = path.join(logDir, 'cliques.csv');

    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(filePath, csvLine, 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar log de clique:', error);
    return NextResponse.json({ error: 'Falha ao registrar' }, { status: 500 });
  }
}

// 🚀 GET: Entrega o arquivo para download direto no Browser
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'logs', 'cliques.csv');
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="dotf4p_cliques.csv"',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Log ainda não gerado ou vazio.' },
      { status: 404 }
    );
  }
}

