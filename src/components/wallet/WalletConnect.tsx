import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { toast } from "sonner";
import { AppKit } from '@reown/appkit';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { Buffer } from 'buffer';

// Polyfill Buffer for browser environment
globalThis.Buffer = Buffer;

interface WalletConnectData {
  accounts: string[];
}

const WalletConnectButton = () => {
  const [appKit, setAppKit] = useState<AppKit | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initializeAppKit = async () => {
      try {
        console.log('Initializing AppKit...');
        const solanaAdapter = new SolanaAdapter({
          endpoint: 'https://api.devnet.solana.com'
        });

        const kit = new AppKit({
          adapters: [solanaAdapter],
          networks: ['solana:devnet'] as const,
          metadata: {
            name: 'My DApp',
            description: 'My decentralized application',
            url: window.location.origin,
            icons: ['https://your-icon-url.com/icon.png']
          }
        });

        console.log('AppKit initialized successfully');
        setAppKit(kit);

        // Set up event listeners
        kit.on('connect', (data: WalletConnectData) => {
          console.log('Wallet connected:', data);
          setIsConnected(true);
          setWalletAddress(data.accounts[0]);
          toast.success('Wallet connected successfully');
        });

        kit.on('disconnect', () => {
          console.log('Wallet disconnected');
          setIsConnected(false);
          setWalletAddress(null);
          toast.success('Wallet disconnected');
        });

        kit.on('error', (error: Error) => {
          console.error('Wallet error:', error);
          toast.error(error.message || 'Failed to connect wallet');
        });

      } catch (error) {
        console.error('Error initializing AppKit:', error);
        toast.error('Failed to initialize wallet connection');
      }
    };

    initializeAppKit();
    setMounted(true);

    return () => {
      if (appKit) {
        appKit.removeAllListeners();
      }
    };
  }, []);

  const handleConnect = async () => {
    try {
      console.log('Attempting to connect wallet...');
      if (!appKit) {
        throw new Error('AppKit not initialized');
      }
      await appKit.request({ method: 'connect' });
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = async () => {
    try {
      console.log('Attempting to disconnect wallet...');
      if (!appKit) {
        throw new Error('AppKit not initialized');
      }
      await appKit.request({ method: 'disconnect' });
    } catch (error) {
      console.error('Disconnection error:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  if (!mounted) return null;

  return (
    <div>
      {isConnected && walletAddress ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
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