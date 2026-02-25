import { ScraperDictionary } from '@/repositories/types';

// Mapeamento dos domínios. O motor vai testar os seletores na ordem do array!
export const SCRAPER_DICTIONARY: ScraperDictionary =
  {
    'eporner.com': {
      baseUrl:
        'https://www.eporner.com',
      categoryPath: '/cat/',
      linkIncludes: [
        '/cat/', // 🚀 PULO DO GATO: Só aceita links que tenham /cat/ (categorias reais)
      ],
      linkExcludes: [],
      selectors: {
        container:
          '.mbimg, .vbox, .post-container', // .mbimg é o que você achou agora!
        title: '.mbcontent a img', // Pegamos o alt da imagem se o texto falhar
        link: '.mbcontent a',
        thumbnail: '.mbcontent img',
        duration: '.mvhdico span',
      },
      titleSelectors: [
        'a[href*="/video-"]',
      ],
      thumbSelectors: [
        'img.post-thumbnail',
      ],
      durationSelectors: [
        '.m_duration',
      ],
    },
  };
