import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";
import { useWalletConnection } from "@/hooks/useWalletConnection";

export const WalletInfo = () => {
  const { address, chain, balance, handleDisconnect } = useWalletConnection();

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <p className="text-gray-400">Connected Address</p>
            <p className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
          </div>
          <div>
            <p className="text-gray-400">Network</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-[#00E5BE]/10 text-[#00E5BE] border-[#00E5BE]/20">
                {chain?.name || 'Unknown Network'}
              </Badge>
            </div>
          </div>
          <div>
            <p className="text-gray-400">Balance</p>
            <p>{balance?.formatted ? parseFloat(balance.formatted).toFixed(4) : '0'} {balance?.symbol}</p>
          </div>
        </div>
        <Button
          variant="destructive"
          onClick={handleDisconnect}
          className="gap-2"
        >
          <Power className="h-4 w-4" />
          Disconnect
        </Button>
      </CardContent>
    </Card>
  );
};