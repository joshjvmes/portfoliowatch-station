import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownUp } from "lucide-react";
import { toast } from "sonner";
import { useJupiter } from '@jup-ag/react-hook';
import { PublicKey } from '@solana/web3.js';
import JSBI from 'jsbi';
import { TOKENS } from '@/utils/tokens';

export const JupiterForm = () => {
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [inputToken, setInputToken] = useState(TOKENS[0].mint);
  const [outputToken, setOutputToken] = useState(TOKENS[1].mint);

  const {
    loading,
    exchange,
    error,
    refresh,
    routes,
  } = useJupiter({
    amount: JSBI.BigInt(Number(inputAmount) * 1e9 || 0),
    inputMint: new PublicKey(inputToken),
    outputMint: new PublicKey(outputToken),
    slippageBps: 100,
  });

  const handleSwap = async () => {
    try {
      if (!routes || routes.length === 0) {
        toast.error('No routes available for swap');
        return;
      }

      const result = await exchange({
        routeInfo: routes[0],
        quoteResponseMeta: routes[0].quoteResponseMeta,
      });

      if (result) {
        toast.success('Swap executed successfully!');
        setInputAmount('');
        setOutputAmount('');
      }
    } catch (err: any) {
      console.error('Swap error:', err);
      toast.error(err.message || 'Failed to execute swap');
    }
  };

  const handleRefresh = () => {
    refresh();
    toast.success('Routes refreshed');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#0B1221]/50 border-white/10">
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">You Pay</label>
            <Input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="0.00"
              className="bg-[#1A2333] border-[#2A3441]"
            />
            <select
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              className="w-full p-2 bg-[#1A2333] border border-[#2A3441] rounded text-white"
            >
              {TOKENS.map((token) => (
                <option key={token.mint} value={token.mint}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>

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

          <div className="space-y-2">
            <label className="text-sm text-gray-400">You Receive</label>
            <Input
              type="number"
              value={outputAmount}
              onChange={(e) => setOutputAmount(e.target.value)}
              placeholder="0.00"
              className="bg-[#1A2333] border-[#2A3441]"
            />
            <select
              value={outputToken}
              onChange={(e) => setOutputToken(e.target.value)}
              className="w-full p-2 bg-[#1A2333] border border-[#2A3441] rounded text-white"
            >
              {TOKENS.map((token) => (
                <option key={token.mint} value={token.mint}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
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
          disabled={loading}
        >
          Swap
        </Button>
      </div>

      {error && (
        <p className="text-red-500 text-sm">An error occurred during the swap</p>
      )}
    </div>
  );
};