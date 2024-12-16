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
      'http-proxy-agent': 'http-proxy-agent/dist/index.js',
      'https-proxy-agent': 'https-proxy-agent/dist/index.js',
      'socks-proxy-agent': 'socks-proxy-agent/dist/index.js',
      'ws': 'ws/browser.js'
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
      'axios',
      'http-proxy-agent',
      'https-proxy-agent',
      'socks-proxy-agent',
      'ws'
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
        'node:net',
        'node:tls',
        'http-proxy-agent',
        'https-proxy-agent',
        'socks-proxy-agent',
        'ws'
      ]
    },
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
}));