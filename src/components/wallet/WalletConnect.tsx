import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { WalletInfo } from "./WalletInfo";
import { toast } from "sonner";

// Make sure to use a valid project ID from WalletConnect Cloud
export const projectId = '3bc71515e830445a56ca773f191fe27e';

const chains = [mainnet, polygon];

const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  [w3mProvider({ projectId })]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ 
    projectId,
    chains,
    version: 2,
  }),
  publicClient,
  webSocketPublicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);

declare global {
  interface Window {
    ethereum?: any;
  }
}

const WalletConnectButton = () => {
  const { isConnected } = useWalletConnection();

  const handleConnect = async () => {
    try {
      console.log('Attempting to open Web3Modal');
      
      if (typeof window === 'undefined') {
        console.error('Window object not available');
        toast.error('Browser environment not detected');
        return;
      }

      // Create and dispatch the event
      const event = new CustomEvent('w3m-open-modal', { bubbles: true });
      window.dispatchEvent(event);
      console.log('Web3Modal event dispatched');

    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet. Please try again.');
    }
  };

  if (isConnected) {
    return <WalletInfo />;
  }

  return (
    <Button
      onClick={handleConnect}
      className="w-full flex items-center justify-center gap-2 bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
    >
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  );
};

const Web3ModalConfig = () => {
  return (
    <Web3Modal
      projectId={projectId}
      ethereumClient={ethereumClient}
      themeMode="dark"
      themeVariables={{
        '--w3m-accent-color': '#00E5BE',
        '--w3m-background-color': '#0B1221',
        '--w3m-z-index': '1000',
      }}
    />
  );
};

const WalletConnect = () => {
  return (
    <>
      <WalletConnectButton />
      <Web3ModalConfig />
    </>
  );
};

export default WalletConnect;