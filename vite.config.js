import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $animations: path.resolve('src/lib/animations'),
      $api: path.resolve('src/routes/api'),
      $assets: path.resolve('src/assets'),
      $backend: path.resolve('src/backend'),
      $color: path.resolve('src/lib/color'),
      $common: path.resolve('src/lib/common'),
      $db: path.resolve('src/db'),
      // $lib: path.resolve('src/lib'), // handled automatically
      $number: path.resolve('src/lib/number'),
      $routes: path.resolve('src/routes'),
      $time: path.resolve('src/lib/time'),
      $tools: path.resolve('src/lib/tools'),
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
