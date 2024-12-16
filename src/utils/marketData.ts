import ccxt from 'ccxt';
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
    const exchange = await initializeCoinbaseClient();
    const symbol = `${coinId}/USD`;
    
    // Fetch OHLCV data (Open, High, Low, Close, Volume)
    const ohlcv = await exchange.fetchOHLCV(symbol, '1d', undefined, days);
    
    // Ensure the data is in the correct [number, number][] format
    const prices: [number, number][] = ohlcv.map(candle => [candle[0], candle[4]]);
    const volumes: [number, number][] = ohlcv.map(candle => [candle[0], candle[5]]);
    
    // For market caps, we'll use the price * volume as an approximation
    const marketCaps: [number, number][] = ohlcv.map(candle => [
      candle[0],
      candle[4] * candle[5]
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
    const exchange = await initializeCoinbaseClient();
    const symbol = `${coinId}/USD`;
    const ticker = await exchange.fetchTicker(symbol);
    
    return {
      [coinId.toLowerCase()]: {
        usd: ticker.last
      }
    };
  } catch (error) {
    console.error('Error fetching exchange prices:', error);
    throw new Error('Failed to fetch exchange prices');
  }
};