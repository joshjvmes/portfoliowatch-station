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
      'stream': 'stream-browserify',
      'http': 'http-browserify',
      'https': 'https-browserify',
      'zlib': 'browserify-zlib',
      'net': 'net-browserify',
      'tls': 'tls-browserify',
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
    rollupOptions: {
      external: [
        'http',
        'https',
        'net',
        'tls',
        'zlib',
        'util',
        'stream',
        'buffer',
        'process'
      ]
    },
    commonjsOptions: {
      include: [/buffer/, /node_modules/]
    }
  },
}));