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
      'assert': 'assert',
      'os': 'os-browserify/browser',
      'constants': 'constants-browserify',
      'path': 'path-browserify',
      'fs': false,
      'node:buffer': 'buffer',
      'node:stream': 'stream-browserify',
      'node:util': 'util',
      'node:url': 'url',
      'node:http': 'http-browserify',
      'node:https': 'https-browserify',
      'node:zlib': 'browserify-zlib',
      'node:net': 'net-browserify',
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
      'process/browser', 
      'util', 
      'stream-browserify',
      'http-browserify',
      'https-browserify',
      'browserify-zlib',
      'net-browserify',
      'tls-browserify',
      'crypto-browserify',
      'url',
      'assert',
      'os-browserify/browser',
      'constants-browserify',
      'path-browserify',
      'ccxt'
    ]
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [
        'fs',
        'path',
        'crypto',
        'http',
        'https',
        'net',
        'tls',
        'zlib',
        'util',
        'stream',
        'buffer',
        'process',
        'os',
        'constants'
      ]
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      strictRequires: true,
      esmExternals: true
    }
  },
}));