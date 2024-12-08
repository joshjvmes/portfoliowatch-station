import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArbitrageOpportunity {
  coin: string;
  symbol: string;
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  profitPercentage: number;
  volume24h: string;
  estimatedProfit: number;
  transferTime: string;
  fees: number;
}

const ArbitrageAnalysis = () => {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [sortField, setSortField] = useState<keyof ArbitrageOpportunity>("profitPercentage");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();

  // Simulate fetching data from multiple exchanges
  useEffect(() => {
    const fetchData = async () => {
      // In a real implementation, this would fetch from actual exchange APIs
      const mockData: ArbitrageOpportunity[] = [
        {
          coin: "Bitcoin",
          symbol: "BTC",
          buyExchange: "Binance",
          sellExchange: "Kraken",
          buyPrice: 43250.50,
          sellPrice: 43450.75,
          profitPercentage: 0.46,
          volume24h: "$2.1B",
          estimatedProfit: 200.25,
          transferTime: "~10 mins",
          fees: 25.50
        },
        {
          coin: "Ethereum",
          symbol: "ETH",
          buyExchange: "Coinbase",
          sellExchange: "Binance",
          buyPrice: 2250.25,
          sellPrice: 2265.50,
          profitPercentage: 0.68,
          volume24h: "$1.5B",
          estimatedProfit: 15.25,
          transferTime: "~5 mins",
          fees: 8.75
        },
        // Add more mock data as needed
      ];

      setOpportunities(mockData);

      // Notify of new opportunities above threshold
      mockData.forEach(opp => {
        if (opp.profitPercentage > 0.5) {
          toast({
            title: "High Profit Opportunity",
            description: `${opp.profitPercentage.toFixed(2)}% profit potential on ${opp.coin}`,
            duration: 5000,
          });
        }
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [toast]);

  const handleSort = (field: keyof ArbitrageOpportunity) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }

    setOpportunities(prev => {
      return [...prev].sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        const modifier = sortDirection === "asc" ? 1 : -1;
        
        if (typeof aValue === "number" && typeof bValue === "number") {
          return (aValue - bValue) * modifier;
        }
        return 0;
      });
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#0B1221]/50 border-white/10">
        <CardHeader>
          <CardTitle>Top Arbitrage Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead>Coin</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("profitPercentage")}
                    className="hover:bg-white/5"
                  >
                    Profit %
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Buy At</TableHead>
                <TableHead>Sell At</TableHead>
                <TableHead>Buy Price</TableHead>
                <TableHead>Sell Price</TableHead>
                <TableHead>Est. Profit</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Transfer Time</TableHead>
                <TableHead>24h Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.map((opp, index) => (
                <TableRow key={index} className="hover:bg-white/5 border-white/10">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {opp.coin}
                      <span className="text-sm text-muted-foreground">
                        {opp.symbol}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-green-400">
                    {opp.profitPercentage.toFixed(2)}%
                  </TableCell>
                  <TableCell>{opp.buyExchange}</TableCell>
                  <TableCell>{opp.sellExchange}</TableCell>
                  <TableCell>${opp.buyPrice.toLocaleString()}</TableCell>
                  <TableCell>${opp.sellPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-green-400">
                    ${opp.estimatedProfit.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-red-400">
                    ${opp.fees.toFixed(2)}
                  </TableCell>
                  <TableCell>{opp.transferTime}</TableCell>
                  <TableCell>{opp.volume24h}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArbitrageAnalysis;