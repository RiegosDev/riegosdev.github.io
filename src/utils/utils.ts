/**
 * 🛠️ UTILS - DOTF4P.COM
 * Foco: Performance, SEO e Manutenibilidade.
 */

/**
 * 🚀 SEO: Converte durações "00:00" ou "00:00:00" para o formato ISO 8601 (Ex: PT5M20S)
 * Exigido pelo Google Schema.org (VideoObject) [cite: 2026-02-16]
 */
export function formatISODuration(
  duration: string,
): string {
  if (!duration) return 'PT0M0S';

  const parts = duration
    .split(':')
    .map(Number);

  // Formato: MM:SS
  if (parts.length === 2) {
    const [m, s] = parts;
    return `PT${m}M${s}S`;
  }

  // Formato: HH:MM:SS
  if (parts.length === 3) {
    const [h, m, s] = parts;
    return `PT${h}H${m}M${s}S`;
  }

  return 'PT0M0S';
}

/**
 * 🔞 EMBED MAPPER: Converte URLs de páginas em URLs de Players (Embed)
 * Focado nos domínios ativos do nosso SCRAPER_DICTIONARY
 */
export function getEmbedContent(
  url?: string | null,
): string {
  if (!url) return '';

  try {
    const parsedUrl = new URL(url);
    const host =
      parsedUrl.hostname.replace(
        'www.',
        '',
      );
    const path = parsedUrl.pathname;

    // 1. EPORNER (Nosso Main Provider atual)
    if (host.includes('eporner.com')) {
      // Ex: /hd-porn/video-id/ -> /embed/video-id/
      const match = path.match(
        /\/hd-porn\/([^\/]+)/,
      );
      if (match)
        return `https://www.eporner.com/embed/${match[1]}/`;
    }

    // 2. Lógica para novos domínios pode ser adicionada aqui de forma modular

    // Fallback: Retorna a URL original se não houver regra de embed
    return url;
  } catch (e) {
    console.error(
      'Erro ao processar URL para embed:',
      e,
    );
    return url || '';
  }
}

/**
 * 🛠️ Formata números grandes (Views) para K, M, etc.
 */
export function formatViews(
  views: string | number,
): string {
  const num =
    typeof views === 'string'
      ? parseInt(
          views.replace(/[^\d]/g, ''),
          10,
        )
      : views;
  if (isNaN(num)) return '0';

  if (num >= 1000000)
    return (
      (num / 1000000).toFixed(1) + 'M'
    );
  if (num >= 1000)
    return (
      (num / 1000).toFixed(1) + 'K'
    );
  return num.toString();
}
