import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Power, ExternalLink, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface WalletInfoProps {
  address: string;
  handleDisconnect: () => void;
}

interface TokenBalance {
  mint: string;
  amount: number;
  decimals: number;
  symbol?: string;
}

export const WalletInfo = ({ address, handleDisconnect }: WalletInfoProps) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getExplorerLink = () => {
    return `https://explorer.solana.com/address/${address}`;
  };

  const fetchBalanceAndTokens = async () => {
    try {
      setIsLoading(true);
      const provider = (window as any).solana;
      
      // Fetch SOL balance
      const balance = await provider.connection.getBalance(provider.publicKey);
      setBalance(balance / 1e9); // Convert lamports to SOL

      // Fetch token accounts
      const tokenAccounts = await provider.connection.getParsedTokenAccountsByOwner(
        provider.publicKey,
        { programId: new (window as any).solana.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
      );

      const tokenBalances = tokenAccounts.value.map((account: any) => ({
        mint: account.account.data.parsed.info.mint,
        amount: account.account.data.parsed.info.tokenAmount.uiAmount,
        decimals: account.account.data.parsed.info.tokenAmount.decimals,
        symbol: account.account.data.parsed.info.symbol
      }));

      setTokens(tokenBalances);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      toast.error('Failed to fetch wallet data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalanceAndTokens();
  }, [address]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Wallet Information</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchBalanceAndTokens}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2">
            <p className="text-gray-400">Connected Address</p>
            <div className="flex items-center gap-2">
              <p className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
              <button
                onClick={copyAddress}
                className="text-[#AB9FF2] hover:text-[#AB9FF2]/80"
              >
                <Copy className="h-4 w-4" />
              </button>
              <a
                href={getExplorerLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#AB9FF2] hover:text-[#AB9FF2]/80"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-gray-400">Network</p>
            <Badge variant="outline" className="bg-[#AB9FF2]/10 text-[#AB9FF2] border-[#AB9FF2]/20">
              Solana
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-gray-400">SOL Balance</p>
          <p className="text-xl font-bold">
            {balance === null ? '...' : `${balance.toFixed(4)} SOL`}
          </p>
        </div>

        {tokens.length > 0 && (
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
        )}

        <Button
          variant="destructive"
          onClick={handleDisconnect}
          className="w-full gap-2"
        >
          <Power className="h-4 w-4" />
          Disconnect
        </Button>
      </CardContent>
    </Card>
  );
};