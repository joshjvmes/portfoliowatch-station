import { useEffect, useState } from 'react';
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';
import { Card } from "@/components/ui/card";

interface TokenBalance {
  mint: string;
  amount: number;
  decimals: number;
  symbol?: string;
}

interface TokenBalancesProps {
  tokens: TokenBalance[];
}

export const TokenBalances = ({ tokens }: TokenBalancesProps) => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

  useEffect(() => {
    new TokenListProvider().resolve().then(tokens => {
      const tokenList = tokens.filterByClusterSlug('mainnet-beta').getList();
      setTokenMap(new Map(tokenList.map((item) => [item.address, item])));
    });
  }, []);

  if (!tokens.length) return null;

  const formatAmount = (amount: number, decimals: number) => {
    return (amount / Math.pow(10, decimals)).toFixed(decimals > 4 ? 4 : decimals);
  };

  return (
    <div className="space-y-2">
      <p className="text-gray-400">Token Balances</p>
      <div className="space-y-2">
        {tokens.map((token, index) => {
          const tokenInfo = tokenMap.get(token.mint);
          return (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {tokenInfo?.logoURI && (
                  <img 
                    src={tokenInfo.logoURI} 
                    alt={tokenInfo.symbol} 
                    className="w-5 h-5 rounded-full"
                  />
                )}
                <span className="font-mono text-sm">
                  {tokenInfo?.symbol || `${token.mint.slice(0, 4)}...${token.mint.slice(-4)}`}
                </span>
              </div>
              <span>{formatAmount(token.amount, token.decimals)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};