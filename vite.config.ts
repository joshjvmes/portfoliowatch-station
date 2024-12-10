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
    }
  },
  define: {
    'process.env': {},
    'global': {},
  },
  optimizeDeps: {
    include: [
      '@solana/web3.js',
      '@solana/spl-token',
      'buffer',
    ],
    exclude: [
      '@mercurial-finance/optimist',
    ],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: 'esnext',
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: [
        '@mercurial-finance/optimist',
      ],
      output: {
        manualChunks: {
          solana: ['@solana/web3.js', '@solana/spl-token'],
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
}));