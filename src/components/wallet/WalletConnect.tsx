import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { toast } from "sonner";
import { NetworkStatus } from "./NetworkStatus";
import { WalletInfo } from "./WalletInfo";

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    // Check if Phantom is installed
    const checkPhantomWallet = async () => {
      try {
        const provider = (window as any).solana;
        if (provider?.isPhantom) {
          const response = await provider.connect();
          setPublicKey(response.publicKey.toString());
          setIsConnected(true);
          toast.success('Wallet connected successfully');
        }
      } catch (error) {
        console.error('Phantom connection error:', error);
      }
    };

    // Check if there's an existing connection
    if (localStorage.getItem('phantomConnected') === 'true') {
      checkPhantomWallet();
    }
  }, []);

  const handleConnect = async () => {
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
      localStorage.setItem('phantomConnected', 'true');
      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet. Please try again.');
    }
  };

  const handleDisconnect = async () => {
    try {
      const provider = (window as any).solana;
      if (provider) {
        await provider.disconnect();
        setIsConnected(false);
        setPublicKey(null);
        localStorage.removeItem('phantomConnected');
        toast.success('Wallet disconnected');
      }
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
    <Button
      onClick={handleConnect}
      className="w-full flex items-center justify-center gap-2 bg-[#AB9FF2] hover:bg-[#AB9FF2]/90 text-black"
    >
      <Wallet className="h-4 w-4" />
      Connect Phantom
    </Button>
  );
};

export default WalletConnect;