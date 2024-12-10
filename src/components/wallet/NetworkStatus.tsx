import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export const NetworkStatus = () => {
  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <Badge 
              variant="outline" 
              className="bg-green-500/10 text-green-500 border-green-500/20"
            >
              Solana Mainnet
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};