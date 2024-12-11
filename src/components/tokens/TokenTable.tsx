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
import { useQuery } from "@tanstack/react-query";

interface RaydiumTokenData {
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
}

const TokenTable = () => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  
  // Fetch token list
  const { data: tokenList, isLoading: isLoadingTokens } = useQuery({
    queryKey: ['tokenList'],
    queryFn: async () => {
      const tokenList = await new TokenListProvider().resolve();
      return tokenList
        .filterByClusterSlug("mainnet-beta")
        .getList()
        .slice(0, 50); // Limit to first 50 tokens
    },
  });

  // Fetch Raydium token data
  const { data: tokenData, isLoading: isLoadingPrices } = useQuery({
    queryKey: ['tokenPrices'],
    queryFn: async () => {
      const response = await fetch('https://api.raydium.io/v2/main/price');
      const data = await response.json();
      return data as Record<string, RaydiumTokenData>;
    },
    enabled: !!tokenList,
  });

  const loading = isLoadingTokens || isLoadingPrices;

  if (loading) {
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatPercent = (value?: number) => {
    if (!value) return 'N/A';
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const formatLiquidity = (value?: number) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
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
              const data = tokenData?.[token.address];
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
                  <TableCell>{formatPrice(data?.price)}</TableCell>
                  <TableCell>
                    <span className={data?.priceChange24h > 0 ? 'text-green-500' : 'text-red-500'}>
                      {formatPercent(data?.priceChange24h)}
                    </span>
                  </TableCell>
                  <TableCell>{formatLiquidity(data?.liquidity)}</TableCell>
                  <TableCell>~2s</TableCell>
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