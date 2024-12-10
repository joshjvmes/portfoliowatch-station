import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { toast } from "sonner";
import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { useAccount, useDisconnect } from 'wagmi';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider, useWalletModal } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

// Polyfill Buffer for browser environment
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

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

// Initialize Phantom wallet adapter
const phantomWallet = new PhantomWalletAdapter();

const WalletConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connected: isPhantomConnected, disconnect: disconnectPhantom } = useWalletModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleConnect = async () => {
    try {
      // Check if Phantom is available
      const isPhantomAvailable = window.phantom?.solana?.isPhantom;
      
      if (isPhantomAvailable) {
        // Open Phantom wallet modal
        const { solana } = window.phantom;
        await solana.connect();
        toast.success('Phantom wallet connected');
      } else {
        // If Phantom is not available, open Web3Modal
        document.getElementById('w3m-button')?.click();
      }
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
    <div>
      {isAnyWalletConnected ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDisconnect}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleConnect}
          className="flex items-center gap-2 bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
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