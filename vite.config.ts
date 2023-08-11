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
      { find: '@style', replacement: '/src/style' },
      { find: '@store', replacement: '/src/store' },
      { find: '@mocks', replacement: '/__mocks__' },
      { find: '@fixtures', replacement: '/fixtures' },
      { find: '@helper', replacement: '/src/helper' },
      { find: '@components', replacement: '/src/components' },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});
