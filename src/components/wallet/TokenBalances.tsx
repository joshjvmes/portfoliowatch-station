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
  if (!tokens.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-gray-400">Token Balances</p>
      <div className="space-y-2">
        {tokens.map((token, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="font-mono text-sm">{token.mint.slice(0, 4)}...{token.mint.slice(-4)}</span>
            <span>{token.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};