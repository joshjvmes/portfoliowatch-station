import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNetwork } from "wagmi";
import { Badge } from "@/components/ui/badge";

const NetworkStatus = () => {
  const { chain } = useNetwork();

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white">Network Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {chain && (
            <>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[#00E5BE]">
                  {chain.name}
                </Badge>
                {chain.unsupported && (
                  <Badge variant="destructive">Unsupported</Badge>
                )}
              </div>
              <p className="text-sm text-gray-400">
                Chain ID: {chain.id}
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatus;