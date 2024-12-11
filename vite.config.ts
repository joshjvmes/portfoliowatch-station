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
      'solana-transactions-wrapper',
      'crypto-exchange-arbitrage',
      'axios',
      '@solana/web3.js',
      'cross-fetch',
      '@project-serum/anchor',
      'bs58'
    ]
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      include: [
        /buffer/,
        /node_modules/,
        /@jup-ag\/common/,
        /solana-transactions-wrapper/,
        /crypto-exchange-arbitrage/,
        /axios/,
        /@solana\/web3\.js/,
        /cross-fetch/,
        /@project-serum\/anchor/,
        /bs58/
      ]
    }
  },
}));