import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      '@solana/web3.js',
      '@solana/spl-token',
      '@project-serum/serum',
      '@jup-ag/core',
    ],
    exclude: [
      '@mercurial-finance/optimist',
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: [
        '@jup-ag/common',
        '@mercurial-finance/optimist',
      ],
      output: {
        manualChunks: {
          jupiter: ['@jup-ag/core'],
          solana: ['@solana/web3.js', '@solana/spl-token'],
        },
      },
    },
  },
}));