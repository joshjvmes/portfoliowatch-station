import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
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
      'buffer',
      'jsbi',
    ],
    exclude: ['@jup-ag/common'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: ['@jup-ag/common'],
      output: {
        manualChunks: {
          jupiter: ['@jup-ag/core'],
          solana: ['@solana/web3.js'],
        },
      },
    },
  },
});