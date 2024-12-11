import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'buffer': 'buffer',
      '@jup-ag/common': path.resolve(__dirname, 'node_modules/@jup-ag/common/dist/lib/index.js')
    },
  },
  define: {
    'process.env': {},
    'global': {},
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
    include: [
      'buffer',
      '@jup-ag/core',
      '@jup-ag/common'
    ]
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      include: [/buffer/, /node_modules/],
      transformMixedEsModules: true
    }
  },
}));