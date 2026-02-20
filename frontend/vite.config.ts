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
      '/ws': {
        target: 'ws://localhost:8099',
        ws: true,
        configure: (proxy) => {
          proxy.on('error', (err: NodeJS.ErrnoException) => {
            if (err.code === 'ECONNABORTED' || err.code === 'ECONNRESET') {
              return;
            }
            console.error('[vite] ws proxy error:', err.message);
          });
          // Swallow socket write errors when client disconnects (avoids uncaught ECONNABORTED)
          proxy.on('proxyReqWs', (proxyReq, req, socket) => {
            socket.on('error', (err: NodeJS.ErrnoException) => {
              if (err.code === 'ECONNABORTED' || err.code === 'ECONNRESET') return;
              console.error('[vite] ws proxy socket error:', err.message);
            });
          });
        },
      },
      '/h2-console': { target: 'http://localhost:8099', changeOrigin: true },
    },
  },
});
