import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { WalletInfo } from "./WalletInfo";

export const projectId = '3bc71515e830445a56ca773f191fe27e';

const chains = [mainnet, polygon];

const { publicClient } = configureChains(
  chains,
  [w3mProvider({ projectId })]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ 
    projectId,
    chains,
    version: 2, // Add version specification
  }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);

const WalletConnectButton = () => {
  const { isConnected } = useWalletConnection();

  const handleConnect = async () => {
    try {
      console.log('Attempting to open Web3Modal');
      // Use a more direct method to open the modal
      if (window.ethereum) {
        console.log('Ethereum provider detected');
      }
      // Dispatch the event to open the modal
      const event = new Event('w3m-open-modal');
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Connection error:', error);
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

// Separate the Web3Modal configuration
const Web3ModalConfig = () => {
  return (
    <Web3Modal
      projectId={projectId}
      ethereumClient={ethereumClient}
      themeMode="dark"
      themeVariables={{
        '--w3m-accent-color': '#00E5BE',
        '--w3m-background-color': '#0B1221',
      }}
    />
  );
};

const WalletConnect = () => {
  return (
    <>
      <Web3ModalConfig />
      <WagmiConfig config={wagmiConfig}>
        <WalletConnectButton />
      </WagmiConfig>
    </>
  );
};

export default WalletConnect;