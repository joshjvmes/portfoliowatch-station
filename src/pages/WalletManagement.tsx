import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import WalletConnect from "@/components/wallet/WalletConnect";

const WalletManagementContent = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <Wallet className="h-16 w-16 text-[#AB9FF2]" />
          <p className="text-gray-400 text-center">
            Connect your Phantom wallet to view your assets and transactions
          </p>
          <WalletConnect />
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