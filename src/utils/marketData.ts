import ccxt from 'ccxt';
import { supabase } from "@/integrations/supabase/client";

export interface MarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

const initializeCoinbaseClient = async () => {
  const { data: { value: apiKey }, error } = await supabase
    .from('secrets')
    .select('value')
    .eq('name', 'COINBASE_API_KEY')
    .single();

  if (error) {
    console.error('Error fetching Coinbase API key:', error);
    throw new Error('Failed to initialize Coinbase client');
  }

  return new ccxt.coinbase({
    apiKey: apiKey,
    enableRateLimit: true,
  });
};

export const fetchCoinData = async (coinId: string, days: number = 90): Promise<MarketData> => {
  try {
    const exchange = await initializeCoinbaseClient();
    const symbol = `${coinId}/USD`;
    
    // Fetch OHLCV data (Open, High, Low, Close, Volume)
    const ohlcv = await exchange.fetchOHLCV(symbol, '1d', undefined, days);
    
    // Transform the data into the expected format
    const prices = ohlcv.map(candle => [candle[0], candle[4]]); // timestamp and closing price
    const volumes = ohlcv.map(candle => [candle[0], candle[5]]); // timestamp and volume
    
    return {
      prices,
      market_caps: prices, // Coinbase doesn't provide market cap data directly
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

// For real exchange integration
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