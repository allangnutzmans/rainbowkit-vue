import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2020',
  },
  plugins: [react(), vue()],
  resolve: {
    alias: {
      'rainbowkit-vue': path.resolve(__dirname, '../../packages/rainbowkit-vue/src/components'),
    },
  },
});
