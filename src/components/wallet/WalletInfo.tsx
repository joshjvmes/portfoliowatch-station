import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Power, ExternalLink, Copy, RefreshCw, Send, QrCode } from "lucide-react";
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
  const [network, setNetwork] = useState<'mainnet-beta' | 'devnet'>('mainnet-beta');

  const NETWORK_URLS = {
    'mainnet-beta': 'https://api.mainnet-beta.solana.com',
    'devnet': 'https://api.devnet.solana.com'
  };

  const getExplorerLink = () => {
    const baseUrl = network === 'devnet' ? 'https://explorer.solana.com/?cluster=devnet' : 'https://explorer.solana.com';
    return `${baseUrl}/address/${address}`;
  };

  const fetchBalanceAndTokens = async () => {
    try {
      setIsLoading(true);
      const provider = (window as any).solana;
      
      if (!provider) {
        throw new Error('Phantom wallet not found');
      }

      // Create connection
      const connection = new (window as any).solana.Connection(NETWORK_URLS[network]);
      
      // Fetch SOL balance
      const balance = await connection.getBalance(new (window as any).solana.PublicKey(address));
      setBalance(balance / 1e9); // Convert lamports to SOL

      // Fetch token accounts
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        new (window as any).solana.PublicKey(address),
        { programId: new (window as any).solana.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
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
        new (window as any).solana.PublicKey(address),
        { limit: 5 }
      );

      const txs = signatures.map((sig: any) => ({
        signature: sig.signature,
        timestamp: sig.blockTime,
        type: 'transfer', // You would need to parse the transaction to get the actual type
        amount: 0 // You would need to parse the transaction to get the actual amount
      }));

      setTransactions(txs);

    } catch (error) {
      console.error('Error fetching wallet data:', error);
      toast.error('Failed to fetch wallet data. Please check your network connection and try again.');
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

  const toggleNetwork = async () => {
    const newNetwork = network === 'mainnet-beta' ? 'devnet' : 'mainnet-beta';
    setNetwork(newNetwork);
    toast.success(`Switched to ${newNetwork}`);
  };

  const sendSol = async () => {
    try {
      const provider = (window as any).solana;
      if (!provider) {
        throw new Error('Phantom wallet not found');
      }

      // This is just a placeholder - you would need to implement a proper UI for entering
      // the recipient address and amount
      toast.error('Send SOL feature coming soon!');
    } catch (error) {
      console.error('Error sending SOL:', error);
      toast.error('Failed to send SOL');
    }
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

        {transactions.length > 0 && (
          <div className="space-y-2">
            <p className="text-gray-400">Recent Transactions</p>
            <div className="space-y-2">
              {transactions.map((tx, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <a
                    href={`${getExplorerLink()}/tx/${tx.signature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono hover:text-[#AB9FF2]"
                  >
                    {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                  </a>
                  <span>{new Date(tx.timestamp * 1000).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={sendSol}
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