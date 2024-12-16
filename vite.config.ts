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
      '@jup-ag/common': '@jup-ag/common',
      'crypto': 'crypto-browserify',
      'stream': 'stream-browserify',
      'util': 'util',
      'http': 'http-browserify',
      'https': 'https-browserify',
      'net': 'net-browserify',
      'tls': 'tls-browserify',
      'zlib': 'browserify-zlib',
      'process': 'process/browser',
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
        'ws',
        'net',
        'tls',
        'zlib',
        'util',
        'stream',
        'buffer'
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