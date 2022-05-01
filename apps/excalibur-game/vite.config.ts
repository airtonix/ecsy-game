import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * @type {import('vite').UserConfig}
 */
const config = defineConfig(() => {
  return {
    plugins: [
      tsconfigPaths({
        root: '../..',
      }),
      react(),
    ],
    root: './',

    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },

    build: {
      outDir: '../../dist/apps/excalibur-game',
      emptyOutDir: false,
    },
  };
});

export default config;
