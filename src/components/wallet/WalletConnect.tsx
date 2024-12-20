import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { toast } from "sonner";
import { NetworkStatus } from "./NetworkStatus";
import { WalletInfo } from "./WalletInfo";
import { Card, CardContent } from "@/components/ui/card";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<'phantom' | 'walletconnect' | null>(null);

  useEffect(() => {
    // Check if Phantom is installed and previously connected
    const checkPhantomWallet = async () => {
      try {
        const provider = (window as any).solana;
        if (provider?.isPhantom && localStorage.getItem('phantomConnected') === 'true') {
          const response = await provider.connect();
          setPublicKey(response.publicKey.toString());
          setIsConnected(true);
          setSelectedWallet('phantom');
          toast.success('Wallet connected successfully');
        }
      } catch (error) {
        console.error('Phantom connection error:', error);
      }
    };

    checkPhantomWallet();
  }, []);

  const handlePhantomConnect = async () => {
    try {
      const provider = (window as any).solana;
      
      if (!provider) {
        window.open('https://phantom.app/', '_blank');
        toast.error('Please install Phantom Wallet');
        return;
      }

      if (!provider.isPhantom) {
        toast.error('Please install Phantom Wallet');
        return;
      }

      const response = await provider.connect();
      setPublicKey(response.publicKey.toString());
      setIsConnected(true);
      setSelectedWallet('phantom');
      localStorage.setItem('phantomConnected', 'true');
      toast.success('Phantom wallet connected successfully');
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet. Please try again.');
    }
  };

  const handleWalletConnectConnect = async () => {
    try {
      // For now, show a coming soon message while we implement WalletConnect
      toast.info('WalletConnect integration coming soon!');
      
      // TODO: Implement WalletConnect when their Solana support is more stable
      // Currently, WalletConnect's Solana support is in development
      // We'll keep the placeholder for future implementation
    } catch (error) {
      console.error('WalletConnect error:', error);
      toast.error('Failed to connect with WalletConnect');
    }
  };

  const handleDisconnect = async () => {
    try {
      if (selectedWallet === 'phantom') {
        const provider = (window as any).solana;
        if (provider) {
          await provider.disconnect();
          localStorage.removeItem('phantomConnected');
        }
      }
      
      setIsConnected(false);
      setPublicKey(null);
      setSelectedWallet(null);
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Disconnection error:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  if (isConnected && publicKey) {
    return (
      <div className="space-y-4">
        <NetworkStatus />
        <WalletInfo 
          address={publicKey}
          handleDisconnect={handleDisconnect}
        />
      </div>
    );
  }

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Button
            onClick={handlePhantomConnect}
            className="flex-1 flex items-center justify-center gap-2 bg-[#AB9FF2] hover:bg-[#AB9FF2]/90 text-black"
          >
            <Wallet className="h-4 w-4" />
            Connect Phantom
          </Button>
          
          <Button
            onClick={handleWalletConnectConnect}
            className="flex-1 flex items-center justify-center gap-2 bg-[#3B99FC] hover:bg-[#3B99FC]/90 text-white"
          >
            <Wallet className="h-4 w-4" />
            WalletConnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;