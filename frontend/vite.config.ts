import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: '../src/main/resources/static',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:8099', changeOrigin: true },
      '/ws': { target: 'ws://localhost:8099', ws: true },
      '/h2-console': { target: 'http://localhost:8099', changeOrigin: true },
    },
  },
});
