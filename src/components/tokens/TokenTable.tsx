import { useEffect, useState } from "react";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ChartLine, Database, DollarSign, Clock, Zap, ArrowLeftRight } from "lucide-react";
import { Connection } from "@solana/web3.js";
import { Jupiter } from "@jup-ag/core";
import { useQuery } from "@tanstack/react-query";

interface TokenPriceData {
  jupiter?: {
    price?: number;
    change24h?: number;
    liquidity?: number;
    avgTime?: number;
  };
  raydium?: {
    price?: number;
    change24h?: number;
    liquidity?: number;
    avgTime?: number;
  };
  orca?: {
    price?: number;
    change24h?: number;
    liquidity?: number;
    avgTime?: number;
  };
}

const TokenTable = () => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [tokenPrices, setTokenPrices] = useState<Record<string, TokenPriceData>>({});
  const connection = new Connection("https://api.mainnet-beta.solana.com");

  // Fetch token list
  const { data: tokenList, isLoading: isLoadingTokens } = useQuery({
    queryKey: ['tokenList'],
    queryFn: async () => {
      const tokenList = await new TokenListProvider().resolve();
      return tokenList
        .filterByClusterSlug("mainnet-beta")
        .getList()
        .slice(0, 50); // Limit to first 50 tokens for now
    },
  });

  // Fetch Jupiter data
  const { data: jupiterData } = useQuery({
    queryKey: ['jupiterPrices'],
    queryFn: async () => {
      const jupiter = await Jupiter.load({
        connection,
        cluster: 'mainnet-beta',
      });
      
      const routeMap = await jupiter.getRouteMap();
      // Convert route map to price data
      const priceData: Record<string, TokenPriceData> = {};
      
      // Process route map to extract price data
      // This is a simplified example - you'd want to add more sophisticated price calculation
      Object.entries(routeMap).forEach(([inputMint, outputs]) => {
        if (!priceData[inputMint]) {
          priceData[inputMint] = {};
        }
        priceData[inputMint].jupiter = {
          price: 0, // You'd calculate this based on the route
          liquidity: outputs.length * 1000000, // Simplified liquidity metric
          avgTime: 500, // Milliseconds - you'd want to measure this
          change24h: 0, // You'd need to track historical data
        };
      });
      
      return priceData;
    },
    enabled: !!connection,
  });

  // Update token prices when Jupiter data changes
  useEffect(() => {
    if (jupiterData) {
      setTokenPrices(prevPrices => ({
        ...prevPrices,
        ...jupiterData,
      }));
    }
  }, [jupiterData]);

  if (isLoadingTokens) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">Loading tokens...</p>
        </div>
      </Card>
    );
  }

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return `$${price.toFixed(2)}`;
  };

  const formatChange = (change?: number) => {
    if (!change) return 'N/A';
    const color = change >= 0 ? 'text-green-500' : 'text-red-500';
    return <span className={color}>{change.toFixed(2)}%</span>;
  };

  const formatLiquidity = (liquidity?: number) => {
    if (!liquidity) return 'N/A';
    return `$${(liquidity / 1000000).toFixed(2)}M`;
  };

  const formatTime = (time?: number) => {
    if (!time) return 'N/A';
    return `${time}ms`;
  };

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <ChartLine className="h-4 w-4" />
                  24h Change
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Liquidity
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Avg. Transaction Time
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <ArrowLeftRight className="h-4 w-4" />
                  Exchange Rates
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Arbitrage
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokenList?.map((token) => {
              const priceData = tokenPrices[token.address] || {};
              return (
                <TableRow key={token.address}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {token.logoURI && (
                        <img
                          src={token.logoURI}
                          alt={token.symbol}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <div>
                        <div className="font-medium">{token.symbol}</div>
                        <div className="text-sm text-muted-foreground">
                          {token.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>Jupiter: {formatPrice(priceData.jupiter?.price)}</div>
                      <div>Raydium: {formatPrice(priceData.raydium?.price)}</div>
                      <div>Orca: {formatPrice(priceData.orca?.price)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>Jupiter: {formatChange(priceData.jupiter?.change24h)}</div>
                      <div>Raydium: {formatChange(priceData.raydium?.change24h)}</div>
                      <div>Orca: {formatChange(priceData.orca?.change24h)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>Jupiter: {formatLiquidity(priceData.jupiter?.liquidity)}</div>
                      <div>Raydium: {formatLiquidity(priceData.raydium?.liquidity)}</div>
                      <div>Orca: {formatLiquidity(priceData.orca?.liquidity)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>Jupiter: {formatTime(priceData.jupiter?.avgTime)}</div>
                      <div>Raydium: {formatTime(priceData.raydium?.avgTime)}</div>
                      <div>Orca: {formatTime(priceData.orca?.avgTime)}</div>
                    </div>
                  </TableCell>
                  <TableCell>Coming soon</TableCell>
                  <TableCell>Coming soon</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TokenTable;