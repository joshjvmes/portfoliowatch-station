import { useNetwork, useSwitchNetwork } from 'wagmi';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const NetworkStatus = () => {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
    onSuccess() {
      toast.success('Network switched successfully');
    },
    onError(error) {
      toast.error('Failed to switch network: ' + error.message);
    },
  });

  if (!chain) return null;

  const isSupported = chains.some(c => c.id === chain.id);

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSupported ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            )}
            <Badge 
              variant="outline" 
              className={`${
                isSupported 
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
              }`}
            >
              {chain.name}
            </Badge>
          </div>
          
          {!isSupported && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-yellow-500">Unsupported Network</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => switchNetwork?.(1)} // Switch to Ethereum mainnet
                disabled={isLoading}
                className="gap-2"
              >
                Switch to Ethereum
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-400">
            {error.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
};