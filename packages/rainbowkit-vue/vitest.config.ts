import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    watch: false,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/examples/with-next-mint-nft/contract/**',
    ],
  },
});
