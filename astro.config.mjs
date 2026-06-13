// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Apex custom domain on GitHub Pages → site = full URL, base = '/'
  site: 'https://medicalbeforeaftergallery.com',
  base: '/',
  trailingSlash: 'ignore',
  build: {
    // Clean directory-style URLs: /blog/post/ instead of /blog/post.html
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
