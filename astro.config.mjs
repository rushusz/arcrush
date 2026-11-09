import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://arcrush.kr',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
