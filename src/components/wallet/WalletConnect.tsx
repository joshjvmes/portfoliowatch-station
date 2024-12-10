import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal, useWeb3Modal } from '@web3modal/react';
import { useAccount, useDisconnect } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';

// Polyfill Buffer for browser environment
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

const projectId = 'YOUR_PROJECT_ID';

const chains = [mainnet, polygon, optimism, arbitrum];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ 
    projectId, 
    chains
  }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);

const WalletConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { connected: isPhantomConnected, connect: connectPhantom, disconnect: disconnectPhantom, publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleConnect = async () => {
    try {
      // Try to connect with Web3Modal first
      await open();
      
      // If Web3Modal connection fails, try Phantom
      if (!isConnected) {
        try {
          await connectPhantom();
        } catch (error) {
          console.error('Phantom connection error:', error);
          toast.error('Failed to connect Phantom wallet. Please try again.');
        }
      }
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet. Please try again.');
    }
  };

  const handleDisconnect = () => {
    try {
      // Disconnect from both if connected
      if (isConnected) {
        disconnect();
      }
      if (isPhantomConnected) {
        disconnectPhantom();
      }
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Disconnection error:', error);
      toast.error('Failed to disconnect wallet. Please try again.');
    }
  };

  const isAnyWalletConnected = isConnected || isPhantomConnected;
  const displayAddress = isConnected ? address : (publicKey?.toBase58() || '');

  return (
    <div>
      {isAnyWalletConnected ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {displayAddress?.slice(0, 6)}...{displayAddress?.slice(-4)}
          </span>
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
};

export default WalletConnectButton;