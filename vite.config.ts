import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // The production website lives in ./randomlytools and is a static
  // multi-page site. Keep Vite compatible with that layout if it is
  // invoked directly, while the Cloudflare build uses build-static.mjs.
  root: path.resolve(__dirname, 'randomlytools'),

  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'randomlytools'),
    },
  },

  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
