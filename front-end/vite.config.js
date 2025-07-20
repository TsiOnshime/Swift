import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Import inject plugin from vite-plugin-inject
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ registerType: 'autoUpdate' }),
    // Inject Buffer globally for all code (including dependencies)
    {
      ...inject({
        Buffer: ['buffer', 'Buffer'],
      }),
      enforce: 'post'
    }
  ],
  define: {
    'process.env': {},
    global: 'window',
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
});
