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
import { Connection, PublicKey } from "@solana/web3.js";
import { Market } from "@project-serum/serum";
import { WhirlpoolContext, buildWhirlpoolClient, ORCA_WHIRLPOOL_PROGRAM_ID } from "@orca-so/whirlpools-sdk";
import { Percentage } from "@orca-so/common-sdk";

interface TokenData {
  symbol: string;
  name: string;
  logoURI?: string;
  price?: number;
  change24h?: number;
  liquidity?: number;
  avgTxTime?: number;
  exchangeRates?: {
    raydium?: number;
    orca?: number;
  };
  arbitrage?: number;
}

const TokenTable = () => {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrcaPrices = async (connection: Connection, tokenMint: string) => {
    try {
      const ctx = WhirlpoolContext.withConnection(connection, new PublicKey(ORCA_WHIRLPOOL_PROGRAM_ID));
      const client = buildWhirlpoolClient(ctx);
      const whirlpools = await client.getAllWhirlpools();
      
      // Find pools containing our token
      const relevantPools = whirlpools.filter(pool => 
        pool.tokenMintA.toString() === tokenMint || 
        pool.tokenMintB.toString() === tokenMint
      );

      if (relevantPools.length > 0) {
        // Use the most liquid pool for price
        const pool = relevantPools[0];
        const price = await pool.getData();
        return price.sqrtPrice.toNumber();
      }
      return null;
    } catch (error) {
      console.error("Error fetching Orca price:", error);
      return null;
    }
  };

  const fetchRaydiumPrices = async (connection: Connection, tokenMint: string) => {
    try {
      // This is a simplified example - you would need to fetch actual Raydium pool data
      const marketAddress = new PublicKey(tokenMint);
      const market = await Market.load(connection, marketAddress, {}, "mainnet-beta");
      const price = await market.loadBids(connection);
      return price.getL2(1)[0]?.[0] || null;
    } catch (error) {
      console.error("Error fetching Raydium price:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const connection = new Connection("https://api.mainnet-beta.solana.com");
        const tokenList = await new TokenListProvider().resolve();
        const filteredTokens = tokenList
          .filterByClusterSlug("mainnet-beta")
          .getList()
          .slice(0, 50);

        const tokenDataPromises = filteredTokens.map(async (token) => {
          const [orcaPrice, raydiumPrice] = await Promise.all([
            fetchOrcaPrices(connection, token.address),
            fetchRaydiumPrices(connection, token.address),
          ]);

          const exchangeRates = {
            orca: orcaPrice,
            raydium: raydiumPrice,
          };

          // Calculate arbitrage opportunity if both prices exist
          const arbitrage = orcaPrice && raydiumPrice 
            ? Math.abs(orcaPrice - raydiumPrice) / Math.min(orcaPrice, raydiumPrice) * 100 
            : undefined;

          return {
            symbol: token.symbol,
            name: token.name,
            logoURI: token.logoURI,
            price: orcaPrice || raydiumPrice, // Use either price as reference
            change24h: Math.random() * 20 - 10, // Placeholder for 24h change
            liquidity: Math.random() * 1000000, // Placeholder for liquidity
            avgTxTime: Math.random() * 1 + 0.1, // Placeholder for avg transaction time
            exchangeRates,
            arbitrage,
          };
        });

        const tokenData = await Promise.all(tokenDataPromises);
        setTokens(tokenData);
      } catch (error) {
        console.error("Error loading tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTokens();
  }, []);

  const formatNumber = (num?: number, decimals: number = 2) => {
    if (num === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const formatPrice = (price?: number) => {
    if (price === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatPercentage = (value?: number) => {
    if (value === undefined) return "N/A";
    return `${value >= 0 ? "+" : ""}${formatNumber(value)}%`;
  };

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
            {tokens.map((token, index) => (
              <TableRow key={index}>
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
                <TableCell>{formatPrice(token.price)}</TableCell>
                <TableCell>
                  <span className={token.change24h && token.change24h >= 0 ? "text-green-500" : "text-red-500"}>
                    {formatPercentage(token.change24h)}
                  </span>
                </TableCell>
                <TableCell>{formatPrice(token.liquidity)}</TableCell>
                <TableCell>{token.avgTxTime ? `${formatNumber(token.avgTxTime)}s` : "N/A"}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>Orca: {formatPrice(token.exchangeRates?.orca)}</div>
                    <div>Raydium: {formatPrice(token.exchangeRates?.raydium)}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {token.arbitrage ? (
                    <span className={token.arbitrage > 1 ? "text-green-500" : "text-muted-foreground"}>
                      {formatPercentage(token.arbitrage)}
                    </span>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TokenTable;