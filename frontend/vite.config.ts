import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { prerenderPagesPlugin } from './src/build/prerenderPlugin.ts';

export default defineConfig({
  plugins: [react(), prerenderPagesPlugin()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
        },
      },
    },
  },
});
