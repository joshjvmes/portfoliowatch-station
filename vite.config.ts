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
      buffer: 'buffer/',
      fs: 'browserify-fs',
      path: 'path-browserify',
      os: 'os-browserify/browser',
      crypto: 'crypto-browserify',
    },
    dedupe: ['@jup-ag/common', '@jup-ag/core'],
  },
  define: {
    'process.env': {},
    'global': {},
  },
  optimizeDeps: {
    include: [
      '@solana/web3.js',
      '@solana/spl-token',
      '@jup-ag/common',
      '@jup-ag/core',
      'buffer',
    ],
    exclude: [
      '@mercurial-finance/optimist',
    ],
    esbuildOptions: {
      target: 'esnext',
      platform: 'browser',
      supported: {
        'bigint': true
      },
    },
  },
  build: {
    target: 'esnext',
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto',
    },
    rollupOptions: {
      external: [
        '@mercurial-finance/optimist',
      ],
      output: {
        manualChunks: {
          solana: ['@solana/web3.js', '@solana/spl-token'],
          jupiter: ['@jup-ag/common', '@jup-ag/core'],
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
}));