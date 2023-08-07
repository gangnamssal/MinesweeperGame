/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@helper', replacement: '/src/helper' },
      { find: '@store', replacement: '/src/store' },
      { find: '@style', replacement: '/src/style' },
      { find: '@components', replacement: '/src/components' },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});
