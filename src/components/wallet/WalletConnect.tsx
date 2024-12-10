import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { toast } from "sonner";
import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { useAccount, useDisconnect, useBalance, useNetwork } from 'wagmi';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css';

// Polyfill Buffer for browser environment
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom?: boolean;
        connect(): Promise<{ publicKey: string }>;
      };
    };
  }
}

export const projectId = '3bc71515e830445a56ca773f191fe27e';

const { publicClient, chains } = configureChains(
  [mainnet, polygon],
  [w3mProvider({ projectId })]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ 
    projectId, 
    chains
  }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);
const phantomWallet = new PhantomWalletAdapter();

const WalletConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({
    address: address,
  });
  const { disconnect } = useDisconnect();
  const { connected: isPhantomConnected, disconnect: disconnectPhantom } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleConnect = async () => {
    try {
      // Create and click a hidden Web3Modal button
      const w3mButton = document.createElement('w3m-button');
      document.body.appendChild(w3mButton);
      w3mButton.click();
      document.body.removeChild(w3mButton);
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet. Please try again.');
    }
  };

  const handleDisconnect = () => {
    try {
      if (isConnected) {
        disconnect();
      }
      if (isPhantomConnected) {
        disconnectPhantom();
      }
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Disconnection error:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  const isAnyWalletConnected = isConnected || isPhantomConnected;

  return (
    <div className="space-y-4">
      {isAnyWalletConnected ? (
        <div className="space-y-4">
          <div className="p-6 rounded-lg bg-[#0B1221]/50 border border-white/10 backdrop-blur-xl">
            <h3 className="text-lg font-semibold mb-4">Wallet Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Address</span>
                <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </div>
              {chain && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Network</span>
                  <span className="text-[#00E5BE]">{chain.name}</span>
                </div>
              )}
              {balance && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Balance</span>
                  <span>{parseFloat(balance.formatted).toFixed(4)} {balance.symbol}</span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={handleDisconnect}
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleConnect}
          className="w-full flex items-center justify-center gap-2 bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
        >
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

const WalletConnect = () => {
  return (
    <WalletProvider wallets={[phantomWallet]} autoConnect>
      <WalletModalProvider>
        <WalletConnectButton />
        <Web3Modal
          projectId={projectId}
          ethereumClient={ethereumClient}
          themeMode="dark"
          themeVariables={{
            '--w3m-accent-color': '#00E5BE',
            '--w3m-background-color': '#0B1221',
          }}
        />
      </WalletModalProvider>
    </WalletProvider>
  );
};

export default WalletConnect;