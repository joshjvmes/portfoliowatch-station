import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { JupiterForm } from "@/components/jupiter/JupiterForm";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { toast } from "sonner";

const JupiterExchange = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const provider = (window as any).solana;
        if (provider?.isPhantom && provider.isConnected) {
          setIsWalletConnected(true);
        }
      } catch (error) {
        console.error('Wallet connection check error:', error);
      }
    };

    checkWalletConnection();
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

      await provider.connect();
      setIsWalletConnected(true);
      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet');
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <ErrorBoundary>
          <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Jupiter Exchange</CardTitle>
            </CardHeader>
            <CardContent>
              {!isWalletConnected ? (
                <div className="text-center">
                  <p className="mb-4 text-gray-400">Connect your wallet to start trading</p>
                  <button
                    onClick={handleConnect}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Connect Phantom Wallet
                  </button>
                </div>
              ) : (
                <JupiterForm />
              )}
            </CardContent>
          </Card>
        </ErrorBoundary>
      </div>
    </DashboardLayout>
  );
};

export default JupiterExchange;