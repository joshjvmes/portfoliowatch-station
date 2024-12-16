import axios from 'axios';
import { supabase } from "@/integrations/supabase/client";

export interface MarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

const initializeCoinbaseClient = async () => {
  const { data: secrets, error } = await supabase
    .from('exchange_metadata')
    .select('trading_fee_percentage')
    .single();

  if (error) {
    console.error('Error fetching Coinbase configuration:', error);
    throw new Error('Failed to initialize Coinbase client');
  }

  // Initialize with public API first (we'll use Edge Functions for private endpoints)
  return new ccxt.coinbase({
    enableRateLimit: true,
  });
};

export const fetchCoinData = async (coinId: string, days: number = 90): Promise<MarketData> => {
  try {
    // Use Coinbase Pro API directly with axios
    const response = await axios.get(
      `https://api.pro.coinbase.com/products/${coinId}-USD/candles`,
      {
        params: {
          granularity: 86400, // Daily candles
          start: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date().toISOString(),
        },
      }
    );

    const candles = response.data;
    
    // Convert Coinbase Pro format to our format
    // Coinbase Pro format: [timestamp, open, high, low, close, volume]
    const prices: [number, number][] = candles.map((candle: number[]) => [
      candle[0] * 1000, // Convert to milliseconds
      candle[4], // Close price
    ]);

    const volumes: [number, number][] = candles.map((candle: number[]) => [
      candle[0] * 1000,
      candle[5],
    ]);

    // Calculate market caps (price * volume)
    const marketCaps: [number, number][] = candles.map((candle: number[]) => [
      candle[0] * 1000,
      candle[4] * candle[5],
    ]);

    return {
      prices,
      market_caps: marketCaps,
      total_volumes: volumes,
    };
  } catch (error) {
    console.error('Error fetching data from Coinbase:', error);
    throw new Error('Failed to fetch market data');
  }
};

export const formatChartData = (data: MarketData) => {
  return data.prices.map(([timestamp, price], index) => ({
    date: new Date(timestamp).toISOString().split('T')[0],
    price: price,
    volume: data.total_volumes[index]?.[1] || 0
  }));
};

export const fetchExchangePrices = async (coinId: string) => {
  try {
    const response = await axios.get(
      `https://api.pro.coinbase.com/products/${coinId}-USD/ticker`
    );
    
    return {
      [coinId.toLowerCase()]: {
        usd: parseFloat(response.data.price)
      }
    };
  } catch (error) {
    console.error('Error fetching exchange prices:', error);
    throw new Error('Failed to fetch exchange prices');
  }
};