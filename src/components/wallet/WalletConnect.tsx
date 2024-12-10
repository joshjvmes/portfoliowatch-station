import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { toast } from "sonner";
import { AppKit, WalletType } from '@reown/appkit';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { useWallet } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';

// Polyfill Buffer for browser environment
globalThis.Buffer = Buffer;

const appKit = new AppKit({
  adapters: [
    new SolanaAdapter({
      network: 'mainnet-beta',
      walletTypes: [WalletType.Phantom],
    }),
  ],
});

const WalletConnectButton = () => {
  const [mounted, setMounted] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { connected: isPhantomConnected, disconnect: disconnectPhantom } = useWallet();

  useEffect(() => {
    setMounted(true);
    console.log('Wallet component mounted, checking AppKit status...');
    
    // Setup AppKit listeners
    const unsubscribe = appKit.on('walletChange', (wallet) => {
      console.log('Wallet changed:', wallet);
      if (wallet) {
        setWalletAddress(wallet.address);
        toast.success('Wallet connected');
      } else {
        setWalletAddress(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!mounted) return null;

  const handleConnect = async () => {
    try {
      console.log('Attempting to connect wallet via AppKit...');
      await appKit.connect(WalletType.Phantom);
      console.log('AppKit wallet connected successfully');
    } catch (error) {
      console.error('Detailed connection error:', error);
      toast.error('Failed to connect wallet. Please make sure you have Phantom wallet installed.');
    }
  };

  const handleDisconnect = async () => {
    try {
      console.log('Attempting to disconnect wallet...');
      await appKit.disconnect();
      if (isPhantomConnected) {
        disconnectPhantom();
      }
      setWalletAddress(null);
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Disconnection error:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  const isWalletConnected = !!walletAddress || isPhantomConnected;

  return (
    <div>
      {isWalletConnected ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
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