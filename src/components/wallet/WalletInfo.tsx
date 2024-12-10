import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Power, ExternalLink, Copy, RefreshCw, Send } from "lucide-react";
import { toast } from "sonner";
import { TokenBalances } from './TokenBalances';
import { RecentTransactions } from './RecentTransactions';
import { NetworkType, NETWORK_URLS, getProvider, createConnection, getExplorerLink } from '@/utils/solana';

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

interface Transaction {
  signature: string;
  timestamp: number;
  type: string;
  amount: number;
}

export const WalletInfo = ({ address, handleDisconnect }: WalletInfoProps) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [network, setNetwork] = useState<NetworkType>('mainnet-beta');

  const fetchBalanceAndTokens = async () => {
    try {
      setIsLoading(true);
      const provider = getProvider();
      if (!provider) return;

      const connection = createConnection(network);
      if (!connection) {
        toast.error('Failed to create Solana connection');
        return;
      }

      // Fetch SOL balance
      const balance = await connection.getBalance(new provider.PublicKey(address));
      setBalance(balance / 1e9);

      // Fetch token accounts
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        new provider.PublicKey(address),
        { programId: new provider.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
      );

      const tokenBalances = tokenAccounts.value.map((account: any) => ({
        mint: account.account.data.parsed.info.mint,
        amount: account.account.data.parsed.info.tokenAmount.uiAmount,
        decimals: account.account.data.parsed.info.tokenAmount.decimals,
        symbol: account.account.data.parsed.info.symbol
      }));

      setTokens(tokenBalances);

      // Fetch recent transactions
      const signatures = await connection.getSignaturesForAddress(
        new provider.PublicKey(address),
        { limit: 5 }
      );

      const txs = signatures.map((sig: any) => ({
        signature: sig.signature,
        timestamp: sig.blockTime,
        type: 'transfer',
        amount: 0
      }));

      setTransactions(txs);

    } catch (error: any) {
      console.error('Error fetching wallet data:', error);
      toast.error(error.message || 'Failed to fetch wallet data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalanceAndTokens();
  }, [address, network]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  const toggleNetwork = () => {
    const newNetwork = network === 'mainnet-beta' ? 'devnet' : 'mainnet-beta';
    setNetwork(newNetwork);
    toast.success(`Switched to ${newNetwork}`);
  };

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Wallet Information</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleNetwork}
            className="text-xs"
          >
            {network === 'mainnet-beta' ? 'Mainnet' : 'Devnet'}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchBalanceAndTokens}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
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
                href={getExplorerLink(address, network)}
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

        <TokenBalances tokens={tokens} />
        <RecentTransactions 
          transactions={transactions}
          network={network}
          address={address}
        />

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => toast.error('Send SOL feature coming soon!')}
            className="flex-1 gap-2"
          >
            <Send className="h-4 w-4" />
            Send
          </Button>
          <Button
            variant="destructive"
            onClick={handleDisconnect}
            className="flex-1 gap-2"
          >
            <Power className="h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};