import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $api: path.resolve('src/routes/api'),
      $assets: path.resolve('src/assets'),
      $backend: path.resolve('src/backend'),
      $components: path.resolve('src/lib/components'),
      $db: path.resolve('src/db'),
      $lib: path.resolve('src/lib'),
      $routes: path.resolve('src/routes'),
      $stores: path.resolve('src/lib/stores'),
      $transitions: path.resolve('static/transitions'),
    },
  },
  server: {
    fs: {
      allow: ['static'],
    },
  },
  test: {
    globals: true,
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
};

export default config;
