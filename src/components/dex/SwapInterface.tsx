import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowDownUp } from "lucide-react";
import { Jupiter } from "@jup-ag/core";
import { Connection, PublicKey } from "@solana/web3.js";
import { getProvider } from "@/utils/solana";

const DEX_OPTIONS = [
  { id: 'jupiter', name: 'Jupiter' },
  { id: 'raydium', name: 'Raydium' },
  { id: 'orca', name: 'Orca' },
];

// Common SPL tokens on Solana
const TOKENS = [
  { symbol: 'SOL', name: 'Solana', mint: 'So11111111111111111111111111111111111111112' },
  { symbol: 'USDC', name: 'USD Coin', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
  { symbol: 'BONK', name: 'Bonk', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
  { symbol: 'RAY', name: 'Raydium', mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R' },
];

const SwapInterface = () => {
  const [selectedDex, setSelectedDex] = useState('jupiter');
  const [fromToken, setFromToken] = useState(TOKENS[0].mint);
  const [toToken, setToToken] = useState(TOKENS[1].mint);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [priceImpact, setPriceImpact] = useState<string | null>(null);
  const [jupiter, setJupiter] = useState<Jupiter | null>(null);

  // Initialize Jupiter
  useEffect(() => {
    const initJupiter = async () => {
      try {
        const connection = new Connection('https://api.mainnet-beta.solana.com');
        const jupiterInstance = await Jupiter.load({
          connection,
          cluster: 'mainnet-beta',
          userPublicKey: null, // Will be set during swap
        });
        setJupiter(jupiterInstance);
      } catch (error) {
        console.error('Error initializing Jupiter:', error);
        toast.error('Failed to initialize Jupiter');
      }
    };

    if (selectedDex === 'jupiter') {
      initJupiter();
    }
  }, [selectedDex]);

  // Swap token positions
  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount('');
    setToAmount('');
    setPriceImpact(null);
  };

  // Fetch price quote when amount or tokens change
  useEffect(() => {
    const fetchQuote = async () => {
      if (!fromAmount || Number(fromAmount) <= 0 || !jupiter) {
        setToAmount('');
        setPriceImpact(null);
        return;
      }

      try {
        const inputMint = new PublicKey(fromToken);
        const outputMint = new PublicKey(toToken);
        const amount = Number(fromAmount) * (10 ** 9); // Assuming SOL decimals

        const routes = await jupiter.computeRoutes({
          inputMint,
          outputMint,
          amount,
          slippageBps: 50, // 0.5% slippage
        });

        if (routes.routesInfos.length > 0) {
          const bestRoute = routes.routesInfos[0];
          setToAmount(bestRoute.outAmount / (10 ** 9));
          setPriceImpact(bestRoute.priceImpactPct.toFixed(2));
        } else {
          toast.error('No routes found for this swap');
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
        toast.error('Failed to fetch price quote');
      }
    };

    if (selectedDex === 'jupiter') {
      fetchQuote();
    }
  }, [fromToken, toToken, fromAmount, selectedDex, jupiter]);

  const handleSwap = async () => {
    try {
      setIsLoading(true);
      
      if (!fromAmount || Number(fromAmount) <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }

      const provider = getProvider();
      if (!provider) {
        toast.error('Please connect your wallet');
        return;
      }

      if (!jupiter) {
        toast.error('Jupiter not initialized');
        return;
      }

      // Update Jupiter with connected wallet
      const newJupiter = await Jupiter.load({
        connection: new Connection('https://api.mainnet-beta.solana.com'),
        cluster: 'mainnet-beta',
        userPublicKey: new PublicKey(provider.publicKey.toString()),
      });

      const inputMint = new PublicKey(fromToken);
      const outputMint = new PublicKey(toToken);
      const amount = Number(fromAmount) * (10 ** 9);

      const routes = await newJupiter.computeRoutes({
        inputMint,
        outputMint,
        amount,
        slippageBps: 50,
      });

      if (routes.routesInfos.length === 0) {
        toast.error('No routes found for this swap');
        return;
      }

      const { transactions } = await newJupiter.exchange({
        routeInfo: routes.routesInfos[0],
      });

      const { txid } = await transactions.execute();
      
      toast.success('Swap executed successfully!');
      console.log('Swap transaction:', txid);
      
      // Reset form
      setFromAmount('');
      setToAmount('');
      setPriceImpact(null);
    } catch (error) {
      console.error('Swap error:', error);
      toast.error('Failed to execute swap');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Token Swap</span>
          <Select
            value={selectedDex}
            onValueChange={setSelectedDex}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select DEX" />
            </SelectTrigger>
            <SelectContent>
              {DEX_OPTIONS.map((dex) => (
                <SelectItem key={dex.id} value={dex.id}>
                  {dex.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">From</label>
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {TOKENS.map((token) => (
                  <SelectItem key={token.mint} value={token.mint}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            type="number"
            placeholder="0.0"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
          />
        </div>
        
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwapTokens}
            className="rounded-full hover:bg-white/5"
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">To</label>
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {TOKENS.map((token) => (
                  <SelectItem key={token.mint} value={token.mint}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            type="number"
            placeholder="0.0"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            disabled
          />
        </div>

        {priceImpact && (
          <div className="text-sm text-gray-400">
            Price Impact: {priceImpact}%
          </div>
        )}

        <Button
          className="w-full"
          onClick={handleSwap}
          disabled={isLoading || !fromAmount || Number(fromAmount) <= 0}
        >
          {isLoading ? 'Loading...' : 'Swap'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SwapInterface;