import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowLeftRight, History, Power, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import WalletConnect from "@/components/wallet/WalletConnect";
import { Badge } from "@/components/ui/badge";
import { appKit } from '@/components/wallet/WalletConnect';

const WalletManagementContent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const handleConnect = (data: any) => {
      setIsConnected(true);
      setAddress(data.address);
      // Here we would typically fetch transaction history
      setTransactions([
        { hash: '0x123...', type: 'Send', amount: '0.1 SOL', status: 'Completed' },
        { hash: '0x456...', type: 'Receive', amount: '0.05 SOL', status: 'Completed' },
      ]);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setAddress(null);
      setTransactions([]);
    };

    appKit.addEventListener('connect', handleConnect);
    appKit.addEventListener('disconnect', handleDisconnect);

    return () => {
      appKit.removeEventListener('connect', handleConnect);
      appKit.removeEventListener('disconnect', handleDisconnect);
    };
  }, []);

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <Wallet className="h-16 w-16 text-[#00E5BE]" />
            <p className="text-gray-400 text-center">
              Connect your wallet to view your assets and transactions
            </p>
            <WalletConnect />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Wallet Overview */}
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Wallet Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="text-gray-400">Connected Address</p>
              <p className="font-mono">{address}</p>
            </div>
            <div>
              <p className="text-gray-400">Network</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-[#00E5BE]/10 text-[#00E5BE] border-[#00E5BE]/20">
                  Solana Devnet
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-black/20"
              >
                <div className="flex items-center gap-3">
                  {tx.type === 'Send' ? (
                    <ArrowLeftRight className="h-5 w-5 text-red-400" />
                  ) : (
                    <ArrowLeftRight className="h-5 w-5 text-green-400" />
                  )}
                  <div>
                    <div className="text-sm text-gray-400">{tx.type}</div>
                    <div className="text-white font-medium">{tx.amount}</div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-[#00E5BE]/10 text-[#00E5BE] border-[#00E5BE]/20">
                  {tx.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const WalletManagement = () => {
  return (
    <DashboardLayout>
      <WalletManagementContent />
    </DashboardLayout>
  );
};

export default WalletManagement;