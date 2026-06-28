import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { mintlify } from '@mintlify/astro';
import tailwindcss from '@tailwindcss/vite';
import { createLogger } from 'vite';

const baseLogger = createLogger();
const filteredWarnings = [
  '"fontData" is not exported by "\\0virtual:astro:assets/fonts/internal"',
  'Found 67 warnings while optimizing generated CSS:',
  '[lightningcss minify] Unknown at rule: @property',
];

const logger = {
  ...baseLogger,
  warn(message, options) {
    if (filteredWarnings.some((fragment) => message.includes(fragment))) {
      return;
    }

    baseLogger.warn(message, options);
  },
};

export default defineConfig({
  integrations: [mintlify({ docsDir: './docs' }), react(), mdx()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
    },
  },
  vite: {
    customLogger: logger,
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        path: 'path-browserify',
      },
    },
    build: {
      cssMinify: false,
      chunkSizeWarningLimit: 10000,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.message.includes('"fontData" is not exported by "\\0virtual:astro:assets/fonts/internal"')) {
            return;
          }

          warn(warning);
        },
      },
    },
  },
});
