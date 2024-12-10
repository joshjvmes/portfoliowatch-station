import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { toast } from "sonner";
import { AppKit } from '@reown/appkit';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';

// Initialize AppKit with Solana adapter
export const appKit = new AppKit({
  projectId: '3bc71515e830445a56ca773f191fe27e',
  name: 'Your App Name',
  adapters: [
    new SolanaAdapter({
      rpcUrl: 'https://api.devnet.solana.com'
    })
  ],
  networks: ['solana:devnet']
});

// Export configuration for Web3Modal
export const projectId = '3bc71515e830445a56ca773f191fe27e';

const WalletConnectButton = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Set up event listeners
    appKit.on('connect', (data: any) => {
      console.log('Wallet connected:', data);
      setAddress(data.address);
      setIsConnected(true);
      toast.success('Wallet connected successfully');
    });

    appKit.on('disconnect', () => {
      console.log('Wallet disconnected');
      setAddress(null);
      setIsConnected(false);
      toast.success('Wallet disconnected');
    });

    appKit.on('error', (error: Error) => {
      console.error('Wallet error:', error);
      toast.error('Wallet error: ' + error.message);
    });

    // Cleanup listeners on unmount
    return () => {
      appKit.removeAllListeners();
    };
  }, []);

  if (!mounted) return null;

  const handleConnect = async () => {
    try {
      await appKit.request({
        method: 'connect',
        params: []
      });
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet. Please try again.');
    }
  };

  const handleDisconnect = async () => {
    try {
      await appKit.request({
        method: 'disconnect',
        params: []
      });
    } catch (error) {
      console.error('Disconnection error:', error);
      toast.error('Failed to disconnect wallet');
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
  return <WalletConnectButton />;
};

export default WalletConnect;