import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vanillaExtractPlugin(),
  ],
  resolve: {
    alias: {
      'rainbowkit-vue': path.resolve(__dirname, '../../packages/rainbowkit-vue/src'),
    },
  },
})
