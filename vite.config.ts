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
      'http': 'stream-http',
      'https': 'https-browserify',
      'zlib': 'browserify-zlib',
      'net': 'node-libs-browser/mock/net',
      'tls': 'node-libs-browser/mock/tls',
      'crypto': 'crypto-browserify',
      'url': 'url',
      'assert': 'assert',
      'os': 'os-browserify/browser',
      'constants': 'constants-browserify',
      'timers': 'timers-browserify',
      'path': 'path-browserify',
      '@jup-ag/common': '@jup-ag/common',
      'node:stream': 'stream-browserify',
      'node:util': 'util',
      'node:buffer': 'buffer',
      'node:http': 'stream-http',
      'node:https': 'https-browserify',
      'node:zlib': 'browserify-zlib',
      'node:net': 'node-libs-browser/mock/net',
    }
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
      '@jup-ag/common',
      '@jup-ag/api',
      'solana-transactions-wrapper',
      'crypto-exchange-arbitrage',
      'axios',
      '@solana/web3.js',
      'cross-fetch',
      '@project-serum/anchor',
      'bs58',
      'ccxt'
    ]
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [
        'http',
        'https',
        'http-proxy-agent',
        'https-proxy-agent',
        'socks-proxy-agent',
        'ws'
      ]
    },
    commonjsOptions: {
      include: [
        /buffer/,
        /node_modules/,
        /@jup-ag\/common/,
        /@jup-ag\/api/,
        /solana-transactions-wrapper/,
        /crypto-exchange-arbitrage/,
        /axios/,
        /@solana\/web3\.js/,
        /cross-fetch/,
        /@project-serum\/anchor/,
        /bs58/,
        /ccxt/
      ]
    }
  },
}));