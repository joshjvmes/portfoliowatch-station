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
import { TokenTableRow } from "./TokenTableRow";
import { TokenTableHeader } from "./TokenTableHeader";

const TokenTable = () => {
  const [tokenPrices, setTokenPrices] = useState<Record<string, any>>({});
  const connection = new Connection("https://api.mainnet-beta.solana.com");

  // Fetch token list
  const { data: tokenList, isLoading: isLoadingTokens } = useQuery({
    queryKey: ['tokenList'],
    queryFn: async () => {
      const tokenList = await new TokenListProvider().resolve();
      return tokenList
        .filterByClusterSlug("mainnet-beta")
        .getList()
        .slice(0, 50);
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
      const priceData: Record<string, any> = {};
      
      Object.entries(routeMap).forEach(([inputMint, outputs]) => {
        if (!priceData[inputMint]) {
          priceData[inputMint] = {};
        }
        priceData[inputMint].jupiter = {
          price: 0,
          liquidity: outputs.length * 1000000,
          avgTime: 500,
          change24h: 0,
        };
      });
      
      return priceData;
    },
    enabled: !!connection,
  });

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

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <Table>
          <TokenTableHeader />
          <TableBody>
            {tokenList?.map((token) => (
              <TokenTableRow 
                key={token.address} 
                token={token} 
                priceData={tokenPrices[token.address] || {}} 
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TokenTable;