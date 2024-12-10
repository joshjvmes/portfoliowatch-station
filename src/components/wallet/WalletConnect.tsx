import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { toast } from "sonner";
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

// Configure chains & providers
const projectId = '3bc71515e830445a56ca773f191fe27e';

const { publicClient, chains } = configureChains(
  [mainnet, polygon],
  [w3mProvider({ projectId })]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ 
    projectId, 
    chains 
  }),
  publicClient,
});

// Create ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const WalletConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Wallet connected successfully!');
    } catch (error) {
      toast.error('Failed to connect wallet');
      console.error('Connection error:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success('Wallet disconnected');
    } catch (error) {
      toast.error('Failed to disconnect wallet');
      console.error('Disconnection error:', error);
    }
  };

  return (
    <div>
      {isConnected ? (
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
    <>
      <WagmiConfig config={wagmiConfig}>
        <WalletConnectButton />
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode="dark"
        themeVariables={{
          '--w3m-accent-color': '#00E5BE',
          '--w3m-background-color': '#0B1221',
        }}
      />
    </>
  );
};

export default WalletConnect;