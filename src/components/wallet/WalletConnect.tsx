import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { toast } from "sonner";
import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal, useWeb3Modal } from '@web3modal/react';
import { useAccount, useDisconnect } from 'wagmi';
import { useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

// Polyfill Buffer for browser environment
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom?: boolean;
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
    chains,
    version: '2'  // Version is configured here in wagmiConfig
  }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);

// Initialize Phantom wallet adapter with explicit config
const phantomWallet = new PhantomWalletAdapter({
  network: 'mainnet-beta'
});

const WalletConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { connected: isPhantomConnected, connect: connectPhantom, disconnect: disconnectPhantom } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('Wallet component mounted, checking available wallets...');
    if (window.phantom?.solana) {
      console.log('Phantom wallet is available');
    } else {
      console.log('Phantom wallet is not available');
    }
  }, []);

  if (!mounted) return null;

  const handleConnect = async () => {
    try {
      console.log('Attempting to connect wallet...');
      const isPhantomAvailable = window.phantom?.solana?.isPhantom;
      console.log('Phantom available:', isPhantomAvailable);
      
      if (isPhantomAvailable) {
        console.log('Attempting to connect Phantom wallet...');
        await connectPhantom();
        console.log('Phantom wallet connected successfully');
        toast.success('Phantom wallet connected');
      } else {
        console.log('Attempting to open Web3Modal...');
        await open();
        console.log('Web3Modal opened successfully');
      }
    } catch (error) {
      console.error('Detailed connection error:', error);
      toast.error('Failed to connect wallet. Please make sure you have a wallet installed.');
    }
  };

  const handleDisconnect = () => {
    try {
      console.log('Attempting to disconnect wallet...');
      if (isConnected) {
        disconnect();
        console.log('Ethereum wallet disconnected');
      }
      if (isPhantomConnected) {
        disconnectPhantom();
        console.log('Phantom wallet disconnected');
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