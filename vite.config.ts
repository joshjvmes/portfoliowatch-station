import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Connect } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add middleware to handle client-side routing
    middlewares: [
      (req: Connect.IncomingMessage, res: any, next: Connect.NextFunction) => {
        // Check if the request is for a static file
        if (req.url?.includes('.')) {
          return next();
        }
        // For all other requests, serve index.html
        req.url = '/index.html';
        next();
      },
    ],
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));