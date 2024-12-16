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
      'crypto': 'crypto-browserify',
      'url': 'url',
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
      'process',
      'util',
      'stream-browserify',
      'http-browserify',
      'https-browserify',
      'browserify-zlib',
      'net-browserify',
      'tls-browserify',
      'crypto-browserify',
      'url',
      'axios'
    ]
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [
        'node:http',
        'node:https',
        'node:zlib',
        'node:stream',
        'node:buffer',
        'node:util',
        'node:url',
        'node:net'
      ]
    },
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
}));