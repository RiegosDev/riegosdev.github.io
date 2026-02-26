import { ScraperDictionary } from '@/models';

const epornerBaseSelectors = {
  container:
    '.mbimg, .vbox, .post-container',
  title: '.mbcontent a img',
  link: '.mbcontent a',
  thumbnail: '.mbcontent img',
  duration: '.mvhdico span',
};

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
      linkExcludes: [
        'child',
        'underage',
        'kid',
        'kids',
        'illegal',
        'rape',
        'ped',
        'toddler',
      ],
      selectors: epornerBaseSelectors,
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
    // 🚀 O PULO DO GATO: Adicionamos as TAGS como uma fonte nova
    'eporner.com-tags': {
      baseUrl:
        'https://www.eporner.com',
      categoryPath: '/tag/',
      linkIncludes: ['/tag/'],
      linkExcludes: [
        'child',
        'underage',
        'kid',
        'kids',
        'illegal',
        'rape',
        'ped',
        'toddler',
      ],
      selectors: epornerBaseSelectors,
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
