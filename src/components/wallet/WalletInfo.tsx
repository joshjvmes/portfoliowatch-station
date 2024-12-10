import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Power, ExternalLink } from "lucide-react";

interface WalletInfoProps {
  address: string;
  handleDisconnect: () => void;
}

export const WalletInfo = ({ address, handleDisconnect }: WalletInfoProps) => {
  const getExplorerLink = () => {
    return `https://explorer.solana.com/address/${address}`;
  };

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <p className="text-gray-400">Connected Address</p>
            <div className="flex items-center gap-2">
              <p className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
              <a
                href={getExplorerLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#AB9FF2] hover:text-[#AB9FF2]/80"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-gray-400">Network</p>
            <Badge variant="outline" className="bg-[#AB9FF2]/10 text-[#AB9FF2] border-[#AB9FF2]/20">
              Solana
            </Badge>
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