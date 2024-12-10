import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { getProvider } from "@/utils/solana";
import { TokenInput } from "./TokenInput";
import { DEX_OPTIONS, TOKENS } from "@/utils/tokens";
import { initJupiter, getQuote, executeSwap } from "@/utils/jupiter";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation } from '@tanstack/react-query';

const SwapInterface = () => {
  const [selectedDex, setSelectedDex] = useState('jupiter');
  const [fromToken, setFromToken] = useState(TOKENS[0].mint);
  const [toToken, setToToken] = useState(TOKENS[1].mint);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [priceImpact, setPriceImpact] = useState<string | null>(null);
  const [jupiter, setJupiter] = useState<Jupiter | null>(null);
  const [bestRoute, setBestRoute] = useState<any>(null);

  // Fetch user's trading settings
  const { data: tradingSettings } = useQuery({
    queryKey: ['tradingSettings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('trading_settings')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching trading settings:', error);
        return null;
      }

      return data;
    }
  });

  // Save trading settings mutation
  const saveTradingSettings = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const settings = {
        user_id: user.id,
        dex_name: selectedDex,
        default_token_in: fromToken,
        default_token_out: toToken,
      };

      const { data, error } = await supabase
        .from('trading_settings')
        .upsert(settings)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Trading settings saved');
    },
    onError: (error) => {
      console.error('Error saving trading settings:', error);
      toast.error('Failed to save trading settings');
    }
  });

  // Initialize Jupiter and load user settings
  useEffect(() => {
    const setup = async () => {
      try {
        if (selectedDex === 'jupiter') {
          const jupiterInstance = await initJupiter();
          setJupiter(jupiterInstance);
        }

        // Load user settings if available
        if (tradingSettings) {
          setSelectedDex(tradingSettings.dex_name);
          if (tradingSettings.default_token_in) {
            setFromToken(tradingSettings.default_token_in);
          }
          if (tradingSettings.default_token_out) {
            setToToken(tradingSettings.default_token_out);
          }
        }
      } catch (error) {
        console.error('Error initializing:', error);
        toast.error('Failed to initialize');
      }
    };

    setup();
  }, [selectedDex, tradingSettings]);

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
        setBestRoute(null);
        return;
      }

      try {
        const quote = await getQuote(jupiter, fromToken, toToken, fromAmount);
        if (quote) {
          setToAmount(quote.outAmount);
          setPriceImpact(quote.priceImpact);
          setBestRoute(quote.bestRoute);
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

      if (!jupiter || !bestRoute) {
        toast.error('Swap route not available');
        return;
      }

      const signature = await executeSwap(jupiter, bestRoute);
      
      toast.success('Swap executed successfully!');
      console.log('Swap transaction:', signature);
      
      // Save user preferences
      saveTradingSettings.mutate();
      
      // Reset form
      setFromAmount('');
      setToAmount('');
      setPriceImpact(null);
      setBestRoute(null);
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
          <Select value={selectedDex} onValueChange={setSelectedDex}>
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
        <TokenInput
          label="From"
          value={fromAmount}
          onChange={setFromAmount}
          onTokenChange={setFromToken}
          selectedToken={fromToken}
        />
        
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

        <TokenInput
          label="To"
          value={toAmount}
          onChange={setToAmount}
          onTokenChange={setToToken}
          selectedToken={toToken}
          disabled
        />

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