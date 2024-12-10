import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { toast } from "sonner";
import { AppKit } from '@reown/appkit';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';

// Initialize AppKit with minimal configuration
const appKit = new AppKit({
  projectId: '3bc71515e830445a56ca773f191fe27e',
  metadata: {
    name: 'Solana Wallet Demo',
    description: 'Simple Solana wallet integration',
    url: window.location.origin,
    icons: [`${window.location.origin}/favicon.ico`]
  },
  adapters: [new SolanaAdapter()],
  networks: [{
    id: 'solana:devnet',
    name: 'Solana Devnet',
    rpcUrl: 'https://api.devnet.solana.com'
  }]
}) as any;

const WalletConnectButton = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeWallet = async () => {
      try {
        await appKit.initialize();
        if (mounted) {
          setIsInitialized(true);
          console.log('Wallet initialized successfully');
        }
      } catch (error) {
        console.error('Wallet initialization error:', error);
        toast.error('Failed to initialize wallet connection');
      }
    };

    initializeWallet();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const handleConnect = (data: any) => {
      console.log('Wallet connected:', data);
      setAddress(data.address);
      setIsConnected(true);
      toast.success('Wallet connected successfully');
    };

    const handleDisconnect = () => {
      console.log('Wallet disconnected');
      setAddress(null);
      setIsConnected(false);
      toast.success('Wallet disconnected');
    };

    const handleError = (error: Error) => {
      console.error('Wallet error:', error);
      toast.error(`Wallet error: ${error.message}`);
    };

    appKit.subscribeEvents({
      connect: handleConnect,
      disconnect: handleDisconnect,
      error: handleError
    });

    return () => {
      appKit.unsubscribeEvents({
        connect: handleConnect,
        disconnect: handleDisconnect,
        error: handleError
      });
    };
  }, [isInitialized]);

  const handleConnect = async () => {
    try {
      await appKit.connect();
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = async () => {
    try {
      await appKit.disconnect();
    } catch (error) {
      console.error('Disconnection error:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  if (!isInitialized) {
    return (
      <Button disabled className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        Initializing...
      </Button>
    );
  }

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
  return <WalletConnectButton />;
};

export default WalletConnect;