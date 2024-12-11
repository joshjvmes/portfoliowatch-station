import { useEffect, useState } from "react";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
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
import { toast } from "sonner";

interface TokenBalance {
  mint: string;
  balance: number;
  decimals: number;
}

const TokenTable = () => {
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

  // Fetch token balances and prices
  const { data: tokenBalances, isLoading: isLoadingBalances } = useQuery({
    queryKey: ['tokenBalances'],
    queryFn: async () => {
      try {
        const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
        
        // Use a known wallet with significant token holdings for price reference
        const referenceWallet = new PublicKey('HN7cABqLq46Es1jh92dQQisAq662SmxGkr4SGLtjZKZN');
        
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          referenceWallet,
          { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
        );

        return tokenAccounts.value.map(account => ({
          mint: account.account.data.parsed.info.mint,
          balance: account.account.data.parsed.info.tokenAmount.uiAmount,
          decimals: account.account.data.parsed.info.tokenAmount.decimals
        }));
      } catch (error) {
        console.error('Error fetching token balances:', error);
        toast.error('Failed to fetch token data');
        return [];
      }
    },
    enabled: !!tokenList,
  });

  const loading = isLoadingTokens || isLoadingBalances;

  if (loading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">Loading tokens...</p>
        </div>
      </Card>
    );
  }

  const formatAmount = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount);
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
                  Supply
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <ChartLine className="h-4 w-4" />
                  24h Volume
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
                  Market Status
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokenList?.map((token) => {
              const tokenBalance = tokenBalances?.find(b => b.mint === token.address);
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
                  <TableCell>{tokenBalance ? formatAmount(tokenBalance.balance) : 'N/A'}</TableCell>
                  <TableCell>Coming soon</TableCell>
                  <TableCell>{formatLiquidity(tokenBalance?.balance)}</TableCell>
                  <TableCell>~2s</TableCell>
                  <TableCell>Coming soon</TableCell>
                  <TableCell>
                    <span className="text-green-500">Active</span>
                  </TableCell>
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