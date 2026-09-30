import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const API_PORT = process.env.PORT || 3000;
const WEB_PORT = Number(process.env.WEB_PORT) || 5173;

export default defineConfig({
  plugins: [react()],
  server: {
    port: WEB_PORT,
    // Not strict: if 5173 is taken by another project, Vite falls back to 5174
    // rather than failing. Watch the printed URL.
    strictPort: false,
    // In dev the Vite server serves the app and proxies the API to server.js,
    // so the frontend talks to the exact same endpoints it uses in production.
    proxy: {
      '/api': { target: `http://localhost:${API_PORT}`, changeOrigin: true },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});
