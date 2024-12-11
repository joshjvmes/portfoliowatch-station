import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownUp } from "lucide-react";
import { toast } from "sonner";
import { useJupiter } from '@jup-ag/react-hook';
import { PublicKey } from '@solana/web3.js';
import JSBI from 'jsbi';
import { TOKENS } from '@/utils/tokens';
import { handleProgramError } from '@/utils/jupiterErrors';
import { TokenSelect } from './TokenSelect';
import { AmountInput } from './AmountInput';
import { ErrorCard } from './ErrorCard';

declare global {
  interface Window {
    solana?: {
      connect(): Promise<{ publicKey: PublicKey }>;
      disconnect(): Promise<void>;
      isPhantom?: boolean;
      publicKey?: PublicKey;
    };
  }
}

export const JupiterForm = () => {
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [inputToken, setInputToken] = useState(TOKENS[0].mint);
  const [outputToken, setOutputToken] = useState(TOKENS[1].mint);

  const {
    loading,
    exchange,
    error: jupiterError,
    refresh,
    quoteResponseMeta
  } = useJupiter({
    amount: JSBI.BigInt(Number(inputAmount) * 1e9 || 0),
    inputMint: new PublicKey(inputToken),
    outputMint: new PublicKey(outputToken),
    slippageBps: 100,
  });

  const handleSwap = async () => {
    try {
      if (!inputAmount || Number(inputAmount) <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }

      if (!quoteResponseMeta) {
        toast.error('No quote available');
        return;
      }

      if (!window.solana?.publicKey) {
        toast.error('Please connect your wallet first');
        return;
      }

      const result = await exchange({
        quoteResponseMeta,
        userPublicKey: window.solana.publicKey,
        prioritizationFeeLamports: 'auto',
        onTransaction: async (txid) => {
          toast.success(`Transaction sent: ${txid}`);
        },
      });

      if (result) {
        toast.success('Swap executed successfully!');
        setInputAmount('');
        setOutputAmount('');
      }
    } catch (err: any) {
      console.error('Swap error:', err);
      const errorMessage = handleProgramError(err);
      toast.error(errorMessage);
    }
  };

  const handleRefresh = () => {
    try {
      refresh();
      toast.success('Routes refreshed');
    } catch (err: any) {
      console.error('Refresh error:', err);
      const errorMessage = handleProgramError(err);
      toast.error(errorMessage);
    }
  };

  if (jupiterError) {
    return <ErrorCard error={jupiterError} onRetry={handleRefresh} />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#0B1221]/50 border-white/10">
        <CardContent className="p-4 space-y-4">
          <AmountInput
            value={inputAmount}
            onChange={setInputAmount}
            label="You Pay"
          />
          <TokenSelect
            value={inputToken}
            onChange={setInputToken}
            label="Select Token"
          />

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const temp = inputToken;
                setInputToken(outputToken);
                setOutputToken(temp);
              }}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          <AmountInput
            value={outputAmount}
            onChange={setOutputAmount}
            label="You Receive"
          />
          <TokenSelect
            value={outputToken}
            onChange={setOutputToken}
            label="Select Token"
          />
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button
          onClick={handleRefresh}
          variant="outline"
          className="flex-1"
          disabled={loading}
        >
          Refresh Rates
        </Button>
        <Button
          onClick={handleSwap}
          className="flex-1"
          disabled={loading || !inputAmount}
        >
          {loading ? 'Loading...' : 'Swap'}
        </Button>
      </div>
    </div>
  );
};