import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    host: "::",
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Add specific resolutions for problematic packages
      '@jup-ag/common': '@jup-ag/common/dist/lib/index.js',
    },
    mainFields: ['browser', 'module', 'main', 'jsnext:main'],
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      platform: 'browser',
      supported: {
        bigint: true
      },
    },
    include: [
      '@jup-ag/core',
      '@jup-ag/common',
      '@solana/web3.js',
      'buffer',
    ]
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [
        /node_modules\/@jup-ag\/*/,
        /node_modules\/@solana\/*/,
      ]
    },
    rollupOptions: {
      external: ['fsevents'],
    }
  }
}));