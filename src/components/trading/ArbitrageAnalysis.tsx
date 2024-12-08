import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchTopCoins, fetchExchangePrices } from "@/utils/marketData";
import { useQuery } from "@tanstack/react-query";

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

const calculateArbitrageOpportunities = async (): Promise<ArbitrageOpportunity[]> => {
  const opportunities: ArbitrageOpportunity[] = [];
  const coins = await fetchTopCoins();
  
  for (const coin of coins.slice(0, 10)) { // Start with top 10 for performance
    try {
      const exchangePrices = await fetchExchangePrices(coin.id);
      
      // Calculate opportunities between exchanges
      for (let i = 0; i < exchangePrices.length; i++) {
        for (let j = i + 1; j < exchangePrices.length; j++) {
          const buyPrice = Math.min(exchangePrices[i].price, exchangePrices[j].price);
          const sellPrice = Math.max(exchangePrices[i].price, exchangePrices[j].price);
          const buyExchange = exchangePrices[i].price < exchangePrices[j].price 
            ? exchangePrices[i].exchange 
            : exchangePrices[j].exchange;
          const sellExchange = exchangePrices[i].price < exchangePrices[j].price 
            ? exchangePrices[j].exchange 
            : exchangePrices[i].exchange;
          
          const profitPercentage = ((sellPrice - buyPrice) / buyPrice) * 100;
          
          if (profitPercentage > 0.5) { // Only show opportunities with >0.5% profit
            const fees = (buyPrice * 0.001) + (sellPrice * 0.001); // Assuming 0.1% fee per trade
            const estimatedProfit = (sellPrice - buyPrice) - fees;
            
            opportunities.push({
              coin: coin.name,
              symbol: coin.symbol,
              buyExchange,
              sellExchange,
              buyPrice,
              sellPrice,
              profitPercentage,
              volume24h: `$${Math.min(
                exchangePrices[i].volume24h,
                exchangePrices[j].volume24h
              ).toLocaleString()}`,
              estimatedProfit,
              transferTime: "~10 mins", // Estimated transfer time
              fees
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching data for ${coin.id}:`, error);
    }
  }
  
  return opportunities.sort((a, b) => b.profitPercentage - a.profitPercentage);
};

const ArbitrageAnalysis = () => {
  const [sortField, setSortField] = useState<keyof ArbitrageOpportunity>("profitPercentage");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();

  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ['arbitrage-opportunities'],
    queryFn: calculateArbitrageOpportunities,
    refetchInterval: 30000, // Refetch every 30 seconds
    meta: {
      onSettled: (data: ArbitrageOpportunity[] | undefined) => {
        if (data) {
          // Notify of new opportunities above threshold
          data.forEach(opp => {
            if (opp.profitPercentage > 1.0) {
              toast({
                title: "High Profit Opportunity",
                description: `${opp.profitPercentage.toFixed(2)}% profit potential on ${opp.coin}`,
                duration: 5000,
              });
            }
          });
        }
      }
    },
  });

  const handleSort = (field: keyof ArbitrageOpportunity) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedOpportunities = [...opportunities].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortDirection === "asc" ? 1 : -1;
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * modifier;
    }
    return 0;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-[#0B1221]/50 border-white/10">
          <CardHeader>
            <CardTitle>Loading Arbitrage Opportunities...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 animate-pulse bg-white/5 rounded-lg" />
          </CardContent>
        </Card>
      </div>
    );
  }

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
              {sortedOpportunities.map((opp, index) => (
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