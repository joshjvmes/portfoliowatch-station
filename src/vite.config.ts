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
      'process': 'process/browser',
      'util': 'util',
      'stream': 'stream-browserify'
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
    include: ['buffer', 'process/browser', 'util', 'stream-browserify']
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      include: [/buffer/, /node_modules/],
      transformMixedEsModules: true,
      strictRequires: true,
      esmExternals: true
    }
  },
}));