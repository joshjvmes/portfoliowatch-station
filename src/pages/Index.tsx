import WalletConnect from "@/components/wallet/WalletConnect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1221]">
      <Card className="w-full max-w-md mx-4 bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-center text-white">Connect Your Wallet</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <Wallet className="h-16 w-16 text-[#00E5BE]" />
          <p className="text-gray-400 text-center">
            Connect your wallet to access the AI Trading Command Center
          </p>
          <WalletConnect />
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;