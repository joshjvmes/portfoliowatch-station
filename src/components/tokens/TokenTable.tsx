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
import { ChartLine, Database, DollarSign, Clock, Zap, Swap } from "lucide-react";

const TokenTable = () => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const tokenList = await new TokenListProvider().resolve();
        const filteredTokens = tokenList
          .filterByClusterSlug("mainnet-beta")
          .getList()
          .slice(0, 50); // Limit to first 50 tokens for now
        setTokens(filteredTokens);
      } catch (error) {
        console.error("Error loading tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTokens();
  }, []);

  if (loading) {
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
                  <Swap className="h-4 w-4" />
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
            {tokens.map((token) => (
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
                <TableCell>Coming soon</TableCell>
                <TableCell>Coming soon</TableCell>
                <TableCell>Coming soon</TableCell>
                <TableCell>Coming soon</TableCell>
                <TableCell>Coming soon</TableCell>
                <TableCell>Coming soon</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TokenTable;