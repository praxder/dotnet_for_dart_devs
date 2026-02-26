// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  integrations: [
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      styleOverrides: {
        borderRadius: '0.5rem',
        codeFontSize: '0.9rem',
      },
    }),
    mdx(),
    preact(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
