import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'buffer': 'buffer/',
    },
  },
  define: {
    'process.env': {},
    'global': {},
  },
  optimizeDeps: {
    include: [
      '@jup-ag/core',
      '@jup-ag/common',
      '@solana/web3.js',
      'buffer',
      'jsbi',
    ],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      include: [
        /node_modules/,
        /\@jup-ag/,
      ],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          jupiter: ['@jup-ag/core', '@jup-ag/common'],
          solana: ['@solana/web3.js'],
        },
      },
    },
  },
});