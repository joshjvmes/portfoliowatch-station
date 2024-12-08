import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ArbitrageOpportunity {
  buyExchange: string;
  sellExchange: string;
  profitPercentage: number;
  buyPrice: number;
  sellPrice: number;
}

interface Props {
  opportunities: ArbitrageOpportunity[];
}

const ArbitrageOpportunities = ({ opportunities }: Props) => {
  const { toast } = useToast();
  const [previousCount, setPreviousCount] = useState(0);

  useEffect(() => {
    if (opportunities.length > previousCount) {
      const newOpportunities = opportunities.length - previousCount;
      toast({
        title: "New Arbitrage Opportunity",
        description: `Found ${newOpportunities} new arbitrage ${newOpportunities === 1 ? 'opportunity' : 'opportunities'}!`,
        duration: 5000,
      });
    }
    setPreviousCount(opportunities.length);
  }, [opportunities.length, previousCount, toast]);

  if (!opportunities.length) {
    return (
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Cross-Exchange Arbitrage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4 text-gray-400">
            <AlertCircle className="mr-2 h-5 w-5" />
            No arbitrage opportunities found
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Cross-Exchange Arbitrage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity, index) => (
            <div
              key={index}
              className="flex flex-col space-y-2 p-4 rounded-lg bg-white/5"
            >
              <div className="flex justify-between items-center">
                <span className="text-green-400">
                  Buy on {opportunity.buyExchange}
                </span>
                <span className="text-sm text-gray-400">
                  ${opportunity.buyPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-400">
                  Sell on {opportunity.sellExchange}
                </span>
                <span className="text-sm text-gray-400">
                  ${opportunity.sellPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-2">
                <span className="text-sm">Potential Profit</span>
                <span className="text-green-400 font-medium">
                  {opportunity.profitPercentage.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArbitrageOpportunities;