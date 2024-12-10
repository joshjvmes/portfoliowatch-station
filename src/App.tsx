import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TourProvider } from "@/contexts/TourContext";
import { TourTooltip } from "@/components/tour/TourTooltip";
import { routes } from "@/routes";
import * as React from 'react';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '@/components/wallet/WalletConnect';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

// Solana network configuration
const network = clusterApiUrl('devnet');
const wallets = [new PhantomWalletAdapter()];

const App = () => {
  return (
    <React.StrictMode>
      <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={wallets} autoConnect>
          <WagmiConfig config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <TooltipProvider>
                <BrowserRouter>
                  <TourProvider>
                    <Toaster />
                    <Sonner />
                    <TourTooltip />
                    <Routes>
                      {routes.map((route) => (
                        <Route
                          key={route.path}
                          path={route.path}
                          element={route.element}
                        />
                      ))}
                    </Routes>
                  </TourProvider>
                </BrowserRouter>
              </TooltipProvider>
            </QueryClientProvider>
          </WagmiConfig>
        </WalletProvider>
      </ConnectionProvider>
    </React.StrictMode>
  );
};

export default App;